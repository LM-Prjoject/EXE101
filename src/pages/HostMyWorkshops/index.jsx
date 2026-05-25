import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createWorkshop } from "../../api";

import HostSidebar from "../../components/HostSidebar";
import useHostWorkshops from "../../hooks/useHostWorkshops";
import HostHeader from "../../components/HostHeader";

import {
  getWorkshopId,
  getWorkshopStatus,
  getWorkshopStatusCounts,
  WORKSHOP_STATUS,
} from "../../utils/workshopStatus";

import { formatScheduleDate } from "../../utils/workshopFormatters";

const statusTabs = [
  {
    value: WORKSHOP_STATUS.ACTIVE,
    label: "Đang hoạt động",
    countKey: "active",
  },
  {
    value: WORKSHOP_STATUS.DRAFT,
    label: "Bản nháp",
    countKey: "draft",
  },
  {
    value: WORKSHOP_STATUS.COMPLETED,
    label: "Đã hoàn thành",
    countKey: "completed",
  },
  {
    value: WORKSHOP_STATUS.PENDING,
    label: "Đang chờ duyệt",
    countKey: "pending",
  },
];

function getNumberValue(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      const number = Number(value);
      if (!Number.isNaN(number)) return number;
    }
  }

  return null;
}

export default function HostMyWorkshops() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [statusFilter, setStatusFilter] = useState(WORKSHOP_STATUS.ACTIVE);

  const { workshops, loading, error, setError, removeWorkshop } =
    useHostWorkshops(currentUser);

  const counts = getWorkshopStatusCounts(workshops);

  const filteredWorkshops = workshops.filter(
    (workshop) => getWorkshopStatus(workshop) === statusFilter,
  );

  function handleEdit(workshop) {
    navigate("/host/create-workshop", { state: { workshop } });
  }

  async function handleDelete(workshop) {
    if (!confirm("Bạn có chắc muốn xóa workshop này?")) return;

    try {
      await removeWorkshop(workshop);
    } catch (err) {
      setError(err?.message || "Không thể xóa workshop.");
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex h-screen">
        <HostSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <HostHeader title="Workshop của tôi" />

          <main className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 gap-8">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`pb-4 text-sm ${
                    statusFilter === tab.value
                      ? "font-bold border-b-2 border-primary text-primary"
                      : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                  type="button"
                >
                  {tab.label} ({loading ? "..." : counts[tab.countKey]})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-600 dark:text-slate-300">
                  Đang tải workshop...
                </div>
              ) : error ? (
                <div className="col-span-full rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-8 text-center text-red-700 dark:text-red-200">
                  {error}
                </div>
              ) : filteredWorkshops.length === 0 ? (
                <div className="col-span-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-600 dark:text-slate-300">
                  Không tìm thấy workshop nào.
                </div>
              ) : (
                filteredWorkshops.map((workshop, index) => {
                  function getNumberValue(...values) {
                    for (const value of values) {
                      if (
                        value !== undefined &&
                        value !== null &&
                        value !== ""
                      ) {
                        const number = Number(value);
                        if (!Number.isNaN(number)) return number;
                      }
                    }

                    return null;
                  }

                  const schedules = [
                    ...(workshop.schedules ?? workshop.Schedules ?? []),
                  ].sort(
                    (a, b) =>
                      new Date(`${a.startOn ?? a.StartOn}T00:00:00`) -
                      new Date(`${b.startOn ?? b.StartOn}T00:00:00`),
                  );

                  const nextSchedule = schedules[0];

                  const ticket =
                    nextSchedule?.tickets?.[0] ?? nextSchedule?.Tickets?.[0];

                  const imageSrc =
                    workshop.thumbnailLink ||
                    workshop.ThumbnailLink ||
                    "https://via.placeholder.com/640x360?text=Workshop";

                  const scheduleDate =
                    nextSchedule?.startOn ??
                    nextSchedule?.StartOn ??
                    workshop.nextSchedule ??
                    workshop.NextSchedule;

                  const scheduleText = scheduleDate
                    ? `Tiếp theo: ${formatScheduleDate(scheduleDate)}`
                    : "Chưa có lịch";

                  const remainingTickets = getNumberValue(
                    workshop.remainingTickets,
                    workshop.RemainingTickets,
                    nextSchedule?.remainingTickets,
                    nextSchedule?.RemainingTickets,
                    ticket?.remainingTickets,
                    ticket?.RemainingTickets,
                  );

                  const maxTickets = getNumberValue(
                    workshop.maxTickets,
                    workshop.MaxTickets,
                    nextSchedule?.maxTickets,
                    nextSchedule?.MaxTickets,
                    ticket?.maxTickets,
                    ticket?.MaxTickets,
                  );

                  const seatText =
                    remainingTickets !== null
                      ? `Còn ${remainingTickets} vé`
                      : maxTickets !== null
                        ? `Tối đa ${maxTickets} vé`
                        : "Chưa có vé";

                  const priceLower = getNumberValue(
                    workshop.priceLower,
                    workshop.PriceLower,
                    nextSchedule?.priceLower,
                    nextSchedule?.PriceLower,
                    ticket?.price,
                    ticket?.Price,
                  );

                  const priceUpper = getNumberValue(
                    workshop.priceUpper,
                    workshop.PriceUpper,
                    nextSchedule?.priceUpper,
                    nextSchedule?.PriceUpper,
                    ticket?.price,
                    ticket?.Price,
                  );

                  const priceText =
                    priceLower !== null &&
                    priceUpper !== null &&
                    priceLower > 0 &&
                    priceUpper > 0
                      ? priceLower === priceUpper
                        ? `${priceLower.toLocaleString("vi-VN")}đ`
                        : `${priceLower.toLocaleString("vi-VN")}đ - ${priceUpper.toLocaleString("vi-VN")}đ`
                      : "Chưa có giá";

                  return (
                    <div
                      key={getWorkshopId(workshop) ?? index}
                      className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          alt={workshop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={imageSrc}
                        />

                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(workshop);
                            }}
                            className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow"
                            type="button"
                            aria-label="Chỉnh sửa workshop"
                          >
                            <span className="material-symbols-outlined text-sm">
                              edit
                            </span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(workshop);
                            }}
                            className="p-2 rounded-full bg-white/90 hover:bg-white text-red-600 shadow"
                            type="button"
                            aria-label="Xóa workshop"
                          >
                            <span className="material-symbols-outlined text-sm">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                            {workshop.title}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {scheduleText}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                            <span className="material-symbols-outlined text-lg">
                              group
                            </span>
                            <span>{seatText}</span>
                          </div>

                          <span className="font-bold text-primary">
                            {priceText}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-medium text-primary flex items-center gap-1">
                            Quản lý người tham gia
                            <span className="material-symbols-outlined text-sm">
                              chevron_right
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
