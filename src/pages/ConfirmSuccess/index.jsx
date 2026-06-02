import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ConfirmSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile } = useAuth();
  
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
              <button className="relative group">
                <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">
                  notifications
                </span>
                <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

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
              © 2025 Hands &amp; Hour. Được làm với sự nhiệt huyết.
            </p>
            <div className="flex gap-6">
              {["social_leaderboard", "photo_camera", "mail"].map((i) => (
                <a
                  key={i}
                  className="transition-colors"
                  href={
                    i === "photo_camera"
                      ? "https://www.instagram.com/workshop_handsandhour"
                      : "#"
                  }
                  target={i === "photo_camera" ? "_blank" : undefined}
                  rel={i === "photo_camera" ? "noopener noreferrer" : undefined}
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
