import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getWorkshops } from "../../api/workshop";
import NotificationBell from "../../components/NotificationBell";

function getWorkshopList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.workshops)) return data.workshops;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

function getWorkshopPrice(workshop) {
  return workshop.price ?? workshop.priceLower ?? workshop.priceUpper;
}
const CATEGORY_LABELS = {
  1: "Làm gốm",
  2: "Hội họa",
  3: "Trang sức",
  4: "Dệt may",
  5: "Khác",
};

const CATEGORY_TEXT_MAP = {
  pottery: "Làm gốm",
  ceramic: "Làm gốm",
  ceramics: "Làm gốm",
  "làm gốm": "Làm gốm",

  art: "Hội họa",
  painting: "Hội họa",
  "hội họa": "Hội họa",

  jewelry: "Trang sức",
  jewellery: "Trang sức",
  "trang sức": "Trang sức",

  textile: "Dệt may",
  textiles: "Dệt may",
  sewing: "Dệt may",
  weaving: "Dệt may",
  "dệt may": "Dệt may",

  music: "Khác",
  photography: "Khác",
  other: "Khác",
  others: "Khác",
  khác: "Khác",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getCategoryName(workshop) {
  const categoryId = Number(
    workshop.categoryId ??
      workshop.CategoryId ??
      workshop.categoryID ??
      workshop.category?.id ??
      workshop.category?.categoryId,
  );

  if (CATEGORY_LABELS[categoryId]) {
    return CATEGORY_LABELS[categoryId];
  }

  const rawCategory = normalizeText(
    workshop.categoryName ??
      workshop.CategoryName ??
      workshop.category?.name ??
      workshop.category?.title ??
      workshop.category,
  );

  return CATEGORY_TEXT_MAP[rawCategory] || "Workshop";
}

export default function HomeWithBanner() {
  const navigate = useNavigate();

  const PRIMARY = "#f08a78"; // salmon (main)
  const SOFT = "#fbc4ae"; // peach (secondary bg)
  const PAGE_BG = "#F6F2E9"; // no gradient
  const TEXT_MAIN = "#2b2b2b";
  const TEXT_MUTED = "#4a6663";
  const BORDER = "#e9e2da";
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [scheduleWithinDays, setScheduleWithinDays] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // 'district' | 'price' | 'schedule' | null
  const [dynamicLocations, setDynamicLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const filterBarRef = useRef(null);
  const { currentUser, userProfile } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [workshopError, setWorkshopError] = useState("");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Discover all unique locations from database once on mount
  useEffect(() => {
    async function discoverLocations() {
      try {
        const data = await getWorkshops({ page: 1, pageSize: 100 });
        const list = getWorkshopList(data);
        const unique = Array.from(
          new Set(list.map((w) => w.location).filter(Boolean)),
        );
        setDynamicLocations(unique);
      } catch (err) {
        console.error("Failed to discover locations:", err);
      }
    }
    discoverLocations();
  }, []);

  // Fetch filtered workshops whenever filter state changes
  useEffect(() => {
    async function loadFilteredWorkshops() {
      setLoadingWorkshops(true);
      setWorkshopError("");
      try {
        const data = await getWorkshops({
          page: 1,
          pageSize: 12,
          search: activeSearchQuery,
          locations: selectedDistricts,
          priceMin: priceMin,
          priceMax: priceMax,
          scheduleWithinDays: scheduleWithinDays,
        });
        setWorkshops(getWorkshopList(data));
        const list = getWorkshopList(data);

        console.log(
          "HOME WORKSHOPS CATEGORY:",
          list.map((w) => ({
            id: w.id,
            title: w.title,
            categoryId: w.categoryId,
            category: w.category,
            levelId: w.levelId,
            level: w.level,
          })),
        );

        setWorkshops(list);
      } catch (err) {
        setWorkshopError(err?.message || "Không thể tải danh sách workshop.");
      } finally {
        setLoadingWorkshops(false);
      }
    }
    loadFilteredWorkshops();
  }, [
    selectedDistricts,
    priceMin,
    priceMax,
    scheduleWithinDays,
    activeSearchQuery,
  ]);

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery.trim());
  };

  const handleSelectDistrict = (loc) => {
    setSelectedDistricts((prev) => {
      const isChecked = prev.includes(loc);
      if (isChecked) {
        return prev.filter((d) => d !== loc);
      } else {
        return [...prev, loc];
      }
    });
  };

  const handleSelectPrice = (min, max) => {
    setPriceMin(min);
    setPriceMax(max);
  };

  const handleCustomPriceMin = (val) => {
    setPriceMin(val);
  };

  const handleCustomPriceMax = (val) => {
    setPriceMax(val);
  };

  const handleSelectSchedule = (days) => {
    setScheduleWithinDays(days);
  };

  const handleResetAll = () => {
    setSelectedDistricts([]);
    setPriceMin(null);
    setPriceMax(null);
    setScheduleWithinDays(null);
    setSearchQuery("");
    setActiveSearchQuery("");
    setOpenDropdown(null);
  };

  const getPriceLabel = () => {
    if (priceMin === null && priceMax === null) return "Giá cả";
    if (priceMin === null && priceMax !== null)
      return `Dưới ${priceMax.toLocaleString("vi-VN")}₫`;
    if (priceMin !== null && priceMax === null)
      return `Trên ${priceMin.toLocaleString("vi-VN")}₫`;
    return `${priceMin.toLocaleString("vi-VN")}₫ - ${priceMax.toLocaleString("vi-VN")}₫`;
  };

  const getScheduleLabel = () => {
    if (scheduleWithinDays === null) return "Khung giờ";
    return `Trong ${scheduleWithinDays} ngày tới`;
  };

  const standardDistricts = [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
    "Hòa Vang",
  ];
  const allAvailableLocations = Array.from(
    new Set([...standardDistricts, ...dynamicLocations]),
  );

  return (
    <>
      <div
        className="font-display antialiased selection:text-white"
        style={{ background: PAGE_BG, color: TEXT_MAIN }}
      >
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-4 md:px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-3 md:gap-8">
              <Link to="/home" className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center overflow-visible">
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour Logo"
                    className="h-8 w-8 object-contain scale-150 origin-center"
                  />
                </div>
                <h2 className="hidden min-[400px]:block text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined text-xl">
                      search
                    </span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                    placeholder="Tìm kiếm workshop..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-1 justify-end gap-3 md:gap-8 items-center">
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
                  className="flex min-w-[50px] sm:min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-3 sm:px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"
                >
                  <span className="sm:inline hidden truncate">
                    {currentUser?.role === "host"
                      ? "Chế độ Host"
                      : "Trở thành Host"}
                  </span>
                  <span className="inline sm:hidden truncate">
                    {currentUser?.role === "host"
                      ? "Kênh Host"
                      : "Đăng ký Host"}
                  </span>
                </button>
              )}

              <div className="flex items-center gap-2 sm:gap-4 border-l border-[#fbc4ae]/60 pl-3 sm:pl-6">
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
                  <div className="flex gap-2 sm:gap-3">
                    <Link
                      className="text-sm font-semibold text-[#c3996c] hover:text-[#f08a78] transition-colors hidden sm:block"
                      to="/login"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="bg-[#f08a78] hover:bg-[#ee7a66] text-white font-extrabold py-2 px-3 sm:px-5 rounded-xl transition-colors shadow-sm shadow-[#f08a78]/25 text-sm"
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="flex flex-1 flex-col items-center px-4 py-8 md:px-10">
            <div className="flex w-full max-w-[1200px] flex-col gap-8">
              {/* Hero / Search */}
              <section className="flex flex-col items-center gap-6 py-8">
                <h1
                  className="text-center text-3xl font-bold leading-tight tracking-tight md:text-5xl"
                  style={{ color: TEXT_MAIN }}
                >
                  Khám phá các <span style={{ color: PRIMARY }}>Workshop</span>{" "}
                  Sáng tạo
                </h1>

                <div className="w-full max-w-2xl">
                  <label
                    className="relative flex h-14 w-full items-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 focus-within:ring-2"
                    style={{
                      boxShadow: "0 10px 30px rgba(240,138,120,0.12)",
                      borderColor: "#f3ede5",
                    }}
                  >
                    <div
                      className="flex h-full items-center justify-center pl-4"
                      style={{ color: "#9ca3af" }}
                    >
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      className="h-full flex-1 border-none bg-transparent px-4 text-base focus:ring-0"
                      style={{ color: TEXT_MAIN }}
                      placeholder="Tìm kiếm gốm sứ, hội họa, cà phê..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <button
                      onClick={handleSearch}
                      className="mr-2 rounded-xl px-3 sm:px-6 py-2 text-sm font-bold text-white transition-colors animate-in"
                      style={{ background: PRIMARY }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#e87462")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = PRIMARY)
                      }
                    >
                      Tìm kiếm
                    </button>
                  </label>
                </div>

                {/* Filters */}
                <div
                  ref={filterBarRef}
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  {/* Price Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "price" ? null : "price",
                        )
                      }
                      className="group flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-sm font-medium transition-all"
                      style={{
                        borderColor:
                          openDropdown === "price" ||
                          priceMin !== null ||
                          priceMax !== null
                            ? PRIMARY
                            : BORDER,
                        color:
                          openDropdown === "price" ||
                          priceMin !== null ||
                          priceMax !== null
                            ? PRIMARY
                            : TEXT_MAIN,
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        attach_money
                      </span>
                      {getPriceLabel()}
                      <span className="material-symbols-outlined text-[18px]">
                        expand_more
                      </span>
                    </button>
                    {openDropdown === "price" && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-white border border-[#e9e2da] p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-[11px] font-bold text-[#4a6663] mb-2 uppercase tracking-wider">
                          Chọn mức giá
                        </div>
                        <div className="space-y-1">
                          {[
                            { label: "Tất cả mức giá", min: null, max: null },
                            { label: "Dưới 200.000₫", min: null, max: 200000 },
                            {
                              label: "200.000₫ - 500.000₫",
                              min: 200000,
                              max: 500000,
                            },
                            { label: "Trên 500.000₫", min: 500000, max: null },
                          ].map((p, idx) => {
                            const isSelected =
                              priceMin === p.min && priceMax === p.max;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectPrice(p.min, p.max)}
                                className="w-full flex items-center justify-between text-left text-sm font-semibold py-2 px-3 hover:bg-[#fbc4ae]/15 rounded-xl transition-colors"
                                style={{
                                  color: isSelected ? PRIMARY : TEXT_MAIN,
                                }}
                              >
                                {p.label}
                                <input
                                  type="radio"
                                  checked={isSelected}
                                  readOnly
                                  className="accent-[#f08a78] pointer-events-none h-4 w-4"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Schedule Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "schedule" ? null : "schedule",
                        )
                      }
                      className="group flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-sm font-medium transition-all"
                      style={{
                        borderColor:
                          openDropdown === "schedule" ||
                          scheduleWithinDays !== null
                            ? PRIMARY
                            : BORDER,
                        color:
                          openDropdown === "schedule" ||
                          scheduleWithinDays !== null
                            ? PRIMARY
                            : TEXT_MAIN,
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        schedule
                      </span>
                      {getScheduleLabel()}
                      <span className="material-symbols-outlined text-[18px]">
                        expand_more
                      </span>
                    </button>
                    {openDropdown === "schedule" && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white border border-[#e9e2da] p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-[11px] font-bold text-[#4a6663] mb-2 px-2 uppercase tracking-wider">
                          Thời gian tổ chức
                        </div>
                        <div className="space-y-1">
                          {[
                            { label: "Tất cả thời gian", days: null },
                            { label: "Trong 3 ngày tới", days: 3 },
                            { label: "Trong 7 ngày tới", days: 7 },
                            { label: "Trong 14 ngày tới", days: 14 },
                            { label: "Trong 30 ngày tới", days: 30 },
                          ].map((s, idx) => {
                            const isSelected = scheduleWithinDays === s.days;
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  handleSelectSchedule(s.days);
                                  setOpenDropdown(null);
                                }}
                                className="w-full flex items-center justify-between text-left text-sm font-semibold py-2 px-3 hover:bg-[#fbc4ae]/15 rounded-xl transition-colors"
                                style={{
                                  color: isSelected ? PRIMARY : TEXT_MAIN,
                                }}
                              >
                                {s.label}
                                <input
                                  type="radio"
                                  checked={isSelected}
                                  readOnly
                                  className="accent-[#f08a78] pointer-events-none h-4 w-4"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleResetAll}
                    className="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors"
                    style={{
                      background: "rgba(251,196,174,0.55)",
                      color: TEXT_MAIN,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(251,196,174,0.75)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(251,196,174,0.55)")
                    }
                  >
                    Xóa tất cả
                  </button>
                </div>
              </section>

              {/* Title */}
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: TEXT_MAIN }}
                >
                  Workshop Nổi bật
                </h2>
                <Link
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: PRIMARY }}
                  to={
                    activeSearchQuery
                      ? `/advanced-search?q=${encodeURIComponent(activeSearchQuery)}`
                      : "/advanced-search"
                  }
                >
                  Xem tất cả{" "}
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ color: PRIMARY }}
                  >
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loadingWorkshops ? (
                  <div className="col-span-full rounded-2xl border border-[#f3ede5] bg-white p-8 text-center text-sm text-[#4a6663] shadow-sm">
                    Đang tải danh sách workshop...
                  </div>
                ) : workshopError ? (
                  <div className="col-span-full rounded-2xl border border-[#fee2e2] bg-[#fff1f0] p-8 text-center text-sm text-[#b91c1c] shadow-sm">
                    {workshopError}
                  </div>
                ) : workshops.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-[#f3ede5] bg-white p-8 text-center text-sm text-[#4a6663] shadow-sm">
                    Hiện không có workshop nào. Vui lòng quay lại sau.
                  </div>
                ) : (
                  workshops.map((workshop, i) => (
                    <div
                      key={workshop.id ?? i}
                      onClick={() =>
                        navigate(`/find-companion/${workshop.id}`, {
                          state: { workshop },
                        })
                      }
                      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white ring-1 transition-all hover:-translate-y-1 hover:shadow-md"
                      style={{
                        borderColor: "#f3ede5",
                        boxShadow: "0 6px 22px rgba(240,138,120,0.10)",
                      }}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <img
                          alt={workshop.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={workshop.thumbnailLink || "/img/onlyLogo.png"}
                        />

                        <div
                          className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold backdrop-blur-sm"
                          style={{ color: TEXT_MAIN }}
                        >
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">
                              star
                            </span>{" "}
                            {workshop.rating?.toFixed?.(1) ?? "4.9"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: PRIMARY }}
                          >
                            {getCategoryName(workshop)}
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: TEXT_MUTED }}
                          >
                            {workshop.location || "Đà Nẵng"}
                          </span>
                        </div>

                        <h3
                          className="line-clamp-2 text-lg font-bold leading-tight transition-colors"
                          style={{ color: TEXT_MAIN }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = PRIMARY)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = TEXT_MAIN)
                          }
                        >
                          {workshop.title}
                        </h3>

                        <div
                          className="mt-auto flex items-center justify-between border-t pt-3"
                          style={{ borderColor: BORDER }}
                        >
                          <div className="flex flex-col">
                            <span
                              className="text-xs"
                              style={{ color: TEXT_MUTED }}
                            >
                              Giá từ
                            </span>
                            <span
                              className="font-bold"
                              style={{ color: TEXT_MAIN }}
                            >
                              {getWorkshopPrice(workshop) != null
                                ? `${Number(getWorkshopPrice(workshop)).toLocaleString("vi-VN")}₫`
                                : "Liên hệ"}
                            </span>
                          </div>

                          <button
                            className="rounded-lg p-2 transition-colors"
                            style={{
                              background: "rgba(251,196,174,0.55)",
                              color: TEXT_MAIN,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(240,138,120,0.18)";
                              e.currentTarget.style.color = PRIMARY;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(251,196,174,0.55)";
                              e.currentTarget.style.color = TEXT_MAIN;
                            }}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              favorite
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Banner */}
              <section
                className="relative mt-12 overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-16 shadow-xl"
                style={{
                  background: PRIMARY,
                  boxShadow: "0 18px 40px rgba(240,138,120,0.22)",
                }}
              >
                <div className="absolute inset-0 opacity-20">
                  <img
                    alt="Community moments background"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhycDIivFQA8Aka4m7b_DmdcUGfTcBJwJemCkSGUH-IbdViLKFfQ882z3p2hHaXGk2F9wXLC1gqjiWCb03sEFzc7Mb8mxcqL33iRmAjj13_lE-czjwYBDAjsp3RMfcddpXPwuMAhHOYZBMTHJFK6swvrJ88iPa1EC2Ko95YJgR-BanvT2UnP3w38aglErJxCcGqf0zWpXRBt7k_H6ysKrS7ST-jQJDjfdcbyEEmKABd7_XByOBwX9egK0ag8YvhcYyjGyQlQxtNoqX"
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
                  <div className="max-w-xl text-center lg:text-left">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      <span className="material-symbols-outlined text-[16px]">
                        auto_awesome
                      </span>{" "}
                      Bộ sưu tập cộng đồng
                    </div>
                    <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                      Khoảnh khắc Workshop
                    </h2>
                    <p className="mt-4 text-lg text-white/90">
                      Xem những tác phẩm tuyệt đẹp và những gương mặt hạnh phúc
                      từ các workshop gần đây. Tìm cảm hứng sáng tạo.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <button
                      className="group flex items-center gap-3 rounded-2xl bg-white/70 px-8 py-4 text-base font-bold transition-all cursor-not-allowed opacity-75"
                      style={{ color: PRIMARY }}
                      disabled
                    >
                      Coming soon
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer
            className="mt-10 border-t bg-white py-12"
            style={{ borderColor: BORDER }}
          >
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 lg:px-10">
              <div className="flex flex-col justify-between gap-10 md:flex-row">
                <div className="flex max-w-sm flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(240,138,120,0.14)",
                        color: PRIMARY,
                      }}
                    >
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <h2
                      className="text-lg font-bold leading-tight tracking-tight"
                      style={{ color: TEXT_MAIN }}
                    >
                      Hands &amp; Hour
                    </h2>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: TEXT_MUTED }}
                  >
                    Kết nối những tâm hồn sáng tạo. Khám phá niềm đam mê tiếp
                    theo của bạn hoặc chia sẻ kỹ năng với cộng đồng sôi động của
                    chúng tôi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-10 md:gap-20">
                  {[
                    {
                      title: "Khám phá",
                      links: ["Workshop", "Người hướng dẫn", "Thẻ quà tặng"],
                    },
                    {
                      title: "Công ty",
                      links: ["Về chúng tôi", "Tuyển dụng", "Liên hệ"],
                    },
                  ].map((col) => (
                    <div key={col.title} className="flex flex-col gap-4">
                      <h4
                        className="text-sm font-bold"
                        style={{ color: TEXT_MAIN }}
                      >
                        {col.title}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {col.links.map((t) => (
                          <a
                            key={t}
                            className="text-sm transition-colors"
                            style={{ color: TEXT_MUTED }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = PRIMARY)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = TEXT_MUTED)
                            }
                            href="#"
                          >
                            {t}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-4">
                    <h4
                      className="text-sm font-bold"
                      style={{ color: TEXT_MAIN }}
                    >
                      Theo dõi
                    </h4>
                    <div className="flex gap-3">
                      {/* Facebook */}
                      <a
                        href="https://www.facebook.com/profile.php?id=61590287254561"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                        className="flex items-center justify-center size-9 rounded-full transition-all"
                        style={{ color: TEXT_MUTED, background: "rgba(240,138,120,0.08)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#1877F2";
                          e.currentTarget.style.background = "rgba(24,119,242,0.10)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = TEXT_MUTED;
                          e.currentTarget.style.background = "rgba(240,138,120,0.08)";
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/workshop_handsandhour"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="flex items-center justify-center size-9 rounded-full transition-all"
                        style={{ color: TEXT_MUTED, background: "rgba(240,138,120,0.08)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#E1306C";
                          e.currentTarget.style.background = "rgba(225,48,108,0.10)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = TEXT_MUTED;
                          e.currentTarget.style.background = "rgba(240,138,120,0.08)";
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
                style={{ borderColor: BORDER }}
              >
                <p className="text-xs" style={{ color: TEXT_MUTED }}>
                  © 2025 Hands &amp; Hour. Bảo lưu mọi quyền.
                </p>
                <div className="flex gap-6">
                  {["Chính sách bảo mật", "Điều khoản dịch vụ"].map((t) => (
                    <a
                      key={t}
                      className="text-xs transition-colors"
                      style={{ color: TEXT_MUTED }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = PRIMARY)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = TEXT_MUTED)
                      }
                      href="#"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
