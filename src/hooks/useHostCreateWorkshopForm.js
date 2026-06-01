import { useEffect, useRef, useState } from "react";
import { createWorkshop, uploadImage, updateWorkshop } from "../api";
import {
  categoryOptions,
  getOldWorkshopValues,
  keepValue,
  levelOptions,
  normalizeDate,
  normalizeTime,
} from "../utils/workshopFormatters";

function getUploadedImageUrl(response) {
  const url = response?.url || "";

  return url.replace(
    "http://exe.kakgonbri.party",
    "https://exe.kakgonbri.party"
  );
}

function createEmptyTicket() {
  return {
    ticketType: "standard",
    startTime: "09:00",
    endTime: "12:00",
    price: "",
    maxTickets: "",
  };
}

function createEmptySchedule() {
  return {
    startOn: "",
    tickets: [createEmptyTicket()],
  };
}

function normalizeTicket(ticket = {}) {
  return {
    ticketType: ticket.ticketType ?? ticket.TicketType ?? "standard",
    startTime: normalizeTime(ticket.startTime ?? ticket.StartTime ?? ""),
    endTime: normalizeTime(ticket.endTime ?? ticket.EndTime ?? ""),
    price: ticket.price ?? ticket.Price ?? "",
    maxTickets: ticket.maxTickets ?? ticket.MaxTickets ?? "",
  };
}

function normalizeSchedule(schedule = {}) {
  const rawTickets =
    schedule.tickets ??
    schedule.Tickets ??
    schedule.workshopTickets ??
    schedule.WorkshopTickets ??
    [];

  const tickets =
    Array.isArray(rawTickets) && rawTickets.length > 0
      ? rawTickets.map(normalizeTicket)
      : [createEmptyTicket()];

  return {
    startOn: normalizeDate(
      schedule.startOn ??
        schedule.StartOn ??
        schedule.date ??
        schedule.Date ??
        ""
    ),
    tickets,
  };
}

function getInitialSchedules(editingWorkshop) {
  if (!editingWorkshop) {
    return [createEmptySchedule()];
  }

  const rawSchedules =
    editingWorkshop.schedules ??
    editingWorkshop.Schedules ??
    editingWorkshop.workshopSchedules ??
    editingWorkshop.WorkshopSchedules ??
    [];

  if (Array.isArray(rawSchedules) && rawSchedules.length > 0) {
    return rawSchedules.map(normalizeSchedule);
  }

  const oldValues = getOldWorkshopValues(editingWorkshop);

  if (
    oldValues.date ||
    oldValues.startTime ||
    oldValues.endTime ||
    oldValues.price ||
    oldValues.maxTickets
  ) {
    return [
      {
        startOn: normalizeDate(oldValues.date ?? ""),
        tickets: [
          {
            ticketType: oldValues.ticketType ?? "standard",
            startTime: normalizeTime(oldValues.startTime ?? ""),
            endTime: normalizeTime(oldValues.endTime ?? ""),
            price: oldValues.price ?? "",
            maxTickets: oldValues.maxTickets ?? "",
          },
        ],
      },
    ];
  }

  return [createEmptySchedule()];
}

function getExistingImageLinks(editingWorkshop, thumbnailLink) {
  const rawImageLinks =
    editingWorkshop?.imageLinks ??
    editingWorkshop?.ImageLinks ??
    editingWorkshop?.images ??
    editingWorkshop?.Images ??
    [];

  const rawImageObjects =
    editingWorkshop?.workshopImages ??
    editingWorkshop?.WorkshopImages ??
    [];

  const linksFromArray = Array.isArray(rawImageLinks)
    ? rawImageLinks.filter(Boolean)
    : [];

  const linksFromObjects = Array.isArray(rawImageObjects)
    ? rawImageObjects
        .map(
          (img) =>
            img?.imgLink ??
            img?.ImgLink ??
            img?.imageLink ??
            img?.ImageLink,
        )
        .filter(Boolean)
    : [];

  const result = [
    thumbnailLink,
    ...linksFromArray,
    ...linksFromObjects,
  ].filter(Boolean);

  return [...new Set(result)].slice(0, 5);
}

function normalizeSchedulesForPayload(schedules) {
  return schedules.map((schedule) => ({
    startOn: normalizeDate(schedule.startOn),
    tickets: schedule.tickets.map((ticket) => ({
      ticketType: ticket.ticketType || "standard",
      startTime: normalizeTime(ticket.startTime),
      endTime: normalizeTime(ticket.endTime),
      maxTickets: Number(ticket.maxTickets),
      price: Number(ticket.price),
    })),
  }));
}

function validateSchedules(schedules) {
  if (!Array.isArray(schedules) || schedules.length === 0) {
    return false;
  }

  return schedules.every((schedule) => {
    if (!schedule.startOn) return false;

    if (!Array.isArray(schedule.tickets) || schedule.tickets.length === 0) {
      return false;
    }

    return schedule.tickets.every((ticket) => {
      if (!ticket.startTime || !ticket.endTime) return false;
      if (ticket.endTime <= ticket.startTime) return false;
      if (Number(ticket.price) <= 0) return false;
      if (Number(ticket.maxTickets) <= 0) return false;

      return true;
    });
  });
}

export default function useHostCreateWorkshopForm(editingWorkshop, onSuccess) {
  const fileInputRef = useRef(null);

  const editingWorkshopId =
    editingWorkshop?.id ??
    editingWorkshop?.Id ??
    editingWorkshop?.workshopId ??
    editingWorkshop?.WorkshopId;

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [levelId, setLevelId] = useState(levelOptions[0].id);

  const [schedules, setSchedules] = useState([createEmptySchedule()]);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [existingImageLinks, setExistingImageLinks] = useState([]);
  const [imageTouched, setImageTouched] = useState(false);

  const hasAnyImage = existingImageLinks.length > 0 || previews.length > 0;

  useEffect(() => {
    if (!editingWorkshop) return;

    const oldValues = getOldWorkshopValues(editingWorkshop);

    setTitle(oldValues.title ?? "");
    setDescription(oldValues.description ?? "");
    setLocation(oldValues.location ?? "");

    setCategoryId(oldValues.categoryId ?? categoryOptions[0].id);
    setLevelId(oldValues.levelId ?? levelOptions[0].id);

    setExistingThumbnail(oldValues.thumbnailLink ?? "");
    setExistingImageLinks(
      getExistingImageLinks(editingWorkshop, oldValues.thumbnailLink)
    );

    setSchedules(getInitialSchedules(editingWorkshop));
  }, [editingWorkshop]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  function handleFilesChange(event) {
  const selected = Array.from(event.target.files || []);

  const availableSlots = Math.max(0, 5 - existingImageLinks.length);
  const limited = selected.slice(0, availableSlots);

  previews.forEach((preview) => URL.revokeObjectURL(preview));

  setFiles(limited);
  setPreviews(limited.map((file) => URL.createObjectURL(file)));
  setImageTouched(true);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
}

  function removeFileAt(index) {
    const nextFiles = files.slice();
    nextFiles.splice(index, 1);
    setFiles(nextFiles);

    const removedPreview = previews[index];
    if (removedPreview) {
      URL.revokeObjectURL(removedPreview);
    }

    const nextPreviews = previews.slice();
    nextPreviews.splice(index, 1);
    setPreviews(nextPreviews);
    setImageTouched(true);
  }

  function removeExistingImageAt(index) {
  const nextImageLinks = existingImageLinks.filter((_, i) => i !== index);

  setExistingImageLinks(nextImageLinks);
  setExistingThumbnail(nextImageLinks[0] || "");
  setImageTouched(true);
}

  function clearAllImages() {
    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFiles([]);
    setPreviews([]);
    setExistingThumbnail("");
    setExistingImageLinks([]);
    setImageTouched(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const oldValues = getOldWorkshopValues(editingWorkshop);

    let thumbnailLink = existingThumbnail || null;
    let imageLinks = existingImageLinks;

    try {
      setSubmitting(true);

      if (files.length > 0) {
        const uploadedUrls = [];

        for (let i = 0; i < files.length && i < 5; i += 1) {
          const file = files[i];
          const response = await uploadImage(file);
          const imageUrl = getUploadedImageUrl(response);

          if (imageUrl) {
            uploadedUrls.push(imageUrl);
          }
        }

        if (uploadedUrls.length === 0) {
          setError("Upload ảnh thất bại hoặc API không trả về link ảnh.");
          return;
        }

        imageLinks = [...existingImageLinks, ...uploadedUrls]
          .filter(Boolean)
          .filter((url, index, arr) => arr.indexOf(url) === index)
          .slice(0, 5);

        thumbnailLink = imageLinks[0] || null;
      } else if (editingWorkshop && !imageTouched) {
        thumbnailLink = keepValue(existingThumbnail, oldValues.thumbnailLink);
        imageLinks =
          existingImageLinks.length > 0
            ? existingImageLinks
            : thumbnailLink
              ? [thumbnailLink]
              : [];
      } else {
        imageLinks = existingImageLinks
          .filter(Boolean)
          .filter((url, index, arr) => arr.indexOf(url) === index)
          .slice(0, 5);

        thumbnailLink = imageLinks[0] || null;
      }

      const finalTitle = keepValue(title.trim(), oldValues.title, "");
      const finalDescription = keepValue(
        description.trim(),
        oldValues.description,
        ""
      );
      const finalLocation = keepValue(location.trim(), oldValues.location, "");
      const finalCategoryId = Number(
        keepValue(categoryId, oldValues.categoryId, 0)
      );
      const finalLevelId = Number(
        keepValue(levelId, oldValues.levelId, levelOptions[0].id)
      );

      const finalSchedules = normalizeSchedulesForPayload(schedules);

      if (
        !finalTitle ||
        !finalLocation ||
        !finalCategoryId ||
        !validateSchedules(finalSchedules)
      ) {
        setError(
          "Vui lòng điền đủ: tên, danh mục, ngày mở lớp, khung giờ, giá vé và số lượng. Thời gian kết thúc phải lớn hơn thời gian bắt đầu."
        );
        return;
      }

      const payload = {
        title: finalTitle,
        description: finalDescription,
        location: finalLocation,
        categoryId: finalCategoryId,
        levelId: finalLevelId,
        thumbnailLink,
        imageLinks,
        language: oldValues.language ?? "vi",
        status: "pending",
        schedules: finalSchedules,
      };

      if (editingWorkshop) {
        if (!editingWorkshopId) {
          setError("Không tìm thấy ID workshop để cập nhật.");
          return;
        }

        const updatePayload = {
  title: payload.title,
  description: payload.description,
  location: payload.location,
  thumbnailLink: payload.thumbnailLink,
  imageLinks: payload.imageLinks,
  categoryId: payload.categoryId,
  levelId: payload.levelId,
  language: payload.language,
  status: keepValue(oldValues.status, payload.status, "pending"),
  schedules: payload.schedules.map((schedule) => ({
    startOn: schedule.startOn,
    tickets: schedule.tickets.map((ticket) => ({
      ticketType: ticket.ticketType,
      startTime: ticket.startTime,
      endTime: ticket.endTime,
      maxTickets: ticket.maxTickets,
      price: ticket.price,
    })),
  })),
};

console.log("UPDATE WORKSHOP PAYLOAD:", updatePayload);

await updateWorkshop(editingWorkshopId, updatePayload);
      } else {
        await createWorkshop(payload);
      }

      onSuccess?.();
    } catch (err) {
      setError(
        err?.message ||
          (editingWorkshop
            ? "Không thể cập nhật workshop. Vui lòng thử lại."
            : "Không thể tạo workshop. Vui lòng thử lại.")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return {
  title,
  setTitle,
  location,
  setLocation,
  description,
  setDescription,
  categoryId,
  setCategoryId,
  levelId,
  setLevelId,

  schedules,
  setSchedules,

  error,
  submitting,

  fileInputRef,
  previews,

  existingThumbnail,
  setExistingThumbnail,

  existingImageLinks,
  removeExistingImageAt,

  hasAnyImage,
  handleFilesChange,
  removeFileAt,
  clearAllImages,

  handleSubmit,
};
}