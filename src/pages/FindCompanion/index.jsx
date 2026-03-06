import { useNavigate, Link } from "react-router-dom";

export default function FindCompanion() {
  const navigate = useNavigate();

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
                  src="/public/img/onlyLogo.png"
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
              Bãi biển Mỹ Khê, Đà Nẵng
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
                  Arts &amp; Crafts
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
                    Bãi biển Mỹ Khê, Đà Nẵng
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#94a3b8" }}
                  >
                    (128 đánh giá)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                Workshop Vẽ Tranh Canvas Hoàng Hôn
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
                <span>Bãi biển Mỹ Khê, Đà Nẵng</span>
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
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3xTVFNo4qKB-rTZ7U4cIUiwjOqiwC0Z0pqDV9F-cVCRdRh2DKVJaqW_VE-0W2ly-J0aTnPBznFMLpMv7ejDvI5R6na3IbMY9FDq9JpYCBj_9Bsw52zjpLM_wvaQR_mJ4WTA_OLBmvs4abSrtig-O-sxeDpmfW8-ivzsOU_lkIk1WZC_dPGkR3scHRQ-A80EKsh0a1IwKGgsa2RUKEg-O7zEKGkxlRrCxVwFoSKcOCwFTmIfFag4HNZ_Jf1A2ICdEE6Qi7KjprMVuC')",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(240,138,120,0.06)" }}
              />
            </div>

            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDF6QmJfID8hl4ipHUp4UbZfmkMKmxu8ayIuR7Nr_GuJl0qrvgBwmghz43gSDTOJsBu2SS0MDWWvk0fb7Vem40CDpaemqyBFXU9VE7_N3XtMXFxqZUSEg2ziLd6N95LbrBt25SpLw8VY4cbmfUJPJdUGNswreEsEQXh74fIrt1h8e4PC7x7kBFcahwvhRxbuavMSd-vY-19yPXPUEX24-yIsfP9_EHe7p9kPCpZEHMI7x7Jnopw1daCmRbUaV-yzrRrAlYUvCczdNCl",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBc6GJMxdoNULmQ6L_DNepv7zt1qKyFD9SbuzYJrwta3E4bA9pDJz8e-KEaD24jNGxABrDHF-a7Tj_JUSlJxferyPxmVfCGiFTUyx7Mppm9OY97pDjIj8BIfophresBnT32X241XUJgwKxurZGNFO525cE6bbXGVA9jGFFj036PfwziR2e7jA5NH7U0PCh9xJqYL563oVijVv-5A2ydWb1NZ7aiuLTURAxJ9u7d6POEWYMIZEYWy-l0qoaCZ8ZWpmSo6ZsexnIoZPom",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCtF6KctFIh_nkzOzMUaS0Z_lWGLuZ8aRWO3YsLr9T05FkJV4PnzM3UGuWJkirmizEnkSdAN6WsD7lpEOUeIGucwoGoqr9jnYBueYLo2vazx4zDEsxmaTc4MrAhs5u3bCFC1YgNwUxKb640MskVWoYMj6GkSls-ckTZpaHKGdztTDn6QINNR6vMlQ1S3BC-j7KOuNQaTR0LJBXdHOY_HXvuHGWIjfGoLaGSEGDRK1HuPN8hes8G6gEF_krNJcV-aquw9oeB8GU4Ki-C",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCHSJ8ba9oGkeZyL95Jnp5m2YnJThkXbjWKkH1967cj3ahj_MtqYjl2R-HTEYcKFu2fBf76756UICMDQiRyoNAXfA5x5Z1o_wGgRTUzIo98qPsDhw6x0Z7h_KhRgVwEADwsVSBOipzRBMq-bdmGuT4g6FwgJXVrPTSmbqL7L3aYMp8P8LQhLtjybUJt2aNqbH3L3IfqzoaOvTa8tl_Y1762kT98SWVFNqmnR3U7rScFK5eqhIoRnUghnWutOPTDgSXJz1P5gUtDRfkT",
            ].map((src, idx) => (
              <div
                key={src}
                className="md:col-span-1 relative group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${src}')` }}
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
                  <p className="mb-4">
                    Thỏa sức sáng tạo cùng workshop Vẽ Tranh Canvas Hoàng Hôn!
                    Tọa lạc ngay gần bãi biển Mỹ Khê xinh đẹp, buổi học này được
                    thiết kế cho cả người mới bắt đầu và những người đam mê hội
                    họa. Bạn sẽ được hướng dẫn từng bước bởi họa sĩ địa phương
                    giàu kinh nghiệm của chúng tôi, anh Minh, người chuyên về
                    tranh phong cảnh acrylic.
                  </p>
                  <p>
                    Tất cả vật liệu đều được cung cấp sẵn, bao gồm toan vẽ
                    40x50cm, sơn acrylic, cọ vẽ và tạp dề. Thưởng thức đồ uống
                    miễn phí (cà phê, trà hoặc nước trái cây) trong khi bạn vẽ.
                    Kết thúc buổi học kéo dài 3 giờ, bạn sẽ có tác phẩm của
                    riêng mình để mang về làm kỷ niệm độc đáo từ Đà Nẵng.
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t"
                  style={{ borderColor: `${BRAND.soft}66` }}
                >
                  {[
                    { label: "Thời lượng", icon: "schedule", value: "3 Giờ" },
                    { label: "Cấp độ", icon: "stairs", value: "Cơ bản" },
                    {
                      label: "Ngôn ngữ",
                      icon: "translate",
                      value: "Tiếng Anh, Tiếng Việt",
                    },
                    {
                      label: "Số lượng khách",
                      icon: "groups",
                      value: "Tối đa 10",
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
                  123 Tran Bach Dang, My An, Ngu Hanh Son, Da Nang
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
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}99`,
                        color: BRAND.primary,
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">
                        reviews
                      </span>
                    </span>
                    Đánh giá
                  </h2>
                  <a
                    className="text-sm font-black hover:underline"
                    href="#"
                    style={{ color: BRAND.primary }}
                  >
                    View all 128 reviews
                  </a>
                </div>

                <div className="space-y-6">
                  {/* Review Item 1 */}
                  <div
                    className="border-b pb-6 last:border-0 last:pb-0"
                    style={{ borderColor: `${BRAND.soft}66` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYykjwKwh16H2OcyB07_nWyYO-gOSQkdLk0FGRTOknlUIwmQbqJdoqmJ0d8fvaPpmcFMxEvWxCXjrWr-y5KpSK2BlGz7uxsBZU6cq_2vko7OMa7NLUIIPIaHQcJWqHgMiJZia5U6op-FJK4gGOPG3i4zzsOxETV96ml3KrQlTX4hIr_13sC5Ox7ugVmqtK3aX_vpZFuA8Xdvm3P2IzFwKL-945IQfW2dO_Fru1gKVqlIvDsbNHf4jXcF_hkipBJ_0SMtnU6yoUgEjz')",
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-black"
                            style={{ color: "#0f172a" }}
                          >
                            Sarah Jenkins
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "#94a3b8" }}
                          >
                            • 2 ngày trước
                          </span>
                        </div>
                        <div
                          className="flex text-sm mb-2"
                          style={{ color: BRAND.primary }}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-base"
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#475569" }}
                        >
                          Absolutely loved this workshop! Minh was so patient
                          and the studio atmosphere is incredibly relaxing. I'm
                          not an artist but I came home with a painting I'm
                          actually proud of. Highly recommend for a rainy
                          afternoon in Da Nang.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Item 2 */}
                  <div className="pb-0">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASmhpeMSElhn4r2bJICOuvNA6d1Hz9beCVp7STiPlzxVpccDKRHjTbL_RKzUxeaqcp2dUYX5Kq46MeEofzXBKXDQOZ6lL0ojratageJdQXl-JDFVbTHlAj-g5DB5booXPPoMop5YwMGRaojdbDvTFLLBv7fqvnRdRAVQmQPJFb8OAkf4IAIYsBsfuTtdbD3JVZGxlOMTSwXo_3jAYTP_M4U9AI92veH7u-YfkdGjun1dBrhietkD4CULLhRjBvsX9W8QGpeSWV46aj')",
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-black"
                            style={{ color: "#0f172a" }}
                          >
                            David Chen
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "#94a3b8" }}
                          >
                            • 1 tuần trước
                          </span>
                        </div>
                        <div
                          className="flex text-sm mb-2"
                          style={{ color: BRAND.primary }}
                        >
                          {Array.from({ length: 4 }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-base"
                            >
                              star
                            </span>
                          ))}
                          <span
                            className="material-symbols-outlined text-base"
                            style={{ color: `${BRAND.primary}66` }}
                          >
                            star
                          </span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#475569" }}
                        >
                          Great experience overall. The materials were high
                          quality. I wish we had a bit more time towards the end
                          to dry the paintings properly, but the staff helped
                          pack them carefully.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          450k
                        </span>
                        <span
                          className="text-lg font-semibold"
                          style={{ color: "#64748b" }}
                        >
                          VND
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

                  {/* Date Picker Mockup */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label
                        className="block text-sm font-black mb-2"
                        style={{ color: "#334155" }}
                      >
                        Chọn ngày
                      </label>

                      <div className="relative">
                        <select
                          className="w-full appearance-none rounded-xl px-4 py-3 pr-10 font-semibold outline-none cursor-pointer"
                          style={{
                            background: `${BRAND.soft}18`,
                            border: `1px solid ${BRAND.soft}99`,
                            color: "#0f172a",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`;
                            e.currentTarget.style.borderColor = BRAND.accent;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                          }}
                        >
                          <option>Sat, Oct 28 - 2:00 PM</option>
                          <option>Sun, Oct 29 - 9:00 AM</option>
                          <option>Sun, Oct 29 - 2:00 PM</option>
                        </select>

                        <div
                          className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
                          style={{ color: BRAND.primary }}
                        >
                          <span className="material-symbols-outlined">
                            calendar_month
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="space-y-4">
                      <label
                        className="block text-sm font-black"
                        style={{ color: "#334155" }}
                      >
                        Thông tin người tham gia
                      </label>

                      <div
                        className="p-4 rounded-xl border space-y-3"
                        style={{
                          background: `${BRAND.soft}14`,
                          borderColor: `${BRAND.soft}66`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-black uppercase tracking-wider"
                            style={{ color: BRAND.primary }}
                          >
                            Người tham gia 1
                          </span>
                        </div>

                        {[
                          { ph: "Họ và tên", type: "text" },
                          { ph: "Địa chỉ Email", type: "email" },
                          { ph: "Số điện thoại", type: "tel" },
                        ].map((f) => (
                          <input
                            key={f.ph}
                            className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                            placeholder={f.ph}
                            type={f.type}
                            style={{
                              background: "rgba(255,255,255,0.85)",
                              border: `1px solid ${BRAND.soft}99`,
                              color: "#0f172a",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`;
                              e.currentTarget.style.borderColor = BRAND.accent;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                            }}
                          />
                        ))}
                      </div>

                      <button
                        className="w-full py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-black border-2 border-dashed"
                        style={{
                          borderColor: `${BRAND.soft}99`,
                          color: "#64748b",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = BRAND.accent;
                          e.currentTarget.style.color = BRAND.accent;
                          e.currentTarget.style.background = `${BRAND.soft}12`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${BRAND.soft}99`;
                          e.currentTarget.style.color = "#64748b";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">
                          add_circle
                        </span>
                        Thêm người tham gia
                      </button>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm font-semibold mb-6 p-3 rounded-lg border"
                    style={{
                      color: BRAND.accent,
                      background: `${BRAND.soft}18`,
                      borderColor: `${BRAND.soft}66`,
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">
                      local_fire_department
                    </span>
                    <span>Chỉ còn 4 chỗ cho ngày này!</span>
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full py-3.5 px-6 rounded-xl font-black text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{
                      background: BRAND.accent,
                      color: "white",
                      boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate("/select-session");
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(0.96)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "none")
                    }
                  >
                    Đặt ngay
                  </button>

                  <div className="mt-4 text-center">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                      Chưa cần thanh toán hôm nay
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
            style={{ borderColor: `${BRAND.soft}99` }}
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
                © 2023 Hands &amp; Hour Đà Nẵng. Bảo lưu mọi quyền.
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
