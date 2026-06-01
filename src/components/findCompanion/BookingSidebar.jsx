import { Link } from "react-router-dom";
import { BRAND } from "../../constants/findCompanionTheme";
import {
  formatCurrency,
  formatDate,
  formatTimeOnly,
  isPastSchedule,
  isPastSlot,
} from "../../utils/findCompanionUtils";

import HostInfoCard from "./HostInfoCard";
import PolicyCard from "./PolicyCard";

export default function BookingSidebar({
  navigate,
  workshop,
  detail,
  currentUser,
  selectedScheduleId,
  setSelectedScheduleId,
  tickets,
  ticketsLoading,
  selectedTicketId,
  setSelectedTicketId,
  paymentError,
  handleProceedPayment,
  activeSchedule,
  activeRemainingTickets,
  isActiveTicketPast,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        <div
          className="p-6 rounded-2xl shadow-xl border"
          style={{
            background: "rgba(255,255,255,0.86)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <BookingPriceHeader
            priceText={detail.priceText}
            activeRemainingTickets={activeRemainingTickets}
          />

          <div className="space-y-4 mb-6">
            <ScheduleSelector
              schedules={detail.schedules}
              selectedScheduleId={selectedScheduleId}
              onSelect={setSelectedScheduleId}
            />

            <TicketSelector
              tickets={tickets}
              ticketsLoading={ticketsLoading}
              selectedTicketId={selectedTicketId}
              onSelect={setSelectedTicketId}
              activeSchedule={activeSchedule}
            />

            <BuyerInfo currentUser={currentUser} />
          </div>

          {paymentError ? (
            <PaymentError message={paymentError} />
          ) : (
            <TicketWarning />
          )}

          <PaymentButton
            currentUser={currentUser}
            navigate={navigate}
            selectedTicketId={selectedTicketId}
            isActiveTicketPast={isActiveTicketPast}
            activeRemainingTickets={activeRemainingTickets}
            onPay={handleProceedPayment}
          />

          <div className="mt-4 text-center">
            <span className="text-xs" style={{ color: "#94a3b8" }}>
              Thanh toán an toàn qua cổng SmartPay Checkout
            </span>
          </div>
        </div>

        <HostInfoCard workshop={workshop} navigate={navigate} />

        <PolicyCard />
      </div>
    </div>
  );
}

function BookingPriceHeader({ priceText, activeRemainingTickets }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-sm font-semibold" style={{ color: "#64748b" }}>
          Giá mỗi người
        </span>

        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-black" style={{ color: "#0f172a" }}>
            {priceText}
          </span>

          <span className="text-lg font-semibold" style={{ color: "#64748b" }}>
            mỗi người
          </span>
        </div>
      </div>

      <div
        className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 border"
        style={{
          background: `${BRAND.soft}18`,
          borderColor: `${BRAND.soft}66`,
          color: BRAND.accent,
        }}
      >
        <span className="material-symbols-outlined text-sm">check_circle</span>
        {activeRemainingTickets !== null
          ? activeRemainingTickets > 0
            ? `Còn ${activeRemainingTickets} vé`
            : "Hết vé"
          : "Còn chỗ"}
      </div>
    </div>
  );
}

function ScheduleSelector({ schedules, selectedScheduleId, onSelect }) {
  return (
    <div>
      <label
        className="block text-sm font-black mb-2"
        style={{ color: "#334155" }}
      >
        Chọn lịch học
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {schedules.length > 0 ? (
          schedules.map((schedule) => {
            const schedulePast = isPastSchedule(schedule.startOn);
            const isSelected =
              selectedScheduleId.toString() === schedule.id.toString();

            return (
              <button
                key={schedule.id}
                disabled={schedulePast}
                onClick={() => onSelect(schedule.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-1 relative ${
                  isSelected ? "ring-2 ring-offset-1" : ""
                }`}
                style={{
                  background: schedulePast
                    ? "#f1f5f9"
                    : isSelected
                      ? `${BRAND.soft}1a`
                      : "rgba(255,255,255,0.7)",
                  borderColor: schedulePast
                    ? "#cbd5e1"
                    : isSelected
                      ? BRAND.accent
                      : `${BRAND.soft}66`,
                  color: schedulePast ? "#94a3b8" : "#0f172a",
                  cursor: schedulePast ? "not-allowed" : "pointer",
                  opacity: schedulePast ? 0.7 : 1,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-black text-sm flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-base shrink-0"
                      style={{
                        color: schedulePast ? "#94a3b8" : BRAND.primary,
                      }}
                    >
                      calendar_month
                    </span>
                    {formatDate(schedule.startOn)}
                  </span>

                  {isSelected && !schedulePast ? (
                    <span
                      className="material-symbols-outlined text-base shrink-0"
                      style={{ color: BRAND.accent }}
                    >
                      check_circle
                    </span>
                  ) : null}
                </div>

                {schedulePast ? (
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1">
                    Đã diễn ra
                  </div>
                ) : null}
              </button>
            );
          })
        ) : (
          <div className="col-span-full text-center py-4 text-sm font-semibold text-slate-400">
            Đang cập nhật lịch học
          </div>
        )}
      </div>
    </div>
  );
}

function TicketSelector({
  tickets,
  ticketsLoading,
  selectedTicketId,
  onSelect,
  activeSchedule,
}) {
  if (ticketsLoading) {
    return (
      <div
        className="flex items-center justify-center py-6 text-sm font-semibold"
        style={{ color: "#64748b" }}
      >
        <span className="material-symbols-outlined animate-spin mr-2 text-lg">
          progress_activity
        </span>
        Đang tải các loại vé...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-black" style={{ color: "#334155" }}>
        Chọn loại vé
      </label>

      {tickets.length === 0 ? (
        <div
          className="text-center py-6 text-sm font-semibold rounded-xl border border-dashed p-4"
          style={{ borderColor: `${BRAND.soft}66`, color: "#94a3b8" }}
        >
          <span
            className="material-symbols-outlined text-2xl mb-1 block"
            style={{ color: BRAND.primary }}
          >
            confirmation_number
          </span>
          Không có vé khả dụng cho lịch học này
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const isSelected = selectedTicketId === ticket.id;
            const isSoldOut = ticket.remainingTickets <= 0;
            const isTicketPast = activeSchedule
              ? isPastSlot(activeSchedule.startOn, ticket.startTime)
              : false;
            const disabled = isSoldOut || isTicketPast;

            return (
              <button
                key={ticket.id}
                disabled={disabled}
                onClick={() => onSelect(ticket.id)}
                className={`w-full p-4 rounded-xl border text-left flex flex-col gap-2 ${
                  isSelected ? "ring-2 ring-offset-1" : ""
                }`}
                style={{
                  background: disabled
                    ? "#f1f5f9"
                    : isSelected
                      ? `${BRAND.soft}1a`
                      : "rgba(255,255,255,0.7)",
                  borderColor: disabled
                    ? "#cbd5e1"
                    : isSelected
                      ? BRAND.accent
                      : `${BRAND.soft}66`,
                  color: disabled ? "#94a3b8" : "#0f172a",
                  opacity: disabled ? 0.7 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <div className="flex items-start justify-between w-full">
                  <div>
                    <h5 className="font-black text-sm flex items-center gap-1.5">
                      {ticket.ticketType}
                      {isSelected ? (
                        <span
                          className="material-symbols-outlined text-base"
                          style={{ color: BRAND.accent }}
                        >
                          check_circle
                        </span>
                      ) : null}
                    </h5>

                    <p className="text-xs font-semibold mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      {formatTimeOnly(ticket.startTime)} -{" "}
                      {formatTimeOnly(ticket.endTime)}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className="text-sm font-black"
                      style={{ color: BRAND.accent }}
                    >
                      {formatCurrency(ticket.price)}
                    </div>

                    <div
                      className="text-[11px] font-semibold mt-1"
                      style={{ color: disabled ? "#ef4444" : "#94a3b8" }}
                    >
                      {isTicketPast
                        ? "Đã diễn ra"
                        : isSoldOut
                          ? "Hết vé"
                          : `Còn ${ticket.remainingTickets} vé`}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BuyerInfo({ currentUser }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-black" style={{ color: "#334155" }}>
        Thông tin người tham gia
      </label>

      {currentUser ? (
        <div
          className="p-4 rounded-xl border flex items-center gap-3"
          style={{
            background: `${BRAND.soft}14`,
            borderColor: `${BRAND.soft}66`,
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: `${BRAND.soft}44` }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: BRAND.primary }}
            >
              person
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div
              className="text-[10px] font-black uppercase tracking-wider"
              style={{ color: BRAND.primary }}
            >
              Tài khoản thanh toán
            </div>

            <div
              className="text-sm font-black truncate"
              style={{ color: "#0f172a" }}
            >
              {currentUser?.name ||
                currentUser?.email?.split("@")[0] ||
                "Người dùng"}
            </div>

            <div
              className="text-xs truncate font-semibold"
              style={{ color: "#64748b" }}
            >
              {currentUser?.email || "Chưa cập nhật email"}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-4 rounded-xl border text-center space-y-3"
          style={{
            background: "rgba(239, 68, 68, 0.05)",
            borderColor: "rgba(239, 68, 68, 0.2)",
          }}
        >
          <span
            className="material-symbols-outlined text-2xl block"
            style={{ color: "#ef4444" }}
          >
            no_accounts
          </span>

          <p className="text-xs font-black" style={{ color: "#ef4444" }}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để đặt vé.
          </p>

          <Link
            to="/login"
            className="inline-flex h-9 px-4 items-center justify-center rounded-lg text-xs font-black text-white"
            style={{ background: "#ef4444" }}
          >
            Đăng nhập ngay
          </Link>
        </div>
      )}
    </div>
  );
}

function PaymentError({ message }) {
  return (
    <div
      className="flex items-start gap-2 text-xs font-semibold mb-6 p-3 rounded-lg border"
      style={{
        color: "#ef4444",
        background: "rgba(239, 68, 68, 0.05)",
        borderColor: "rgba(239, 68, 68, 0.2)",
      }}
    >
      <span className="material-symbols-outlined text-base shrink-0">
        error
      </span>
      <span>{message}</span>
    </div>
  );
}

function TicketWarning() {
  return (
    <div
      className="flex items-center gap-2 text-sm font-semibold mb-6 p-3 rounded-lg border"
      style={{
        color: BRAND.accent,
        background: `${BRAND.soft}18`,
        borderColor: `${BRAND.soft}66`,
      }}
    >
      <span className="material-symbols-outlined text-lg shrink-0">
        local_fire_department
      </span>
      <span>Mỗi tài khoản chỉ được mua tối đa 1 vé cho mỗi workshop!</span>
    </div>
  );
}

function PaymentButton({
  currentUser,
  navigate,
  selectedTicketId,
  isActiveTicketPast,
  activeRemainingTickets,
  onPay,
}) {
  const disabled =
    !selectedTicketId || isActiveTicketPast || activeRemainingTickets === 0;

  if (!currentUser) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="w-full py-3.5 px-6 rounded-xl font-black text-lg flex items-center justify-center gap-2"
        style={{
          background: BRAND.accent,
          color: "white",
          boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
        }}
      >
        <span className="material-symbols-outlined text-xl">login</span>
        Đăng nhập để đặt vé
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onPay}
      className="w-full py-3.5 px-6 rounded-xl font-black text-lg flex items-center justify-center gap-2"
      style={{
        background: BRAND.accent,
        color: "white",
        boxShadow: "0 14px 30px rgba(240,138,120,0.18)",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span className="material-symbols-outlined text-xl">credit_card</span>
      {isActiveTicketPast
        ? "Đã diễn ra"
        : activeRemainingTickets === 0
          ? "Hết vé"
          : "Đặt vé ngay"}
    </button>
  );
}
