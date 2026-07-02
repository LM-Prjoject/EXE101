import { useEffect, useRef, useState } from "react";
import { createWorkshop, uploadImage, updateWorkshop } from "../api";
import {
  categoryOptions,
  getOldWorkshopValues,
  hasValue,
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

function hasTicketValue(ticket = {}) {
  return (
    hasValue(ticket.startTime) ||
    hasValue(ticket.endTime) ||
    hasValue(ticket.price) ||
    hasValue(ticket.maxTickets)
  );
}

function hasNonDefaultTicketValue(ticket = {}) {
  return (
    hasValue(ticket.price) ||
    hasValue(ticket.maxTickets) ||
    (hasValue(ticket.startTime) && normalizeTime(ticket.startTime) !== "09:00") ||
    (hasValue(ticket.endTime) && normalizeTime(ticket.endTime) !== "12:00")
  );
}

function hasScheduleValue(schedule = {}) {
  return (
    hasValue(schedule.startOn) ||
    (Array.isArray(schedule.tickets) &&
      schedule.tickets.some(hasNonDefaultTicketValue))
  );
}

function normalizeNumberInput(value) {
  if (!hasValue(value)) return 0;
  return Number(String(value).replace(/\D/g, ""));
}

function normalizeSchedulesForPayload(schedules) {
  return schedules
    .filter(hasScheduleValue)
    .map((schedule) => ({
      startOn: normalizeDate(schedule.startOn),
      tickets: (schedule.tickets ?? [])
        .filter(hasTicketValue)
        .map((ticket) => ({
          ticketType: ticket.ticketType || "standard",
          startTime: normalizeTime(ticket.startTime),
          endTime: normalizeTime(ticket.endTime),
          maxTickets: normalizeNumberInput(ticket.maxTickets),
          price: normalizeNumberInput(ticket.price),
        })),
    }));
}

function getScheduleValidationError(schedules) {
  if (!Array.isArray(schedules) || schedules.length === 0) {
    return "Vui lòng thêm ít nhất 1 lịch học.";
  }

  for (let scheduleIndex = 0; scheduleIndex < schedules.length; scheduleIndex += 1) {
    const schedule = schedules[scheduleIndex];
    const scheduleLabel = `Lịch ${scheduleIndex + 1}`;

    if (!schedule.startOn) {
      return `${scheduleLabel}: vui lòng chọn ngày mở lớp.`;
    }

    if (!Array.isArray(schedule.tickets) || schedule.tickets.length === 0) {
      return `${scheduleLabel}: vui lòng thêm ít nhất 1 khung giờ.`;
    }

    for (let ticketIndex = 0; ticketIndex < schedule.tickets.length; ticketIndex += 1) {
      const ticket = schedule.tickets[ticketIndex];
      const ticketLabel = `${scheduleLabel}, khung giờ ${ticketIndex + 1}`;

      if (!ticket.startTime || !ticket.endTime) {
        return `${ticketLabel}: vui lòng điền giờ bắt đầu và kết thúc.`;
      }

      if (ticket.endTime <= ticket.startTime) {
        return `${ticketLabel}: thời gian kết thúc phải lớn hơn thời gian bắt đầu.`;
      }

      if (Number(ticket.price) <= 0) {
        return `${ticketLabel}: giá vé phải lớn hơn 0.`;
      }

      if (Number(ticket.maxTickets) <= 0) {
        return `${ticketLabel}: số vé phải lớn hơn 0.`;
      }
    }
  }

  return "";
}

function getFieldKey(scheduleIndex, ticketIndex, field) {
  if (ticketIndex === null || ticketIndex === undefined) {
    return `schedules.${scheduleIndex}.${field}`;
  }

  return `schedules.${scheduleIndex}.tickets.${ticketIndex}.${field}`;
}

function buildFieldErrors({ title, location, categoryId, schedules }) {
  const errors = {};

  if (!title) {
    errors.title = "Vui lòng nhập tên workshop.";
  }

  if (!location) {
    errors.location = "Vui lòng nhập địa điểm.";
  }

  if (!categoryId) {
    errors.categoryId = "Vui lòng chọn danh mục.";
  }

  const activeSchedules = (Array.isArray(schedules) ? schedules : [])
    .map((schedule, index) => ({ schedule, index }))
    .filter(({ schedule }) => hasScheduleValue(schedule));

  if (activeSchedules.length === 0) {
    errors[getFieldKey(0, null, "startOn")] = "Vui lòng chọn ngày mở lớp.";
    return errors;
  }

  activeSchedules.forEach(({ schedule, index: scheduleIndex }) => {
    if (!normalizeDate(schedule.startOn)) {
      errors[getFieldKey(scheduleIndex, null, "startOn")] =
        "Vui lòng chọn ngày mở lớp.";
    }

    const activeTickets = (Array.isArray(schedule.tickets)
      ? schedule.tickets
      : [])
      .map((ticket, index) => ({ ticket, index }))
      .filter(({ ticket }) => hasTicketValue(ticket));

    if (activeTickets.length === 0) {
      errors[getFieldKey(scheduleIndex, 0, "startTime")] =
        "Vui lòng thêm ít nhất 1 khung giờ.";
      return;
    }

    activeTickets.forEach(({ ticket, index: ticketIndex }) => {
      const startTime = normalizeTime(ticket.startTime);
      const endTime = normalizeTime(ticket.endTime);
      const price = normalizeNumberInput(ticket.price);
      const maxTickets = normalizeNumberInput(ticket.maxTickets);

      if (!startTime) {
        errors[getFieldKey(scheduleIndex, ticketIndex, "startTime")] =
          "Vui lòng nhập giờ bắt đầu.";
      }

      if (!endTime) {
        errors[getFieldKey(scheduleIndex, ticketIndex, "endTime")] =
          "Vui lòng nhập giờ kết thúc.";
      }

      if (startTime && endTime && endTime <= startTime) {
        errors[getFieldKey(scheduleIndex, ticketIndex, "endTime")] =
          "Giờ kết thúc phải lớn hơn giờ bắt đầu.";
      }

      if (price <= 0) {
        errors[getFieldKey(scheduleIndex, ticketIndex, "price")] =
          "Giá vé phải lớn hơn 0.";
      }

      if (maxTickets <= 0) {
        errors[getFieldKey(scheduleIndex, ticketIndex, "maxTickets")] =
          "Số vé phải lớn hơn 0.";
      }
    });
  });

  return errors;
}

function getFriendlySubmitError(error, editingWorkshop) {
  const message = error?.message || "";

  if (/500|internal server error/i.test(message)) {
    return editingWorkshop
      ? "Không thể cập nhật workshop lúc này. Vui lòng kiểm tra lại thông tin và thử lại."
      : "Không thể tạo workshop lúc này. Vui lòng kiểm tra lại thông tin và thử lại.";
  }

  return (
    message ||
    (editingWorkshop
      ? "Không thể cập nhật workshop. Vui lòng thử lại."
      : "Không thể tạo workshop. Vui lòng thử lại.")
  );
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [existingImageLinks, setExistingImageLinks] = useState([]);
  const [imageTouched, setImageTouched] = useState(false);

  const hasAnyImage = existingImageLinks.length > 0 || previews.length > 0;

  function clearFieldError(fieldKey) {
    setFieldErrors((currentErrors) => {
      if (!currentErrors[fieldKey]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldKey];
      return nextErrors;
    });
  }

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
    setFieldErrors({});

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
      const scheduleValidationError = getScheduleValidationError(finalSchedules);

      const nextFieldErrors = buildFieldErrors({
        title: finalTitle,
        location: finalLocation,
        categoryId: finalCategoryId,
        schedules,
      });

      if (Object.keys(nextFieldErrors).length > 0) {
        setFieldErrors(nextFieldErrors);
        return;
      }

      if (
        !finalTitle ||
        !finalLocation ||
        !finalCategoryId ||
        scheduleValidationError
      ) {
        setError(
          scheduleValidationError ||
            "Vui lòng điền đủ: tên, danh mục, ngày mở lớp, khung giờ, giá vé và số lượng."
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
  status: oldValues.status === "draft" ? payload.status : keepValue(oldValues.status, payload.status, "pending"),
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
      setError(getFriendlySubmitError(err, editingWorkshop));
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
  fieldErrors,
  clearFieldError,
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
