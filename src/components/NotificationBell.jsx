import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPurchasedSchedules } from "../api/workshop";
import { getHostBookings } from "../api/host";

function formatTimeOnly(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
  return timeStr;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const diffMs = Date.now() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return formatDate(dateStr);
  } catch {
    return "";
  }
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const BRAND = {
    primary: "#c3996c",
    accent: "#f08a78",
    soft: "#fbc4ae",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    async function loadNotifications() {
      if (currentUser?.role?.toLowerCase() === "host") {
        if (authToken) {
          try {
            const res = await getHostBookings(1, 50);
            const bookings = res?.items || res?.Items || res?.data || res?.Data || res?.$values || [];
            
            const list = bookings.map(item => {
              const timeRange = (item.startTime && item.endTime) ? `${formatTimeOnly(item.startTime)} - ${formatTimeOnly(item.endTime)}` : "";
              return {
                id: `${item.participantId}-${item.ticketId}`,
                title: "Có lượt đặt chỗ mới! 🎉",
                message: `Khách hàng "${item.userName}" đã đặt chỗ workshop "${item.workshopTitle || "Workshop"}" ngày ${formatDate(item.startOn)} (${timeRange}).`,
                time: item.bookedOn,
                workshopId: item.workshopId
              };
            });

            // Sort newest first
            list.sort((a, b) => new Date(b.time) - new Date(a.time));
            setNotifications(list);

            // Check unread count based on last read time in localStorage
            const lastRead = localStorage.getItem(`notifications_last_read_${currentUser.id}`);
            if (!lastRead) {
              setUnreadCount(list.length);
            } else {
              const count = list.filter(n => new Date(n.time) > new Date(lastRead)).length;
              setUnreadCount(count);
            }
          } catch (err) {
            console.error("Failed to load host bookings for notifications:", err);
          }
        }
        return;
      }

      let remoteSchedules = [];
      if (authToken) {
        try {
          const res = await getPurchasedSchedules(authToken, 1, 50);
          remoteSchedules = res?.data || [];
        } catch (err) {
          console.error("Failed to load remote schedules for notifications:", err);
        }
      }

      // Read local bookings
      const localStr = localStorage.getItem("localBookings");
      let localList = [];
      if (localStr) {
        try {
          localList = JSON.parse(localStr);
        } catch (e) {
          localList = [];
        }
      }

      // Filter local bookings already synced in remoteSchedules
      const remoteTicketIds = new Set(
        remoteSchedules.flatMap(item => {
          const ticketList = item.tickets || item.Tickets || item.workshopTickets || item.WorkshopTickets || [];
          return ticketList.map(t => (t.id || t.Id));
        })
      );

      const filteredLocal = localList.filter(localItem => {
        const localTicketId = localItem.tickets?.[0]?.id;
        return localTicketId && !remoteTicketIds.has(localTicketId);
      });

      // Combine lists to construct notifications
      const combined = [...filteredLocal, ...remoteSchedules];

      const list = combined.map(item => {
        const ticketList = item.tickets || item.Tickets || item.workshopTickets || item.WorkshopTickets || [];
        const firstTicket = ticketList[0];
        const timeRange = firstTicket ? `${formatTimeOnly(firstTicket.startTime || firstTicket.StartTime)} - ${formatTimeOnly(firstTicket.endTime || firstTicket.EndTime)}` : "";
        const confirmedAt = item.confirmedAt || item.bookedOn || item.BookedOn || item.createdOn || item.CreatedOn || new Date(item.startOn || item.StartOn).toISOString();

        return {
          id: item.id || item.Id,
          title: "Đặt chỗ thành công! 🎉",
          message: `Bạn đã đăng ký thành công workshop "${item.workshopTitle || item.WorkshopTitle || "Workshop"}" ngày ${formatDate(item.startOn || item.StartOn)} (${timeRange}).`,
          time: confirmedAt,
          workshopId: item.workshopId || item.WorkshopId || item.id
        };
      });

      // Sort newest first
      list.sort((a, b) => new Date(b.time) - new Date(a.time));
      setNotifications(list);

      // Check unread count based on last read time in localStorage
      const lastRead = localStorage.getItem(`notifications_last_read_${currentUser.id}`);
      if (!lastRead) {
        setUnreadCount(list.length);
      } else {
        const count = list.filter(n => new Date(n.time) > new Date(lastRead)).length;
        setUnreadCount(count);
      }
    }

    loadNotifications();
    
    // Check again every 15 seconds to sync dynamically
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, [authToken, currentUser]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && currentUser) {
      // Mark as read
      localStorage.setItem(`notifications_last_read_${currentUser.id}`, new Date().toISOString());
      setUnreadCount(0);
    }
  };

  const handleNotificationClick = (n) => {
    setIsOpen(false);
    if (currentUser?.role?.toLowerCase() === "host") {
      navigate("/host/schedule");
    } else {
      navigate("/my-schedule");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} className="relative flex items-center justify-center p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none">
        <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors text-2xl">
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#151822] animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-[#151822] border border-[#fbc4ae]/40 dark:border-slate-800 rounded-2xl shadow-xl z-[999] overflow-hidden flex flex-col max-h-[480px]">
          <div className="px-5 py-4 border-b border-[#fbc4ae]/20 dark:border-slate-800/60 bg-[#fffaf5] dark:bg-slate-900/40 flex justify-between items-center shrink-0">
            <span className="font-extrabold text-sm text-[#c3996c] uppercase tracking-wider">Thông báo của bạn</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#f08a78]/25 text-[#f08a78] rounded-full">
                {unreadCount} mới
              </span>
            )}
          </div>

          <div className="overflow-y-auto flex-1 py-1">
            {notifications.length === 0 ? (
              <div className="py-12 px-6 text-center flex flex-col items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">notifications_off</span>
                <p className="text-sm font-semibold">Chưa có thông báo nào</p>
                <p className="text-xs text-slate-400 mt-1">Thông tin đặt lịch sẽ hiển thị tại đây.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className="px-5 py-4 border-b border-slate-100 dark:border-slate-800/40 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors flex gap-3.5 items-start text-left"
                >
                  <div className="p-2 rounded-xl bg-[#fbc4ae]/20 text-[#f08a78] shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg block">event_available</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{n.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{n.message}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block mt-1.5">
                      {formatRelativeTime(n.time)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-[#fbc4ae]/20 dark:border-slate-800/60 p-3 bg-slate-50 dark:bg-slate-900/20 text-center shrink-0">
            <button
              onClick={() => {
                setIsOpen(false);
                if (currentUser?.role?.toLowerCase() === "host") {
                  navigate("/host/schedule");
                } else {
                  navigate("/my-schedule");
                }
              }}
              className="text-xs font-black text-[#c3996c] hover:text-[#f08a78] transition-colors"
            >
              {currentUser?.role?.toLowerCase() === "host" ? "Xem quản lý lịch trình" : "Xem tất cả lịch đặt chỗ"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
