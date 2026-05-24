import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUpcomingSchedules } from "../../api/workshop";

function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

function formatDate(dateStr) {
  if (!dateStr) return "Đang cập nhật";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function formatTimeOnly(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
  return timeStr;
}

export default function MySchedule() {
  const navigate = useNavigate();
  const { currentUser, userProfile, authToken } = useAuth();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE";

  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    let ignore = false;
    async function loadSchedules() {
      setLoading(true);
      setError("");
      try {
        const response = await getUpcomingSchedules(authToken, 1, 50);
        if (!ignore) {
          setSchedules(response?.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải danh sách lịch trình.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadSchedules();
    return () => {
      ignore = true;
    };
  }, [authToken]);

  // Calendar Helpers
  const monthName = useMemo(() => {
    return `Tháng ${currentMonth + 1} năm ${currentYear}`;
  }, [currentMonth, currentYear]);

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayIndex = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDateStr(null);
  };

  // Filtered schedules display
  const displayedSchedules = useMemo(() => {
    if (!selectedDateStr) return schedules;
    return schedules.filter((s) => s.startOn === selectedDateStr);
  }, [schedules, selectedDateStr]);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return "";
    try {
      const parts = selectedDateStr.split("-");
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    } catch {
      return selectedDateStr;
    }
  }, [selectedDateStr]);

  return (
    <>
      <div className="bg-[#F6F2E9] dark:bg-[#0f1115] font-display text-[#c3996c] dark:text-slate-100">
        <div
          className="relative flex min-h-screen w-full flex-col"
          style={{
            paddingBottom:
              "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
          }}
        >
          {/* Top Navigation */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center overflow-visible">
                  <img src="/img/onlyLogo.png" alt="Hands & Hour Logo" className="h-8 w-8 object-contain scale-150 origin-center" />
                </div>
                <h2 className="text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                    placeholder="Tìm kiếm workshop..."
                    readOnly
                    onClick={() => navigate("/advanced-search")}
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-1 justify-end gap-8 items-center">
              <div className="hidden lg:flex items-center gap-9">
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/home">Workshops</Link>
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/advanced-search">Khám phá</Link>
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/community">Cộng đồng</Link>
              </div>

              {currentUser?.role !== "host" && (
                <button onClick={() => navigate("/host/verification")} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25">
                  <span className="truncate">Trở thành Host</span>
                </button>
              )}

              <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-6">
                <button className="relative group">
                  <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">notifications</span>
                  <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151822]"></span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-sm font-semibold text-[#c3996c]">
                    Xin chào, <span className="font-black">{userProfile?.name || currentUser?.name || currentUser?.email?.split("@")[0] || "Khách"}</span>
                  </span>
                  <Link to="/user-profile">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url("${userProfile?.avatarLink || userProfile?.avatar || userProfile?.avatarUrl || DEFAULT_AVATAR}")` }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-10 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-[#2B2B2B] dark:text-white tracking-tight">
                Lịch của tôi
              </h1>
              <p className="text-[#c3996c]/70 dark:text-slate-400 mt-2">
                Quản lý hành trình sáng tạo và các buổi học sắp tới của bạn
              </p>
            </div>

            {/* Content Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Full-month Calendar */}
              <div className="lg:col-span-5 bg-white dark:bg-[#151822] rounded-2xl p-8 shadow-sm border border-[#fbc4ae]/40 dark:border-slate-800 self-start">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-[#c3996c] dark:text-white">
                    {monthName}
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 text-center">
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">CN</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T2</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T3</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T4</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T5</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T6</span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">T7</span>

                  {/* Empty start slots */}
                  {Array.from({ length: firstDayIndex }).map((_, idx) => (
                    <div key={`empty-${idx}`}></div>
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isSelected = selectedDateStr === dateStr;
                    
                    const daysSchedules = schedules.filter((s) => s.startOn === dateStr);
                    const hasSchedules = daysSchedules.length > 0;
                    
                    const hasFuture = daysSchedules.some(item => {
                      const ticketList = item.tickets || [];
                      if (ticketList.length === 0) {
                        return new Date(`${item.startOn}T23:59:59`) >= new Date();
                      }
                      return ticketList.some(t => {
                        const slotTime = new Date(`${item.startOn}T${t.startTime}`);
                        return slotTime >= new Date();
                      });
                    });

                    const today = new Date();
                    const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

                    let bgClass = "";
                    if (isToday) {
                      bgClass = "bg-[#f08a78]/10 text-[#f08a78] font-bold";
                    }
                    if (hasSchedules) {
                      if (hasFuture) {
                        bgClass = "bg-[#f08a78]/20 text-[#f08a78] font-bold";
                      } else {
                        bgClass = "bg-[#c3996c]/15 text-[#c3996c] font-bold";
                      }
                    }

                    const handleDayClick = () => {
                      if (selectedDateStr === dateStr) {
                        setSelectedDateStr(null);
                      } else {
                        setSelectedDateStr(dateStr);
                      }
                    };

                    return (
                      <div
                        key={day}
                        onClick={handleDayClick}
                        className={`py-3 relative rounded-lg cursor-pointer transition-all ${
                          isSelected ? "ring-2 ring-[#f08a78] ring-offset-2 dark:ring-offset-[#151822]" : ""
                        } ${bgClass || "hover:bg-[#fbc4ae]/10 text-[#c3996c] dark:text-slate-100"}`}
                        title={hasSchedules ? daysSchedules.map(s => s.workshopTitle).join(", ") : undefined}
                      >
                        <span>{day}</span>
                        {hasSchedules && (
                          <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${hasFuture ? "bg-[#f08a78]" : "bg-[#c3996c]/50"}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="mt-8 flex gap-6 pt-6 border-t border-[#fbc4ae]/40 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-[#f08a78] rounded-full"></div>
                    <span className="text-xs text-[#c3996c]/70 font-medium">
                      Hội thảo sắp tới
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-[#c3996c]/35 rounded-full"></div>
                    <span className="text-xs text-[#c3996c]/70 font-medium">
                      Buổi học đã qua
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Upcoming Events List */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2B2B2B] dark:text-white">
                    {selectedDateStr ? `Hội thảo ngày ${formattedSelectedDate}` : "Sự kiện sắp tới"}
                  </h2>
                  {selectedDateStr && (
                    <button 
                      onClick={() => setSelectedDateStr(null)} 
                      className="text-[#f08a78] text-sm font-bold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                      Xem tất cả
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="bg-white dark:bg-[#151822] rounded-2xl border border-[#fbc4ae]/40 dark:border-slate-800 p-8 text-center shadow-sm">
                    <span className="material-symbols-outlined text-[#f08a78] text-4xl mb-3 animate-spin">
                      progress_activity
                    </span>
                    <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg">
                      Đang tải danh sách lịch trình...
                    </h4>
                  </div>
                ) : error ? (
                  <div className="bg-white dark:bg-[#151822] rounded-2xl border border-[#fbc4ae]/40 dark:border-slate-800 p-8 text-center shadow-sm">
                    <span className="material-symbols-outlined text-rose-500 text-4xl mb-3">
                      error
                    </span>
                    <h4 className="text-rose-600 font-bold text-lg">
                      Lỗi tải lịch trình
                    </h4>
                    <p className="text-slate-500 text-sm mt-2">{error}</p>
                  </div>
                ) : displayedSchedules.length === 0 ? (
                  <div className="bg-white dark:bg-[#151822] rounded-2xl border border-[#fbc4ae]/40 dark:border-slate-800 p-8 text-center shadow-sm">
                    <span className="material-symbols-outlined text-[#f08a78] text-4xl mb-3">
                      event_busy
                    </span>
                    <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg">
                      {selectedDateStr ? `Không có lịch ngày ${formattedSelectedDate}` : "Chưa có workshop sắp tới"}
                    </h4>
                    <p className="text-[#c3996c]/70 dark:text-slate-400 text-sm mt-2">
                      {selectedDateStr 
                        ? "Không có buổi học nào được lên lịch vào ngày này."
                        : "Bạn chưa đăng ký workshop nào sắp tới. Hãy khám phá và đăng ký ngay nhé!"}
                    </p>
                    {!selectedDateStr && (
                      <button 
                        onClick={() => navigate("/advanced-search")} 
                        className="mt-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-[#f08a78]/25 transition-all"
                      >
                        Khám phá workshop
                      </button>
                    )}
                  </div>
                ) : (
                  displayedSchedules.map((item) => {
                    const ticketList = item.tickets || [];
                    const firstTicket = ticketList[0];
                    const priceText = firstTicket ? formatCurrency(firstTicket.price) : "Liên hệ";
                    const ticketTypeLabel = firstTicket ? firstTicket.ticketType : "Đã đặt";
                    const timeRange = firstTicket ? `${formatTimeOnly(firstTicket.startTime)} - ${formatTimeOnly(firstTicket.endTime)}` : "";
                    const img = item.workshopThumbnailLink || "/img/onlyLogo.png";

                    return (
                      <div
                        key={item.id}
                        className="group bg-white dark:bg-[#151822] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#fbc4ae]/40 dark:border-slate-800 flex flex-col md:flex-row"
                      >
                        <div className="md:w-48 h-48 md:h-auto overflow-hidden shrink-0">
                          <div
                            className="w-full h-48 md:h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url("${img}")` }}
                          />
                        </div>

                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="px-2 py-1 bg-[#f08a78]/20 text-[#f08a78] text-[10px] font-bold uppercase tracking-wider rounded">
                                Vé {ticketTypeLabel}
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">
                              {item.workshopTitle}
                            </h4>

                            <p className="text-sm text-[#c3996c]/70 dark:text-slate-400 mb-4 flex items-center gap-1">
                              <span className="material-symbols-outlined text-base">
                                location_on
                              </span>
                              Địa điểm: {item.workshopLocation}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-[#fbc4ae]/20">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#c3996c]/55 uppercase">
                                Ngày &amp; Giờ
                              </span>
                              <span className="text-sm font-semibold text-[#c3996c] dark:text-slate-100">
                                {formatDate(item.startOn)} {timeRange && `• ${timeRange}`}
                              </span>
                            </div>

                            <Link 
                              to={`/find-companion/${item.workshopId || item.id}`}
                              className="bg-[#f08a78] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#ee7a66] transition-colors shadow-sm shadow-[#f08a78]/25"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </main>

          {/* Bottom Nav Mobile */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FDFCFA] dark:bg-[#151822] border-t border-[#fbc4ae]/60 dark:border-slate-800 flex justify-around py-3">
            <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">home</span>
              <span className="text-[10px]">Trang chủ</span>
            </button>

            <button onClick={() => navigate("/my-schedule")} className="flex flex-col items-center gap-1 text-[#f08a78]">
              <span className="material-symbols-outlined">calendar_today</span>
              <span className="text-[10px]">Lịch trình</span>
            </button>

            <button onClick={() => navigate("/advanced-search")} className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">explore</span>
              <span className="text-[10px]">Khám phá</span>
            </button>

            <button onClick={() => navigate("/user-profile")} className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">person</span>
              <span className="text-[10px]">Cá nhân</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}