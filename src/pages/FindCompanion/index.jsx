import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { getWorkshopById, getWorkshopReviews, getScheduleDetails } from "../../api/workshop";
import { proceedPayment } from "../../api/payment";
import { useAuth } from "../../context/AuthContext";

function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} tuần trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  return `${Math.floor(months / 12)} năm trước`;
}

function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

function formatDuration(minutes) {
  if (!minutes) return "Đang cập nhật";
  if (minutes < 60) return `${minutes} phút`;
  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} giờ`;
}

function formatDate(date) {
  if (!date) return "Đang cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatLanguage(language) {
  if (!language) return "Đang cập nhật";
  const normalized = language.toLowerCase();
  if (normalized === "en") return "Tiếng Anh";
  if (normalized === "vi") return "Tiếng Việt";
  return language;
}

function formatTimeOnly(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
  return timeStr;
}

function isPastSchedule(startOnStr) {
  if (!startOnStr) return false;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return startOnStr < todayStr;
}

function isPastSlot(dateStr, timeStr) {
  if (!dateStr) return false;
  if (!timeStr) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dateStr < todayStr;
  }
  let formattedTime = timeStr;
  if (formattedTime.split(':').length === 2) {
    formattedTime += ':00';
  }
  try {
    const slotDate = new Date(`${dateStr}T${formattedTime}`);
    const now = new Date();
    return slotDate < now;
  } catch (e) {
    console.error("Error parsing slot date:", e);
    return false;
  }
}


export default function FindCompanion() {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const location = useLocation();
  const [workshop, setWorkshop] = useState(location.state?.workshop || null);
  const [loading, setLoading] = useState(Boolean(workshopId));
  const [error, setError] = useState("");

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsLoadingMore, setReviewsLoadingMore] = useState(false);
  const PAGE_SIZE = 5;

  // Auth and Payment states
  const { currentUser } = useAuth();
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const BRAND = {
    primary: "#c3996c", // warm gold (text/brand)
    accent: "#f08a78", // salmon (main CTA)
    soft: "#fbc4ae", // peach (support)
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
    darkCard: "#0f141b",
    darkBorder: "rgba(251,196,174,0.18)",
  };

  // Helpers
  const cardStyle = {
    background: "rgba(255,255,255,0.82)",
    borderColor: `${BRAND.soft}99`,
  };

  const darkCardStyle = {
    background: "rgba(15,20,27,0.86)",
    borderColor: BRAND.darkBorder,
  };

  useEffect(() => {
    if (!workshopId) {
      setLoading(false);
      setError("Không tìm thấy workshop. Vui lòng chọn workshop từ trang chủ.");
      return;
    }

    let ignore = false;
    async function loadWorkshop() {
      setLoading(true);
      setError("");

      try {
        const data = await getWorkshopById(workshopId);
        if (!ignore) setWorkshop(data);
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải thông tin workshop.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadWorkshop();
    return () => {
      ignore = true;
    };
  }, [workshopId]);

  // Load reviews when workshopId changes
  useEffect(() => {
    if (!workshopId) return;
    let ignore = false;
    async function loadReviews() {
      setReviewsLoading(true);
      try {
        const data = await getWorkshopReviews(workshopId, 1, PAGE_SIZE);
        if (!ignore) {
          const items = Array.isArray(data) ? data : (data?.items ?? data?.reviews ?? data?.data ?? []);
          const total = Array.isArray(data) ? items.length : (data?.totalCount ?? data?.total ?? items.length);
          setReviews(items);
          setReviewsTotal(total);
          setReviewsPage(1);
        }
      } catch {
        // silently fail
      } finally {
        if (!ignore) setReviewsLoading(false);
      }
    }
    loadReviews();
    return () => { ignore = true; };
  }, [workshopId]);

  async function loadMoreReviews() {
    const nextPage = reviewsPage + 1;
    setReviewsLoadingMore(true);
    try {
      const data = await getWorkshopReviews(workshopId, nextPage, PAGE_SIZE);
      const items = Array.isArray(data) ? data : (data?.items ?? data?.reviews ?? data?.data ?? []);
      const total = Array.isArray(data) ? items.length + reviews.length : (data?.totalCount ?? data?.total ?? reviewsTotal);
      setReviews((prev) => [...prev, ...items]);
      setReviewsTotal(total);
      setReviewsPage(nextPage);
    } catch {
      // silently fail
    } finally {
      setReviewsLoadingMore(false);
    }
  }

  // Set initial selected schedule (prefer the first future/upcoming schedule)
  useEffect(() => {
    if (workshop?.schedules?.length > 0) {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const firstFuture = workshop.schedules.find(s => s.startOn >= todayStr);
      if (firstFuture) {
        setSelectedScheduleId(firstFuture.id);
      } else {
        setSelectedScheduleId(workshop.schedules[0].id);
      }
    }
  }, [workshop]);

  // Fetch tickets for selected schedule
  useEffect(() => {
    if (!selectedScheduleId) return;
    let ignore = false;
    async function fetchTickets() {
      setTicketsLoading(true);
      try {
        const data = await getScheduleDetails(selectedScheduleId);
        if (!ignore) {
          const ticketList = data?.tickets ?? [];
          setTickets(ticketList);
          
          const scheduleObj = workshop?.schedules?.find(s => s.id.toString() === selectedScheduleId.toString());
          const firstAvailableTicket = ticketList.find(t => {
            const isTicketPast = scheduleObj ? isPastSlot(scheduleObj.startOn, t.startTime) : false;
            const isSoldOut = t.remainingTickets <= 0;
            return !isTicketPast && !isSoldOut;
          });
          
          if (firstAvailableTicket) {
            setSelectedTicketId(firstAvailableTicket.id);
          } else if (ticketList.length > 0) {
            setSelectedTicketId(ticketList[0].id);
          } else {
            setSelectedTicketId("");
          }
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        if (!ignore) setTicketsLoading(false);
      }
    }
    fetchTickets();
    return () => { ignore = true; };
  }, [selectedScheduleId, workshop]);

  const handleProceedPayment = () => {
    if (!currentUser) {
      setPaymentError("Vui lòng đăng nhập để tiến hành đặt vé.");
      navigate("/login");
      return;
    }

    if (!selectedTicketId) {
      setPaymentError("Vui lòng chọn loại vé.");
      return;
    }

    navigate("/payment", {
      state: {
        ticketId: selectedTicketId,
        scheduleId: selectedScheduleId,
        workshopId: Number(workshopId)
      }
    });
  };

  const detail = useMemo(() => {
    const firstSchedule = workshop?.schedules?.[0] || {};
    const priceLower = workshop?.priceLower ?? firstSchedule.priceLower ?? workshop?.price;
    const priceUpper = workshop?.priceUpper ?? firstSchedule.priceUpper ?? priceLower;
    const thumbnail = workshop?.thumbnailLink || "/img/onlyLogo.png";

    return {
      title: workshop?.title || "Workshop",
      thumbnail,
      galleryImages: [thumbnail],
      description: workshop?.description || "Thông tin workshop đang được cập nhật.",
      language: formatLanguage(workshop?.language),
      location: workshop?.location || "Đang cập nhật",
      category: workshop?.category || "Workshop",
      instructorName: workshop?.instructorName || "Người hướng dẫn",
      duration: formatDuration(workshop?.duration),
      level: workshop?.level || "Đang cập nhật",
      rating: workshop?.rating ?? 0,
      reviewCount: workshop?.reviewCount ?? 0,
      priceText:
        priceLower != null && priceUpper != null && Number(priceLower) !== Number(priceUpper)
          ? `${formatCurrency(priceLower)} - ${formatCurrency(priceUpper)}`
          : formatCurrency(priceLower),
      schedules: workshop?.schedules || [],
      remainingTickets: firstSchedule.remainingTickets,
    };
  }, [workshop]);

  const activeSchedule = useMemo(() => {
    return workshop?.schedules?.find(s => s.id.toString() === selectedScheduleId.toString());
  }, [workshop, selectedScheduleId]);

  const isPast = useMemo(() => {
    return activeSchedule ? isPastSchedule(activeSchedule.startOn) : false;
  }, [activeSchedule]);

  const activeTicket = useMemo(() => {
    return tickets.find(t => t.id === selectedTicketId);
  }, [tickets, selectedTicketId]);

  const isActiveTicketPast = useMemo(() => {
    return activeSchedule && activeTicket ? isPastSlot(activeSchedule.startOn, activeTicket.startTime) : isPast;
  }, [activeSchedule, activeTicket, isPast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display" style={{ background: BRAND.lightBg }}>
        <div className="rounded-2xl border bg-white px-6 py-5 text-sm font-semibold" style={{ borderColor: `${BRAND.soft}99`, color: "#475569" }}>
          Đang tải thông tin workshop...
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

  return (
    <>
      <div
        className="font-display antialiased min-h-screen flex flex-col"
        style={{ background: BRAND.lightBg, color: "#0f172a" }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
          style={{
            background: "rgba(254,254,253,0.82)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
            {/* Logo */}
            <Link className="flex items-center gap-3 group" to="/home">
              {/* Bigger logo but not increasing header height */}
              <div className="relative w-10 h-10 shrink-0 overflow-visible">
                <img
                  src="/img/onlyLogo.png"
                  alt="Hands & Hour logo"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 object-contain"
                />
              </div>

              <h1 className="text-xl font-black tracking-tight">
                Hands &amp; Hour
              </h1>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full group">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: `${BRAND.soft}18`,
                    border: `1px solid ${BRAND.soft}99`,
                    color: "#0f172a",
                  }}
                  placeholder="Tìm kiếm workshop tại Đà Nẵng..."
                  type="text"
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`;
                    e.currentTarget.style.borderColor = BRAND.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                  }}
                />
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-6">
                {[
                  { to: "/login", label: "Workshops" },
                  { to: "/register", label: "Sự kiện" },
                ].map((it) => (
                  <Link
                    key={it.label}
                    className="text-sm font-semibold transition-colors"
                    to={it.to}
                    style={{ color: "#334155" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#334155")
                    }
                  >
                    {it.label}
                  </Link>
                ))}

                <a
                  className="text-sm font-semibold transition-colors"
                  href="#"
                  style={{ color: "#334155" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = BRAND.accent)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#334155")
                  }
                >
                  Blog
                </a>
              </nav>

              <div
                className="flex items-center gap-3 pl-6 border-l"
                style={{ borderColor: `${BRAND.soft}99` }}
              >
                {currentUser ? (
                  <div className="text-sm font-semibold" style={{ color: "#334155" }}>
                    Xin chào, <span className="font-black" style={{ color: BRAND.primary }}>{currentUser.name || currentUser.email?.split('@')[0]}</span>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="hidden sm:flex h-10 px-4 items-center justify-center rounded-xl text-sm font-black transition-colors"
                      style={{
                        background: `${BRAND.soft}22`,
                        border: `1px solid ${BRAND.soft}99`,
                        color: "#0f172a",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = BRAND.accent;
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(240,138,120,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Đăng nhập
                    </Link>

                    <Link
                      to="/register"
                      className="font-black py-2.5 px-5 rounded-xl transition-colors"
                      style={{
                        background: BRAND.accent,
                        color: "white",
                        boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "brightness(0.96)")
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            {[
              { label: "Trang chủ", href: "#" },
              { label: "Workshops", href: "#" },
            ].map((b) => (
              <a
                key={b.label}
                className="transition-colors"
                href={b.href}
                style={{ color: "#64748b" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = BRAND.accent)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                {b.label}
              </a>
            ))}
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
            <span className="font-semibold" style={{ color: "#0f172a" }}>
              {detail.location}
            </span>
          </nav>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                    color: BRAND.primary,
                  }}
                >
                  {detail.category}
                </span>

                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ color: BRAND.primary }}
                  >
                    star
                  </span>
                  <span
                    className="text-sm font-black"
                    style={{ color: "#0f172a" }}
                  >
                    {Number(detail.rating).toFixed(1)}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#94a3b8" }}
                  >
                    ({detail.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                {detail.title}
              </h1>

              <div
                className="flex items-center gap-2 mt-2"
                style={{ color: "#64748b" }}
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ color: BRAND.primary }}
                >
                  location_on
                </span>
                <span>{detail.location}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="p-2.5 rounded-full border transition-colors"
                style={{
                  borderColor: `${BRAND.soft}99`,
                  color: "#94a3b8",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${BRAND.soft}18`;
                  e.currentTarget.style.color = BRAND.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>

              <button
                className="p-2.5 rounded-full border transition-colors"
                style={{
                  borderColor: `${BRAND.soft}99`,
                  color: "#94a3b8",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${BRAND.soft}18`;
                  e.currentTarget.style.color = BRAND.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] mb-12 rounded-2xl overflow-hidden border"
            style={{ borderColor: `${BRAND.soft}66` }}
          >
            <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${detail.thumbnail}')`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(240,138,120,0.06)" }}
              />
            </div>

            {[0, 1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="md:col-span-1 relative group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${detail.galleryImages[idx] || detail.thumbnail}')` }}
                />
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-black text-lg flex items-center gap-2">
                      <span className="material-symbols-outlined">
                        grid_view
                      </span>{" "}
                      Xem tất cả ảnh
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <section
                className="p-6 sm:p-8 rounded-2xl shadow-sm border"
                style={cardStyle}
              >
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      background: `${BRAND.soft}22`,
                      borderColor: `${BRAND.soft}99`,
                      color: BRAND.primary,
                    }}
                  >
                    <span className="material-symbols-outlined text-xl">
                      info
                    </span>
                  </span>
                  Về buổi Workshop
                </h2>

                <div
                  className="max-w-none leading-relaxed"
                  style={{ color: "#475569" }}
                >
                  <p className="mb-4">{detail.description}</p>
                  <p>
                    Workshop được hướng dẫn bởi {detail.instructorName}. Thông tin lịch học, giá vé và số chỗ còn lại được cập nhật trực tiếp từ hệ thống.
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t"
                  style={{ borderColor: `${BRAND.soft}66` }}
                >
                  {[
                    { label: "Thời lượng", icon: "schedule", value: detail.duration },
                    { label: "Cấp độ", icon: "stairs", value: detail.level },
                    {
                      label: "Ngôn ngữ",
                      icon: "translate",
                      value: detail.language,
                    },
                    {
                      label: "Còn trống",
                      icon: "groups",
                      value: detail.remainingTickets != null ? `${detail.remainingTickets} chỗ` : "Đang cập nhật",
                    },
                  ].map((it) => (
                    <div key={it.label} className="flex flex-col gap-1">
                      <span
                        className="text-xs font-black uppercase tracking-wider"
                        style={{ color: "#94a3b8" }}
                      >
                        {it.label}
                      </span>
                      <span
                        className="font-semibold flex items-center gap-2"
                        style={{ color: "#0f172a" }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ color: BRAND.primary }}
                        >
                          {it.icon}
                        </span>
                        {it.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Location */}
              <section
                className="p-6 sm:p-8 rounded-2xl shadow-sm border"
                style={cardStyle}
              >
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      background: `${BRAND.soft}22`,
                      borderColor: `${BRAND.soft}99`,
                      color: BRAND.primary,
                    }}
                  >
                    <span className="material-symbols-outlined text-xl">
                      location_on
                    </span>
                  </span>
                  Địa điểm
                </h2>

                <p className="mb-4" style={{ color: "#475569" }}>
                  {detail.location}
                </p>

                <div
                  className="w-full h-64 rounded-xl overflow-hidden relative border"
                  style={{ borderColor: `${BRAND.soft}66` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtIWSx14MMPaeWx1lHgEP9j_vka6UJwxYzU1PiS5fBFzq4MxiU4dMUu72wR2DZ72Pfwh_WLOj2wXdl4tk0Bq9i0c1cOjbLAOkYAeltsd5A-JK2kEGC9scx0-ucB0_BG7CJ3gPhB2ne9vb4FS1hsT976fMmsvPNow8tkZXnrvCmtvdL0c_-Sx_S5YUpZhFut6muNCa7DITe2OcxzakoQmNMQf23-B_ecG7tnWYsp37jFCX4uUwGQ8NsNr42OQyKV_tY3mFyrbk3ue4l')",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(240,138,120,0.06)" }}
                  />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <span
                        className="material-symbols-outlined text-5xl drop-shadow-xl animate-bounce"
                        style={{ color: BRAND.accent }}
                      >
                        location_on
                      </span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-full blur-[2px]" />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-4 right-4 p-2 rounded-lg shadow-lg text-xs font-black cursor-pointer transition-colors border"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      borderColor: `${BRAND.soft}66`,
                      color: "#0f172a",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = `${BRAND.soft}66`)
                    }
                  >
                    Mở trong Google Maps
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section
                className="p-6 sm:p-8 rounded-2xl shadow-sm border"
                style={cardStyle}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        background: "rgba(251, 196, 174, 0.133)",
                        borderColor: "rgba(251, 196, 174, 0.6)",
                        color: "rgb(195, 153, 108)",
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">reviews</span>
                    </span>
                    Đánh giá
                  </h2>
                  {reviewsTotal > 0 && (
                    <span className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
                      {reviewsTotal} đánh giá
                    </span>
                  )}
                </div>

                {reviewsLoading ? (
                  <div className="flex items-center justify-center py-10" style={{ color: "#94a3b8" }}>
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    Đang tải đánh giá...
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-10">
                    <span
                      className="material-symbols-outlined text-4xl mb-3 block"
                      style={{ color: `${BRAND.soft}99` }}
                    >
                      rate_review
                    </span>
                    <p className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
                      Chưa có đánh giá nào cho workshop này.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review, idx) => {
                      const rating = review.rating ?? review.star ?? review.stars ?? 0;
                      const fullStars = Math.round(rating);
                      const name =
                        review.userName ??
                        review.reviewerName ??
                        review.name ??
                        review.user?.name ??
                        "Người dùng";
                      const avatar =
                        review.userAvatar ??
                        review.avatar ??
                        review.profilePicture ??
                        review.user?.avatar ??
                        null;
                      const comment =
                        review.comment ??
                        review.content ??
                        review.body ??
                        review.text ??
                        "";
                      const createdAt =
                        review.createdAt ?? review.reviewDate ?? review.date ?? null;

                      return (
                        <div
                          key={review.id ?? idx}
                          className="border-b pb-6 last:border-0 last:pb-0"
                          style={{ borderColor: `${BRAND.soft}66` }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div
                              className="w-10 h-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center overflow-hidden"
                              style={
                                avatar
                                  ? {
                                      backgroundImage: `url('${avatar}')`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }
                                  : { background: `${BRAND.soft}44` }
                              }
                            >
                              {!avatar && (
                                <span
                                  className="material-symbols-outlined text-xl"
                                  style={{ color: BRAND.primary }}
                                >
                                  person
                                </span>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-black" style={{ color: "#0f172a" }}>
                                  {name}
                                </span>
                                {createdAt && (
                                  <span className="text-sm" style={{ color: "#94a3b8" }}>
                                    • {formatRelativeTime(createdAt)}
                                  </span>
                                )}
                              </div>

                              {/* Stars */}
                              <div
                                className="flex items-center text-sm mb-2"
                                style={{ color: BRAND.primary }}
                              >
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className="material-symbols-outlined text-base"
                                    style={i >= fullStars ? { color: `${BRAND.primary}44` } : {}}
                                  >
                                    star
                                  </span>
                                ))}
                                {rating > 0 && (
                                  <span
                                    className="ml-1 font-semibold text-xs"
                                    style={{ color: "#64748b" }}
                                  >
                                    {Number(rating).toFixed(1)}
                                  </span>
                                )}
                              </div>

                              {comment && (
                                <p
                                  className="text-sm leading-relaxed"
                                  style={{ color: "#475569" }}
                                >
                                  {comment}
                                </p>
                              )}

                              {(review.response ?? review.Response) && (
                                <div 
                                  className="mt-3 p-3 rounded-lg border-l-4 text-xs sm:text-sm italic"
                                  style={{
                                    background: `${BRAND.soft}11`,
                                    borderColor: BRAND.primary,
                                    color: "#475569",
                                  }}
                                >
                                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black tracking-wider uppercase" style={{ color: BRAND.primary }}>
                                    <span className="material-symbols-outlined text-sm">reply</span>
                                    Phản hồi từ Host
                                  </div>
                                  <p>{review.response ?? review.Response}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Load more */}
                    {reviews.length < reviewsTotal && (
                      <div className="pt-2 flex justify-center">
                        <button
                          onClick={loadMoreReviews}
                          disabled={reviewsLoadingMore}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black border transition-colors"
                          style={{
                            borderColor: `${BRAND.soft}99`,
                            color: BRAND.primary,
                            background: `${BRAND.soft}11`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${BRAND.soft}30`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${BRAND.soft}11`;
                          }}
                        >
                          {reviewsLoadingMore ? (
                            <>
                              <span className="material-symbols-outlined text-base animate-spin">
                                progress_activity
                              </span>
                              Đang tải...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-base">
                                expand_more
                              </span>
                              Xem thêm đánh giá ({reviewsTotal - reviews.length})
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>

            </div>

            {/* Right Column: Booking Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div
                  className="p-6 rounded-2xl shadow-xl border"
                  style={{
                    background: "rgba(255,255,255,0.86)",
                    borderColor: `${BRAND.soft}99`,
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#64748b" }}
                      >
                        Giá mỗi người
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span
                          className="text-3xl font-black"
                          style={{ color: "#0f172a" }}
                        >
                          {detail.priceText}
                        </span>
                        <span
                          className="text-lg font-semibold"
                          style={{ color: "#64748b" }}
                        >
                          mỗi người
                        </span>
                      </div>
                    </div>

                    <div
                      className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 border"
                      style={{
                        background: `${BRAND.soft}18`,
                        borderColor: `${BRAND.soft}66`,
                        color: BRAND.accent,
                      }}
                    >
                      <span className="material-symbols-outlined text-sm">
                        check_circle
                      </span>{" "}
                      Còn chỗ
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label
                        className="block text-sm font-black mb-2"
                        style={{ color: "#334155" }}
                      >
                        Chọn lịch học
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {detail.schedules.length > 0 ? (
                          detail.schedules.map((schedule) => {
                            const schedulePast = isPastSchedule(schedule.startOn);
                            const isSelected = selectedScheduleId.toString() === schedule.id.toString();
                            return (
                              <button
                                key={schedule.id}
                                disabled={schedulePast}
                                onClick={() => setSelectedScheduleId(schedule.id)}
                                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 relative ${
                                  isSelected ? "ring-2 ring-offset-1" : ""
                                }`}
                                style={{
                                  background: schedulePast
                                    ? "#f1f5f9"
                                    : isSelected
                                    ? `${BRAND.soft}1a`
                                    : "rgba(255,255,255,0.7)",
                                  borderColor: schedulePast
                                    ? "#cbd5e1"
                                    : isSelected
                                    ? BRAND.accent
                                    : `${BRAND.soft}66`,
                                  color: schedulePast ? "#94a3b8" : "#0f172a",
                                  cursor: schedulePast ? "not-allowed" : "pointer",
                                  opacity: schedulePast ? 0.7 : 1,
                                  "--ring-color": BRAND.accent,
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-black text-sm flex items-center gap-1.5">
                                    <span
                                      className="material-symbols-outlined text-base shrink-0"
                                      style={{ color: schedulePast ? "#94a3b8" : BRAND.primary }}
                                    >
                                      calendar_month
                                    </span>
                                    {formatDate(schedule.startOn)}
                                  </span>
                                  {isSelected && !schedulePast && (
                                    <span className="material-symbols-outlined text-base shrink-0" style={{ color: BRAND.accent }}>
                                      check_circle
                                    </span>
                                  )}
                                </div>
                                {schedulePast && (
                                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1">
                                    Đã diễn ra
                                  </div>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <div className="col-span-full text-center py-4 text-sm font-semibold text-slate-400">
                            Đang cập nhật lịch học
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tickets list selector */}
                    <div className="space-y-3">
                      <label
                        className="block text-sm font-black"
                        style={{ color: "#334155" }}
                      >
                        Chọn loại vé
                      </label>

                      {ticketsLoading ? (
                        <div className="flex items-center justify-center py-6 text-sm font-semibold" style={{ color: "#64748b" }}>
                          <span className="material-symbols-outlined animate-spin mr-2 text-lg">progress_activity</span>
                          Đang tải các loại vé...
                        </div>
                      ) : tickets.length === 0 ? (
                        <div className="text-center py-6 text-sm font-semibold rounded-xl border border-dashed p-4" style={{ borderColor: `${BRAND.soft}66`, color: "#94a3b8" }}>
                          <span className="material-symbols-outlined text-2xl mb-1 block" style={{ color: BRAND.primary }}>confirmation_number</span>
                          Không có vé khả dụng cho lịch học này
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {tickets.map((ticket) => {
                            const isSelected = selectedTicketId === ticket.id;
                            const isSoldOut = ticket.remainingTickets <= 0;
                            const isTicketPast = activeSchedule ? isPastSlot(activeSchedule.startOn, ticket.startTime) : false;
                            const isTicketDisabled = isSoldOut || isTicketPast;
                            return (
                              <button
                                key={ticket.id}
                                disabled={isTicketDisabled}
                                onClick={() => setSelectedTicketId(ticket.id)}
                                className={`w-full p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 relative ${
                                  isSelected ? "ring-2 ring-offset-1" : ""
                                }`}
                                style={{
                                  background: isTicketDisabled
                                    ? "#f1f5f9"
                                    : isSelected
                                    ? `${BRAND.soft}1a`
                                    : "rgba(255,255,255,0.7)",
                                  borderColor: isTicketDisabled
                                    ? "#cbd5e1"
                                    : isSelected
                                    ? BRAND.accent
                                    : `${BRAND.soft}66`,
                                  boxShadow: isSelected ? "0 4px 12px rgba(240,138,120,0.08)" : "none",
                                  color: isTicketDisabled ? "#94a3b8" : "#0f172a",
                                  opacity: isTicketDisabled ? 0.7 : 1,
                                  cursor: isTicketDisabled ? "not-allowed" : "pointer",
                                  "--ring-color": BRAND.accent,
                                }}
                              >
                                <div className="flex items-start justify-between w-full">
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-black text-sm flex items-center gap-1.5" style={{ color: isTicketDisabled ? "#94a3b8" : "#0f172a" }}>
                                      {ticket.ticketType}
                                      {isSelected && (
                                        <span className="material-symbols-outlined text-base shrink-0" style={{ color: BRAND.accent }}>
                                          check_circle
                                        </span>
                                      )}
                                    </h5>
                                    <p className="text-xs font-semibold mt-1 flex items-center gap-1" style={{ color: isTicketDisabled ? "#94a3b8" : "#64748b" }}>
                                      <span className="material-symbols-outlined text-sm shrink-0" style={{ color: isTicketDisabled ? "#94a3b8" : BRAND.primary }}>schedule</span>
                                      {formatTimeOnly(ticket.startTime)} - {formatTimeOnly(ticket.endTime)}
                                    </p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className="text-sm font-black" style={{ color: isTicketDisabled ? "#94a3b8" : BRAND.accent }}>
                                      {formatCurrency(ticket.price)}
                                    </div>
                                    <div className="text-[11px] font-semibold mt-1" style={{ color: isTicketDisabled ? "#ef4444" : "#94a3b8" }}>
                                      {isTicketPast ? "Đã diễn ra" : isSoldOut ? "Hết vé" : `Còn ${ticket.remainingTickets} vé`}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Buyer user info */}
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-black"
                        style={{ color: "#334155" }}
                      >
                        Thông tin người tham gia
                      </label>

                      {currentUser ? (
                        <div
                          className="p-4 rounded-xl border flex items-center gap-3"
                          style={{
                            background: `${BRAND.soft}14`,
                            borderColor: `${BRAND.soft}66`,
                          }}
                        >
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${BRAND.soft}44` }}>
                            <span className="material-symbols-outlined" style={{ color: BRAND.primary }}>
                              person
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: BRAND.primary }}>
                              Tài khoản thanh toán
                            </div>
                            <div className="text-sm font-black truncate" style={{ color: "#0f172a" }}>
                              {currentUser?.name || currentUser?.email?.split('@')[0] || "Người dùng"}
                            </div>
                            <div className="text-xs truncate font-semibold" style={{ color: "#64748b" }}>
                              {currentUser?.email || "Chưa cập nhật email"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="p-4 rounded-xl border text-center space-y-3"
                          style={{
                            background: "rgba(239, 68, 68, 0.05)",
                            borderColor: "rgba(239, 68, 68, 0.2)",
                          }}
                        >
                          <span className="material-symbols-outlined text-2xl block" style={{ color: "#ef4444" }}>
                            no_accounts
                          </span>
                          <p className="text-xs font-black" style={{ color: "#ef4444" }}>
                            Bạn chưa đăng nhập. Vui lòng đăng nhập để đặt vé.
                          </p>
                          <Link
                            to="/login"
                            className="inline-flex h-9 px-4 items-center justify-center rounded-lg text-xs font-black transition-colors text-white"
                            style={{
                              background: "#ef4444",
                            }}
                          >
                            Đăng nhập ngay
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Error */}
                  {paymentError && (
                    <div
                      className="flex items-start gap-2 text-xs font-semibold mb-6 p-3 rounded-lg border"
                      style={{
                        color: "#ef4444",
                        background: "rgba(239, 68, 68, 0.05)",
                        borderColor: "rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      <span className="material-symbols-outlined text-base shrink-0">
                        error
                      </span>
                      <span>{paymentError}</span>
                    </div>
                  )}

                  {/* Ticket capacity warning */}
                  {!paymentError && (
                    <div
                      className="flex items-center gap-2 text-sm font-semibold mb-6 p-3 rounded-lg border"
                      style={{
                        color: BRAND.accent,
                        background: `${BRAND.soft}18`,
                        borderColor: `${BRAND.soft}66`,
                      }}
                    >
                      <span className="material-symbols-outlined text-lg shrink-0">
                        local_fire_department
                      </span>
                      <span>
                        Mỗi tài khoản chỉ được mua tối đa 1 vé cho mỗi workshop!
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  {currentUser ? (
                    <button
                      disabled={!selectedTicketId || isActiveTicketPast}
                      onClick={handleProceedPayment}
                      className="w-full py-3.5 px-6 rounded-xl font-black text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                      style={{
                        background: BRAND.accent,
                        color: "white",
                        boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
                        opacity: (!selectedTicketId || isActiveTicketPast) ? 0.6 : 1,
                        cursor: (!selectedTicketId || isActiveTicketPast) ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTicketId && !isActiveTicketPast) {
                          e.currentTarget.style.filter = "brightness(0.96)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "none";
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">
                        credit_card
                      </span>
                      {isActiveTicketPast ? "Đã diễn ra" : "Đặt vé ngay"}
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-3.5 px-6 rounded-xl font-black text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                      style={{
                        background: BRAND.accent,
                        color: "white",
                        boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "brightness(0.96)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "none")
                      }
                    >
                      <span className="material-symbols-outlined text-xl">
                        login
                      </span>
                      Đăng nhập để đặt vé
                    </button>
                  )}

                  <div className="mt-4 text-center">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                      Thanh toán an toàn qua cổng SmartPay Checkout
                    </span>
                  </div>
                </div>

                {/* Find a Buddy Section */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    background: `${BRAND.soft}18`,
                    borderColor: `${BRAND.soft}66`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center border"
                      style={{
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}66`,
                        color: BRAND.primary,
                      }}
                    >
                      <span className="material-symbols-outlined">
                        groups_2
                      </span>
                    </span>
                    <div>
                      <h4
                        className="text-sm font-black"
                        style={{ color: "#0f172a" }}
                      >
                        Bạn đang tìm bạn đồng hành?
                      </h4>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#64748b" }}
                      >
                        Kết nối với những người tham gia khác để cùng sáng tạo!
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2"
                    style={{
                      background: BRAND.primary,
                      color: "white",
                      boxShadow: "0 14px 30px rgba(195,153,108,0.16)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(0.96)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "none")
                    }
                    onClick={() => navigate("/workshop-chat")}
                  >
                    <span className="material-symbols-outlined text-lg">
                      forum
                    </span>
                    Tìm bạn đồng hành
                  </button>
                </div>

                {/* Cancellation Policy */}
                <div
                  className="p-5 rounded-2xl shadow-sm border"
                  style={cardStyle}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: BRAND.primary }}
                    >
                      verified_user
                    </span>
                    <div>
                      <h4
                        className="text-sm font-black"
                        style={{ color: "#0f172a" }}
                      >
                        Chính sách hủy bỏ
                      </h4>
                      <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                        Hủy miễn phí tối đa 24 giờ trước khi buổi workshop bắt
                        đầu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Workshops */}
          <div
            className="mt-16 border-t pt-12"
            style={{ borderColor: `${BRAND.soft}99`, display: "none" }}
          >
            <h2 className="text-2xl font-black mb-8">Bạn cũng có thể thích</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  cat: "Thủ công",
                  title: "Làm nến thơm",
                  time: "3 giờ",
                  price: "350k VND",
                  rating: "4.8",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0CIHZLmqpfmD3uGSK8bTEU-WGACEoRaEMeaPgwX-_1nGsqxmgBP2DpLzOj779dP65ojIIisQoC1252SdI0BYWmOlDAiLC5IQCgJgyPrtUnBaY9K1ciVQn7YLxxkUK-KslS1O4wy1Gh6--jfqVBKokCt8rF9KyqRj9y3CetFq_ZLx7xEouLY1t_fpyd4DgWjw8RMh5PQLrtM-VBrwlxmS19SuZvqYtVJ4zsh8PhUfNMBbpcPMBu1tWP7x9t6pUHQz2mtxN1-bcpQuU",
                },
                {
                  cat: "Thủ công",
                  title: "Làm nến thơm",
                  time: "3 giờ",
                  price: "300k VND",
                  rating: "4.9",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3dTPe3fBkPgCoCl3Z6Zq5I-9PehDnzi02A8_96ySVhNEZBBuGDN6X0J7jZyDDcvSxQYsKNRuQVgJ0Gvte7z0h-Bs3auNd0hjZgCv-RXmvAzeDFoaMw96-XpGgDxW_2IYsGIhsJIecbJoYXZoY72K9FetK3QGFNEyL1U4_Xf6OmqHlBl3q8k7dWKqAhcBceqatvKM7LWFH0SC58kJc0g-NnjrPB_Kvb62vzBCSM5Hf-LfjAVdJYmdlkHBXGJbDjq-QkpjpKvKlqbIv",
                },
                {
                  cat: "Dệt may",
                  title: "Thêu túi Tote",
                  time: "3 giờ",
                  price: "380k VND",
                  rating: "5.0",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5EZFFyKoKYORXukrXvhD4-sCxcWKBkhEh0lixxwgVT07qnxd3Fz9SjQB2f5GeXSFWPBLxRUiyp8Xv3ryl7fV4GP36DABwyC4LpPoHUTcnrHl58Lpw6_s18jzzEagtwtLq5cZa7TQEqBEFW-sp61U5J9dWBKO6dgsvAxZYZ8M8rE-D-B_UaWt5sUXel6I8R1BV7bj-I4TTJpUZqZAhKE3cE437TL0ud0ICDBnVc63sinkk44yhN0IncrBeiMgqsDP1i1FRAFUOmY_",
                },
                {
                  cat: "Trang sức",
                  title: "Workshop làm vòng tay hạt",
                  time: "1.5 giờ",
                  price: "250k VND",
                  rating: "4.7",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvTYSDBdEWQPEkA4kBlbifLt3SzWz3ZRBBpmj6yYdPG73a0mfCO9y4vpMqqSSwv1FQVzEM3_GM7CruOvGMCLEYGQV31t84wDzY3GAlA3icjsXMp9bGA7olDixzYpgTsf_z92lL2fSs5IKIOcLF4ADjHwTwvlPe1lE15Qti1CwL8bbVHLlOzlzHKy4bqk5wfwuw3_5Bh7rHOI8fHHxFo97B--D_VVv8FqL0bDMZYdFgAz_nmZM4IWtVENtcyrMLH0up-3aA40TDybfy",
                },
              ].map((c) => (
                <div
                  key={c.title + c.rating}
                  className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border"
                  style={{ ...cardStyle }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${c.img}')` }}
                    />
                    <div
                      className="absolute top-3 right-3 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1 border"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        borderColor: `${BRAND.soft}66`,
                        color: "#0f172a",
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ color: BRAND.primary }}
                      >
                        star
                      </span>{" "}
                      {c.rating}
                    </div>
                  </div>

                  <div className="p-4">
                    <div
                      className="text-xs font-black mb-2"
                      style={{ color: BRAND.primary }}
                    >
                      {c.cat}
                    </div>
                    <h3 className="font-black text-lg mb-2 line-clamp-1">
                      {c.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "#64748b" }}>{c.time}</span>
                      <span className="font-black" style={{ color: "#0f172a" }}>
                        {c.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="border-t py-12"
          style={{
            background: "rgba(255,255,255,0.82)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 overflow-visible">
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour logo"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 object-contain"
                  />
                </div>
                <span
                  className="text-lg font-black"
                  style={{ color: "#0f172a" }}
                >
                  Hands &amp; Hour
                </span>
              </div>

              <div className="text-sm" style={{ color: "#64748b" }}>
                © 2025 Hands &amp; Hour Đà Nẵng. Bảo lưu mọi quyền.
              </div>

              <div className="flex gap-4">
                {["social_leaderboard", "camera_alt"].map((ic) => (
                  <a
                    key={ic}
                    className="transition-colors"
                    href="#"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#94a3b8")
                    }
                  >
                    <span className="material-symbols-outlined">{ic}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Optional: Dark-mode override (if your app uses .dark on html/body) */}
        <style>{`
          .dark .FindCompanionRoot {
            background: ${BRAND.darkBg};
            color: #e5e7eb;
          }
        `}</style>
      </div>
    </>
  );
}
