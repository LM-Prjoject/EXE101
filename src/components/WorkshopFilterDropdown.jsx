export default function WorkshopFilterDropdown({
  open,
  onToggle,
  selectedWorkshop,
  selectedWorkshopLabel,
  workshopFilters,
  onSelect,
}) {
  return (
    <div className="relative w-[220px]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 rounded-xl bg-slate-900 dark:bg-slate-100 px-5 py-3 text-sm font-bold text-white dark:text-slate-900 shadow-sm"
      >
        <span className="truncate">{selectedWorkshopLabel}</span>

        <span
          className={`material-symbols-outlined text-lg transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          keyboard_arrow_down
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
          <button
            type="button"
            onClick={() => onSelect("all")}
            className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 ${
              selectedWorkshop === "all"
                ? "text-primary"
                : "text-slate-700 dark:text-slate-200"
            }`}
          >
            <span>Tất cả Workshop</span>

            {selectedWorkshop === "all" ? (
              <span className="material-symbols-outlined text-lg">check</span>
            ) : null}
          </button>

          {workshopFilters.map((workshop) => {
            const value = String(workshop.id);
            const active = selectedWorkshop === value;

            return (
              <button
                key={workshop.id}
                type="button"
                onClick={() => onSelect(value)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  active ? "text-primary" : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <span className="truncate">{workshop.title}</span>

                {active ? (
                  <span className="material-symbols-outlined text-lg">
                    check
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
