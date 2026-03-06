import { useNavigate, Link } from "react-router-dom";

export default function ConfirmSuccess() {
  const navigate = useNavigate();

  const BRAND = {
    primary: "#c3996c", // warm gold (text)
    accent: "#f08a78", // salmon (main)
    soft: "#fbc4ae", // peach (support)
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
    darkCard: "#0f141b",
  };

  return (
    <>
      <div
        className="font-display min-h-screen flex flex-col overflow-x-hidden text-slate-900 dark:text-slate-100"
        style={{
          background: BRAND.lightBg,
        }}
      >
        {/* Navbar */}
        <header
          className="w-full sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            background: "rgba(254,254,253,0.85)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 lg:px-40 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-10">
              <Link
                className="flex items-center gap-3 group relative"
                to="/home"
              >
                {/* Logo wrapper giữ kích thước nhỏ để header không cao */}
                <div className="relative w-9 h-9 overflow-visible shrink-0">
                  {/* Logo thật to, nhưng absolute để không đẩy layout */}
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour logo"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-14 object-contain"
                  />
                </div>

                <h2 className="text-lg font-black tracking-tight leading-none">
                  <span style={{ color: "#c3996c" }}>Hands</span>{" "}
                  <span style={{ color: "#f08a78" }}>&amp;</span>{" "}
                  <span style={{ color: "#c3996c" }}>Hour</span>
                </h2>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {["Hội thảo", "Giảng viên", "Blog"].map((t) => (
                  <a
                    key={t}
                    className="text-sm font-semibold transition-colors"
                    href="#"
                    style={{ color: "#64748b" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#64748b")
                    }
                  >
                    {t}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="hidden lg:flex w-64 h-10 rounded-xl items-center px-3 gap-2 border"
                style={{
                  background: `${BRAND.soft}33`,
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: "#94a3b8" }}
                >
                  search
                </span>
                <input
                  className="bg-transparent border-none text-sm w-full placeholder:text-slate-400 focus:ring-0"
                  placeholder="Tìm kiếm hội thảo..."
                  type="text"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="size-10 flex items-center justify-center rounded-xl transition-colors relative border"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                  }}
                >
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <span
                    className="absolute top-2 right-2 size-2 rounded-full"
                    style={{ background: BRAND.accent }}
                  />
                </button>

                <div
                  className="size-10 rounded-xl overflow-hidden border"
                  style={{
                    borderColor: `${BRAND.soft}99`,
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0KGXfThSzEcW3nmU50S7n6S7qrML1ShQkU7IZ_J5r0qUkSppZRIWjsFILr2ilVzosIuHcB7Zfy4Fnunj6vXq27lYn5aXQADu5_bs9L4R_oHc0X_-9WssPE7wodTkNJdosJ1QOxhYu7IT2LYR5ErYCPNi_xGgD8wWCYB-OIsWyX-vjxepyDdRh1ZjXbrs_kHnWWpRBtIka1_Lv5j6SUIfsNfrjy2qZjI6nanjhQ6yQX2qaacoK1DxJCk_HKrwUqMsQwC4YgFWoYJX8')",
                    backgroundSize: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-start pt-10 pb-20 px-4">
          {/* Hero Confirmation */}
          <div className="text-center max-w-2xl mx-auto mb-10 relative">
            <div
              className="absolute -top-10 -left-10 opacity-60 transform -rotate-12"
              style={{ color: BRAND.accent }}
            >
              <span className="material-symbols-outlined text-6xl">
                celebration
              </span>
            </div>
            <div
              className="absolute -top-6 -right-10 opacity-60 transform rotate-12"
              style={{ color: BRAND.primary }}
            >
              <span className="material-symbols-outlined text-6xl">star</span>
            </div>

            <div
              className="inline-flex items-center justify-center p-3 rounded-full mb-6 border"
              style={{
                background: `${BRAND.soft}33`,
                borderColor: `${BRAND.soft}99`,
                color: BRAND.accent,
              }}
            >
              <span className="material-symbols-outlined text-3xl">
                check_circle
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              Đã xác nhận đặt chỗ! 🎉
            </h1>
            <p className="text-slate-600 text-lg">
              Sẵn sàng để bắt tay vào việc thôi! Chúng tôi đã gửi email xác nhận
              đến{" "}
              <span className="font-semibold" style={{ color: BRAND.primary }}>
                alex.morgan@example.com
              </span>
              .
            </p>
          </div>

          {/* E-Ticket Container */}
          <div
            className="w-full max-w-[900px] flex flex-col lg:flex-row rounded-3xl overflow-hidden border shadow-[0_10px_35px_rgba(240,138,120,0.12)]"
            style={{
              background: "rgba(255,255,255,0.85)",
              borderColor: `${BRAND.soft}99`,
            }}
          >
            {/* Left Side */}
            <div className="flex-1 p-8 md:p-10 flex flex-col gap-6 relative">
              <div
                className="absolute top-0 right-0 h-full w-[1px] border-r-2 border-dashed hidden lg:block translate-x-[1px]"
                style={{ borderColor: `${BRAND.soft}99` }}
              />
              <div
                className="absolute top-0 right-0 size-8 rounded-full -translate-y-1/2 translate-x-1/2 hidden lg:block"
                style={{ background: BRAND.lightBg }}
              />
              <div
                className="absolute bottom-0 right-0 size-8 rounded-full translate-y-1/2 translate-x-1/2 hidden lg:block"
                style={{ background: BRAND.lightBg }}
              />

              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="font-black tracking-wider text-xs uppercase mb-1"
                    style={{ color: BRAND.accent }}
                  >
                    VÉ ĐIỆN TỬ #HH-8291
                  </p>
                  <h3 className="text-2xl font-black leading-tight">
                    Hội thảo Làm Ly Gốm
                  </h3>
                </div>
                <div
                  className="size-12 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                    color: BRAND.primary,
                  }}
                >
                  <span className="material-symbols-outlined">
                    local_activity
                  </span>
                </div>
              </div>

              {/* Workshop Image */}
              <div
                className="w-full h-48 rounded-xl relative overflow-hidden group border"
                style={{ borderColor: `${BRAND.soft}99` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBr8DXXEjsgz2cV6UgzOShqrw9bBkYhtIexpp8VcdjEAVjB9W0pqYNjNZXNSVMsRm9zpeNkPdhTEyJlbzAYWAYmAsAvHoboxayg3GXJBA0XlhQ9ojyHh31W7VZA9YSvT7pOWQEqrXIRi0zq-bjLZOEsJJDEVlZdmAFtuJvLtL6l-xqqwYgQXshV-59y4PNGC4KSBRMnTzC0emMiWrEhQQWWhguIHIFJ3d2TL28sqDrigJ1zDq8--9wC8nBDSRVv9E_tA5YJLWmpfY8F')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div
                    className="flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full w-fit backdrop-blur-md border"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      borderColor: "rgba(255,255,255,0.25)",
                    }}
                  >
                    <span className="material-symbols-outlined text-base">
                      palette
                    </span>
                    <span>Phù hợp cho người mới</span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    icon: "calendar_month",
                    label: "Thời gian",
                    title: "Thứ Bảy, 24 Th10",
                    sub: "10:00 AM - 12:00 PM",
                  },
                  {
                    icon: "location_on",
                    label: "Địa điểm",
                    title: "Dragon Bridge Studio",
                    sub: "Tran Hung Dao, Da Nang",
                  },
                ].map((x) => (
                  <div key={x.icon} className="flex items-start gap-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center shrink-0 border"
                      style={{
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}99`,
                        color: BRAND.accent,
                      }}
                    >
                      <span className="material-symbols-outlined">
                        {x.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-black uppercase mb-0.5">
                        {x.label}
                      </p>
                      <p className="font-bold">{x.title}</p>
                      <p className="text-slate-600 text-sm">{x.sub}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <div
                    className="size-10 rounded-full flex items-center justify-center shrink-0 border"
                    style={{
                      background: `${BRAND.soft}22`,
                      borderColor: `${BRAND.soft}99`,
                      color: BRAND.accent,
                    }}
                  >
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-black uppercase mb-0.5">
                      Người hướng dẫn
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-6 rounded-full bg-slate-300 overflow-hidden border"
                        style={{
                          borderColor: `${BRAND.soft}99`,
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBla3u4yrs4rLpNYlOxLlqy266Jp6R8QUXlc9n6M_zu-9vKDS0GD5gsPynkATK_FZTM7B6iWj5ysLRCjz44k6GyoRlGuiv7prNC3tKwLtqJZV-P6dAJFL3hqkG9wITllRKietAjE6wffVbr33MYFvPtALfy_HvUb7659qq7C1EgHNPbYHJ8CwQt9zNebscXPIbHhA5g7F_UY0L3eEAHxsSoge_fuWgiLFXUUgCB562BopbYwEVZGBAzkc-3eeJfjoYSc8rvvQ3ie2Vd')",
                          backgroundSize: "cover",
                        }}
                      />
                      <p className="font-bold" style={{ color: BRAND.primary }}>
                        Linh Nguyen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Action */}
              <div className="lg:hidden flex flex-col gap-3 mt-4">
                <button
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-black transition-colors"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(0.95)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                >
                  <span className="material-symbols-outlined">download</span>
                  Tải vé xuống
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-[320px] p-8 flex flex-col items-center justify-between border-t lg:border-t-0 lg:border-l relative"
              style={{
                background: `${BRAND.soft}1f`,
                borderColor: `${BRAND.soft}99`,
              }}
            >
              <div
                className="absolute top-0 left-0 size-8 rounded-full -translate-y-1/2 -translate-x-1/2 hidden lg:block z-10"
                style={{ background: BRAND.lightBg }}
              />
              <div
                className="absolute bottom-0 left-0 size-8 rounded-full translate-y-1/2 -translate-x-1/2 hidden lg:block z-10"
                style={{ background: BRAND.lightBg }}
              />

              <div className="flex flex-col items-center w-full gap-6">
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">
                    Quét khi vào cửa
                  </p>
                  <div
                    className="bg-white p-4 rounded-2xl shadow-sm border mx-auto w-fit"
                    style={{ borderColor: `${BRAND.soft}99` }}
                  >
                    <div
                      className="size-32 bg-slate-900"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsPT-Q2AO66_MhvZzeoxDfeQnGC1W0mFgkRYDP2_qh26wZjSr4_h6M_Gf1lUII221zhtkggBogeVNQlXtP2drUSp3X4KscxNZ650-RuPtn0IXH2OAZYdljPfyLUQQBZfySbRzpsDOzkr98hNvtUjAFtbqsJVojPSMcGwZZ2xgIn3CEi74Im6K0nQHw9EcsS8UD5CunBhLL6onYTtozone7gJ_LmquDNQ3mL9gIHTxeYPvz-xyOcvN4vnfvTKMqHz16IbVXHdTu6h8e')",
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Mini Map */}
                <div
                  className="w-full h-32 rounded-xl overflow-hidden relative border"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-80"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaR3e69-U7vthjgUJuCAzt0eYYwfGhv8zT-QVT9hd69MwuWdFLIl7ExaRFTl00TwM63k4yl-h0lWOE6EUW-MprAdaOi7rbfSz-eHgFvrTKIqYvUKqXQ-1yEDDlsQDpgKa0hlbYKOaD6-svsDX3HPLX_8x_jB4CZrLqI4_XgC44wYiJ65E6wiEUT0RKP-4R2aob9Q2avp9QLHNVeVX_jDSWtFBQJLHq6N9T8fq796Dqba3XVjWieg7_GMuP4j8ihxBcmr5m2fjMme6x')",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce"
                      style={{ background: BRAND.accent }}
                    >
                      <span className="material-symbols-outlined text-white text-sm">
                        location_on
                      </span>
                    </div>
                  </div>
                  <a
                    className="absolute bottom-2 right-2 text-xs font-black px-2 py-1 rounded"
                    href="#"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      color: BRAND.primary,
                    }}
                  >
                    Mở bản đồ
                  </a>
                </div>
              </div>

              <div className="mt-8 text-center w-full">
                <button
                  className="hidden lg:flex items-center justify-center gap-2 w-full h-12 rounded-xl font-black transition-colors shadow-lg"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                    boxShadow: "0 12px 30px rgba(240,138,120,0.25)",
                  }}
                >
                  <span className="material-symbols-outlined">download</span>
                  Tải vé xuống
                </button>

                <p className="text-xs text-slate-500 mt-4">
                  Gặp sự cố?{" "}
                  <a
                    href="#"
                    style={{ color: BRAND.accent }}
                    className="font-bold hover:underline"
                  >
                    Liên hệ Hỗ trợ
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-[600px]">
            {[
              { icon: "calendar_add_on", text: "Thêm vào lịch" },
              {
                icon: "history_edu",
                text: "Xem lịch đặt chỗ",
                to: "/my-schedule",
              },
            ].map((b) => {
              const commonProps = {
                className:
                  "flex-1 min-w-[200px] h-14 rounded-xl border-2 font-black flex items-center justify-center gap-2 transition-all",
                style: {
                  background: "rgba(255,255,255,0.75)",
                  borderColor: `${BRAND.soft}99`,
                  color: "#0f172a",
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.borderColor = BRAND.accent;
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(240,138,120,0.14)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                  e.currentTarget.style.boxShadow = "none";
                },
              };

              const Content = (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: BRAND.primary }}
                  >
                    {b.icon}
                  </span>
                  {b.text}
                </>
              );

              // Nếu có `to` thì render Link
              if (b.to) {
                return (
                  <Link key={b.text} to={b.to} {...commonProps}>
                    {Content}
                  </Link>
                );
              }

              // Không có `to` thì render button
              return (
                <button key={b.text} type="button" {...commonProps}>
                  {Content}
                </button>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer
          className="w-full py-8 border-t"
          style={{
            background: "rgba(254,254,253,0.9)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2023 Hands &amp; Hour. Được làm với sự nhiệt huyết tại Đà Nẵng.
            </p>
            <div className="flex gap-6">
              {["social_leaderboard", "photo_camera", "mail"].map((i) => (
                <a
                  key={i}
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
                  <span className="material-symbols-outlined">{i}</span>
                </a>
              ))}
            </div>
          </div>
        </footer>

        {/* Dark mode background override */}
        <style>{`
          .dark body { background: ${BRAND.darkBg}; }
          .dark ${"div"} { color-scheme: dark; }
        `}</style>
      </div>
    </>
  );
}
