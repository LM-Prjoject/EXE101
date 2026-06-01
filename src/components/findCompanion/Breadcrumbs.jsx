import { BRAND } from "../../constants/findCompanionTheme";

export default function Breadcrumbs({ location }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {["Trang chủ", "Workshops"].map((label) => (
        <a
          key={label}
          className="transition-colors"
          href="#"
          style={{ color: "#64748b" }}
        >
          {label}
        </a>
      ))}

      <span className="material-symbols-outlined text-base">chevron_right</span>

      <span className="font-semibold" style={{ color: "#0f172a" }}>
        {location}
      </span>
    </nav>
  );
}
