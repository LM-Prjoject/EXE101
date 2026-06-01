import { toDateKey } from "./date";

export function unwrapPaged(data) {
  if (Array.isArray(data)) return data;

  return (
    data?.items ||
    data?.Items ||
    data?.data ||
    data?.Data ||
    data?.results ||
    data?.Results ||
    data?.value ||
    data?.Value ||
    data?.$values ||
    []
  );
}
export function normalizeWorkshopTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase();
}

export function unwrapObject(data) {
  return (
    data?.data ||
    data?.Data ||
    data?.result ||
    data?.Result ||
    data?.value ||
    data?.Value ||
    data
  );
}

export function getArrayValue(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];

    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.$values)) return value.$values;
  }

  return [];
}

export function getValue(obj, keys, fallback = undefined) {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) {
      return obj[key];
    }
  }

  return fallback;
}

export function normalizeWorkshopToSlots(workshopInput) {
  const workshop = unwrapObject(workshopInput);

  const workshopId = getValue(workshop, [
    "id",
    "Id",
    "workshopId",
    "WorkshopId",
  ]);

  const workshopTitle = getValue(
    workshop,
    ["title", "Title", "workshopTitle", "WorkshopTitle"],
    "Workshop",
  );

  const schedules = getArrayValue(workshop, [
    "schedules",
    "Schedules",
    "scheduleDtos",
    "ScheduleDtos",
    "workshopSchedules",
    "WorkshopSchedules",
    "workshopScheduleDtos",
    "WorkshopScheduleDtos",
    "workshopScheduleDetails",
    "WorkshopScheduleDetails",
  ]);

  return schedules.flatMap((schedule, scheduleIndex) => {
    const scheduleId =
      getValue(schedule, ["id", "Id", "scheduleId", "ScheduleId"]) ||
      `${workshopId}-schedule-${scheduleIndex}`;

    const dateKey = toDateKey(
      getValue(schedule, [
        "startOn",
        "StartOn",
        "date",
        "Date",
        "scheduleDate",
        "ScheduleDate",
        "nextSchedule",
        "NextSchedule",
      ]),
    );

    let tickets = getArrayValue(schedule, [
      "tickets",
      "Tickets",
      "ticketDtos",
      "TicketDtos",
      "workshopTickets",
      "WorkshopTickets",
      "workshopTicketDtos",
      "WorkshopTicketDtos",
      "workshopTicketDetails",
      "WorkshopTicketDetails",
    ]);

    if (tickets.length === 0) {
      const scheduleStartTime = getValue(schedule, [
        "startTime",
        "StartTime",
        "ticketStartTime",
        "TicketStartTime",
      ]);

      const scheduleEndTime = getValue(schedule, [
        "endTime",
        "EndTime",
        "ticketEndTime",
        "TicketEndTime",
      ]);

      const schedulePrice = getValue(schedule, ["price", "Price"]);

      const scheduleMaxTickets = getValue(schedule, [
        "maxTickets",
        "MaxTickets",
      ]);

      if (
        scheduleStartTime ||
        scheduleEndTime ||
        schedulePrice ||
        scheduleMaxTickets
      ) {
        tickets = [schedule];
      }
    }

    return tickets.map((ticket, ticketIndex) => {
      const id =
        getValue(ticket, ["id", "Id", "ticketId", "TicketId"]) ||
        `${workshopId}-${scheduleId}-${ticketIndex}`;

      const startTime = getValue(ticket, [
        "startTime",
        "StartTime",
        "ticketStartTime",
        "TicketStartTime",
        "fromTime",
        "FromTime",
      ]);

      const endTime = getValue(ticket, [
        "endTime",
        "EndTime",
        "ticketEndTime",
        "TicketEndTime",
        "toTime",
        "ToTime",
      ]);

      const maxTickets = Number(
        getValue(
          ticket,
          [
            "maxTickets",
            "MaxTickets",
            "totalTickets",
            "TotalTickets",
            "capacity",
            "Capacity",
          ],
          0,
        ),
      );

      const remainingTicketsRaw = getValue(ticket, [
        "remainingTickets",
        "RemainingTickets",
        "remainTickets",
        "RemainTickets",
        "availableTickets",
        "AvailableTickets",
        "availableSeats",
        "AvailableSeats",
      ]);

      const participantCountRaw = getValue(
        ticket,
        [
          "participantCount",
          "ParticipantCount",
          "participantsCount",
          "ParticipantsCount",
          "bookedTickets",
          "BookedTickets",
          "bookedCount",
          "BookedCount",
        ],
        0,
      );

      const participantCount = Number(participantCountRaw || 0);

      const remain =
        remainingTicketsRaw !== undefined && remainingTicketsRaw !== null
          ? Number(remainingTicketsRaw)
          : maxTickets > 0
            ? Math.max(maxTickets - participantCount, 0)
            : 0;

      return {
        id,
        scheduleId,
        workshopId,
        workshopTitle,
        dateKey,
        startTime,
        endTime,
        maxTickets,
        participantCount,
        remain,
        price: Number(
          getValue(ticket, ["price", "Price", "ticketPrice", "TicketPrice"], 0),
        ),
        status: getValue(workshop, ["status", "Status"], ""),
      };
    });
  });
}