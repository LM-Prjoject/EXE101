export const WORKSHOP_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  DRAFT: "draft",
  COMPLETED: "completed",
  REMOVED: "removed",
};

export function getWorkshopStatus(workshop) {
  const rawStatus = String(workshop?.status ?? workshop?.Status ?? "")
    .trim()
    .toLowerCase();

  if (rawStatus === "verified") return WORKSHOP_STATUS.ACTIVE;
  if (rawStatus === "pending") return WORKSHOP_STATUS.PENDING;
  if (rawStatus === "draft") return WORKSHOP_STATUS.DRAFT;
  if (rawStatus === "ended") return WORKSHOP_STATUS.COMPLETED;
  if (rawStatus === "removed") return WORKSHOP_STATUS.REMOVED;

  return WORKSHOP_STATUS.DRAFT;
}

export function getWorkshopId(workshop) {
  return (
    workshop?.id ??
    workshop?.Id ??
    workshop?.workshopId ??
    workshop?.WorkshopId ??
    workshop?.workshopID
  );
}

export function getWorkshopStatusCounts(workshops) {
  return {
    active: workshops.filter(
      (workshop) => getWorkshopStatus(workshop) === WORKSHOP_STATUS.ACTIVE,
    ).length,

    pending: workshops.filter(
      (workshop) => getWorkshopStatus(workshop) === WORKSHOP_STATUS.PENDING,
    ).length,

    draft: workshops.filter(
      (workshop) => getWorkshopStatus(workshop) === WORKSHOP_STATUS.DRAFT,
    ).length,

    completed: workshops.filter(
      (workshop) => getWorkshopStatus(workshop) === WORKSHOP_STATUS.COMPLETED,
    ).length,

    removed: workshops.filter(
      (workshop) => getWorkshopStatus(workshop) === WORKSHOP_STATUS.REMOVED,
    ).length,
  };
}
