import { BRAND } from "../../constants/findCompanionTheme";
import { useFindCompanion } from "../../hooks/useFindCompanion";

import PageState from "../../components/findCompanion/PageState";
import FindCompanionHeader from "../../components/findCompanion/FindCompanionHeader";
import FindCompanionFooter from "../../components/findCompanion/FindCompanionFooter";
import Breadcrumbs from "../../components/findCompanion/Breadcrumbs";
import WorkshopHero from "../../components/findCompanion/WorkshopHero";
import WorkshopGallery from "../../components/findCompanion/WorkshopGallery";
import AboutSection from "../../components/findCompanion/AboutSection";
import LocationSection from "../../components/findCompanion/LocationSection";
import ReviewsSection from "../../components/findCompanion/ReviewsSection";
import BookingSidebar from "../../components/findCompanion/BookingSidebar";

export default function FindCompanion() {
  const companion = useFindCompanion();

  const {
    navigate,
    loading,
    error,
    detail,
    currentUser,

    reviews,
    reviewsLoading,
    reviewsTotal,
    reviewsLoadingMore,
    loadMoreReviews,

    workshop,
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
  } = companion;

  if (loading) {
    return (
      <PageState type="loading" message="Đang tải thông tin workshop..." />
    );
  }

  if (error) {
    return (
      <PageState
        type="error"
        message={error}
        actionLabel="Về trang chủ"
        onAction={() => navigate("/home")}
      />
    );
  }

  return (
    <div
      className="font-display antialiased min-h-screen flex flex-col"
      style={{ background: BRAND.lightBg, color: "#0f172a" }}
    >
      <FindCompanionHeader currentUser={currentUser} />

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs location={detail.location} />

        <WorkshopHero detail={detail} />

        <WorkshopGallery images={detail.galleryImages} />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="lg:col-span-2 space-y-10">
            <AboutSection
              detail={detail}
              activeRemainingTickets={activeRemainingTickets}
            />

            <LocationSection location={detail.location} />

            <ReviewsSection
              reviews={reviews}
              reviewsLoading={reviewsLoading}
              reviewsTotal={reviewsTotal}
              reviewsLoadingMore={reviewsLoadingMore}
              onLoadMore={loadMoreReviews}
            />
          </div>

          <BookingSidebar
            navigate={navigate}
            workshop={workshop}
            detail={detail}
            currentUser={currentUser}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
            tickets={tickets}
            ticketsLoading={ticketsLoading}
            selectedTicketId={selectedTicketId}
            setSelectedTicketId={setSelectedTicketId}
            paymentError={paymentError}
            handleProceedPayment={handleProceedPayment}
            activeSchedule={activeSchedule}
            activeRemainingTickets={activeRemainingTickets}
            isActiveTicketPast={isActiveTicketPast}
          />
        </div>
      </main>

      <FindCompanionFooter />

      <style>{`
        .dark .FindCompanionRoot {
          background: ${BRAND.darkBg};
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
