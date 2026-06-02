import { BRAND, cardStyle } from "../../constants/findCompanionTheme";

export default function HostInfoCard({ workshop, navigate }) {
  const hostId = workshop?.hostId || workshop?.HostId;

  if (!hostId) return null;

  const avatar = workshop?.hostAvatarLink || workshop?.HostAvatarLink;
  const hostName = workshop?.hostName || workshop?.HostName || "Người tổ chức";
  const hostLocation = workshop?.hostLocation || workshop?.HostLocation;

  return (
    <div className="p-5 rounded-2xl shadow-sm border" style={cardStyle}>
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
          style={{
            background: `${BRAND.soft}22`,
            borderColor: `${BRAND.soft}99`,
            color: BRAND.primary,
          }}
        >
          <span className="material-symbols-outlined text-base">
            storefront
          </span>
        </span>

        <h4 className="text-sm font-black" style={{ color: "#334155" }}>
          Người tổ chức
        </h4>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center overflow-hidden border-2"
          style={{
            borderColor: `${BRAND.soft}99`,
            background: `${BRAND.soft}33`,
            ...(avatar
              ? {
                  backgroundImage: `url('${avatar}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}),
          }}
        >
          {!avatar ? (
            <span
              className="material-symbols-outlined text-2xl"
              style={{ color: BRAND.primary }}
            >
              person
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="font-black text-sm leading-tight"
            style={{ color: "#0f172a" }}
          >
            {hostName}
          </div>

          {hostLocation ? (
            <div
              className="flex items-center gap-1 mt-1 text-xs"
              style={{ color: "#64748b" }}
            >
              <span
                className="material-symbols-outlined text-sm shrink-0"
                style={{ color: BRAND.primary }}
              >
                location_on
              </span>
              <span className="line-clamp-1">{hostLocation}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-2 py-3 border-t border-b mb-4"
        style={{ borderColor: `${BRAND.soft}55` }}
      >
        <HostStat
          icon="star"
          value={
            workshop?.rating != null ? Number(workshop.rating).toFixed(1) : "—"
          }
          label="Đánh giá"
        />
        <HostStat
          icon="rate_review"
          value={workshop?.reviewCount ?? workshop?.ReviewCount ?? "—"}
          label="Nhận xét"
        />
        <HostStat icon="verified" value="Host" label="Xác nhận" highlight />
      </div>


    </div>
  );
}

function HostStat({ icon, value, label, highlight }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="material-symbols-outlined text-base"
        style={{ color: BRAND.primary }}
      >
        {icon}
      </span>

      <span
        className="text-sm font-black"
        style={{ color: highlight ? BRAND.primary : "#0f172a" }}
      >
        {value}
      </span>

      <span className="text-[10px] font-semibold" style={{ color: "#94a3b8" }}>
        {label}
      </span>
    </div>
  );
}
