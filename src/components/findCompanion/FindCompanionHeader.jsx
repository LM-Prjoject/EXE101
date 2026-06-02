import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function FindCompanionHeader() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  const PRIMARY = "#f08a78"; // salmon (main)

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
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
  );
}
