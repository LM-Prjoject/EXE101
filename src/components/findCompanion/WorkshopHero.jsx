import { BRAND } from "../../constants/findCompanionTheme";

export default function WorkshopHero({ detail }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              background: `${BRAND.soft}22`,
              borderColor: `${BRAND.soft}99`,
              color: BRAND.primary,
            }}
          >
            {detail.category}
          </span>

          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-sm"
              style={{ color: BRAND.primary }}
            >
              star
            </span>

            <span className="text-sm font-black" style={{ color: "#0f172a" }}>
              {Number(detail.rating).toFixed(1)}
            </span>

            <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>
              ({detail.reviewCount} đánh giá)
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black leading-tight">
          {detail.title}
        </h1>

        <div
          className="flex items-center gap-2 mt-2"
          style={{ color: "#64748b" }}
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ color: BRAND.primary }}
          >
            location_on
          </span>
          <span>{detail.location}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {["favorite", "share"].map((icon) => (
          <button
            key={icon}
            className="p-2.5 rounded-full border transition-colors"
            style={{
              borderColor: `${BRAND.soft}99`,
              color: "#94a3b8",
              background: "transparent",
            }}
          >
            <span className="material-symbols-outlined">{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
