import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HostHeader({ title, children, profileOverride }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();
  const profile = profileOverride || userProfile || currentUser;

  const displayName =
    profile?.name ||
    currentUser?.name ||
    currentUser?.email?.split("@")[0] ||
    "host";

  const displayEmail = profile?.email || currentUser?.email || "host";

  const avatarUrl =
    profile?.avatarLink ||
    profile?.avatarUrl ||
    currentUser?.avatarLink ||
    currentUser?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6f8b6f&color=fff`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handleScroll() {
      setIsMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleViewProfile = () => {
    setIsMenuOpen(false);
    navigate("/user-profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        {children}

        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm"
            placeholder="Tìm kiếm..."
            type="text"
          />
        </div>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="size-10 rounded-full overflow-hidden border-2 border-primary focus:outline-none bg-center bg-cover"
            aria-label={displayName}
            data-alt={`${displayName} avatar menu toggle`}
            style={{
              backgroundImage: `url("${avatarUrl}")`,
            }}
          ></button>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-30 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-[9999] animate-fade-in-up">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {displayEmail}
                </p>
              </div>

              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                onClick={handleViewProfile}
              >
                <span className="material-symbols-outlined text-slate-500 text-xl">
                  person
                </span>
                <span className="text-sm font-medium">Xem hồ sơ</span>
              </button>

              <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-red-500 text-left"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined text-xl">
                  logout
                </span>
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
