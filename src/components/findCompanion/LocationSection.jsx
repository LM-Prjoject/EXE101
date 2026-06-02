import { BRAND, cardStyle } from "../../constants/findCompanionTheme";

export default function LocationSection({ location }) {
  return (
    <section
      className="p-6 sm:p-8 rounded-2xl shadow-sm border"
      style={cardStyle}
    >
      <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center border"
          style={{
            background: `${BRAND.soft}22`,
            borderColor: `${BRAND.soft}99`,
            color: BRAND.primary,
          }}
        >
          <span className="material-symbols-outlined text-xl">location_on</span>
        </span>
        Địa điểm
      </h2>

      <p style={{ color: "#475569" }}>
        {location}
      </p>
    </section>
  );
}
