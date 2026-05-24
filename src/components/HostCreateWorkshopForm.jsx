import { categoryOptions, levelOptions } from "../utils/workshopFormatters";

export default function HostCreateWorkshopForm({
  form,
  editingWorkshop,
  onCancel,
}) {
  return (
    <form className="space-y-12" onSubmit={form.handleSubmit}>
      {form.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-200">
          {form.error}
        </div>
      ) : null}

      <BasicInfoSection form={form} />

      <ScheduleSection form={form} />

      <TicketSection form={form} />

      <ImageSection form={form} />

      <FormActions
        submitting={form.submitting}
        editing={Boolean(editingWorkshop)}
        onCancel={onCancel}
      />
    </form>
  );
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
            required
            value={form.title}
            onChange={(event) => form.setTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
            placeholder="vd: Lớp học làm gốm ngắm hoàng hôn trên biển"
            type="text"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
              Địa điểm <span className="text-red-500">*</span>
            </label>

            <input
              value={form.location}
              onChange={(event) => form.setLocation(event.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="vd: 123 Phố Hội An, Đà Nẵng"
              type="text"
            />
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
                onClick={() => form.setCategoryId(category.id)}
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

function ScheduleSection({ form }) {
  return (
    <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
          2
        </span>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Cài Đặt Lịch Trình
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Ngày mở lớp <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={form.scheduleDate}
            onChange={(event) => form.setScheduleDate(event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Khung giờ <span className="text-red-500">*</span>
          </label>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0"
                type="time"
                value={form.startTime}
                onChange={(event) => form.setStartTime(event.target.value)}
              />

              <span className="text-slate-400 text-sm">đến</span>

              <input
                className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0"
                type="time"
                value={form.endTime}
                onChange={(event) => form.setEndTime(event.target.value)}
              />
            </div>

            <button
              className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Thêm khung giờ khác
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TicketSection({ form }) {
  return (
    <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
          3
        </span>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Vé &amp; Sức Chứa
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Giá mỗi người (VND) <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ₫
            </span>

            <input
              required
              min="1"
              value={form.price}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "");
                form.setPrice(value === "" ? "" : Number(value));
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-8 pr-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="500000"
              type="number"
              inputMode="numeric"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Đã bao gồm phí nền tảng và thuế.
          </p>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
            Số lượng tối đa <span className="text-red-500">*</span>
          </label>

          <input
            required
            min="1"
            value={form.maxTickets}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              form.setMaxTickets(value === "" ? "" : Number(value));
            }}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
            placeholder="8"
            type="number"
            inputMode="numeric"
          />
        </div>
      </div>
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
          {form.existingThumbnail ? (
            <div className="relative aspect-square rounded-xl overflow-hidden group">
              <img
                alt="existing"
                className="w-full h-full object-cover"
                src={form.existingThumbnail}
              />

              <button
                type="button"
                onClick={() => form.setExistingThumbnail("")}
                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
              </button>
            </div>
          ) : null}

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
