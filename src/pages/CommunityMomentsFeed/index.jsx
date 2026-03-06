import { useNavigate, Link } from "react-router-dom";

export default function CommunityMomentsFeed() {
  const navigate = useNavigate();

  // ===== Brand palette =====
  const ACCENT = "#f08a78"; // salmon (main)
  const SOFT = "#fbc4ae"; // peach (support)
  const GOLD = "#c3996c"; // warm gold (text)
  const BG = "#F6F2E9"; // page bg
  const TEXT = "#2b2b2b";
  const MUTED = "rgba(43,43,43,0.65)";
  const BORDER = "rgba(251,196,174,0.60)";

  // ✅ Ảnh đều: dùng 1 aspect cho tất cả card
  const MEDIA_ASPECT = "aspect-[4/5]";

  const CardWrap = ({ children, className = "" }) => (
    <div className={`break-inside-avoid ${className}`}>
      <div
        className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border"
        style={{
          background: "rgba(255,255,255,0.78)",
          borderColor: "rgba(251,196,174,0.55)",
        }}
      >
        {children}
      </div>
    </div>
  );

  const MediaBox = ({ children, toneBg = "rgba(251,196,174,0.18)" }) => (
  <div className={`relative ${MEDIA_ASPECT} overflow-hidden p-3`} style={{ background: toneBg }}>
    <div className="w-full h-full overflow-hidden rounded-xl">
      {children}
    </div>
  </div>
);

  return (
    <>
      <div
        className="font-display antialiased min-h-screen flex flex-col overflow-x-hidden"
        style={{
          background: BG,
          color: TEXT,
          paddingBottom:
            "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
        }}
      >
        {/* Navbar */}
        <header
          className="sticky top-0 z-50 w-full backdrop-blur-md border-b"
          style={{
            background: "rgba(254,254,253,0.85)",
            borderColor: BORDER,
          }}
        >
          <div className="px-6 md:px-10 lg:px-40 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex size-10 items-center justify-center overflow-visible">
                  <img
                    src="/public/img/onlyLogo.png"
                    alt="Hands & Hour Logo"
                    className="h-8 w-8 object-contain scale-150 origin-center"
                  />
                </div>

                <h2 className="flex text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <div
                className="hidden lg:flex w-full max-w-sm items-center rounded-xl border transition-colors"
                style={{
                  background: "rgba(251,196,174,0.25)",
                  borderColor: "transparent",
                }}
              >
                <div className="pl-4" style={{ color: "rgba(43,43,43,0.55)" }}>
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                </div>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 py-2.5 px-3 text-sm"
                  style={{ color: TEXT }}
                  placeholder="Tìm kiếm workshop, người sáng tạo..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  className="text-sm font-semibold transition-colors hover:text-[#f08a78]"
                  to="/home"
                >
                  Workshop
                </Link>
                <Link
                  className="text-sm font-semibold transition-colors hover:text-[#f08a78]"
                  to="/community"
                >
                  Cộng đồng
                </Link>
                <a
                  className="text-sm font-semibold transition-colors hover:text-[#f08a78]"
                  href="#"
                >
                  Giảng viên
                </a>
              </nav>

              <div
                className="h-6 w-px hidden md:block"
                style={{ background: BORDER }}
              />

              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="hidden sm:flex h-10 px-5 items-center justify-center rounded-xl text-sm font-bold transition-colors"
                  style={{ background: "rgba(251,196,174,0.25)", color: TEXT }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="h-10 px-5 flex items-center justify-center rounded-xl text-sm font-extrabold text-white transition-colors"
                  style={{
                    background: ACCENT,
                    boxShadow: "0 10px 24px rgba(240,138,120,0.22)",
                  }}
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-40 py-8">
          {/* Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider w-fit"
                style={{
                  background: "rgba(251,196,174,0.35)",
                  color: ACCENT,
                }}
              >
                <span className="material-symbols-outlined text-[16px]">
                  celebration
                </span>
                BỘ SƯU TẬP CỘNG ĐỒNG
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Khoảnh khắc <span style={{ color: ACCENT }}>Workshop</span>
              </h1>

              <p className="text-lg" style={{ color: MUTED }}>
                Xem cộng đồng sáng tạo tại Đà Nẵng đang làm gì! Từ bàn xoay gốm
                đến khung tranh, hãy khám phá niềm vui của đồ thủ công.
              </p>
            </div>

            <button
              className="flex items-center gap-2 h-12 px-6 rounded-xl font-extrabold shadow-xl transition-transform hover:-translate-y-[2px]"
              style={{
                background: TEXT,
                color: "white",
                boxShadow: "0 18px 40px rgba(43,43,43,0.14)",
              }}
              type="button"
              onClick={() => navigate("/community/create")}
            >
              <span className="material-symbols-outlined">add_a_photo</span>
              Chia sẻ khoảnh khắc
            </button>
          </div>

          {/* Filters */}
          <div
            className="sticky top-16 z-40 backdrop-blur-sm py-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ background: "rgba(246,242,233,0.92)" }}
          >
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
              {[
                { icon: "grid_view", label: "Tất cả", active: true },
                { icon: "brush", label: "Gốm sứ" },
                { icon: "palette", label: "Hội họa" },
                { icon: "styler", label: "Thêu thùa" },
                { icon: "diamond", label: "Trang sức" },
                { icon: "local_florist", label: "Cắm hoa" },
              ].map((x) => (
                <button
                  key={x.label}
                  className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full text-sm font-bold transition-all"
                  type="button"
                  style={
                    x.active
                      ? {
                          background: ACCENT,
                          color: "white",
                          boxShadow: "0 10px 24px rgba(240,138,120,0.22)",
                        }
                      : {
                          background: "rgba(255,255,255,0.75)",
                          color: "rgba(195,153,108,0.90)",
                          border: `1px solid ${BORDER}`,
                        }
                  }
                  onMouseEnter={(e) => {
                    if (x.active) return;
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.color = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    if (x.active) return;
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.color = "rgba(195,153,108,0.90)";
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {x.icon}
                  </span>
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Masonry Grid (chỉ card) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {/* Card 1 */}
            <CardWrap>
              <div className="p-3">
                <MediaBox paddingClass="p-4" toneBg="rgba(251,196,174,0.14)">
                  <div
                    className="absolute inset-0 m-2 rounded-lg pointer-events-none z-10 border-4 border-dashed"
                    style={{ borderColor: "rgba(240,138,120,0.35)" }}
                  />
                  <div className="absolute top-6 right-6 z-20 transform rotate-12 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-1 rounded shadow-lg border-2 border-white">
                    TÔI ĐÃ LÀM NÓ!
                  </div>
                  <img 
                    alt="Happy woman holding handmade pottery mug"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8v6j4wX99_YXuqq5AM89SUb-vIjFkLK7ejp_-Th3kbSIK0trKMOUEflGx6Tu8R1OG07tark9zsClcU9DRKK9hrgDJ1lwph4REmVe5zak-zb5fnYKxEolPt81_4HDNEwQdfh4bABnhghjXkK2jYEIcc7IZXD1S9R4peb9AEHR3nwzq3LU8EGOsdYEV5fuPK3GGr_rucjdauO21fRpY0xMvYDJ3QCZSyitE1nOI61d8ySWv7Ez4zhZkeLx5Rq3pCRftnh6TldBErbxB"
                  />
                </MediaBox>

                <div className="mt-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <img
                      alt="User Avatar"
                      className="size-8 rounded-full border-2"
                      style={{ borderColor: "white" }}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWlXr0CnWpu9FdmcGXPAJccXHbnEgqQn6NPJp5w0lU5sXLSAabsN3mT4w4YKWzm3v0NUAd-0qw8xKXZDUWY1mp_Tu5jWZTcjXGoGURGMrIBRMDhN91G2fsW-LRLvs9dK1H3VEKceI4QQii1Jl-njVds4lndyXngd1RjrK1lEP6XWDuglZVkSrVU_G-JrfGc5DDgrBlT-BbQJX2dDZXsG84rAI9SPuPLGtuICbafBHPBRA500tQJ7X-c0xBnUQ75s4Gzu7XodDHsymN"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-black leading-none">
                        Linh Nguyen
                      </span>
                      <span className="text-xs" style={{ color: MUTED }}>
                        Workshop Gốm sứ
                      </span>
                    </div>
                  </div>
                  <button
                    className="transition-transform hover:scale-110"
                    style={{ color: ACCENT }}
                    type="button"
                  >
                    <span className="material-symbols-outlined fill-current">
                      favorite
                    </span>
                  </button>
                </div>
              </div>
            </CardWrap>

            {/* Card 2 */}
            <CardWrap>
              <MediaBox>
                <img
                  alt="Colorful abstract oil painting on canvas"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWqOodFQX7EIbkUw6KCSq98VzsWP5ITyETm9DNPHMmPEcnhs1mexk8RNGprDlrnbGSavhD8nAMYSwkLGjzNgY0WAduRko8A3EAHL_r7aJZgR7n-d2HBtl2wSu5grerdDAf_CFirLMJ4q54oEnvUAtI6F_ip20ZBmEXm4skwxIxkfVlkJqNpul8SKlO4x0fpserAdSzmRxRowg8d5JFcAbJG6hNckJhsVaFPxGHQYkjJIJYWUcqZzYojZw2iBMH2AWyVlvXHeUFJzj6"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1 text-white font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      favorite
                    </span>{" "}
                    24
                  </div>
                </div>
              </MediaBox>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black">Hoàng hôn trừu tượng</h3>
                  <div className="flex text-yellow-500 text-[14px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-current"
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm line-clamp-2" style={{ color: MUTED }}>
                  Lần đầu thử vẽ tranh sơn dầu và tôi thực sự bị mê hoặc bởi kết
                  quả này!
                </p>
                <div
                  className="mt-3 pt-3 flex items-center gap-2 border-t"
                  style={{ borderColor: "rgba(251,196,174,0.35)" }}
                >
                  <img
                    alt="User Avatar"
                    className="size-6 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoYMOfuhSrCgzKcb1j4gxGdT6YQgiHkgjJFmIAZlJ9fdFpXJdeK6lcw3LxkTt884V7oALpEkfJbCt4S3_Sy5TVDQMeFl-sZA7vh0CS6YDkSHIHgsgv1zOTcbfVGXIjjXmVDkhTKvIguxffybZHDBaTZYpGjF6vQtJCNCZ7YhpZjNoXpBYxf7TrqUWLO_yIaavlltb22CVGmBD-qfhuK9DWKd_2k2VLBk6I1Q-bf9MohtS8Zcx7f60EH4ifZiSUFP6OnMQdiGfBiyVJ"
                  />
                  <span className="text-xs font-semibold" style={{ color: MUTED }}>
                    bởi Sarah Jenkins
                  </span>
                </div>
              </div>
            </CardWrap>

            {/* Card 3 */}
            <CardWrap>
              <div className="p-3">
                <MediaBox paddingClass="p-3" toneBg="rgba(111,139,111,0.10)">
                  <div className="absolute top-2 left-2 size-3 rounded-full bg-blue-300" />
                  <div className="absolute top-2 right-2 size-3 rounded-full bg-blue-300" />
                  <div className="absolute bottom-2 left-2 size-3 rounded-full bg-blue-300" />
                  <div className="absolute bottom-2 right-2 size-3 rounded-full bg-blue-300" />

                  <div className="absolute bottom-8 left-4 z-20 bg-white text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-gray-200 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-blue-500">
                      water_drop
                    </span>
                    Mới ra lò
                  </div>

                  <img
                    alt="Blue ceramic vase on wooden table"
                      className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZFRJzXDTfH46MFEujI-zg4kFY6DCPoj2yk4pLGwGOPgE1bRzzahfdWMC0S8deAmJ4gWUsJ7cBMVRwlBm3yKWoFSP80p8pzDa2l0PNT53lIeLZZUUBJudsgjfniKxw15zl4nfLuYfylp0KNFc6o6diAR_tQyBOecubA6bJAOLGyDRzvo8XxpNannw16IMkcFEpIfbFar90HbcW8uHbjXb5RvZpy5k3-oT3rfj6LjDoLMkHBP93-9ZWXMoL0SUN7NaqzDw5-yo_n8Ln"
                  />
                </MediaBox>

                <div className="mt-3 px-1">
                  <p className="text-sm font-black">Bình sóng xanh 🌊</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-semibold" style={{ color: MUTED }}>
                      Da Nang Pottery Studio
                    </span>
                    <button
                      className="transition-colors"
                      style={{ color: MUTED }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </CardWrap>

            {/* Card 4 */}
            <CardWrap>
              <MediaBox>
                <img
                  alt="Hands creating floral arrangement"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE9qsY-yHPHKozcUQ4iS4w-m4E9KcUDEs-VMBjP5AM47TV9iKr1C5-JBqXoup2MhhPdJX83fSWoGyaAVr_j2MvP_ePWtIMWxs87MSMZx9yMPDnIcBhgzR1NDO31CghRnLfBCY_TQMCyjd2lJhnwPOtkRuejz5WeSYROHAzcLxrRDotjnNYA3lMTxBqW-SU66IaC_2wFYN-QI0hrMi7fw06VIzIRaJkbxbVnYjYfSgw0hM-JtciTNZrhBd7cF6rD8lFTssBPDfWm28I"
                />
              </MediaBox>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide"
                    style={{ background: "rgba(251,196,174,0.35)", color: ACCENT }}
                  >
                    Cắm hoa
                  </span>
                  <div className="flex text-yellow-500 text-[12px] ml-auto">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-current text-[16px]"
                      >
                        star
                      </span>
                    ))}
                    <span className="material-symbols-outlined fill-current text-[16px]">
                      star_half
                    </span>
                  </div>
                </div>
                <p className="text-sm font-black mb-1">
                  Một buổi chiều chủ nhật ý nghĩa
                </p>
                <p className="text-xs" style={{ color: MUTED }}>
                  Giảng viên rất kiên nhẫn với những người mới bắt đầu như chúng
                  tôi.
                </p>
              </div>
            </CardWrap>

            {/* Card 5 */}
            <CardWrap>
              <div className="p-3">
                <MediaBox paddingClass="p-2" toneBg="rgba(195,153,108,0.08)">
                  <div
                    className="h-full w-full rounded-lg border-2 relative overflow-hidden"
                    style={{ borderColor: "rgba(251,196,174,0.55)" }}
                  >
                    <img
                      alt="Silver ring with gemstone"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2zv-8naHDbh5xq_wXprGVGg_nA_ocdGEkfRlfJYD_VrPdP3NXukc_WvKSzzxuwzo920a_QQ5uf48y1BK8eMh7xrEl1z8bTXOT8eC2emF9PNTAcdY3LEFeU-ZcgK7V0YQcXUKepMU7Zm7dMb-nNRBiMtQfUF7ueaMDVLxauujZ8wKUiFOdpLezKeAftBuyXSXIfMoX7pYQOKJ4OilRFLkcV3AOewXDeWlRt4KY4I2ek_5U3rMA6iJlBTfUwllOIZo0JY36p4s72YRiP"
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 rotate-2 shadow-sm" />
                  </div>
                  <div className="absolute bottom-3 right-3 z-20">
                    <span className="text-2xl filter drop-shadow-md">✨</span>
                  </div>
                </MediaBox>

                <div className="mt-3 flex items-center gap-3 px-1">
                  <img
                    alt="User Avatar"
                    className="size-8 rounded-full border-2"
                    style={{ borderColor: "rgba(251,196,174,0.55)" }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwvPZVZsZI0ULjyAItCujuNr-pOQIPVV0eP0_ZKcMVqyVi9P0FUI_Mjn2XF071-HxwjPk5AfSh60WJE3psxkttHpXQQkEER_06-7TGyEPO7aBo65v0_gG8GaNmaEndNagRkpEXQz88NxllvJqWHKq2uyYswpXvpOZhnVvnYsw2BwtBb2tijPJMqtzFElVQYBxBG_s7QAMBOlPMIZ3kAC4XpRcbbj_wPoZ3CqxRu3R3wOQteHbR4G7_KyoQFAqttAzjdNzrkiZkO96m"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-black">Nhẫn bạc</span>
                    <span className="text-xs" style={{ color: MUTED }}>
                      @JewelryClass
                    </span>
                  </div>
                </div>
              </div>
            </CardWrap>

            {/* Card 6 */}
            <CardWrap>
              <MediaBox>
                <img
                  alt="Handmade tote bag with painted design"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByC-eQvTr_aljqsHqtpaREx5aniFQqZ3LTJMjvCR7SwoGf6OD_wVj5hBuO9Vn7Ltzhbb2kG9Ymmffisch4MtDJ0AZBJfX10F4BnuGKwyRj_w5kEXe50-LY7UHwaDHuSUOOh5_OYe5kYsS0hpqoOVgnQ3fCKFqwLBzCfx88Lx4THmo93KITLydrwDDFvQjcZhREAEotxIv-ELk3lD6Cjqw-K1iWDbAoCzih6E0ZUsJb02hHLWXiKdijb01jn510v9HujRRS8H4cCkzzo"
                />
              </MediaBox>
              <div className="p-4">
                <h3 className="font-black mb-1">Workshop Túi vải Eco</h3>
                <p className="text-sm" style={{ color: MUTED }}>
                  Cuối cùng cũng tự tay làm được chiếc túi riêng để đi chợ! 🌿
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-black uppercase">
                    Eco
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-[10px] font-black uppercase">
                    Art
                  </span>
                </div>
              </div>
            </CardWrap>

            {/* Card 7 */}
            <CardWrap>
              <div className="p-3">
                <MediaBox paddingClass="p-4" toneBg="rgba(240,138,120,0.10)">
                  <div className="w-full h-full bg-white p-1 shadow-md rotate-1 transform transition-transform hover:rotate-0">
                    <img
                      alt="Macrame wall hanger"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUFEst7_lPRcjZ4kOm6rWdMCh4uGsmkMZFp2-cAVag9Fmrei2KhxZWHX-_2buf8Fg7MnM8wOREmmwEwWFKIN0TQweOHOaJ9xsHxlGeItzwvqQ4aPdUStB02rSUGXS-AvJFFMswqA1CHO7TL972H6Fa8dL0BoZ7XEPQCXbskBeKBNqgjAIXISqEqSsvXiA6fYstEeZOB8p8ZF39gXlcGJcB7MwgXXzP90WV6KNCzr_1TfelDydvxaYswLkcHfSYX3BYnivbAbIlWhWv"
                    />
                  </div>

                  <div className="absolute top-4 left-4 z-20 -rotate-12">
                    <div
                      className="text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-wide text-white"
                      style={{ background: ACCENT }}
                    >
                      THỦ CÔNG
                    </div>
                  </div>
                </MediaBox>

                <div className="mt-3 px-1 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <img
                      alt="Liker 1"
                      className="w-6 h-6 rounded-full border-2 border-white"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJTGXD3kpOlQgGRYAyTGOUjmMihcdKdv6U2ZfofbKGSjXU6qi97zwdM6QKwtN-P_zZG-70_zaw0PwJYbI3i5dCdTA4kjp2hOzCdEiMjqXfcr9QHdfWLXnUHHmmCJ3kw0L4-ZAdbPXJgfjagwVZr59Xmjg6XFlLIUXOhx2N163NVfCy8FriKADELXf54t4auIHal9NmA2FlHMW1X0iQLbkRORuwihayAJ-5D2bsIkURbWEkQclYSTxW_tIyZ1BE842yZSfo2X6qAdXN"
                    />
                    <img
                      alt="Liker 2"
                      className="w-6 h-6 rounded-full border-2 border-white"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqnpzQCJ4GUeEnxGwhVD7YlMIFEdSJaPeFQ9sn99lnfimPTfM8EdmmJSVKIliRlvDEu_40wCdf60rbGDN3dC5_udZa_XIFZTNjgYybEgWkJnsiAI-OuHIr-hh3jInqzI97rUTOWJmYPinR7gwOyvx5JpG-LY7pYkbf1Ac2WfjPlBb0qO7MtJOk1QKTE3unbVUR62AFJym-k_UMv70l3bCXRzqk7Kaq-k4r-OgbwSk4e_YNhSye60Fn78t3xhi_Tbe74fFnTWIOcVIu"
                    />
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-500">
                      +12
                    </div>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: MUTED }}>
                    2 giờ trước
                  </span>
                </div>
              </div>
            </CardWrap>
          </div>

          {/* ✅ Pagination để DƯỚI CÙNG (ngoài masonry) */}
          <div className="mt-12 pb-4 flex items-center justify-center gap-2">
            <button
              className="size-10 flex items-center justify-center rounded-xl border transition-colors"
              style={{
                background: "rgba(255,255,255,0.75)",
                borderColor: BORDER,
                color: TEXT,
              }}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = TEXT;
              }}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <button
              className="size-10 flex items-center justify-center rounded-xl font-black text-white"
              style={{
                background: ACCENT,
                boxShadow: "0 10px 24px rgba(240,138,120,0.22)",
              }}
              type="button"
            >
              1
            </button>

            {[2, 3].map((n) => (
              <button
                key={n}
                className="size-10 flex items-center justify-center rounded-xl border transition-colors font-black"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  borderColor: BORDER,
                  color: MUTED,
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER;
                  e.currentTarget.style.color = MUTED;
                }}
              >
                {n}
              </button>
            ))}

            <span className="flex items-center justify-center" style={{ color: MUTED }}>
              ...
            </span>

            <button
              className="size-10 flex items-center justify-center rounded-xl border transition-colors font-black"
              style={{
                background: "rgba(255,255,255,0.75)",
                borderColor: BORDER,
                color: MUTED,
              }}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = MUTED;
              }}
            >
              12
            </button>

            <button
              className="size-10 flex items-center justify-center rounded-xl border transition-colors"
              style={{
                background: "rgba(255,255,255,0.75)",
                borderColor: BORDER,
                color: TEXT,
              }}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = TEXT;
              }}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="border-t mt-auto"
          style={{
            borderColor: BORDER,
            background: "rgba(255,255,255,0.70)",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-40 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src="/public/img/onlyLogo.png"
                  alt="Hands & Hour logo"
                  className="h-7 w-7 object-contain"
                />
                <span className="text-lg font-black" style={{ color: GOLD }}>
                  Hands &amp; Hour
                </span>
              </div>

              <div className="text-sm" style={{ color: MUTED }}>
                © 2023 Hands &amp; Hour. Được tạo ra với tình yêu tại Đà Nẵng.
              </div>

              <div className="flex gap-4">
                <a
                  className="transition-colors"
                  style={{ color: MUTED }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                  href="#"
                >
                  <i className="material-symbols-outlined">photo_camera</i>
                </a>
                <a
                  className="transition-colors"
                  style={{ color: MUTED }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                  href="#"
                >
                  <i className="material-symbols-outlined">mail</i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}