import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HostSidebar from "../../components/HostSidebar";
import { createWorkshop, uploadImage, updateWorkshop } from "../../api";

const categoryOptions = [
  { id: 2, label: "Làm gốm", icon: "emoji_food_beverage" },
  { id: 1, label: "Hội họa", icon: "brush" },
  { id: 3, label: "Trang sức", icon: "diamond" },
  { id: 4, label: "Dệt may", icon: "content_cut" },
];

const levelOptions = [
  { id: 1, label: "Cơ bản" },
  { id: 2, label: "Trung cấp" },
  { id: 3, label: "Nâng cao" },
];

export default function HostCreateWorkshop() {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const fileInputRef = useRef(null);
  const editingWorkshop = routerLocation.state?.workshop || null;
  const editingWorkshopId =
    editingWorkshop?.id ??
    editingWorkshop?.Id ??
    editingWorkshop?.workshopId ??
    editingWorkshop?.WorkshopId;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(categoryOptions[0].id);
  const [levelId, setLevelId] = useState(levelOptions[0].id);
  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:30");
  const [price, setPrice] = useState(500000);
  const [maxTickets, setMaxTickets] = useState(8);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const hasAnyImage = Boolean(existingThumbnail) || previews.length > 0;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !title.trim() ||
      !location.trim() ||
      !scheduleDate ||
      !startTime ||
      !endTime ||
      Number(price) <= 0 ||
      Number(maxTickets) <= 0
    ) {
      setError(
        "Vui lòng điền đầy đủ thông tin bắt buộc và kiểm tra lại dữ liệu.",
      );
      return;
    }

    let thumbnailLink = existingThumbnail || null;

    if (files.length > 0) {
      const uploaded = [];
      for (let i = 0; i < files.length && i < 5; i++) {
        const f = files[i];
        const res = await uploadImage(f);
        uploaded.push(res);
      }
      if (uploaded.length > 0) thumbnailLink = uploaded[0].url;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      categoryId,
      levelId,
      thumbnailLink,
      language: "vi",
      status: "pending",
      schedules: [
        {
          startOn: scheduleDate,
          tickets: [
            {
              ticketType: "standard",
              startTime,
              endTime,
              maxTickets: Number(maxTickets),
              price: Number(price),
            },
          ],
        },
      ],
    };

    try {
      setSubmitting(true);
      if (editingWorkshop) {
        if (!editingWorkshopId) {
          setError("Không tìm thấy ID workshop để cập nhật.");
          return;
        }

        await updateWorkshop(editingWorkshopId, {
          Title: payload.title,
          Description: payload.description,
          Location: payload.location,
          ThumbnailLink: payload.thumbnailLink,
          CategoryId: payload.categoryId,
          LevelId: payload.levelId,
          Language: payload.language,
          Status: "draft",
          Schedules: payload.schedules.map((schedule) => ({
            StartOn: schedule.startOn,
            Tickets: schedule.tickets.map((ticket) => ({
              TicketType: ticket.ticketType,
              StartTime: ticket.startTime,
              EndTime: ticket.endTime,
              MaxTickets: ticket.maxTickets,
              Price: ticket.price,
            })),
          })),
        });
      } else {
        await createWorkshop(payload);
      }
      navigate("/host/workshops");
    } catch (err) {
      setError(err?.message || "Không thể tạo workshop. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!editingWorkshop) return;

    setTitle(editingWorkshop.title ?? editingWorkshop.Title ?? "");
    setDescription(
      editingWorkshop.description ?? editingWorkshop.Description ?? "",
    );
    setLocation(editingWorkshop.location ?? editingWorkshop.Location ?? "");
    setCategoryId(
      editingWorkshop.categoryId ??
        editingWorkshop.CategoryId ??
        categoryOptions[0].id,
    );
    setLevelId(
      editingWorkshop.levelId ?? editingWorkshop.LevelId ?? levelOptions[0].id,
    );
    setExistingThumbnail(
      editingWorkshop.thumbnailLink ?? editingWorkshop.ThumbnailLink ?? "",
    );

    const schedules = [
      ...(editingWorkshop.schedules ?? editingWorkshop.Schedules ?? []),
    ].sort(
      (a, b) =>
        new Date(`${a.startOn ?? a.StartOn}T00:00:00`) -
        new Date(`${b.startOn ?? b.StartOn}T00:00:00`),
    );

    const firstSchedule = schedules[0];
    const tickets = firstSchedule?.tickets ?? firstSchedule?.Tickets ?? [];
    const firstTicket = tickets[0];

    const startOn =
      firstSchedule?.startOn ??
      firstSchedule?.StartOn ??
      editingWorkshop.startOn ??
      editingWorkshop.StartOn;

    if (startOn) {
      setScheduleDate(String(startOn).slice(0, 10));
    }

    const oldStartTime =
      firstTicket?.startTime ??
      firstTicket?.StartTime ??
      firstSchedule?.startTime ??
      firstSchedule?.StartTime;

    const oldEndTime =
      firstTicket?.endTime ??
      firstTicket?.EndTime ??
      firstSchedule?.endTime ??
      firstSchedule?.EndTime;

    if (oldStartTime) setStartTime(String(oldStartTime).slice(0, 5));
    if (oldEndTime) setEndTime(String(oldEndTime).slice(0, 5));

    const oldPrice =
      firstTicket?.price ??
      firstTicket?.Price ??
      firstSchedule?.priceLower ??
      firstSchedule?.PriceLower ??
      editingWorkshop.priceLower ??
      editingWorkshop.PriceLower;

    if (oldPrice !== undefined && oldPrice !== null) {
      setPrice(Number(oldPrice));
    }

    const oldMaxTickets =
      firstTicket?.maxTickets ??
      firstTicket?.MaxTickets ??
      firstSchedule?.maxTickets ??
      firstSchedule?.MaxTickets ??
      editingWorkshop.maxTickets ??
      editingWorkshop.MaxTickets;

    if (oldMaxTickets !== undefined && oldMaxTickets !== null) {
      setMaxTickets(Number(oldMaxTickets));
    }
  }, [editingWorkshop]);

  function handleFilesChange(e) {
    const selected = Array.from(e.target.files || []);
    const limited = selected.slice(0, 5);
    setFiles(limited);
    const p = limited.map((f) => URL.createObjectURL(f));
    setPreviews(p);
  }

  function removeFileAt(index) {
    const nextFiles = files.slice();
    nextFiles.splice(index, 1);
    setFiles(nextFiles);
    const nextPreviews = previews.slice();
    nextPreviews.splice(index, 1);
    setPreviews(nextPreviews);
  }

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex">
        <HostSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          {/* Main Content */}
          <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 md:py-12 pb-24">
            {/* Header Section */}
            <div className="mb-10 animate-fade-in-up">
              <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                {editingWorkshop ? "Chỉnh sửa Workshop" : "Tạo Workshop Mới"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">
                Chia sẻ tay nghề của bạn với Đà Nẵng. Cùng thiết lập không gian
                sáng tạo của bạn nào.
              </p>
            </div>
            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* Error */}
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                  {error}
                </div>
              ) : null}
              {/* Basic Details Section */}
              <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    1
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Thông Tin Cơ Bản
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Tên Workshop
                    </label>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                      placeholder="vd: Lớp học làm gốm ngắm hoàng hôn trên biển"
                      type="text"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                        Địa điểm
                      </label>
                      <input
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                        placeholder="vd: 123 Phố Hội, Đà Nẵng"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                        Trình độ
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {levelOptions.map((level) => (
                          <button
                            key={level.id}
                            type="button"
                            onClick={() => setLevelId(level.id)}
                            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${levelId === level.id ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 hover:border-primary hover:text-primary"}`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Danh mục
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categoryOptions.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setCategoryId(category.id)}
                          className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${categoryId === category.id ? "border-primary bg-primary/5" : "border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                        >
                          <span
                            className={`material-symbols-outlined text-3xl ${categoryId === category.id ? "text-primary" : "text-slate-400"}`}
                          >
                            {category.icon}
                          </span>
                          <span
                            className={`font-semibold text-sm ${categoryId === category.id ? "text-primary" : "text-slate-600 dark:text-slate-300"}`}
                          >
                            {category.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 min-h-[120px]"
                      placeholder="Mô tả những gì người tham gia sẽ được học và tạo ra..."
                    />
                  </div>
                </div>
              </section>
              {/* Schedule Settings */}
              <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    2
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Cài Đặt Lịch Trình
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Ngày mở lớp
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(event) => setScheduleDate(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Khung giờ
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0"
                          type="time"
                          value={startTime}
                          onChange={(event) => setStartTime(event.target.value)}
                        />
                        <span className="text-slate-400 text-sm">đến</span>
                        <input
                          className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0"
                          type="time"
                          value={endTime}
                          onChange={(event) => setEndTime(event.target.value)}
                        />
                      </div>
                      <button
                        className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          add
                        </span>{" "}
                        Thêm khung giờ khác
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* Ticket Settings */}
              <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    3
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Vé &amp; Sức Chứa
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Giá mỗi người (VND)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                        ₫
                      </span>
                      <input
                        value={price}
                        onChange={(event) => {
                          const value = event.target.value.replace(/\D/g, "");
                          setPrice(value === "" ? "" : Number(value));
                        }}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-8 pr-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                        placeholder="500000"
                        type="text"
                        inputMode="numeric"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Đã bao gồm phí nền tảng và thuế.
                    </p>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                      Số lượng tối đa
                    </label>
                    <input
                      value={maxTickets}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");
                        setMaxTickets(value === "" ? "" : Number(value));
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                      placeholder="8"
                      type="text"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </section>
              <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    4
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Thư Viện Không Gian Làm Việc
                  </h2>
                </div>

                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">
                      cloud_upload
                    </span>
                  </div>

                  <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">
                    Nhấp để tải lên hoặc kéo và thả
                  </p>

                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                    PNG, JPG hoặc JPEG — tối đa 5 ảnh
                  </p>

                  <p className="text-slate-400 text-xs mb-4">
                    Lưu ý: Ảnh đầu tiên sẽ được dùng làm ảnh đại diện.
                  </p>

                  <input
                    ref={fileInputRef}
                    onChange={handleFilesChange}
                    multiple
                    accept="image/*"
                    type="file"
                    className="hidden"
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:shadow-md transition-all"
                    >
                      Chọn tệp
                    </button>

                    {hasAnyImage ? (
                      <button
                        type="button"
                        onClick={() => {
                          setFiles([]);
                          setPreviews([]);
                          setExistingThumbnail("");
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="px-5 py-2 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm"
                      >
                        Xóa tất cả
                      </button>
                    ) : null}
                  </div>
                </div>

                {hasAnyImage ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {existingThumbnail ? (
                      <div className="relative aspect-square rounded-xl overflow-hidden group">
                        <img
                          alt="existing"
                          className="w-full h-full object-cover"
                          src={existingThumbnail}
                        />
                        <button
                          type="button"
                          onClick={() => setExistingThumbnail("")}
                          className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                    ) : null}

                    {previews.map((p, idx) => (
                      <div
                        key={p}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <img
                          alt={`preview-${idx}`}
                          className="w-full h-full object-cover"
                          src={p}
                        />
                        <button
                          type="button"
                          onClick={() => removeFileAt(idx)}
                          className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
              {/* Action Bar */}
              <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a2c2a] border-t border-slate-200 dark:border-slate-800 p-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:pt-4">
                <div className="max-w-[960px] mx-auto flex flex-col-reverse md:flex-row items-center justify-end gap-4">
                  <button
                    className="w-full md:w-auto px-8 py-4 rounded-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-200"
                    type="button"
                  >
                    Hủy
                  </button>
                  <button
                    className="w-full md:w-auto px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 bg-primary shadow-primary/30"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>{submitting ? "Đang gửi..." : "Đăng Workshop"}</span>
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
