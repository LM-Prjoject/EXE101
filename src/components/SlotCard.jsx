import { getSessionLabel, getTimeLabel } from "../utils/date";

import {
  getStatusDotClass,
  getStatusKey,
  getStatusLabel,
} from "../constants/status";

export default function SlotCard({ slot, onEdit }) {
  const isFull = slot.maxTickets > 0 && slot.remain <= 0;
  const statusKey = getStatusKey(slot.status);
  const statusLabel = getStatusLabel(statusKey);
  const statusDotClass = getStatusDotClass(statusKey);

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div
        className={`absolute top-0 left-0 w-1 h-full ${
          isFull ? "bg-slate-300 dark:bg-slate-700" : "bg-primary"
        }`}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isFull ? "text-slate-400" : "text-primary"
            }`}
          >
            {getSessionLabel(slot.startTime)}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className={`size-2 rounded-full ${statusDotClass}`} />
            {statusLabel}
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
            isFull
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isFull ? "Đã hết chỗ" : `Còn ${slot.remain} chỗ`}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-lg">schedule</span>
          <span className="text-sm font-medium">
            {getTimeLabel(slot.startTime, slot.endTime)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-lg">group</span>
          <span className="text-sm font-medium">
            {slot.participantCount} người tham gia
            {slot.maxTickets ? ` / ${slot.maxTickets} vé` : ""}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(slot)}
          className="flex-1 bg-slate-50 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold"
        >
          Chỉnh sửa
        </button>

        <button
          type="button"
          disabled
          title="BE hiện chưa có endpoint hủy riêng từng lịch/ticket"
          className="flex-1 bg-slate-50 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
}
