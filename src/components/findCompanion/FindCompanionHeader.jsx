import { Link } from "react-router-dom";
import { BRAND } from "../../constants/findCompanionTheme";

export default function FindCompanionHeader({ currentUser }) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{
        background: "rgba(254,254,253,0.82)",
        borderColor: `${BRAND.soft}99`,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
        <Link className="flex items-center gap-3 group" to="/home">
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

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              className="text-sm font-semibold"
              to="/login"
              style={{ color: "#334155" }}
            >
              Workshops
            </Link>

            <Link
              className="text-sm font-semibold"
              to="/register"
              style={{ color: "#334155" }}
            >
              Sự kiện
            </Link>

            <a
              className="text-sm font-semibold"
              href="#"
              style={{ color: "#334155" }}
            >
              Blog
            </a>
          </nav>

          <div
            className="flex items-center gap-3 pl-6 border-l"
            style={{ borderColor: `${BRAND.soft}99` }}
          >
            {currentUser ? (
              <div
                className="text-sm font-semibold"
                style={{ color: "#334155" }}
              >
                Xin chào,{" "}
                <span className="font-black" style={{ color: BRAND.primary }}>
                  {currentUser.name || currentUser.email?.split("@")[0]}
                </span>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex h-10 px-4 items-center justify-center rounded-xl text-sm font-black"
                  style={{
                    background: `${BRAND.soft}22`,
                    border: `1px solid ${BRAND.soft}99`,
                    color: "#0f172a",
                  }}
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="font-black py-2.5 px-5 rounded-xl"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                    boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
                  }}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
