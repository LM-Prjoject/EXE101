import { BRAND } from "../../constants/findCompanionTheme";

export default function PageState({ type, message, actionLabel, onAction }) {
  if (type === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-display"
        style={{ background: BRAND.lightBg }}
      >
        <div
          className="rounded-2xl border bg-white px-6 py-5 text-sm font-semibold"
          style={{ borderColor: `${BRAND.soft}99`, color: "#475569" }}
        >
          {message}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-display px-4"
      style={{ background: BRAND.lightBg }}
    >
      <div
        className="max-w-md rounded-2xl border bg-white p-6 text-center"
        style={{ borderColor: `${BRAND.soft}99` }}
      >
        <p className="mb-4 text-sm font-semibold" style={{ color: "#b91c1c" }}>
          {message}
        </p>

        {actionLabel ? (
          <button
            className="rounded-xl px-5 py-2 text-sm font-black text-white"
            style={{ background: BRAND.accent }}
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
