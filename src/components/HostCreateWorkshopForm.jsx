import { useEffect, useRef, useState } from "react";
import { categoryOptions, levelOptions } from "../utils/workshopFormatters";

export default function HostCreateWorkshopForm({
  form,
  editingWorkshop,
  onCancel,
}) {
  return (
    <form className="space-y-12" onSubmit={form.handleSubmit} noValidate>
      {form.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-200">
          {form.error}
        </div>
      ) : null}

      <BasicInfoSection form={form} />

      <ScheduleTicketSection form={form} />

      <ImageSection form={form} />

      <FormActions
        submitting={form.submitting}
        editing={Boolean(editingWorkshop)}
        onCancel={onCancel}
      />
    </form>
  );
}

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs font-semibold text-red-500">{message}</p>;
}

function BasicInfoSection({ form }) {
  return (
    <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
          1
        </span>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Thông Tin Cơ Bản
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Tên Workshop <span className="text-red-500">*</span>
          </label>

          <input
            value={form.title}
            onChange={(event) => {
              form.clearFieldError?.("title");
              form.setTitle(event.target.value);
            }}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
            placeholder="vd: Lớp học làm gốm ngắm hoàng hôn trên biển"
            type="text"
          />
          <FieldError message={form.fieldErrors?.title} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
              Địa điểm <span className="text-red-500">*</span>
            </label>

            <input
              value={form.location}
              onChange={(event) => {
                form.clearFieldError?.("location");
                form.setLocation(event.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="vd: 123 Phố Hội An, Đà Nẵng"
              type="text"
            />
            <FieldError message={form.fieldErrors?.location} />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
              Trình độ
            </label>

            <div className="grid grid-cols-3 gap-3">
              {levelOptions.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => form.setLevelId(level.id)}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                    form.levelId === level.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Danh mục <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  form.clearFieldError?.("categoryId");
                  form.setCategoryId(category.id);
                }}
                className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  form.categoryId === category.id
                    ? "border-primary bg-primary/5"
                    : "border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${
                    form.categoryId === category.id
                      ? "text-primary"
                      : "text-slate-400"
                  }`}
                >
                  {category.icon}
                </span>

                <span
                  className={`font-semibold text-sm ${
                    form.categoryId === category.id
                      ? "text-primary"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {category.label}
                </span>
              </button>
            ))}
          </div>
          <FieldError message={form.fieldErrors?.categoryId} />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Mô tả
          </label>

          <textarea
            value={form.description}
            onChange={(event) => form.setDescription(event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 min-h-[120px]"
            placeholder="Mô tả những gì người tham gia sẽ được học và tạo ra..."
          />
        </div>
      </div>
    </section>
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

function formatDateForInput(value) {
  if (!value) return "";

  const parts = String(value).slice(0, 10).split("-");
  if (parts.length !== 3) return "";

  const [year, month, day] = parts;
  if (!year || !month || !day) return "";

  return `${day}/${month}/${year}`;
}

function parseDisplayDate(value) {
  const match = String(value).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const [, dayRaw, monthRaw, yearRaw] = match;
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return `${yearRaw}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}`;
}

function ScheduleDateInput({ value, onChange }) {
  const [displayValue, setDisplayValue] = useState(formatDateForInput(value));
  const dateInputRef = useRef(null);

  useEffect(() => {
    setDisplayValue(formatDateForInput(value));
  }, [value]);

  function handleChange(event) {
    const nextValue = event.target.value
      .replace(/[^\d/]/g, "")
      .slice(0, 10);

    setDisplayValue(nextValue);

    if (!nextValue) {
      onChange("");
      return;
    }

    const parsedDate = parseDisplayDate(nextValue);
    if (parsedDate) {
      onChange(parsedDate);
    }
  }

  function handleBlur() {
    const parsedDate = parseDisplayDate(displayValue);
    setDisplayValue(parsedDate ? formatDateForInput(parsedDate) : "");
    if (!parsedDate) {
      onChange("");
    }
  }

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  }

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="dd/mm/yyyy"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 pr-12 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
      />

      <button
        type="button"
        onClick={openDatePicker}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
        aria-label="Chọn ngày"
      >
        <span className="material-symbols-outlined text-xl">
          calendar_month
        </span>
      </button>

      <input
        ref={dateInputRef}
        type="date"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        className="pointer-events-none absolute right-4 top-1/2 size-px -translate-y-1/2 opacity-0"
        aria-hidden="true"
      />
    </div>
  );
}

function ScheduleTicketSection({ form }) {
  const schedules =
    Array.isArray(form.schedules) && form.schedules.length > 0
      ? form.schedules
      : [createEmptySchedule()];
  const fieldErrors = form.fieldErrors || {};

  function getScheduleError(scheduleIndex, field) {
    return fieldErrors[`schedules.${scheduleIndex}.${field}`];
  }

  function getTicketError(scheduleIndex, ticketIndex, field) {
    return fieldErrors[
      `schedules.${scheduleIndex}.tickets.${ticketIndex}.${field}`
    ];
  }

  function updateSchedules(nextSchedules) {
    form.setSchedules(nextSchedules);
  }

  function updateScheduleDate(scheduleIndex, value) {
    form.clearFieldError?.(`schedules.${scheduleIndex}.startOn`);

    const nextSchedules = schedules.map((schedule, index) =>
      index === scheduleIndex ? { ...schedule, startOn: value } : schedule,
    );

    updateSchedules(nextSchedules);
  }

  function addSchedule() {
    updateSchedules([...schedules, createEmptySchedule()]);
  }

  function removeSchedule(scheduleIndex) {
    const nextSchedules = schedules.filter(
      (_, index) => index !== scheduleIndex,
    );

    updateSchedules(
      nextSchedules.length > 0 ? nextSchedules : [createEmptySchedule()],
    );
  }

  function duplicateSchedule(scheduleIndex) {
    const selectedSchedule = schedules[scheduleIndex];

    updateSchedules([
      ...schedules,
      {
        ...selectedSchedule,
        startOn: "",
        tickets: selectedSchedule.tickets.map((ticket) => ({ ...ticket })),
      },
    ]);
  }

  function addTicket(scheduleIndex) {
    const nextSchedules = schedules.map((schedule, index) =>
      index === scheduleIndex
        ? {
            ...schedule,
            tickets: [...schedule.tickets, createEmptyTicket()],
          }
        : schedule,
    );

    updateSchedules(nextSchedules);
  }

  function removeTicket(scheduleIndex, ticketIndex) {
    const nextSchedules = schedules.map((schedule, index) => {
      if (index !== scheduleIndex) return schedule;

      const nextTickets = schedule.tickets.filter(
        (_, currentTicketIndex) => currentTicketIndex !== ticketIndex,
      );

      return {
        ...schedule,
        tickets: nextTickets.length > 0 ? nextTickets : [createEmptyTicket()],
      };
    });

    updateSchedules(nextSchedules);
  }

  function updateTicket(scheduleIndex, ticketIndex, field, value) {
    form.clearFieldError?.(
      `schedules.${scheduleIndex}.tickets.${ticketIndex}.${field}`,
    );
    if (field === "startTime" || field === "endTime") {
      form.clearFieldError?.(
        `schedules.${scheduleIndex}.tickets.${ticketIndex}.endTime`,
      );
    }

    const nextSchedules = schedules.map((schedule, index) => {
      if (index !== scheduleIndex) return schedule;

      return {
        ...schedule,
        tickets: schedule.tickets.map((ticket, currentTicketIndex) =>
          currentTicketIndex === ticketIndex
            ? {
                ...ticket,
                [field]: value,
              }
            : ticket,
        ),
      };
    });

    updateSchedules(nextSchedules);
  }

  return (
    <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
          2
        </span>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Lịch trình &amp; Vé
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Một workshop có thể có nhiều ngày, mỗi ngày có nhiều khung giờ
            riêng.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {schedules.map((schedule, scheduleIndex) => (
          <div
            key={scheduleIndex}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-5"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
                  Ngày mở lớp <span className="text-red-500">*</span>
                </label>

                <ScheduleDateInput
                  value={schedule.startOn}
                  onChange={(value) => updateScheduleDate(scheduleIndex, value)}
                />
                <FieldError
                  message={getScheduleError(scheduleIndex, "startOn")}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => duplicateSchedule(scheduleIndex)}
                  className="px-4 py-3 rounded-xl border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition"
                >
                  Sao chép ngày
                </button>

                <button
                  type="button"
                  onClick={() => removeSchedule(scheduleIndex)}
                  className="px-4 py-3 rounded-xl border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  Xóa ngày
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold">
                Khung giờ trong ngày <span className="text-red-500">*</span>
              </label>

              {schedule.tickets.map((ticket, ticketIndex) => (
                <div
                  key={ticketIndex}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-end rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 p-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Bắt đầu
                    </label>

                    <input
                      type="time"
                      value={ticket.startTime}
                      onChange={(event) =>
                        updateTicket(
                          scheduleIndex,
                          ticketIndex,
                          "startTime",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-0"
                    />
                    <FieldError
                      message={getTicketError(
                        scheduleIndex,
                        ticketIndex,
                        "startTime",
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Kết thúc
                    </label>

                    <input
                      type="time"
                      value={ticket.endTime}
                      onChange={(event) =>
                        updateTicket(
                          scheduleIndex,
                          ticketIndex,
                          "endTime",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-0"
                    />
                    <FieldError
                      message={getTicketError(
                        scheduleIndex,
                        ticketIndex,
                        "endTime",
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Giá vé
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        ₫
                      </span>

                      <input
                        min="1"
                        type="number"
                        inputMode="numeric"
                        value={ticket.price}
                        onChange={(event) => {
                          const value = event.target.value.replace(/\D/g, "");

                          updateTicket(
                            scheduleIndex,
                            ticketIndex,
                            "price",
                            value === "" ? "" : Number(value),
                          );
                        }}
                        placeholder="50000"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-7 pr-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-0"
                      />
                    </div>
                    <FieldError
                      message={getTicketError(
                        scheduleIndex,
                        ticketIndex,
                        "price",
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Số vé
                    </label>

                    <input
                      min="1"
                      type="number"
                      inputMode="numeric"
                      value={ticket.maxTickets}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");

                        updateTicket(
                          scheduleIndex,
                          ticketIndex,
                          "maxTickets",
                          value === "" ? "" : Number(value),
                        );
                      }}
                      placeholder="10"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-0"
                    />
                    <FieldError
                      message={getTicketError(
                        scheduleIndex,
                        ticketIndex,
                        "maxTickets",
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeTicket(scheduleIndex, ticketIndex)}
                    className="px-3 py-2.5 rounded-lg text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addTicket(scheduleIndex)}
              className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Thêm khung giờ khác
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSchedule}
        className="mt-6 w-full rounded-xl border-2 border-dashed border-primary/40 py-4 text-primary font-bold hover:bg-primary/10 transition"
      >
        + Thêm ngày khác
      </button>
    </section>
  );
}

function ImageSection({ form }) {
  return (
    <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
          4
        </span>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Thư Viện Không Gian Làm Việc
        </h2>
      </div>

      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-3xl">
            cloud_upload
          </span>
        </div>

        <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">
          Nhấp để tải lên hoặc kéo và thả
        </p>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
          PNG, JPG hoặc JPEG — tối đa 5 ảnh
        </p>

        <p className="text-slate-400 text-xs mb-4">
          Lưu ý: Ảnh đầu tiên sẽ được dùng làm ảnh đại diện.
        </p>

        <input
          ref={form.fileInputRef}
          onChange={form.handleFilesChange}
          multiple
          accept="image/*"
          type="file"
          className="hidden"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => form.fileInputRef.current?.click()}
            className="px-5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            Chọn tệp
          </button>

          {form.hasAnyImage ? (
            <button
              type="button"
              onClick={form.clearAllImages}
              className="px-5 py-2 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm"
            >
              Xóa tất cả
            </button>
          ) : null}
        </div>
      </div>

      {form.hasAnyImage ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {form.existingImageLinks?.map((imageLink, index) => (
            <div
              key={`${imageLink}-${index}`}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                alt={`existing-${index}`}
                className="w-full h-full object-cover"
                src={imageLink}
              />

              {index === 0 ? (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-white">
                  Ảnh đại diện
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => form.removeExistingImageAt(index)}
                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
              </button>
            </div>
          ))}

          {form.previews.map((preview, index) => (
            <div
              key={preview}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
                src={preview}
              />

              <button
                type="button"
                onClick={() => form.removeFileAt(index)}
                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function FormActions({ submitting, editing, onCancel }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a2c2a] border-t border-slate-200 dark:border-slate-800 p-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:pt-4">
      <div className="max-w-[960px] mx-auto flex flex-col-reverse md:flex-row items-center justify-end gap-4">
        <button
          className="w-full md:w-auto px-8 py-4 rounded-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-200"
          type="button"
          onClick={onCancel}
        >
          Hủy
        </button>

        <button
          className="w-full md:w-auto px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 bg-primary shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={submitting}
        >
          <span>
            {submitting
              ? "Đang gửi..."
              : editing
                ? "Cập nhật Workshop"
                : "Đăng Workshop"}
          </span>
        </button>
      </div>
    </div>
  );
}
