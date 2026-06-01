import { BRAND, cardStyle } from "../../constants/findCompanionTheme";

const CATEGORY_LABELS = {
  1: "Làm gốm",
  2: "Hội họa",
  3: "Trang sức",
  4: "Dệt may",
  5: "Khác",
};

const LEVEL_LABELS = {
  1: "Cơ bản",
  2: "Trung cấp",
  3: "Nâng cao",
};

const CATEGORY_TEXT_MAP = {
  art: "Hội họa",
  painting: "Hội họa",
  "hội họa": "Hội họa",

  pottery: "Làm gốm",
  ceramic: "Làm gốm",
  ceramics: "Làm gốm",
  "làm gốm": "Làm gốm",

  jewelry: "Trang sức",
  jewellery: "Trang sức",
  "trang sức": "Trang sức",

  textile: "Dệt may",
  textiles: "Dệt may",
  sewing: "Dệt may",
  design: "Dệt may",
  "dệt may": "Dệt may",

  other: "Khác",
  others: "Khác",
  khác: "Khác",
};

const LEVEL_TEXT_MAP = {
  elementary: "Cơ bản",
  basic: "Cơ bản",
  beginner: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getCategoryName(detail) {
  const categoryId = Number(detail.categoryId ?? detail.CategoryId);

  if (CATEGORY_LABELS[categoryId]) {
    return CATEGORY_LABELS[categoryId];
  }

  const originalCategory = detail.category ?? detail.Category ?? "";
  const rawCategory = normalizeText(originalCategory);

  return CATEGORY_TEXT_MAP[rawCategory] || originalCategory || "Đang cập nhật";
}

function getLevelName(detail) {
  const levelId = Number(detail.levelId ?? detail.LevelId);

  if (LEVEL_LABELS[levelId]) {
    return LEVEL_LABELS[levelId];
  }

  const rawLevel = normalizeText(detail.level ?? detail.Level);

  return LEVEL_TEXT_MAP[rawLevel] || "Đang cập nhật";
}

function formatDuration(duration) {
  if (!duration) return "Đang cập nhật";

  const value = String(duration).trim();

  if (
    value.includes("phút") ||
    value.includes("giờ") ||
    value.includes("hour") ||
    value.includes("minute")
  ) {
    return value;
  }

  return `${value} phút`;
}

export default function AboutSection({ detail, activeRemainingTickets }) {
  const items = [
    {
      label: "Thời lượng",
      icon: "schedule",
      value: formatDuration(detail.duration),
    },
    {
      label: "Danh mục",
      icon: "category",
      value: getCategoryName(detail),
    },
    {
      label: "Trình độ",
      icon: "stairs",
      value: getLevelName(detail),
    },
    {
      label: "Ngôn ngữ",
      icon: "translate",
      value: detail.language || "Đang cập nhật",
    },
    {
      label: "Còn trống",
      icon: "groups",
      value:
        activeRemainingTickets !== null && activeRemainingTickets !== undefined
          ? `${activeRemainingTickets} chỗ`
          : "Đang cập nhật",
    },
  ];

  return (
    <section
      className="p-6 sm:p-8 rounded-2xl shadow-sm border"
      style={cardStyle}
    >
      <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
        <SectionIcon icon="info" />
        Về buổi Workshop
      </h2>

      <div className="max-w-none leading-relaxed" style={{ color: "#475569" }}>
        <p className="mb-4">
          {detail.description || "Chưa có mô tả cho workshop này."}
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-8 border-t"
        style={{ borderColor: `${BRAND.soft}66` }}
      >
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: "#94a3b8" }}
            >
              {item.label}
            </span>

            <span
              className="font-semibold flex items-center gap-2"
              style={{ color: "#0f172a" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: BRAND.primary }}
              >
                {item.icon}
              </span>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionIcon({ icon }) {
  return (
    <span
      className="w-8 h-8 rounded-lg flex items-center justify-center border"
      style={{
        background: `${BRAND.soft}22`,
        borderColor: `${BRAND.soft}99`,
        color: BRAND.primary,
      }}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </span>
  );
}
