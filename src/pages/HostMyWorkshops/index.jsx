import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyWorkshops, deleteWorkshop } from "../../api";

function formatScheduleDate(startOn) {
  if (!startOn) return "Chưa có lịch";
  const date = new Date(`${startOn}T00:00:00`);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatPrice(price) {
  if (price == null) return "TBD";
  return `${Number(price).toLocaleString("vi-VN")}₫`;
}

export default function HostMyWorkshops() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadWorkshops() {
      if (!currentUser) {
        if (!ignore) {
          setWorkshops([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");
        const result = await getMyWorkshops(1, 12);
        if (!ignore) {
          setWorkshops(result?.data ?? []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải dữ liệu workshop.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkshops();
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  function getWorkshopId(workshop) {
    return (
      workshop?.id ??
      workshop?.Id ??
      workshop?.workshopId ??
      workshop?.WorkshopId ??
      workshop?.workshopID
    );
  }

  async function handleDelete(workshop) {
    const id = getWorkshopId(workshop);

    console.log("Workshop cần xóa:", workshop);
    console.log("ID cần xóa:", id);

    if (id == null) {
      setError("Không tìm thấy ID workshop để xóa.");
      return;
    }

    if (!confirm("Bạn có chắc muốn xóa workshop này?")) return;

    try {
      await deleteWorkshop(id);

      setWorkshops((prev) => prev.filter((w) => getWorkshopId(w) !== id));

      setError("");
    } catch (err) {
      setError(err?.message || "Không thể xóa workshop.");
    }
  }

  function handleEdit(workshop) {
    navigate("/host/create-workshop", { state: { workshop } });
  }

  const activeCount = workshops.filter(
    (workshop) => (workshop.schedules || []).length > 0,
  ).length;
  const draftCount = workshops.filter(
    (workshop) => !(workshop.schedules || []).length,
  ).length;
  const completedCount = workshops.filter((workshop) => {
    const schedules = (workshop.schedules || []).map(
      (schedule) => new Date(`${schedule.startOn}T00:00:00`),
    );
    return (
      schedules.length > 0 && schedules.every((start) => start < new Date())
    );
  }).length;

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
        <div className="flex h-screen">
          {/* Sidebar */}
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 relative px-6">
              <div className="flex items-center gap-3 mr-8">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">draw</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight">
                    Hands &amp; Hour
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tài khoản Người tổ chức
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Workshop của tôi</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    placeholder="Tìm kiếm xưởng..."
                    type="text"
                  />
                </div>
                <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
                {/* Avatar Menu (Simulated Clicked State Overlay) */}
                <div className="relative">
                  <button className="size-10 rounded-full overflow-hidden border-2 border-primary ring-2 ring-primary/20">
                    <img
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      data-alt="Close up of a smiling artisan workshop owner"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1uQVuNYWmUtaHwOCiw8twtNwMEhPO2KqzieFPVMROKhwH_n3Kv-2GCEvxcgEisn5kykdQt8EsXEcc3vhB8IbDPetSjdAEUqkxAznHNcGX13fCgjCsVcvNo-P2u9l6Rw-a7z-B8BTw3-HQak9KWVKOEysFsRZ9abi6MzQvFUsuBVe3P8T8bCD7NQAMnF81iRUJuEGljppJj2V-ut_H2iBgDHDPpYb_qALsQMWSas5oi6CgfFzh-OwKYgzIB6IakISK3JfYu3fJlnW"
                    />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <Link
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      to="/home"
                    >
                      <span className="material-symbols-outlined text-lg">
                        dashboard
                      </span>{" "}
                      Bảng điều khiển
                    </Link>
                    <Link
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary bg-primary/5 font-medium"
                      to="/home"
                    >
                      <span className="material-symbols-outlined text-lg">
                        event_note
                      </span>{" "}
                      Workshop của tôi
                    </Link>
                    <hr className="my-1 border-slate-100 dark:border-slate-700" />
                    <Link
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      to="/home"
                    >
                      <span className="material-symbols-outlined text-lg">
                        logout
                      </span>{" "}
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </div>
            </header>
            {/* Main Scrollable Content */}
            <main className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Tabs */}
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 gap-8">
                <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">
                  Đang hoạt động ({loading ? "..." : activeCount})
                </button>
                <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                  Bản nháp ({loading ? "..." : draftCount})
                </button>
                <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                  Đã hoàn thành ({loading ? "..." : completedCount})
                </button>
                <div className="ml-auto pb-4">
                  <button
                    onClick={() => navigate("/host/create-workshop")}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined">add</span> Tạo
                    Workshop mới
                  </button>
                </div>
              </div>
              {/* Grid of Workshops */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                  <div className="col-span-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-600 dark:text-slate-300">
                    Đang tải workshop...
                  </div>
                ) : error ? (
                  <div className="col-span-full rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-8 text-center text-red-700 dark:text-red-200">
                    {error}
                  </div>
                ) : workshops.length === 0 ? (
                  <div className="col-span-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-600 dark:text-slate-300">
                    Không tìm thấy workshop nào.
                  </div>
                ) : (
                  workshops.map((workshop, index) => {
                    const schedules = [...(workshop.schedules || [])].sort(
                      (a, b) =>
                        new Date(`${a.startOn}T00:00:00`) -
                        new Date(`${b.startOn}T00:00:00`),
                    );
                    const nextSchedule = schedules[0];
                    const workshopStatus = nextSchedule
                      ? "Đang hoạt động"
                      : "Bản nháp";
                    const labelClass = nextSchedule
                      ? "bg-primary text-white"
                      : "bg-slate-500 text-white";
                    const imageSrc =
                      workshop.thumbnailLink ||
                      "https://via.placeholder.com/640x360?text=Workshop";
                    const scheduleText = nextSchedule
                      ? `Tiếp theo: ${formatScheduleDate(nextSchedule.startOn)}`
                      : "Chưa có lịch";
                    const seatText = nextSchedule
                      ? `Còn ${nextSchedule.remainingTickets} vé`
                      : "Chưa có vé";
                    const priceText = nextSchedule
                      ? formatPrice(nextSchedule.priceLower)
                      : "TBD";

                    return (
                      <div
                        key={getWorkshopId(workshop) ?? index}
                        className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            alt={workshop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={imageSrc}
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(workshop);
                              }}
                              className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-sm">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(workshop);
                              }}
                              className="p-2 rounded-full bg-white/90 hover:bg-white text-red-600 shadow"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-sm">
                                delete
                              </span>
                            </button>
                          </div>
                          <div
                            className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${labelClass}`}
                          >
                            {workshopStatus}
                          </div>
                        </div>
                        <div className="p-5 space-y-3">
                          <div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                              {workshop.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {scheduleText}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                              <span className="material-symbols-outlined text-lg">
                                group
                              </span>
                              <span>{seatText}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {priceText}
                            </span>
                          </div>
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-xs font-medium text-primary flex items-center gap-1">
                              Quản lý người tham gia{" "}
                              <span className="material-symbols-outlined text-sm">
                                chevron_right
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
