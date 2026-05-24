import { useNavigate, Link, useLocation } from "react-router-dom";

export default function ConfirmSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isError = location.pathname.includes("error");
  const isCancel = location.pathname.includes("cancel");

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
                {isError ? "sentiment_very_dissatisfied" : isCancel ? "sentiment_dissatisfied" : "celebration"}
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
                background: isError ? "#fee2e2" : isCancel ? "#fef3c7" : `${BRAND.soft}33`,
                borderColor: isError ? "#fecaca" : isCancel ? "#fde68a" : `${BRAND.soft}99`,
                color: isError ? "#ef4444" : isCancel ? "#f59e0b" : BRAND.accent,
              }}
            >
              <span className="material-symbols-outlined text-3xl">
                {isError ? "error" : isCancel ? "cancel" : "check_circle"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              {isError ? "Thanh toán thất bại ❌" : isCancel ? "Giao dịch đã bị hủy ⚠️" : "Thanh toán thành công! 🎉"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isError 
                ? "Đã xảy ra lỗi trong quá trình thực hiện thanh toán qua SmartPay. Vui lòng kiểm tra lại tài khoản hoặc thử lại sau."
                : isCancel 
                  ? "Bạn đã chủ động hủy quá trình thanh toán. Đơn đặt chỗ vẫn chưa hoàn tất."
                  : "Cảm ơn bạn đã hoàn tất giao dịch thanh toán."}
            </p>
          </div>

          {/* Success Card */}
          {!(isError || isCancel) && (
            <div className="w-full max-w-[600px] p-8 rounded-3xl bg-white border shadow-[0_10px_35px_rgba(240,138,120,0.08)] text-center flex flex-col gap-6"
                 style={{ borderColor: `${BRAND.soft}99` }}>
              <p className="text-slate-600 text-base leading-relaxed">
                Giao dịch thanh toán đã được thực hiện thành công. Cảm ơn bạn đã tin tưởng dịch vụ của Hands & Hour!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  onClick={() => navigate("/my-schedule")}
                  className="flex-1 h-12 rounded-xl border-2 font-black flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
                  style={{ borderColor: BRAND.soft, color: "#2b2b2b" }}
                >
                  Xem lịch đặt chỗ
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="flex-1 h-12 rounded-xl font-black flex items-center justify-center gap-2 text-white transition-all hover:opacity-90 shadow-md"
                  style={{ background: BRAND.accent, boxShadow: "0 8px 20px rgba(240,138,120,0.2)" }}
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          )}

          {/* Error or Cancel Warning Card */}
          {(isError || isCancel) && (
            <div className="w-full max-w-[600px] p-8 rounded-3xl bg-white border shadow-[0_10px_35px_rgba(240,138,120,0.08)] text-center flex flex-col gap-6"
                 style={{ borderColor: `${BRAND.soft}99` }}>
              <p className="text-slate-600 text-base leading-relaxed">
                {isError
                  ? "Vui lòng kiểm tra lại tài khoản, kết nối internet hoặc thử thực hiện lại giao dịch. Nếu tiền đã bị trừ nhưng vé chưa hiển thị, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi để được xử lý nhanh nhất."
                  : "Đừng lo lắng! Bạn có thể quay lại tìm kiếm thêm các workshop khác, hoặc thực hiện đăng ký lại bất cứ khi nào bạn sẵn sàng."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  onClick={() => navigate("/advanced-search")}
                  className="flex-1 h-12 rounded-xl border-2 font-black flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
                  style={{ borderColor: BRAND.soft, color: "#2b2b2b" }}
                >
                  Tìm workshop khác
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="flex-1 h-12 rounded-xl font-black flex items-center justify-center gap-2 text-white transition-all hover:opacity-90 shadow-md"
                  style={{ background: BRAND.accent, boxShadow: "0 8px 20px rgba(240,138,120,0.2)" }}
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          )}
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
              © 2025 Hands &amp; Hour. Được làm với sự nhiệt huyết tại Đà Nẵng.
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
