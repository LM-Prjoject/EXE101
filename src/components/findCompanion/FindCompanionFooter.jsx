import { BRAND } from "../../constants/findCompanionTheme";

export default function FindCompanionFooter() {
  return (
    <footer
      className="border-t py-12"
      style={{
        background: "rgba(255,255,255,0.82)",
        borderColor: `${BRAND.soft}99`,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 overflow-visible">
              <img
                src="/img/onlyLogo.png"
                alt="Hands & Hour logo"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 object-contain"
              />
            </div>

            <span className="text-lg font-black" style={{ color: "#0f172a" }}>
              Hands &amp; Hour
            </span>
          </div>

          <div className="text-sm" style={{ color: "#64748b" }}>
            © 2025 Hands &amp; Hour Đà Nẵng. Bảo lưu mọi quyền.
          </div>

          <div className="flex gap-4">
            {["social_leaderboard", "camera_alt"].map((icon) => (
              <a key={icon} href="#" style={{ color: "#94a3b8" }}>
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
