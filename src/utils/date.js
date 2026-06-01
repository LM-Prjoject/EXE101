export function pad2(value) {
  return String(value).padStart(2, "0");
}

export function toLocalDateKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate(),
  )}`;
}

export function parseDateKey(dateKey) {
  if (!dateKey) return new Date();

  const [year, month, day] = String(dateKey)
    .slice(0, 10)
    .split("-")
    .map(Number);

  if (!year || !month || !day) return new Date();

  return new Date(year, month - 1, day);
}

export function toDateKey(value) {
  if (!value) return "";

  if (value instanceof Date) {
    return toLocalDateKey(value);
  }

  return String(value).slice(0, 10);
}

export function formatDateVi(dateKey) {
  if (!dateKey) return "";

  const date = parseDateKey(dateKey);

  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthVi(date) {
  return date.toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });
}

export function formatTime(value) {
  if (!value) return "--:--";
  return String(value).slice(0, 5);
}

export function getTimeLabel(startTime, endTime) {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function getSessionLabel(startTime) {
  const hour = Number(String(startTime || "00:00").slice(0, 2));

  if (hour < 12) return "Buổi sáng";
  if (hour < 18) return "Buổi chiều";
  return "Buổi tối";
}

export function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();

  const blanks = Array.from({ length: firstDay.getDay() }, () => null);

  const days = Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1;
    const d = new Date(year, month, day);

    return {
      day,
      dateKey: toLocalDateKey(d),
    };
  });

  return [...blanks, ...days];
}