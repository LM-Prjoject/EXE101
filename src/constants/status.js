export const STATUS_DOT_CLASS = {
  verified: "bg-green-500",
  active: "bg-green-500",

  pending: "bg-yellow-500",

  draft: "bg-slate-400",

  ended: "bg-blue-500",
  completed: "bg-blue-500",

  removed: "bg-red-500",
};

export const STATUS_LABEL = {
  verified: "Đã duyệt",
  active: "Đang hoạt động",

  pending: "Chờ duyệt",

  draft: "Bản nháp",

  ended: "Đã hoàn thành",
  completed: "Đã hoàn thành",

  removed: "Đã xóa",
};

export function getStatusKey(status) {
  return String(status || "")
    .trim()
    .toLowerCase();
}

export function getStatusDotClass(status) {
  return STATUS_DOT_CLASS[getStatusKey(status)] || "bg-primary";
}

export function getStatusLabel(status) {
  return STATUS_LABEL[getStatusKey(status)] || "Không rõ";
}

export function getDateStatusKeys(slots) {
  return [
    ...new Set(
      (slots || []).map((slot) => getStatusKey(slot.status)).filter(Boolean),
    ),
  ];
}