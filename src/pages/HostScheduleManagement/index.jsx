import { useNavigate } from "react-router-dom";
import HostHeader from "../../components/HostHeader";
import HostSidebar from "../../components/HostSidebar";

import MonthCalendar from "../../components/MonthCalendar";
import SlotCard from "../../components/SlotCard";
import WorkshopFilterDropdown from "../../components/WorkshopFilterDropdown";

import { useHostScheduleManagement } from "../../hooks/useHostScheduleManagement";
import { formatDateVi } from "../../utils/date";

export default function HostScheduleManagement() {
  const navigate = useNavigate();

  const {
    monthCursor,
    nextMonth,
    selectedDate,
    setSelectedDate,

    filterOpen,
    setFilterOpen,
    selectedWorkshop,
    selectedWorkshopLabel,
    workshopFilters,
    handleSelectWorkshop,

    loading,
    error,

    slotsByDate,
    selectedSlots,
    thisMonthSlots,
    bookingsThisMonth,
    activeWorkshops,

    handlePrevMonth,
    handleNextMonth,
  } = useHostScheduleManagement();

  function handleEdit(slot) {
    if (slot.workshopId) {
      navigate(`/host/workshops/edit/${slot.workshopId}`);
      return;
    }

    navigate("/host/workshops");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="flex min-h-screen">
        <HostSidebar />

        <main className="flex-1 flex flex-col">
          <HostHeader title="Quản lý Lịch trình" />

          <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Lịch Workshop
                </h3>

                <p className="text-slate-500 dark:text-slate-400">
                  Quản lý các khung giờ sắp tới và tình trạng sẵn có của bạn
                </p>
              </div>
            </div>

            <WorkshopFilterDropdown
              open={filterOpen}
              onToggle={() => setFilterOpen((open) => !open)}
              selectedWorkshop={selectedWorkshop}
              selectedWorkshopLabel={selectedWorkshopLabel}
              workshopFilters={workshopFilters}
              onSelect={handleSelectWorkshop}
            />

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
                {error}
              </div>
            ) : null}

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              {loading ? (
                <div className="p-10 text-center text-slate-500 font-medium">
                  Đang tải lịch trình...
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
                    <MonthCalendar
                      monthDate={monthCursor}
                      slotsByDate={slotsByDate}
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                      onPrev={handlePrevMonth}
                      showPrev
                    />

                    <MonthCalendar
                      monthDate={nextMonth}
                      slotsByDate={slotsByDate}
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                      onNext={handleNextMonth}
                      showNext
                      muted
                    />
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 p-4 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h5 className="text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          event_available
                        </span>
                        Khung giờ ngày {formatDateVi(selectedDate)}
                      </h5>
                    </div>

                    {selectedSlots.length === 0 ? (
                      <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-500">
                        Chưa có khung giờ nào trong ngày này.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedSlots.map((slot) => (
                          <SlotCard
                            key={slot.id}
                            slot={slot}
                            onEdit={handleEdit}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-1">
                  Booking tháng này
                </p>

                <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {bookingsThisMonth}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">
                  Khung giờ tháng này
                </p>

                <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {thisMonthSlots.length}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">
                  Workshop có lịch
                </p>

                <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {activeWorkshops}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
