import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HostSidebar({ onNavigateRequest }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const path = location.pathname;

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);
    
    window.addEventListener("toggle-host-sidebar", handleToggle);
    window.addEventListener("close-host-sidebar", handleClose);
    
    return () => {
      window.removeEventListener("toggle-host-sidebar", handleToggle);
      window.removeEventListener("close-host-sidebar", handleClose);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  function handleNavigate(event, to) {
    if (!onNavigateRequest) return;

    event.preventDefault();
    onNavigateRequest(to);
  }
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      {/* Mobile Sidebar backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
        />
      )}
      <aside className={`w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 fixed md:sticky top-0 left-0 h-screen z-30 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-6 flex items-center gap-3">
        <img
          src="/img/logo.png"
          alt="Hands & Hour logo"
          className="h-9 w-9 object-contain"
        />
        <h2 className="text-xl font-black tracking-tight">
          <span className="text-[#c3996c]">Hands</span>{" "}
          <span className="text-[#6f8b6f]">&amp;</span>{" "}
          <span className="text-[#c3996c]">Hour</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/host/dashboard"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/host/dashboard"
          onClick={(event) => handleNavigate(event, "/host/dashboard")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/host/dashboard"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            dashboard
          </span>
          <span>Bảng điều khiển</span>
        </Link>

        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/host/workshops"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/host/workshops"
          onClick={(event) => handleNavigate(event, "/host/workshops")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/host/workshops"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            event_note
          </span>
          <span>Workshop của tôi</span>
        </Link>

        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/host/schedule"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/host/schedule"
          onClick={(event) => handleNavigate(event, "/host/schedule")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/host/schedule"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            calendar_today
          </span>
          <span>Lịch trình</span>
        </Link>

        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/host/profile"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/host/profile"
          onClick={(event) => handleNavigate(event, "/host/profile")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/host/profile"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            rate_review
          </span>
          <span>Đánh giá</span>
        </Link>

        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/host/income"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/host/income"
          onClick={(event) => handleNavigate(event, "/host/income")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/host/income"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            account_balance_wallet
          </span>
          <span>Thu nhập</span>
        </Link>

        <Link
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            path === "/user-profile"
              ? "bg-primary/10 text-primary font-bold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
          }`}
          to="/user-profile"
          onClick={(event) => handleNavigate(event, "/user-profile")}
        >
          <span
            className="material-symbols-outlined"
            style={
              path === "/user-profile"
                ? { fontVariationSettings: `'FILL' 1` }
                : {}
            }
          >
            account_circle
          </span>
          <span>Xem hồ sơ</span>
        </Link>

        <Link
          to="/host/create-workshop"
          onClick={(event) => handleNavigate(event, "/host/create-workshop")}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all font-bold text-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo Workshop
        </Link>
      </nav>

      {/* User profile & action buttons at the bottom of the sidebar */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="space-y-1">
          <Link
            to="/home"
            onClick={(event) => handleNavigate(event, "/home")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-xl">person</span>
            <span>Chế độ người dùng</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
