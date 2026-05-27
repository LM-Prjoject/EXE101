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

  const [scheduleDate, setScheduleDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [maxTickets, setMaxTickets] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [imageTouched, setImageTouched] = useState(false);

  const hasAnyImage = Boolean(existingThumbnail) || previews.length > 0;

  useEffect(() => {
    if (!editingWorkshop) return;

    const oldValues = getOldWorkshopValues(editingWorkshop);

    setTitle(oldValues.title ?? "");
    setDescription(oldValues.description ?? "");
    setLocation(oldValues.location ?? "");

    setCategoryId(oldValues.categoryId ?? categoryOptions[0].id);
    setLevelId(oldValues.levelId ?? levelOptions[0].id);

    setExistingThumbnail(oldValues.thumbnailLink ?? "");

    if (oldValues.date) {
      setScheduleDate(normalizeDate(oldValues.date));
    }

    if (oldValues.startTime) {
      setStartTime(normalizeTime(oldValues.startTime));
    }

    if (oldValues.endTime) {
      setEndTime(normalizeTime(oldValues.endTime));
    }

    if (oldValues.price !== undefined && oldValues.price !== null) {
      setPrice(Number(oldValues.price));
    }

    if (oldValues.maxTickets !== undefined && oldValues.maxTickets !== null) {
      setMaxTickets(Number(oldValues.maxTickets));
    }
  }, [editingWorkshop]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  function handleFilesChange(event) {
    const selected = Array.from(event.target.files || []);
    const limited = selected.slice(0, 5);

    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFiles(limited);
    setPreviews(limited.map((file) => URL.createObjectURL(file)));
    setImageTouched(true);
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

  function clearAllImages() {
    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFiles([]);
    setPreviews([]);
    setExistingThumbnail("");
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

    try {
      setSubmitting(true);

      if (files.length > 0) {
        const uploadedUrls = [];

        for (let i = 0; i < files.length && i < 5; i++) {
          const file = files[i];
          const response = await uploadImage(file);

          const imageUrl = getUploadedImageUrl(response);

          if (imageUrl) {
            uploadedUrls.push(imageUrl);
          }
        }

        if (uploadedUrls.length > 0) {
          thumbnailLink = uploadedUrls[0];
        } else {
          setError("Upload ảnh thất bại hoặc API không trả về link ảnh.");
          return;
        }
      } else if (editingWorkshop && !imageTouched) {
        thumbnailLink = keepValue(existingThumbnail, oldValues.thumbnailLink);
      }
      const finalTitle = keepValue(title.trim(), oldValues.title, "");
      const finalDescription = keepValue(description.trim(),oldValues.description,"",);
      const finalLocation = keepValue(location.trim(), oldValues.location, "");
      const finalCategoryId = Number(
        keepValue(categoryId, oldValues.categoryId, 0),
      );
      const finalLevelId = Number(
        keepValue(levelId, oldValues.levelId, levelOptions[0].id),
      );

      const finalDate = normalizeDate(
        keepValue(scheduleDate, oldValues.date, ""),
      );
      const finalStartTime = normalizeTime(
        keepValue(startTime, oldValues.startTime, ""),
      );
      const finalEndTime = normalizeTime(
        keepValue(endTime, oldValues.endTime, ""),
      );

      const finalPrice = Number(keepValue(price, oldValues.price, 0));
      const finalMaxTickets = Number(
        keepValue(maxTickets, oldValues.maxTickets, 0),
      );

      if (
        !finalTitle ||
        !finalLocation ||
        !finalCategoryId ||
        !finalDate ||
        !finalStartTime ||
        !finalEndTime ||
        finalEndTime <= finalStartTime ||
        finalPrice <= 0 ||
        finalMaxTickets <= 0
      ) {
        setError(
          "Vui lòng điền đủ: tên, danh mục, lịch trình, thời gian, giá vé và số lượng. Thời gian kết thúc phải lớn hơn thời gian bắt đầu.",
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
        imageLinks: thumbnailLink ? [thumbnailLink] : [],
        language: oldValues.language ?? "vi",
        status: "pending",
        schedules: [
          {
            startOn: finalDate,
            tickets: [
              {
                ticketType: oldValues.ticketType ?? "standard",
                startTime: finalStartTime,
                endTime: finalEndTime,
                maxTickets: finalMaxTickets,
                price: finalPrice,
              },
            ],
          },
        ],
      };

      if (editingWorkshop) {
        if (!editingWorkshopId) {
          setError("Không tìm thấy ID workshop để cập nhật.");
          return;
        }

        await updateWorkshop(editingWorkshopId, {
          Title: payload.title,
          Description: payload.description,
          Location: payload.location,
          ThumbnailLink: payload.thumbnailLink,
          ImageLinks: payload.imageLinks,
          CategoryId: payload.categoryId,
          LevelId: payload.levelId,
          Language: payload.language,
          Status: keepValue(oldValues.status, payload.status, "pending"),
          Schedules: payload.schedules.map((schedule) => ({
            StartOn: schedule.startOn,
            Tickets: schedule.tickets.map((ticket) => ({
              TicketType: ticket.ticketType,
              StartTime: ticket.startTime,
              EndTime: ticket.endTime,
              MaxTickets: ticket.maxTickets,
              Price: ticket.price,
            })),
          })),
        });
      } else {
        await createWorkshop(payload);
      }

      onSuccess?.();
    } catch (err) {
      setError(
        err?.message ||
          (editingWorkshop
            ? "Không thể cập nhật workshop. Vui lòng thử lại."
            : "Không thể tạo workshop. Vui lòng thử lại."),
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

    scheduleDate,
    setScheduleDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,

    price,
    setPrice,
    maxTickets,
    setMaxTickets,

    error,
    submitting,

    fileInputRef,
    previews,
    existingThumbnail,
    setExistingThumbnail,
    hasAnyImage,
    handleFilesChange,
    removeFileAt,
    clearAllImages,

    handleSubmit,
  };
}