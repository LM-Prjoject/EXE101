export function formatRelativeTime(dateStr) {
  if (!dateStr) return "";

  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins} phút trước`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} tuần trước`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;

  return `${Math.floor(months / 12)} năm trước`;
}

export function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

export function formatDuration(minutes) {
  if (!minutes) return "Đang cập nhật";

  if (minutes < 60) return `${minutes} phút`;

  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} giờ`;
}

export function formatDate(date) {
  if (!date) return "Đang cập nhật";

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatLanguage(language) {
  if (!language) return "Đang cập nhật";

  const normalized = language.toLowerCase();

  if (normalized === "en") return "Tiếng Anh";
  if (normalized === "vi") return "Tiếng Việt";

  return language;
}

export function formatTimeOnly(timeStr) {
  if (!timeStr) return "";

  const parts = timeStr.split(":");

  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;

  return timeStr;
}

export function getWorkshopImageLinks(workshop) {
  const thumbnail = workshop?.thumbnailLink ?? workshop?.ThumbnailLink;

  const directLinks =
    workshop?.images ??
    workshop?.Images ??
    workshop?.imageLinks ??
    workshop?.ImageLinks ??
    [];

  const imageObjects =
    workshop?.workshopImages ?? workshop?.WorkshopImages ?? [];

  const linksFromObjects = Array.isArray(imageObjects)
    ? imageObjects
        .map(
          (img) =>
            img?.imgLink ?? img?.ImgLink ?? img?.imageLink ?? img?.ImageLink,
        )
        .filter(Boolean)
    : [];

  const result = [
    thumbnail,
    ...(Array.isArray(directLinks) ? directLinks : []),
    ...linksFromObjects,
  ].filter(Boolean);

  return [...new Set(result)].slice(0, 5);
}

export function getNumberValue(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      const number = Number(value);

      if (!Number.isNaN(number)) return number;
    }
  }

  return null;
}

export function getTodayDateKey() {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

export function isPastSchedule(startOnStr) {
  if (!startOnStr) return false;

  return startOnStr < getTodayDateKey();
}

export function isPastSlot(dateStr, timeStr) {
  if (!dateStr) return false;

  if (!timeStr) {
    return dateStr < getTodayDateKey();
  }

  let formattedTime = timeStr;

  if (formattedTime.split(":").length === 2) {
    formattedTime += ":00";
  }

  try {
    const slotDate = new Date(`${dateStr}T${formattedTime}`);
    const now = new Date();

    return slotDate < now;
  } catch (error) {
    console.error("Error parsing slot date:", error);
    return false;
  }
}