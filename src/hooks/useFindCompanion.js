import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  getWorkshopById,
  getWorkshopReviews,
  getScheduleDetails,
} from "../api/workshop";

import { useAuth } from "../context/AuthContext";

import {
  formatCurrency,
  formatDuration,
  formatLanguage,
  getNumberValue,
  getTodayDateKey,
  getWorkshopImageLinks,
  isPastSchedule,
  isPastSlot,
} from "../utils/findCompanionUtils";

const PAGE_SIZE = 5;

function getWorkshopSchedules(workshop) {
  const schedules = workshop?.schedules ?? workshop?.Schedules ?? [];
  return Array.isArray(schedules) ? schedules : [];
}

function getScheduleId(schedule) {
  return schedule?.id ?? schedule?.Id;
}

function getScheduleDate(schedule) {
  return schedule?.startOn ?? schedule?.StartOn;
}

export function useFindCompanion() {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const location = useLocation();

  const { currentUser, userProfile } = useAuth();

  const [workshop, setWorkshop] = useState(location.state?.workshop || null);
  const [loading, setLoading] = useState(Boolean(workshopId));
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsLoadingMore, setReviewsLoadingMore] = useState(false);

  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (!workshopId) {
      setLoading(false);
      setError("Không tìm thấy workshop. Vui lòng chọn workshop từ trang chủ.");
      return;
    }

    let ignore = false;

    async function loadWorkshop() {
      setLoading(true);
      setError("");

      try {
        const data = await getWorkshopById(workshopId);
        console.log("DETAIL API RAW:", data);

        if (!ignore) {
          setWorkshop(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải thông tin workshop.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkshop();

    return () => {
      ignore = true;
    };
  }, [workshopId]);

  useEffect(() => {
    if (!workshopId) return;

    let ignore = false;

    async function loadReviews() {
      setReviewsLoading(true);

      try {
        const data = await getWorkshopReviews(workshopId, 1, PAGE_SIZE);

        if (!ignore) {
          const items = Array.isArray(data)
            ? data
            : (data?.items ?? data?.reviews ?? data?.data ?? []);

          const total = Array.isArray(data)
            ? items.length
            : (data?.totalCount ?? data?.total ?? items.length);

          setReviews(items);
          setReviewsTotal(total);
          setReviewsPage(1);
        }
      } catch {
        // Không block trang nếu reviews lỗi.
      } finally {
        if (!ignore) {
          setReviewsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      ignore = true;
    };
  }, [workshopId]);

  async function loadMoreReviews() {
    const nextPage = reviewsPage + 1;

    setReviewsLoadingMore(true);

    try {
      const data = await getWorkshopReviews(workshopId, nextPage, PAGE_SIZE);

      const items = Array.isArray(data)
        ? data
        : (data?.items ?? data?.reviews ?? data?.data ?? []);

      const total = Array.isArray(data)
        ? items.length + reviews.length
        : (data?.totalCount ?? data?.total ?? reviewsTotal);

      setReviews((prev) => [...prev, ...items]);
      setReviewsTotal(total);
      setReviewsPage(nextPage);
    } catch {
      // Không block trang nếu load thêm reviews lỗi.
    } finally {
      setReviewsLoadingMore(false);
    }
  }

  useEffect(() => {
    const schedules = getWorkshopSchedules(workshop);

    if (schedules.length > 0) {
      const todayStr = getTodayDateKey();

      const firstFuture = schedules.find(
        (schedule) => getScheduleDate(schedule) >= todayStr,
      );

      if (firstFuture) {
        setSelectedScheduleId(getScheduleId(firstFuture));
      } else {
        setSelectedScheduleId(getScheduleId(schedules[0]));
      }
    }
  }, [workshop]);

  useEffect(() => {
    if (!selectedScheduleId) return;

    let ignore = false;

    async function fetchTickets() {
      setTicketsLoading(true);

      try {
        const data = await getScheduleDetails(selectedScheduleId);

        if (!ignore) {
          const ticketList = data?.tickets ?? data?.Tickets ?? [];

          setTickets(ticketList);

          const scheduleObj = getWorkshopSchedules(workshop).find(
            (schedule) =>
              getScheduleId(schedule)?.toString() === selectedScheduleId.toString(),
          );

          const firstAvailableTicket = ticketList.find((ticket) => {
            const isTicketPast = scheduleObj
              ? isPastSlot(getScheduleDate(scheduleObj), ticket.startTime ?? ticket.StartTime)
              : false;

            const isSoldOut = ticket.remainingTickets <= 0;

            return !isTicketPast && !isSoldOut;
          });

          if (firstAvailableTicket) {
            setSelectedTicketId(firstAvailableTicket.id);
            setTicketQuantity(1);
          } else if (ticketList.length > 0) {
            setSelectedTicketId(ticketList[0].id);
            setTicketQuantity(1);
          } else {
            setSelectedTicketId("");
            setTicketQuantity(1);
          }
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        if (!ignore) {
          setTicketsLoading(false);
        }
      }
    }

    fetchTickets();

    return () => {
      ignore = true;
    };
  }, [selectedScheduleId, workshop]);

  function handleProceedPayment() {
    setPaymentError("");

    if (!currentUser) {
      setPaymentError("Vui lòng đăng nhập để tiến hành đặt vé.");
      navigate("/login");
      return;
    }

    if (!selectedTicketId) {
      setPaymentError("Vui lòng chọn loại vé.");
      return;
    }

    if (activeRemainingTickets !== null && ticketQuantity > activeRemainingTickets) {
      setPaymentError(`Chỉ còn ${activeRemainingTickets} vé cho loại vé này.`);
      return;
    }

    navigate("/payment", {
      state: {
        ticketId: selectedTicketId,
        scheduleId: selectedScheduleId,
        workshopId: Number(workshopId),
        quantity: ticketQuantity,
      },
    });
  }

  const detail = useMemo(() => {
    const schedules = getWorkshopSchedules(workshop);
    const firstSchedule = schedules[0] || {};

    const priceLower =
      workshop?.priceLower ?? firstSchedule.priceLower ?? workshop?.price;

    const priceUpper =
      workshop?.priceUpper ?? firstSchedule.priceUpper ?? priceLower;

    const thumbnail = workshop?.thumbnailLink || "/img/onlyLogo.png";

    const rawImages = getWorkshopImageLinks(workshop);

    const galleryImages = rawImages
      .filter(Boolean)
      .map((img) => String(img).trim())
      .filter((img, index, arr) => arr.indexOf(img) === index)
      .slice(0, 5);

    const finalGalleryImages =
      galleryImages.length > 0 ? galleryImages : [thumbnail];

    return {
  title: workshop?.title || workshop?.Title || "Workshop",
  thumbnail: finalGalleryImages[0],
  galleryImages: finalGalleryImages,
  description:
    workshop?.description ||
    workshop?.Description ||
    "Thông tin workshop đang được cập nhật.",
  language: formatLanguage(workshop?.language || workshop?.Language),
  location: workshop?.location || workshop?.Location || "Đang cập nhật",

  categoryId:
    workshop?.categoryId ??
    workshop?.CategoryId ??
    workshop?.categoryID ??
    workshop?.category?.id ??
    workshop?.category?.categoryId,

  category:
    workshop?.category ??
    workshop?.Category ??
    workshop?.categoryName ??
    workshop?.CategoryName ??
    workshop?.category?.name ??
    workshop?.category?.title ??
    "",

  duration: formatDuration(workshop?.duration ?? workshop?.Duration),

  levelId:
    workshop?.levelId ??
    workshop?.LevelId ??
    workshop?.levelID ??
    workshop?.level?.id ??
    workshop?.level?.levelId,

  level:
    workshop?.level ??
    workshop?.Level ??
    workshop?.levelName ??
    workshop?.LevelName ??
    workshop?.level?.name ??
    workshop?.level?.title ??
    "",

  rating: workshop?.rating ?? workshop?.Rating ?? 0,
  reviewCount: workshop?.reviewCount ?? workshop?.ReviewCount ?? 0,
  priceText:
    priceLower != null &&
    priceUpper != null &&
    Number(priceLower) !== Number(priceUpper)
      ? `${formatCurrency(priceLower)} - ${formatCurrency(priceUpper)}`
      : formatCurrency(priceLower),
  schedules,
  remainingTickets: getNumberValue(
    workshop?.remainingTickets,
    workshop?.RemainingTickets,
    firstSchedule.remainingTickets,
    firstSchedule.RemainingTickets,
  ),
};
  }, [workshop]);

  const activeSchedule = useMemo(() => {
    return getWorkshopSchedules(workshop).find(
      (schedule) =>
        getScheduleId(schedule)?.toString() === selectedScheduleId.toString(),
    );
  }, [workshop, selectedScheduleId]);

  const isPast = useMemo(() => {
    return activeSchedule ? isPastSchedule(getScheduleDate(activeSchedule)) : false;
  }, [activeSchedule]);

  const activeTicket = useMemo(() => {
    return tickets.find((ticket) => ticket.id === selectedTicketId);
  }, [tickets, selectedTicketId]);

  const activeRemainingTickets = useMemo(() => {
    if (activeTicket) {
      return getNumberValue(
        activeTicket.remainingTickets,
        activeTicket.RemainingTickets,
      );
    }

    if (tickets.length > 0) {
      return tickets.reduce((total, ticket) => {
        const value = getNumberValue(
          ticket.remainingTickets,
          ticket.RemainingTickets,
        );

        return total + (value ?? 0);
      }, 0);
    }

    return getNumberValue(
      activeSchedule?.remainingTickets,
      activeSchedule?.RemainingTickets,
      workshop?.remainingTickets,
      workshop?.RemainingTickets,
    );
  }, [activeTicket, tickets, activeSchedule, workshop]);

  const isActiveTicketPast = useMemo(() => {
    return activeSchedule && activeTicket
      ? isPastSlot(
          getScheduleDate(activeSchedule),
          activeTicket.startTime ?? activeTicket.StartTime,
        )
      : isPast;
  }, [activeSchedule, activeTicket, isPast]);

  useEffect(() => {
    if (activeRemainingTickets === null) return;

    setTicketQuantity((current) => {
      const normalized = Math.max(1, Number(current) || 1);
      return Math.min(normalized, Math.max(activeRemainingTickets, 1));
    });
  }, [activeRemainingTickets, selectedTicketId]);

  return {
    navigate,
    workshopId,
    workshop,

    loading,
    error,

    reviews,
    reviewsLoading,
    reviewsTotal,
    reviewsLoadingMore,
    loadMoreReviews,

    currentUser,
    userProfile,

    selectedScheduleId,
    setSelectedScheduleId,

    tickets,
    ticketsLoading,

    selectedTicketId,
    setSelectedTicketId,
    ticketQuantity,
    setTicketQuantity,

    paymentError,
    handleProceedPayment,

    detail,
    activeSchedule,
    activeRemainingTickets,
    isActiveTicketPast,
  };
}
