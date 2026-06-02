import { Link } from "react-router-dom";
import { BRAND } from "../../constants/findCompanionTheme";

export default function Breadcrumbs({ location }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link
        className="transition-colors hover:text-[#f08a78]"
        to="/home"
        style={{ color: "#64748b" }}
      >
        Trang chủ
      </Link>
      <span className="material-symbols-outlined text-base text-slate-400 select-none">chevron_right</span>
      <Link
        className="transition-colors hover:text-[#f08a78]"
        to="/advanced-search"
        style={{ color: "#64748b" }}
      >
        Workshops
      </Link>

      <span className="material-symbols-outlined text-base text-slate-400 select-none">chevron_right</span>

      <span className="font-semibold" style={{ color: "#0f172a" }}>
        {location}
      </span>
    </nav>
  );
}
