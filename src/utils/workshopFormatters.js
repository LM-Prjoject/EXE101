export function formatScheduleDate(startOn) {
  if (!startOn) return "Chưa có lịch";

  const date = new Date(`${startOn}T00:00:00`);

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const categoryOptions = [
  { id: 2, label: "Làm gốm", icon: "emoji_food_beverage" },
  { id: 1, label: "Hội họa", icon: "brush" },
  { id: 3, label: "Trang sức", icon: "diamond" },
  { id: 4, label: "Dệt may", icon: "content_cut" },
  { id: 5, label: "Khác", icon: "category" },
];

export const levelOptions = [
  { id: 1, label: "Cơ bản" },
  { id: 2, label: "Trung cấp" },
  { id: 3, label: "Nâng cao" },
];

export function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

export function keepValue(newValue, oldValue, fallback = null) {
  if (hasValue(newValue)) return newValue;
  if (hasValue(oldValue)) return oldValue;
  return fallback;
}

export function normalizeDate(value) {
  if (!hasValue(value)) return "";
  return String(value).slice(0, 10);
}

export function normalizeTime(value) {
  if (!hasValue(value)) return "";
  return String(value).slice(0, 5);
}

export function getFirstSchedule(workshop) {
  const schedules = [...(workshop?.schedules ?? workshop?.Schedules ?? [])];

  return schedules.sort(
    (a, b) =>
      new Date(`${a.startOn ?? a.StartOn}T00:00:00`) -
      new Date(`${b.startOn ?? b.StartOn}T00:00:00`),
  )[0];
}

export function getFirstTicket(schedule) {
  const tickets = schedule?.tickets ?? schedule?.Tickets ?? [];
  return tickets[0];
}

export function resolveCategoryId(workshop) {
  const direct =
    workshop?.categoryId ??
    workshop?.CategoryId ??
    workshop?.categoryID ??
    workshop?.CategoryID;

  if (hasValue(direct)) return Number(direct);

  const category = workshop?.category ?? workshop?.Category;

  if (typeof category === "object" && category !== null) {
    const objectId = category.id ?? category.Id ?? category.categoryId;
    if (hasValue(objectId)) return Number(objectId);

    const objectName = category.name ?? category.Name ?? category.label;
    const matched = categoryOptions.find(
      (item) =>
        item.label.toLowerCase() === String(objectName).trim().toLowerCase(),
    );

    return matched?.id;
  }

  const matched = categoryOptions.find(
    (item) =>
      item.label.toLowerCase() === String(category).trim().toLowerCase(),
  );

  return matched?.id;
}

export function resolveLevelId(workshop) {
  const direct =
    workshop?.levelId ??
    workshop?.LevelId ??
    workshop?.levelID ??
    workshop?.LevelID;

  if (hasValue(direct)) return Number(direct);

  const level = workshop?.level ?? workshop?.Level;

  if (typeof level === "object" && level !== null) {
    const objectId = level.id ?? level.Id ?? level.levelId;
    if (hasValue(objectId)) return Number(objectId);

    const objectName = level.name ?? level.Name ?? level.label;
    const matched = levelOptions.find(
      (item) =>
        item.label.toLowerCase() === String(objectName).trim().toLowerCase(),
    );

    return matched?.id;
  }

  const matched = levelOptions.find(
    (item) => item.label.toLowerCase() === String(level).trim().toLowerCase(),
  );

  return matched?.id;
}

export function getOldWorkshopValues(workshop) {
  const firstSchedule = getFirstSchedule(workshop);
  const firstTicket = getFirstTicket(firstSchedule);

  return {
    title: workshop?.title ?? workshop?.Title,
    description: workshop?.description ?? workshop?.Description,
    location: workshop?.location ?? workshop?.Location,

    categoryId: resolveCategoryId(workshop),
    levelId: resolveLevelId(workshop),

    thumbnailLink: workshop?.thumbnailLink ?? workshop?.ThumbnailLink,

    language: workshop?.language ?? workshop?.Language,
    status: workshop?.status ?? workshop?.Status,

    date:
      firstSchedule?.startOn ??
      firstSchedule?.StartOn ??
      workshop?.nextSchedule ??
      workshop?.NextSchedule ??
      workshop?.startOn ??
      workshop?.StartOn,

    startTime:
      firstTicket?.startTime ??
      firstTicket?.StartTime ??
      firstSchedule?.startTime ??
      firstSchedule?.StartTime,

    endTime:
      firstTicket?.endTime ??
      firstTicket?.EndTime ??
      firstSchedule?.endTime ??
      firstSchedule?.EndTime,

    price:
      firstTicket?.price ??
      firstTicket?.Price ??
      firstSchedule?.priceLower ??
      firstSchedule?.PriceLower ??
      workshop?.priceLower ??
      workshop?.PriceLower,

    maxTickets:
      firstTicket?.maxTickets ??
      firstTicket?.MaxTickets ??
      firstSchedule?.maxTickets ??
      firstSchedule?.MaxTickets ??
      workshop?.maxTickets ??
      workshop?.MaxTickets,

    ticketType: firstTicket?.ticketType ?? firstTicket?.TicketType,
  };
}