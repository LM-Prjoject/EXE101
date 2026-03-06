import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useLayoutEffect, useRef, useMemo } from "react";

const userLinks = [
  { to: "/home", label: "Trang Chủ", icon: "home" },
  { to: "/advanced-search", label: "Tìm kiếm", icon: "search" },
  { to: "/my-schedule", label: "Lịch", icon: "calendar_today" },
  { to: "/community", label: "Cộng đồng", icon: "photo_camera" },
  { to: "/user-profile", label: "Hồ sơ", icon: "person" },
];

const hostLinks = [
  { to: "/host/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/host/workshops", label: "Workshop", icon: "menu_book" },
  { to: "/host/schedule", label: "Lịch", icon: "calendar_today" },
  { to: "/host/participants", label: "Học viên", icon: "group" },
  { to: "/host/income", label: "Thu nhập", icon: "payments" },
];

const AUTH_PAGES = ["/login", "/register"];

// helper: set CSS var on :root
function setNavHeightVar(px) {
  document.documentElement.style.setProperty("--floating-nav-h", `${px}px`);
}

export default function FloatingNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navRef = useRef(null);

  const shouldHide = AUTH_PAGES.includes(location.pathname) || !currentUser;

  const isHost = !!currentUser && currentUser.role === "host";
  const links = useMemo(() => (isHost ? hostLinks : userLinks), [isHost]);

  // ✅ BRAND COLORS
  const accentColor = isHost ? "#6F8B6F" : "#F08A78";
  const supportColor = isHost ? "#D5DDCE" : "#FBC4AE";
  const bgColor = "#F6F2E9";
  const textMuted = "rgba(195,153,108,0.78)";
  const dividerColor = isHost
    ? "rgba(111,139,111,0.25)"
    : "rgba(240,138,120,0.25)";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // đo height nav và set CSS var (kể cả khi resize)
  useLayoutEffect(() => {
    if (shouldHide) return;            // ✅ tránh chạy khi nav không render
    if (!navRef.current) return;

    const update = () => {
      const rect = navRef.current.getBoundingClientRect();
      setNavHeightVar(Math.ceil(rect.height));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(navRef.current);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [shouldHide]);

  // cleanup var khi unmount/ẩn
  useEffect(() => {
    if (shouldHide) {
      setNavHeightVar(0);
      return;
    }
    return () => setNavHeightVar(0);
  }, [shouldHide]);

  // ✅ return null đặt SAU hooks
  if (shouldHide) return null;

  return (
    <div
      ref={navRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(246,242,233,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: `2px solid ${dividerColor}`,
        boxShadow: isHost
          ? "0 -6px 28px rgba(111,139,111,0.18)"
          : "0 -6px 28px rgba(240,138,120,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.375rem 1rem",
        gap: "0.125rem",
        paddingBottom: "calc(0.375rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* User badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.375rem 0.75rem",
          marginRight: "0.25rem",
          borderRadius: "0.625rem",
          background: supportColor,
          minWidth: 60,
        }}
      >
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name || "User"}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${accentColor}`,
          }}
        />
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 800,
            color: accentColor,
            marginTop: 1,
            whiteSpace: "nowrap",
          }}
        >
          {isHost ? "Host" : "User"}
        </span>
      </div>

      <div
        style={{
          width: 1,
          height: 32,
          background: dividerColor,
          margin: "0 0.25rem",
        }}
      />

      {/* Page links */}
      {links.map(({ to, label, icon }) => {
        const active =
          location.pathname === to || location.pathname.startsWith(to + "/");
        return (
          <Link
            key={to}
            to={to}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.375rem 0.625rem",
              borderRadius: "0.625rem",
              textDecoration: "none",
              color: active ? bgColor : textMuted,
              background: active ? accentColor : "transparent",
              boxShadow: active ? `0 6px 18px ${accentColor}33` : "none",
              fontSize: "0.6rem",
              fontWeight: 700,
              minWidth: 48,
              transition: "all 0.15s",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {icon}
            </span>
            <span style={{ color: active ? bgColor : textMuted }}>{label}</span>
          </Link>
        );
      })}

      <div
        style={{
          width: 1,
          height: 32,
          background: dividerColor,
          margin: "0 0.25rem",
        }}
      />

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.375rem 0.625rem",
          borderRadius: "0.625rem",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#F08A78",
          fontSize: "0.6rem",
          fontWeight: 700,
          minWidth: 48,
          transition: "all 0.15s",
        }}
        type="button"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          logout
        </span>
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}