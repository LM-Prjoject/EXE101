import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HostSidebar from "../../components/HostSidebar";
import HostHeader from "../../components/HostHeader";
import {
  getHostTickets,
  getTicketParticipants,
  checkInParticipant,
} from "../../api/host";

export default function HostManageParticipants() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkInLoading, setCheckInLoading] = useState({});

  // Fetch all sold tickets on mount
  useEffect(() => {
    async function loadTickets() {
      try {
        setLoadingTickets(true);
        const res = await getHostTickets(1, 100);
        const data = res?.data || res?.items || (Array.isArray(res) ? res : []);
        setTickets(data);
        if (data.length > 0) {
          setSelectedTicketId(data[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách loại vé.");
      } finally {
        setLoadingTickets(false);
      }
    }
    loadTickets();
  }, []);

  // Fetch participants when selectedTicketId changes
  useEffect(() => {
    if (!selectedTicketId) return;

    let ignore = false;
    async function loadParticipants() {
      try {
        setLoadingParticipants(true);
        const res = await getTicketParticipants(selectedTicketId, 1, 100);
        const data = res?.data || res?.items || (Array.isArray(res) ? res : []);
        if (!ignore) {
          setParticipants(data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setError("Không thể tải danh sách học viên.");
      } finally {
        if (!ignore) setLoadingParticipants(false);
      }
    }

    loadParticipants();
    return () => {
      ignore = true;
    };
  }, [selectedTicketId]);

  const handleCheckIn = async (ticketId, participantId) => {
    console.log("handleCheckIn called with:", { ticketId, participantId });
    try {
      setCheckInLoading((prev) => ({ ...prev, [participantId]: true }));
      await checkInParticipant(ticketId, participantId);

      setSuccess("Check in học viên thành công!");
      setTimeout(() => setSuccess(""), 3000);

      // Update local state directly
      setParticipants((prev) =>
        prev.map((p) => {
          const id = p.participantId ?? p.ParticipantId;
          if (id === participantId) {
            return { ...p, status: "checked in", Status: "checked in" };
          }
          return p;
        }),
      );
    } catch (err) {
      console.error(err);
      if (
        err?.message?.includes("500") ||
        err?.message?.toLowerCase().includes("internal server error") ||
        err?.message?.toLowerCase().includes("invalid date")
      ) {
        setError(
          "Không thể check-in: Buổi học này chưa diễn ra hoặc đã kết thúc. Bạn chỉ có thể check-in trong khung giờ của buổi học đang diễn ra!",
        );
      } else {
        setError(err?.message || "Check in thất bại. Vui lòng thử lại.");
      }
      setTimeout(() => setError(""), 6000);
    } finally {
      setCheckInLoading((prev) => ({ ...prev, [participantId]: false }));
    }
  };

  const selectedTicket = tickets.find((t) => t.id === Number(selectedTicketId));

  // Filter participants locally by search query (name or email)
  const filteredParticipants = participants.filter((p) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    return (
      (p.userName || "").toLowerCase().includes(query) ||
      (p.userEmail || "").toLowerCase().includes(query)
    );
  });

  const formatTicketDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTicketTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.slice(0, 5);
  };

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
        <div className="relative flex min-h-screen w-full">
          {/* Sidebar Navigation */}
          <HostSidebar />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-y-auto">
            {/* Header */}
            <HostHeader title="Quản lí ticket" />

            {/* Error and Success Notifications */}
            {error && (
              <div className="mx-4 sm:mx-8 mt-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mx-4 sm:mx-8 mt-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-xl border border-green-200 dark:border-green-800 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{success}</span>
              </div>
            )}

            {!loadingTickets &&
              tickets.length > 0 &&
              selectedTicket &&
              !selectedTicket.isOngoing && (
                <div className="mx-4 sm:mx-8 mt-6 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 text-sm flex items-start gap-2">
                  <span className="material-symbols-outlined shrink-0 text-amber-600 dark:text-amber-400">
                    warning
                  </span>
                  <div>
                    <p className="font-bold">
                      Buổi học hiện không trong giờ diễn ra
                    </p>
                    <p className="mt-1 text-xs opacity-90">
                      Theo quy định của hệ thống, nút Check-in chỉ hoạt động khi
                      buổi học này đang diễn ra (đúng ngày{" "}
                      {formatTicketDate(selectedTicket.startOn)} và nằm trong
                      khung giờ {formatTicketTime(selectedTicket.startTime)} -{" "}
                      {formatTicketTime(selectedTicket.endTime)}). Việc check-in
                      vào thời điểm khác sẽ bị Server từ chối.
                    </p>
                  </div>
                </div>
              )}

            <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col">
              {loadingTickets ? (
                <div className="flex flex-col items-center justify-center py-20 flex-1">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-slate-500 text-sm">
                    Đang tải thông tin vé...
                  </p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center flex-1">
                  <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
                    confirmation_number
                  </span>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">
                    Chưa có vé nào được bán
                  </h4>
                  <p className="text-slate-500 text-sm mt-1 max-w-sm">
                    Hiện chưa có học viên nào mua vé cho các buổi workshop do
                    bạn tổ chức.
                  </p>
                </div>
              ) : (
                <>
                  {/* Filters Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
                    <div className="flex items-center gap-4 flex-1">
                      <label className="text-sm font-bold text-slate-500 whitespace-nowrap">
                        Chọn loại vé:
                      </label>
                      <select
                        className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-300 font-bold cursor-pointer max-w-md w-full md:w-auto"
                        value={selectedTicketId}
                        onChange={(e) =>
                          setSelectedTicketId(Number(e.target.value))
                        }
                      >
                        {tickets.map((t) => {
                          const ticketId = t.id ?? t.Id;
                          const startOn = t.startOn ?? t.StartOn;
                          const startTime = t.startTime ?? t.StartTime;
                          const endTime = t.endTime ?? t.EndTime;

                          return (
                            <option key={ticketId} value={ticketId}>
                              {formatTicketDate(startOn)} •{" "}
                              {formatTicketTime(startTime)} -{" "}
                              {formatTicketTime(endTime)}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="relative group w-full md:w-64">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                      </span>
                      <input
                        className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-full focus:ring-2 focus:ring-primary"
                        placeholder="Tìm kiếm người tham gia..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Title and Summary */}
                  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                        {selectedTicket?.workshopTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            calendar_today
                          </span>
                          <span className="text-sm font-semibold">
                            {formatTicketDate(selectedTicket?.startOn)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            schedule
                          </span>
                          <span className="text-sm font-semibold">
                            {formatTicketTime(selectedTicket?.startTime)} -{" "}
                            {formatTicketTime(selectedTicket?.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            location_on
                          </span>
                          <span className="text-sm font-semibold">
                            {selectedTicket?.workshopLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        Loại vé
                      </p>
                      <h3 className="text-2xl font-black text-primary">
                        {selectedTicket?.ticketType}
                      </h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        Tổng số đăng ký
                      </p>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedTicket?.participantCount} học viên
                      </h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        Trạng thái lớp học
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          selectedTicket?.isOngoing
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {selectedTicket?.isOngoing
                          ? "Đang diễn ra"
                          : "Chưa diễn ra / Đã kết thúc"}
                      </span>
                    </div>
                  </div>

                  {/* Participants Table */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex-1 flex flex-col">
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Người tham gia
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Trạng thái
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Ngày mua
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {loadingParticipants ? (
                            <tr>
                              <td
                                colSpan="4"
                                className="text-center py-10 text-sm text-slate-500"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined animate-spin text-lg">
                                    progress_activity
                                  </span>
                                  Đang tải danh sách học viên...
                                </div>
                              </td>
                            </tr>
                          ) : filteredParticipants.length === 0 ? (
                            <tr>
                              <td
                                colSpan="4"
                                className="text-center py-10 text-sm text-slate-500 font-semibold"
                              >
                                {searchTerm
                                  ? "Không tìm thấy học viên nào phù hợp."
                                  : "Chưa có học viên nào đăng ký loại vé này."}
                              </td>
                            </tr>
                          ) : (
                            filteredParticipants.map((p) => {
                              const partId = p.participantId ?? p.ParticipantId;
                              const isCheckedIn =
                                String(p.status ?? p.Status ?? "")
                                  .trim()
                                  .toLowerCase() === "checked in";
                              const isLoading = checkInLoading[partId];
                              const nameVal =
                                p.userName ?? p.UserName ?? "Học viên";
                              const emailVal = p.userEmail ?? p.UserEmail ?? "";
                              const avatarVal = p.avatarLink ?? p.AvatarLink;
                              const bookedVal = p.bookedOn ?? p.BookedOn;
                              const initials = nameVal
                                .slice(0, 2)
                                .toUpperCase();

                              return (
                                <tr
                                  key={partId}
                                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      {avatarVal ? (
                                        <img
                                          src={avatarVal}
                                          alt={nameVal}
                                          className="size-10 rounded-full object-cover border border-slate-200"
                                        />
                                      ) : (
                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                          {initials}
                                        </div>
                                      )}
                                      <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                          {nameVal}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                          {emailVal}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        isCheckedIn
                                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                      }`}
                                    >
                                      {isCheckedIn
                                        ? "Đã check in"
                                        : "Chờ check in"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-slate-500">
                                    {bookedVal
                                      ? new Date(bookedVal).toLocaleDateString(
                                          "vi-VN",
                                          {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          },
                                        )
                                      : ""}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button
                                      onClick={() =>
                                        handleCheckIn(
                                          p.ticketId ??
                                            p.TicketId ??
                                            selectedTicketId,
                                          partId,
                                        )
                                      }
                                      disabled={isCheckedIn || isLoading}
                                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border ${
                                        isCheckedIn
                                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed"
                                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/20"
                                      }`}
                                    >
                                      {isLoading
                                        ? "Đang xử lý..."
                                        : isCheckedIn
                                          ? "Đã check in"
                                          : "Check in"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
