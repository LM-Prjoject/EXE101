import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getWorkshopById, getScheduleDetails } from "../../api/workshop";
import { proceedPayment, directBookTicket } from "../../api/payment";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../../components/NotificationBell";

function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

function formatDate(date) {
  if (!date) return "Đang cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatTimeOnly(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
  return timeStr;
}

export default function PaymentAndConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile } = useAuth();
  
  const { ticketId, scheduleId, workshopId } = location.state || {};

  const [workshop, setWorkshop] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const BRAND = {
    primary: "#c3996c", // warm gold
    accent: "#f08a78", // salmon (main)
    soft: "#fbc4ae", // peach
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
  };

  useEffect(() => {
    if (!ticketId || !scheduleId || !workshopId) {
      setError("Không tìm thấy thông tin đặt vé. Vui lòng quay lại trang chi tiết workshop.");
      setLoading(false);
      return;
    }

    let ignore = false;
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const [wsData, schedData, payData] = await Promise.all([
          getWorkshopById(workshopId),
          getScheduleDetails(scheduleId),
          proceedPayment(ticketId)
        ]);

        if (!ignore) {
          setWorkshop(wsData);
          setSchedule(schedData);
          setPaymentInfo(payData);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải thông tin thanh toán.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadData();
    return () => {
      ignore = true;
    };
  }, [ticketId, scheduleId, workshopId]);

  const selectedTicket = useMemo(() => {
    if (!schedule || !ticketId) return null;
    const ticketList = schedule.tickets || [];
    return ticketList.find(t => t.id === ticketId) || null;
  }, [schedule, ticketId]);

  const pricing = useMemo(() => {
    if (!selectedTicket || !paymentInfo) return { subtotal: 0, serviceFee: 0, total: 0 };
    const subtotal = selectedTicket.price;
    const total = Number(paymentInfo.order_amount || paymentInfo.OrderAmount || 0);
    const serviceFee = Math.max(0, total - subtotal);
    return { subtotal, serviceFee, total };
  }, [selectedTicket, paymentInfo]);

  const handleCheckoutSubmit = async () => {
    setPaymentLoading(true);
    setPaymentError("");

    try {
      // Call backend direct book endpoint to persist booking and trigger real email sending
      await directBookTicket(ticketId);

      const confirmedAt = new Date().toISOString();
      const localBooking = {
        id: `local-${ticketId}-${Date.now()}`,
        workshopId: Number(workshopId),
        workshopTitle: workshop?.title || workshop?.Title || "Workshop",
        workshopThumbnailLink: workshop?.thumbnailLink || "/img/onlyLogo.png",
        workshopLocation: workshop?.location || workshop?.Location || "Đang cập nhật",
        startOn: schedule?.startOn || schedule?.StartOn,
        confirmedAt,
        tickets: [
          {
            id: ticketId,
            ticketType: selectedTicket?.ticketType || selectedTicket?.TicketType || "Đã đặt",
            startTime: selectedTicket?.startTime || selectedTicket?.StartTime,
            endTime: selectedTicket?.endTime || selectedTicket?.EndTime,
            price: selectedTicket?.price,
          }
        ]
      };

      const existing = localStorage.getItem("localBookings");
      let list = [];
      if (existing) {
        try {
          list = JSON.parse(existing);
        } catch (e) {
          list = [];
        }
      }
      list.push(localBooking);
      localStorage.setItem("localBookings", JSON.stringify(list));

      setPaymentLoading(false);
      navigate("/confirm-success", {
        state: {
          workshop,
          schedule,
          selectedTicket,
          pricing,
          confirmedAt,
          email: userProfile?.email || userProfile?.Email || currentUser?.email || currentUser?.Email || ""
        }
      });
    } catch (err) {
      console.error("Booking failed:", err);
      setPaymentError("Lỗi đăng ký đặt vé. Chi tiết: " + (err.message || "Không thể kết nối đến máy chủ."));
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display" style={{ background: BRAND.lightBg }}>
        <div className="rounded-2xl border bg-white px-6 py-5 text-sm font-semibold" style={{ borderColor: `${BRAND.soft}99`, color: "#475569" }}>
          Đang tải thông tin đặt vé và chuẩn bị cổng thanh toán...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display px-4" style={{ background: BRAND.lightBg }}>
        <div className="max-w-md rounded-2xl border bg-white p-6 text-center" style={{ borderColor: `${BRAND.soft}99` }}>
          <p className="mb-4 text-sm font-semibold" style={{ color: "#b91c1c" }}>{error}</p>
          <button className="rounded-xl px-5 py-2 text-sm font-black text-white" style={{ background: BRAND.accent }} onClick={() => navigate("/home")}>
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const thumbnail = workshop?.thumbnailLink || "/img/onlyLogo.png";

  return (
    <>
      <div
        className="font-display min-h-screen flex flex-col text-slate-900 dark:text-slate-100"
        style={{ background: BRAND.lightBg }}
      >
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50 w-full">
          <div className="flex items-center gap-8">
            <Link to="/home" className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center overflow-visible">
                <img
                  src="/img/onlyLogo.png"
                  alt="Hands & Hour Logo"
                  className="h-8 w-8 object-contain scale-150 origin-center"
                />
              </div>
              <h2 className="text-xl font-black tracking-tight">
                <span className="text-[#c3996c]">Hands</span>{" "}
                <span className="text-[#f08a78]">&amp;</span>{" "}
                <span className="text-[#c3996c]">Hour</span>
              </h2>
            </Link>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = e.target.search.value;
                navigate(`/advanced-search?q=${encodeURIComponent(q)}`);
              }}
              className="hidden md:flex flex-col min-w-40 !h-10 max-w-64"
            >
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                  <span className="material-symbols-outlined text-xl">
                    search
                  </span>
                </div>
                <input
                  name="search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                  placeholder="Tìm kiếm workshop..."
                  type="text"
                />
              </div>
            </form>
          </div>

          <div className="flex flex-1 justify-end gap-8 items-center">
            <div className="hidden lg:flex items-center gap-9">
              <Link
                className="text-[#c3996c] hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                to="/home"
              >
                Workshops
              </Link>
              <Link
                className="text-[#c3996c] hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                to="/advanced-search"
              >
                Khám phá
              </Link>
            </div>

            {currentUser && (
              <button
                onClick={() => {
                  if (currentUser?.role === "host") {
                    navigate("/host/dashboard");
                  } else {
                    navigate("/host/verification");
                  }
                }}
                className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"
              >
                <span className="truncate">
                  {currentUser?.role === "host"
                    ? "Chế độ Host"
                    : "Trở thành Host"}
                </span>
              </button>
            )}

            <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 pl-6">
              <NotificationBell />

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-sm font-semibold text-[#c3996c]">
                    Xin chào,{" "}
                    <span className="font-black">
                      {userProfile?.name ||
                        currentUser?.name ||
                        currentUser?.email?.split("@")[0] ||
                        "Khách"}
                    </span>
                  </span>
                  <Link to="/user-profile">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        backgroundImage: `url("${userProfile?.avatarLink || userProfile?.avatar || userProfile?.avatarUrl || currentUser?.avatarLink || currentUser?.avatar || currentUser?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE"}")`,
                      }}
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    className="text-sm font-semibold text-[#c3996c] hover:text-[#f08a78] transition-colors hidden sm:block"
                    to="/login"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#f08a78] hover:bg-[#ee7a66] text-white font-extrabold py-2 px-5 rounded-xl transition-colors shadow-sm shadow-[#f08a78]/25 text-sm"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                  Thanh toán an toàn
                </h1>
                <p className="text-slate-500">
                  Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo.
                </p>
              </div>

              {/* Booking Summary Card */}
              <section
                className="rounded-2xl p-6 shadow-sm border"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: BRAND.accent }}
                  >
                    shopping_bag
                  </span>
                  <h2 className="text-xl font-extrabold">Tóm tắt đơn hàng</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group border"
                    style={{ borderColor: `${BRAND.soft}99` }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${thumbnail}')`,
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-extrabold line-clamp-1">
                          {workshop?.title}
                        </h3>
                        <span
                          className="font-black text-lg"
                          style={{ color: BRAND.primary }}
                        >
                          {formatCurrency(selectedTicket?.price)}
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                        {workshop?.description}
                      </p>

                      <div className="space-y-2">
                        {[
                          {
                            icon: "calendar_month",
                            text: formatDate(schedule?.startOn),
                          },
                          { 
                            icon: "schedule", 
                            text: `${formatTimeOnly(selectedTicket?.startTime)} - ${formatTimeOnly(selectedTicket?.endTime)}` 
                          },
                          { 
                            icon: "person", 
                            text: `1 Người (Tài khoản: ${userProfile?.name || currentUser?.name || currentUser?.email?.split('@')[0] || "Khách"})` 
                          },
                          {
                            icon: "location_on",
                            text: workshop?.location,
                          },
                        ].map((x, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-slate-600 text-sm"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {x.icon}
                            </span>
                            <span className="truncate">{x.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-6 pt-4 border-t border-dashed"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  <div className="flex justify-between items-center text-slate-600 text-sm mb-2">
                    <span>Giá vé ({selectedTicket?.ticketType})</span>
                    <span>{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-sm mb-2">
                    <span>Phí dịch vụ</span>
                    <span>{formatCurrency(pricing.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between items-center font-black text-lg mt-4">
                    <span>Tổng thanh toán</span>
                    <span style={{ color: BRAND.accent }}>{formatCurrency(pricing.total)}</span>
                  </div>
                </div>
              </section>

              {/* Cancellation Policy Preview */}
              <div
                className="rounded-2xl p-4 flex gap-3 items-start border"
                style={{
                  background: `${BRAND.soft}22`,
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <span
                  className="material-symbols-outlined mt-0.5"
                  style={{ color: BRAND.primary }}
                >
                  verified_user
                </span>
                <div>
                  <h4 className="font-extrabold text-sm">Hủy miễn phí</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Hủy tối đa 24 giờ trước khi workshop bắt đầu để được hoàn
                    tiền đầy đủ.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <section
                className="rounded-2xl p-6 shadow-sm border h-full flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: BRAND.accent }}
                    >
                      payments
                    </span>
                    <h2 className="text-xl font-extrabold">
                      Phương thức thanh toán
                    </h2>
                  </div>

                  {/* Payment Tabs */}
                  {/* Direct Booking Details */}
                  <div className="flex flex-col items-center py-6 text-center border rounded-2xl p-4 bg-white/50 mb-6" style={{ borderColor: `${BRAND.soft}44` }}>
                    <span
                      className="material-symbols-outlined text-5xl mb-4 animate-pulse"
                      style={{ color: BRAND.accent }}
                    >
                      assignment_turned_in
                    </span>
                    <h3 className="font-black text-base text-slate-800 mb-2">Xác nhận đặt vé</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                      Bạn sẽ được đăng ký tham gia workshop trực tiếp. Thông tin vé và lịch trình sẽ được gửi về email của bạn ngay lập tức.
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  {paymentError && (
                    <div
                      className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-fade-in"
                    >
                      <span className="material-symbols-outlined text-base shrink-0">error</span>
                      <span>{paymentError}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <input
                      className="rounded mt-1 cursor-pointer"
                      id="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ accentColor: BRAND.accent }}
                    />
                    <label className="text-[11px] text-slate-500 cursor-pointer font-semibold" htmlFor="terms">
                      Tôi đồng ý với các điều khoản dịch vụ và chính sách hoàn trả của Hands &amp; Hour.
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={paymentLoading || !paymentInfo || !termsAccepted}
                    onClick={handleCheckoutSubmit}
                    className="w-full font-black text-base py-3.5 rounded-xl transition-all transform active:translate-y-0 flex items-center justify-center gap-2"
                    style={{
                      background: BRAND.accent,
                      color: "white",
                      boxShadow: "0 14px 30px rgba(240,138,120,0.22)",
                      opacity: (paymentLoading || !paymentInfo || !termsAccepted) ? 0.6 : 1,
                      cursor: (paymentLoading || !paymentInfo || !termsAccepted) ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!paymentLoading && paymentInfo && termsAccepted) {
                        e.currentTarget.style.filter = "brightness(0.96)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    {paymentLoading ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                        Đang ghi nhận đặt vé...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Xác nhận đặt vé
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full text-center text-xs font-bold transition-colors py-2"
                    style={{ color: "#64748b" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                  >
                    Quay lại chỉnh sửa đặt vé
                  </button>

                  <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">
                      verified
                    </span>{" "}
                    Thông tin đặt chỗ của bạn được bảo mật
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="mt-auto py-8 border-t"
          style={{
            borderColor: `${BRAND.soft}99`,
            background: "rgba(254,254,253,0.85)",
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm">
              © 2025 Hands &amp; Hour. Bảo lưu mọi quyền.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}