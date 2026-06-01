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

      <p className="mb-4" style={{ color: "#475569" }}>
        {location}
      </p>

      <div
        className="w-full h-64 rounded-xl overflow-hidden relative border"
        style={{ borderColor: `${BRAND.soft}66` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtIWSx14MMPaeWx1lHgEP9j_vka6UJwxYzU1PiS5fBFzq4MxiU4dMUu72wR2DZ72Pfwh_WLOj2wXdl4tk0Bq9i0c1cOjbLAOkYAeltsd5A-JK2kEGC9scx0-ucB0_BG7CJ3gPhB2ne9vb4FS1hsT976fMmsvPNow8tkZXnrvCmtvdL0c_-Sx_S5YUpZhFut6muNCa7DITe2OcxzakoQmNMQf23-B_ecG7tnWYsp37jFCX4uUwGQ8NsNr42OQyKV_tY3mFyrbk3ue4l')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ background: "rgba(240,138,120,0.06)" }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="material-symbols-outlined text-5xl drop-shadow-xl animate-bounce"
            style={{ color: BRAND.accent }}
          >
            location_on
          </span>
        </div>

        <div
          className="absolute bottom-4 right-4 p-2 rounded-lg shadow-lg text-xs font-black cursor-pointer border"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: `${BRAND.soft}66`,
            color: "#0f172a",
          }}
        >
          Mở trong Google Maps
        </div>
      </div>
    </section>
  );
}
