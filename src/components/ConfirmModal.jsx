export default function ConfirmModal({
  open,
  title = "Xác nhận thao tác",
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "primary",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700",
    success: "bg-emerald-600 hover:bg-emerald-700",
    danger: "bg-rose-600 hover:bg-rose-700",
    warning: "bg-amber-500 hover:bg-amber-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>

          {message && (
            <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-lg px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${
              variantClasses[variant] || variantClasses.primary
            }`}
          >
            {loading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
