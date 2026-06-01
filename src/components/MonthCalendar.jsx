import { formatMonthVi, getDaysInMonth } from "../utils/date";

import {
  getDateStatusKeys,
  getStatusDotClass,
  getStatusLabel,
} from "../constants/status";

export default function MonthCalendar({
  monthDate,
  slotsByDate,
  selectedDate,
  onSelectDate,
  onPrev,
  onNext,
  showPrev,
  showNext,
  muted,
}) {
  const days = getDaysInMonth(monthDate);

  return (
    <div
      className={`p-6 ${muted ? "bg-slate-50/50 dark:bg-slate-800/20" : ""}`}
    >
      <div className="flex items-center justify-between mb-6">
        {showPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        ) : (
          <div className="size-8" />
        )}

        <h4 className="font-bold text-lg capitalize">
          {formatMonthVi(monthDate)}
        </h4>

        {showNext ? (
          <button
            type="button"
            onClick={onNext}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        ) : (
          <div className="size-8" />
        )}
      </div>

      <div className="grid grid-cols-7 gap-px mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((item, index) => {
          if (!item) return <div key={`blank-${index}`} className="h-10" />;

          const dateSlots = slotsByDate[item.dateKey] || [];
          const hasSlot = dateSlots.length > 0;
          const isSelected = selectedDate === item.dateKey;
          const statusKeys = getDateStatusKeys(dateSlots);

          return (
            <button
              key={item.dateKey}
              type="button"
              onClick={() => onSelectDate(item.dateKey)}
              className={[
                "h-10 flex items-center justify-center rounded-lg font-medium text-sm relative",
                isSelected
                  ? "bg-primary text-white font-bold shadow-md shadow-primary/30"
                  : hasSlot
                    ? "bg-primary/20 text-primary font-bold"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800",
              ].join(" ")}
            >
              {item.day}

              {hasSlot ? (
                <div className="absolute bottom-1 flex items-center justify-center gap-0.5">
                  {statusKeys.slice(0, 3).map((status) => (
                    <span
                      key={status}
                      title={getStatusLabel(status)}
                      className={`size-1 rounded-full ${getStatusDotClass(status)}`}
                    />
                  ))}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
