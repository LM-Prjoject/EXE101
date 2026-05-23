import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getWorkshops } from "../../api";

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

export default function HomeWithBanner() {
  const navigate = useNavigate();

  const PRIMARY = "#f08a78"; // salmon (main)
  const SOFT = "#fbc4ae"; // peach (secondary bg)
  const PAGE_BG = "#F6F2E9"; // no gradient
  const TEXT_MAIN = "#2b2b2b";
  const TEXT_MUTED = "#4a6663";
  const BORDER = "#e9e2da";
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const { currentUser } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [workshopError, setWorkshopError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    async function loadWorkshops() {
      setLoadingWorkshops(true);
      setWorkshopError('');
      try {
        const data = await getWorkshops();
        setWorkshops(getWorkshopList(data));
      } catch (err) {
        setWorkshopError(err?.message || 'Không thể tải danh sách workshop.');
      } finally {
        setLoadingWorkshops(false);
      }
    }
    loadWorkshops();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/advanced-search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/advanced-search`);
    }
  };

  return (
    <>
      <div
        className="font-display antialiased selection:text-white"
        style={{ background: PAGE_BG, color: TEXT_MAIN }}
      >
        <div
  className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
  style={{
    paddingBottom:
      "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
  }}
>
          {/* Header */}
          <header
            className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white/90 px-6 backdrop-blur-md lg:px-10"
            style={{ borderColor: BORDER }}
          >
            {/* Logo */}
            <div className="flex items-center gap-4">
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
            </div>

            {/* Right side */}
            <div className="hidden flex-1 justify-end gap-8 md:flex">
              {/* Menu links */}
              <div className="flex items-center gap-8">
                {[
                  { to: "/home", label: "Workshop" },
                  { to: "/login", label: "Người hướng dẫn" },
                  { to: "/login", label: "Blog" },
                ].map((x) => (
                  <Link
                    key={x.label}
                    className="text-sm font-medium transition-colors"
                    style={{ color: TEXT_MAIN }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = PRIMARY)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = TEXT_MAIN)
                    }
                    to={x.to}
                  >
                    {x.label}
                  </Link>
                ))}
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border p-1 pr-3 transition-all hover:shadow-sm"
                  style={{
                    borderColor: "rgba(195,153,108,0.35)",
                    background: "rgba(246,242,233,0.75)",
                  }}
                >
                  <img
                    alt="User Avatar"
                    className="size-8 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE"
                    style={{ border: "2px solid rgba(240,138,120,0.55)" }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#C3996C" }}
                  >
                    {currentUser?.name || currentUser?.email?.split('@')[0] || 'Khách'}
                  </span>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: "#6F8B6F" }}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown */}
                {open && (
                  <div
                    className="absolute right-0 top-full mt-2 w-60 rounded-2xl p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150"
                    style={{
                      background: "#F6F2E9",
                      border: "1px solid rgba(195,153,108,0.20)",
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <Link
                        to="/user-profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#FBC4AE]"
                        style={{ color: "#C3996C" }}
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: "#6F8B6F" }}
                        >
                          person
                        </span>
                        Hồ sơ của tôi
                      </Link>

                      <a
                        href="#"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm"
                        style={{
                          background: "#F08A78",
                          boxShadow: "0 10px 24px rgba(240,138,120,0.22)",
                        }}
                      >
                        Người hướng dẫn
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </a>

                      <Link
                        to="/home"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#D5DDCE]"
                        style={{ color: "#C3996C" }}
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: "#6F8B6F" }}
                        >
                          settings
                        </span>
                        Cài đặt
                      </Link>

                      <div
                        className="my-1 h-px"
                        style={{ background: "rgba(195,153,108,0.25)" }}
                      />

                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-red-50"
                        style={{ color: "#F08A78" }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          logout
                        </span>
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button className="flex md:hidden" style={{ color: TEXT_MAIN }}>
              <span className="material-symbols-outlined">menu</span>
            </button>
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
                  Sáng tạo <br className="hidden md:block" /> tại Đà Nẵng
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
                      className="mr-2 rounded-xl px-6 py-2 text-sm font-bold text-white transition-colors"
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
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[
                    { icon: "location_on", label: "Da Nang" },
                    { icon: "map", label: "Quận/Huyện" },
                    { icon: "attach_money", label: "Giá cả" },
                    { icon: "schedule", label: "Khung giờ" },
                  ].map((x, idx) => (
                    <button
                      key={idx}
                      className="group flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-sm font-medium transition-all"
                      style={{ borderColor: BORDER, color: TEXT_MAIN }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = PRIMARY;
                        e.currentTarget.style.background =
                          "rgba(251,196,174,0.25)";
                        e.currentTarget.style.color = PRIMARY;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = BORDER;
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = TEXT_MAIN;
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ color: "#9ca3af" }}
                      >
                        {x.icon}
                      </span>
                      {x.label}
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ color: "#9ca3af" }}
                      >
                        expand_more
                      </span>
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setSearchQuery('');
                    }}
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
                <a
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: PRIMARY }}
                  href="#"
                >
                  Xem tất cả{" "}
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ color: PRIMARY }}
                  >
                    arrow_forward
                  </span>
                </a>
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
                      onClick={() => navigate(`/find-companion/${workshop.id}`, { state: { workshop } })}
                      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white ring-1 transition-all hover:-translate-y-1 hover:shadow-md"
                      style={{
                        borderColor: '#f3ede5',
                        boxShadow: '0 6px 22px rgba(240,138,120,0.10)',
                      }}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <img
                          alt={workshop.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={workshop.thumbnailLink || '/img/onlyLogo.png'}
                        />

                        <div
                          className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold backdrop-blur-sm"
                          style={{ color: TEXT_MAIN }}
                        >
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">
                              star
                            </span>{' '}
                            {workshop.rating?.toFixed?.(1) ?? '4.9'}
                          </span>
                        </div>

                        {workshop.status && workshop.status !== 'active' && (
                          <div
                            className="absolute left-3 top-3 rounded-lg px-2 py-1 text-xs font-bold text-white shadow-sm"
                            style={{ background: '#ef4444' }}
                          >
                            {workshop.status}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: PRIMARY }}
                          >
                            {workshop.category || 'Workshop'}
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: TEXT_MUTED }}
                          >
                            {workshop.location || 'Đà Nẵng'}
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
                            <span className="text-xs" style={{ color: TEXT_MUTED }}>
                              Giá từ
                            </span>
                            <span className="font-bold" style={{ color: TEXT_MAIN }}>
                              {getWorkshopPrice(workshop) != null
                                ? `${Number(getWorkshopPrice(workshop)).toLocaleString('vi-VN')}₫`
                                : 'Liên hệ'}
                            </span>
                          </div>

                          <button
                            className="rounded-lg p-2 transition-colors"
                            style={{
                              background: 'rgba(251,196,174,0.55)',
                              color: TEXT_MAIN,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                'rgba(240,138,120,0.18)';
                              e.currentTarget.style.color = PRIMARY;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                'rgba(251,196,174,0.55)';
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
                      từ các workshop gần đây. Tìm cảm hứng sáng tạo tại Đà
                      Nẵng.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <Link
                      className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold transition-all hover:shadow-lg active:scale-95"
                      style={{ color: PRIMARY }}
                      to="/community"
                    >
                      Xem tất cả{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </section>

              <div className="flex justify-center py-8">
                <button
                  className="flex h-12 w-full max-w-[200px] items-center justify-center rounded-xl border-2 bg-transparent text-sm font-bold transition-colors"
                  style={{ borderColor: PRIMARY, color: PRIMARY }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = PRIMARY;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = PRIMARY;
                  }}
                >
                  Tải thêm
                </button>
              </div>
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
                    Kết nối những tâm hồn sáng tạo tại Đà Nẵng. Khám phá niềm
                    đam mê tiếp theo của bạn hoặc chia sẻ kỹ năng với cộng đồng
                    sôi động của chúng tôi.
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
                    <div className="flex gap-4">
                      {["public", "photo_camera"].map((ic) => (
                        <a
                          key={ic}
                          className="transition-colors"
                          style={{ color: TEXT_MUTED }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = PRIMARY)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = TEXT_MUTED)
                          }
                          href="#"
                        >
                          <span className="material-symbols-outlined">
                            {ic}
                          </span>
                        </a>
                      ))}
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
