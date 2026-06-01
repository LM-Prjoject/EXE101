import { useEffect, useMemo, useState } from "react";

import { apiGet } from "../api/hostScheduleApi";

import {
  normalizeWorkshopToSlots,
  unwrapObject,
  unwrapPaged,
  getValue,
  normalizeWorkshopTitle 
} from "../utils/normalize";

import { parseDateKey, toLocalDateKey } from "../utils/date";

export function useHostScheduleManagement() {
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    toLocalDateKey(new Date()),
  );

  const [slots, setSlots] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nextMonth = useMemo(
    () => new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1),
    [monthCursor],
  );

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const myData = await apiGet("/api/Workshop/my?page=1&pageSize=200");
      const workshops = unwrapPaged(myData);

      console.log("Schedule workshops from /my:", workshops);

      const workshopIds = workshops
        .map((workshop) =>
          getValue(workshop, ["id", "Id", "workshopId", "WorkshopId"]),
        )
        .filter(Boolean);

      const workshopDetails = await Promise.all(
        workshopIds.map(async (id) => {
          try {
            const detail = await apiGet(`/api/Workshop/${id}`);
            return unwrapObject(detail);
          } catch (err) {
            console.warn("Cannot load workshop detail:", id, err);
            return null;
          }
        }),
      );

      const validDetails = workshopDetails.filter(Boolean);

      const sourceWorkshops =
        validDetails.length > 0 ? validDetails : workshops.map(unwrapObject);

      console.log("Schedule workshop details:", sourceWorkshops);

      const normalized = sourceWorkshops
        .flatMap(normalizeWorkshopToSlots)
        .filter((item) => item.id && item.dateKey)
        .sort((a, b) => {
          const dateCompare = a.dateKey.localeCompare(b.dateKey);
          if (dateCompare !== 0) return dateCompare;

          return String(a.startTime || "").localeCompare(
            String(b.startTime || ""),
          );
        });

      console.log("Schedule slots:", normalized);

      setSlots(normalized);

      const today = toLocalDateKey(new Date());
      const todayDate = parseDateKey(today);

      setSelectedDate(today);
      setMonthCursor(
        new Date(todayDate.getFullYear(), todayDate.getMonth(), 1),
      );
    } catch (err) {
      setError(err?.message || "Không thể tải lịch trình.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const workshopFilters = useMemo(() => {
    const map = new Map();

    slots.forEach((slot) => {
      const title = slot.workshopTitle || "Workshop";
      const key = normalizeWorkshopTitle(title);

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          title,
        });
      }
    });

    return Array.from(map.values());
  }, [slots]);

  const selectedWorkshopLabel = useMemo(() => {
    if (selectedWorkshop === "all") return "Tất cả Workshop";

    return (
      workshopFilters.find(
        (workshop) => String(workshop.id) === selectedWorkshop,
      )?.title || "Tất cả Workshop"
    );
  }, [selectedWorkshop, workshopFilters]);

  function handleSelectWorkshop(value) {
    setSelectedWorkshop(value);
    setFilterOpen(false);
  }

  const filteredSlots = useMemo(() => {
    if (selectedWorkshop === "all") return slots;

    return slots.filter(
      (slot) => normalizeWorkshopTitle(slot.workshopTitle) === selectedWorkshop,
    );
  }, [slots, selectedWorkshop]);

  const slotsByDate = useMemo(() => {
    return filteredSlots.reduce((acc, slot) => {
      if (!acc[slot.dateKey]) acc[slot.dateKey] = [];
      acc[slot.dateKey].push(slot);
      return acc;
    }, {});
  }, [filteredSlots]);

  const selectedSlots = slotsByDate[selectedDate] || [];

  const thisMonthSlots = filteredSlots.filter((slot) => {
    const d = parseDateKey(slot.dateKey);

    return (
      d.getFullYear() === monthCursor.getFullYear() &&
      d.getMonth() === monthCursor.getMonth()
    );
  });

  const bookingsThisMonth = thisMonthSlots.reduce(
    (sum, slot) => sum + Number(slot.participantCount || 0),
    0,
  );

  const activeWorkshops = new Set(
    filteredSlots.map((slot) => slot.workshopId || slot.workshopTitle),
  ).size;

  function handlePrevMonth() {
    setMonthCursor(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setMonthCursor(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  }

  return {
    monthCursor,
    nextMonth,
    selectedDate,
    setSelectedDate,

    slots,
    filterOpen,
    setFilterOpen,
    selectedWorkshop,
    selectedWorkshopLabel,
    workshopFilters,
    handleSelectWorkshop,

    loading,
    error,
    reload: loadTickets,

    filteredSlots,
    slotsByDate,
    selectedSlots,
    thisMonthSlots,
    bookingsThisMonth,
    activeWorkshops,

    handlePrevMonth,
    handleNextMonth,
  };
}