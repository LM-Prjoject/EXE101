import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { DEFAULT_AVATAR } from "../../utils/userProfile";
import EditProfileModal from "../../components/EditProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import HostSidebar from "../../components/HostSidebar";
import HostHeader from "../../components/HostHeader";
import { getPurchasedSchedules, postWorkshopReview } from "../../api/workshop";
export default function UserProfile() {
  const navigate = useNavigate();
  const { currentUser, userProfile, authToken, logout } = useAuth();
  const [isHostMenuOpen, setIsHostMenuOpen] = useState(false);
  const hostMenuRef = useRef(null);
  const {
    user,
    loadingProfile,
    profileError,

    showEditModal,
    setShowEditModal,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    editAvatarUrl,
    setEditAvatarUrl,
    editLoading,
    uploadingAvatar,
    editError,
    editSuccess,
    handleOpenEditModal,
    handleAvatarUpload,
    handleSaveEditProfile,

    showPasswordModal,
    setShowPasswordModal,
    oldPassword,
    setOldPassword,
    newPasswordInput,
    setNewPasswordInput,
    confirmNewPassword,
    setConfirmNewPassword,
    passwordLoading,
    passwordError,
    passwordSuccess,
    handleOpenPasswordModal,
    handleChangePassword,
  } = useUserProfile({
    currentUser,
    userProfile,
    authToken,
  });
  const normalizedRole = String(user?.role || "")
    .trim()
    .toLowerCase();
  const isUserHost = normalizedRole === "host";
  const isHost = isUserHost;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (hostMenuRef.current && !hostMenuRef.current.contains(event.target)) {
        setIsHostMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketsError, setTicketsError] = useState("");

  const [reviewWorkshop, setReviewReviewWorkshop] = useState(null);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const handleOpenReviewModal = (workshop) => {
    setReviewReviewWorkshop(workshop);
    setReviewTitle("");
    setReviewDesc("");
    setReviewRating(5);
    setReviewHoverRating(0);
    setReviewError("");
    setReviewSuccess("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewDesc.trim()) {
      setReviewError("Vui lòng nhập đầy đủ tiêu đề và nội dung đánh giá.");
      return;
    }

    setSubmittingReview(true);
    setReviewError("");
    setReviewSuccess("");

    try {
      await postWorkshopReview(
        reviewWorkshop.workshopId || reviewWorkshop.id,
        reviewTitle,
        reviewDesc,
        reviewRating,
        authToken
      );
      setReviewSuccess("Đăng đánh giá thành công! Cảm ơn nhận xét của bạn.");
      
      setTimeout(() => {
        setReviewReviewWorkshop(null);
        // Refresh purchased list to update state if needed
        getPurchasedSchedules(authToken, 1, 50).then(res => {
          setPurchasedTickets(res?.data || []);
        });
      }, 2000);
    } catch (err) {
      setReviewError(err?.message || "Đã xảy ra lỗi khi gửi đánh giá.");
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    if (!authToken) return;

    let ignore = false;
    async function loadTickets() {
      setLoadingTickets(true);
      setTicketsError("");
      try {
        const response = await getPurchasedSchedules(authToken, 1, 50);
        if (!ignore) {
          setPurchasedTickets(response?.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setTicketsError(err?.message || "Không thể tải lịch sử mua vé.");
        }
      } finally {
        if (!ignore) {
          setLoadingTickets(false);
        }
      }
    }

    loadTickets();
    return () => {
      ignore = true;
    };
  }, [authToken]);

  const formatCurrency = (value) => {
    if (value == null) return "Liên hệ";
    return `${Number(value).toLocaleString("vi-VN")}₫`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Đang cập nhật";
    try {
      return new Intl.DateTimeFormat("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const formatTimeOnly = (timeStr) => {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
    return timeStr;
  };

  const pageClass = isHost
    ? "bg-[#f4efe6] dark:bg-[#0f1115] font-display antialiased text-[#071634] dark:text-slate-100 min-h-screen flex"
    : "bg-[#F6F2E9] dark:bg-[#0f1115] font-display antialiased text-[#c3996c] dark:text-slate-100 min-h-screen flex flex-col";

  const contentClass = isHost
    ? "flex min-h-screen flex-1 flex-col min-w-0 bg-[#f4efe6] dark:bg-[#0f1115]"
    : "layout-container flex h-full grow flex-col";

  const mainClass = isHost
    ? "flex-1 flex justify-center py-10 px-6 sm:px-10"
    : "flex-1 flex justify-center py-8 px-4 sm:px-8";

  const cardClass = isHost
    ? "bg-white dark:bg-[#151822] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden"
    : "bg-[#fbc4ae]/25 dark:bg-[#151822] rounded-3xl p-8 mb-8 shadow-soft flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden";

  const accentButtonClass = isHost
    ? "flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#6f8b6f] text-white text-sm font-bold hover:bg-[#5f7b5f] transition-colors shadow-lg shadow-[#6f8b6f]/25"
    : "flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#f08a78] text-white text-sm font-bold hover:bg-[#ee7a66] transition-colors shadow-lg shadow-[#f08a78]/25";

  const softButtonClass = isHost
    ? "flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#eef2ed] dark:bg-slate-800 border border-[#d8e2d6] dark:border-slate-700 text-[#6f8b6f] dark:text-slate-200 text-sm font-bold hover:bg-[#e4ece2] dark:hover:bg-slate-700 transition-colors"
    : "flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#fbc4ae]/25 dark:bg-slate-800 border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] dark:text-slate-200 text-sm font-bold hover:bg-[#fbc4ae]/35 dark:hover:bg-slate-700 transition-colors";

  const primaryTextColor = isHost ? "text-[#6f8b6f]" : "text-[#c3996c]";
  const iconColor = isHost ? "text-[#6f8b6f]" : "text-[#f08a78]";
  const listBorderClass = isHost
    ? "border-slate-200 dark:border-slate-800"
    : "border-[#fbc4ae]/20 dark:border-slate-800";
  const boxBorderClass = isHost
    ? "border-slate-200 dark:border-slate-800"
    : "border-[#fbc4ae]/40 dark:border-slate-800";
  return (
    <>
      <div className={pageClass}>
        {isHost && <HostSidebar />}

        <div className={contentClass}>
          {isHost ? (
            <HostHeader title="Hồ sơ của tôi" profileOverride={user} />
          ) : (
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
              <div className="flex items-center gap-8">
                <Link to="/home" className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center overflow-visible">
                    <img
                      src="/img/onlyLogo.png"
                      alt="Hands & Hour Logo"
                      className="h-8 w-8 object-contain scale-150 origin-center"
                    />
                  </div>

                  <h2 className="text-xl font-black tracking-tight">
                    <span className="text-[#c3996c]">Hands</span>{" "}
                    <span className="text-[#f08a78]">&amp;</span>{" "}
                    <span className="text-[#c3996c]">Hour</span>
                  </h2>
                </Link>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = e.target.search.value;
                    navigate(`/advanced-search?q=${encodeURIComponent(q)}`);
                  }}
                  className="hidden md:flex flex-col min-w-40 !h-10 max-w-64"
                >
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                    <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <span className="material-symbols-outlined text-xl">
                        search
                      </span>
                    </div>

                    <input
                      name="search"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                      placeholder="Tìm kiếm workshop..."
                      type="text"
                    />
                  </div>
                </form>
              </div>

              <div className="flex flex-1 justify-end gap-8 items-center">
                <div className="hidden lg:flex items-center gap-9">
                  <button
                    type="button"
                    onClick={() => navigate("/workshops")}
                    className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  >
                    Workshops
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/advanced-search")}
                    className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  >
                    Khám phá
                  </button>

                  <button
                    type="button"
                    className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  >
                    Cộng đồng
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (isUserHost) {
                      navigate("/host/dashboard");
                    } else {
                      navigate("/host/verification");
                    }
                  }}
                  className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"
                >
                  <span className="truncate">
                    {isUserHost ? "Chế độ Host" : "Trở thành Host"}
                  </span>
                </button>

                <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-6">
                  <button className="relative group">
                    <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">
                      notifications
                    </span>
                    <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151822]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:block text-sm font-semibold text-[#c3996c]">
                      Xin chào, <span className="font-black">{user.name}</span>
                    </span>

                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                      data-alt={`${user.name} avatar`}
                      style={{
                        backgroundImage: `url("${user.avatarUrl}")`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </header>
          )}

          <main className={mainClass}>
            <div className="flex flex-col max-w-[1100px] w-full">
              <div className={cardClass}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f08a78]/18 via-[#fbc4ae]/10 to-transparent dark:from-[#f08a78]/12 dark:via-[#fbc4ae]/6 dark:to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center md:items-start gap-6 w-full md:flex-row">
                  <div className="relative mt-4 md:mt-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white dark:border-[#151822] shadow-md"
                      data-alt={`${user.name} avatar`}
                      style={{
                        backgroundImage: `url("${user.avatarUrl}")`,
                      }}
                    />

                    <button
                      onClick={handleOpenEditModal}
                      className="absolute bottom-1 right-1 bg-white/90 dark:bg-slate-700 p-2 rounded-full shadow-md text-[#c3996c]/80 hover:text-[#f08a78] transition-colors border border-[#fbc4ae]/60 dark:border-slate-600"
                    >
                      <span className="material-symbols-outlined text-lg block">
                        edit
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center md:items-start flex-1 pt-4 md:pt-12 text-center md:text-left">
                    <h1 className="text-[#2B2B2B] dark:text-slate-100 text-3xl font-bold leading-tight tracking-[-0.015em]">
                      {loadingProfile ? "Đang tải..." : user.name}
                    </h1>

                    <p className="text-[#2B2B2B]/70 dark:text-[#d5ddc3] text-base font-medium mt-1">
                      {user.email}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-[#2B2B2B]/60 dark:text-[#d5ddc3]">
                      <span className="material-symbols-outlined text-lg">
                        badge
                      </span>
                      <span>{isUserHost ? "Host" : "User"}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {user.joinedYear
                          ? `Thành viên từ ${user.joinedYear}`
                          : `ID: ${user.id || "N/A"}`}
                      </span>
                    </div>

                    {profileError ? (
                      <p className="mt-4 text-rose-500 font-semibold">
                        {profileError}
                      </p>
                    ) : (
                      <div className="mt-4 space-y-2 text-sm text-[#2B2B2B] dark:text-slate-300 w-full max-w-md">
                        <div className={`flex items-center gap-2.5 py-1.5 border-b ${listBorderClass}`}>
                          <span className={`material-symbols-outlined ${primaryTextColor} text-lg shrink-0`}>
                            phone_iphone
                          </span>
                          <span className={`font-semibold ${primaryTextColor} min-w-[100px]`}>
                            Số điện thoại:
                          </span>
                          <span>{user.phoneNumber || "Chưa cập nhật"}</span>
                        </div>

                        <div className={`flex items-center gap-2.5 py-1.5 border-b ${listBorderClass}`}>
                          <span className={`material-symbols-outlined ${primaryTextColor} text-lg shrink-0`}>
                            verified
                          </span>
                          <span className={`font-semibold ${primaryTextColor} min-w-[100px]`}>
                            Trạng thái:
                          </span>
                          <span
                            className={
                              user.verified
                                ? "text-emerald-600 dark:text-emerald-400 font-bold"
                                : "text-amber-600 dark:text-amber-400 font-bold"
                            }
                          >
                            {user.verified == null
                              ? "Chưa có dữ liệu"
                              : user.verified
                                ? "Đã xác minh"
                                : "Chưa xác minh"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-4 md:pt-12 w-full md:w-auto min-w-[200px]">
                    <button
                      onClick={handleOpenEditModal}
                      className={accentButtonClass}
                    >
                      <span className="material-symbols-outlined text-lg">
                        settings
                      </span>
                      <span>Chỉnh sửa hồ sơ</span>
                    </button>

                    <button
                      onClick={handleOpenPasswordModal}
                      className={softButtonClass}
                    >
                      <span className="material-symbols-outlined text-lg">
                        lock
                      </span>
                      <span>Đổi mật khẩu</span>
                    </button>

                    <button className={softButtonClass}>
                      <span className="material-symbols-outlined text-lg">
                        share
                      </span>
                      <span>Chia sẻ hồ sơ</span>
                    </button>
                  </div>
                </div>
              </div>

              {loadingTickets ? (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                      Vé workshop của tôi
                    </h3>
                  </div>
                  <div className={`bg-white dark:bg-[#151822] rounded-3xl p-10 shadow-sm border ${boxBorderClass}`}>
                    <div className="text-center py-8 flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-[#f08a78] text-4xl mb-3 animate-spin">
                        progress_activity
                      </span>
                      <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg">
                        Đang tải danh sách vé...
                      </h4>
                    </div>
                  </div>
                </>
              ) : ticketsError ? (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                      Vé workshop của tôi
                    </h3>
                  </div>
                  <div className={`bg-white dark:bg-[#151822] rounded-3xl p-10 shadow-sm border ${boxBorderClass}`}>
                    <div className="text-center py-8 flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-rose-500 text-4xl mb-3">
                        error
                      </span>
                      <h4 className="text-rose-600 font-bold text-lg">
                        Lỗi tải thông tin vé
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">{ticketsError}</p>
                    </div>
                  </div>
                </>
              ) : purchasedTickets.length === 0 ? (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                      Vé workshop của tôi
                    </h3>
                  </div>
                  <div className={`bg-white dark:bg-[#151822] rounded-3xl p-10 shadow-sm border ${boxBorderClass}`}>
                    <div className="text-center py-8 flex flex-col items-center justify-center">
                      <span className={`material-symbols-outlined ${iconColor} text-4xl mb-3`}>
                        receipt_long
                      </span>
                      <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg">
                        Bạn chưa mua vé nào
                      </h4>
                      <p className="text-[#c3996c]/70 dark:text-slate-400 text-sm mt-2 max-w-md">
                        Khám phá ngay các workshop và bắt đầu hành trình sáng tạo của bạn nhé!
                      </p>
                      <button
                        onClick={() => navigate("/advanced-search")}
                        className="mt-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-[#f08a78]/25 transition-all w-fit"
                      >
                        Khám phá workshop
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                      Vé workshop của tôi ({purchasedTickets.length})
                    </h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    {purchasedTickets.map((item) => {
                      const ticketList = item.workshopTickets || [];
                      // Tìm vé tương ứng của user hiện tại
                      const myParticipants = ticketList
                        .flatMap(wt => (wt.workshopParticipants || []).map(wp => ({
                          ...wp,
                          ticketType: wt.ticketType,
                          price: wt.price,
                          startTime: wt.startTime,
                          endTime: wt.endTime
                        })))
                        .filter(wp => wp.participantId === (user?.id || currentUser?.id));
                      
                      const activeParticipant = myParticipants[0];
                      const ticketTypeLabel = activeParticipant ? activeParticipant.ticketType : "Đã đặt";
                      const timeRange = activeParticipant ? `${formatTimeOnly(activeParticipant.startTime)} - ${formatTimeOnly(activeParticipant.endTime)}` : "";
                      const img = item.workshopThumbnailLink || "/img/onlyLogo.png";

                      // Kiểm tra xem workshop đã kết thúc chưa
                      const startDateTime = new Date(`${item.startOn}T${activeParticipant?.startTime || "00:00:00"}`);
                      const isPast = startDateTime < new Date();

                      return (
                        <div
                          key={item.id}
                          className="group bg-white dark:bg-[#151822] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#fbc4ae]/45 dark:border-slate-800 flex flex-col md:flex-row"
                        >
                          <div className="md:w-44 h-44 md:h-auto overflow-hidden shrink-0">
                            <div
                              className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url("${img}")`, minHeight: "176px" }}
                            />
                          </div>

                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="px-2.5 py-1 bg-[#f08a78]/15 text-[#f08a78] text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                  Vé {ticketTypeLabel}
                                </span>
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                                  isPast 
                                    ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" 
                                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                                }`}>
                                  {isPast ? "Đã diễn ra" : "Sắp diễn ra"}
                                </span>
                              </div>

                              <h4 className="text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">
                                {item.workshopTitle}
                              </h4>

                              <p className="text-sm text-[#c3996c]/80 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">
                                  location_on
                                </span>
                                <span>Địa điểm: {item.workshopLocation}</span>
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-[#fbc4ae]/20">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-[#c3996c]/60 uppercase tracking-wider">
                                  Ngày &amp; Giờ
                                </span>
                                <span className="text-sm font-semibold text-[#c3996c] dark:text-slate-100">
                                  {formatDate(item.startOn)} {timeRange && `• ${timeRange}`}
                                </span>
                              </div>

                              {(() => {
                                const statusStr = String(activeParticipant?.status || activeParticipant?.Status || "").toLowerCase();
                                const isBought = statusStr === "paid" || statusStr === "checked in";
                                const canReview = isPast && isBought;
                                if (canReview) {
                                  return (
                                    <div className="flex gap-2.5 items-center">
                                      <button
                                        onClick={() => handleOpenReviewModal(item)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm shadow-emerald-600/25"
                                      >
                                        Đánh giá
                                      </button>
                                      <Link
                                        to={`/find-companion/${item.workshopId || item.id}`}
                                        className="bg-[#f08a78] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#ee7a66] transition-colors shadow-sm shadow-[#f08a78]/25"
                                      >
                                        Xem chi tiết
                                      </Link>
                                    </div>
                                  );
                                }
                                return (
                                  <Link
                                    to={`/find-companion/${item.workshopId || item.id}`}
                                    className="bg-[#f08a78] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#ee7a66] transition-colors shadow-sm shadow-[#f08a78]/25"
                                  >
                                    Xem chi tiết
                                  </Link>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </main>

          {!isHost && (
            <footer className="bg-[#FEFEFD] dark:bg-[#151822] border-t border-[#fbc4ae]/60 dark:border-slate-800 py-8 px-10 text-center">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-[#c3996c]/60 dark:text-[#d5ddc3]">
                <p>
                  © 2025 Hands &amp; Hour. Được tạo nên với tâm hồn nghệ sĩ tại Đà
                  Nẵng.
                </p>

                <div className="flex gap-6">
                  <a className="hover:text-[#f08a78] transition-colors" href="#">
                    Quyền riêng tư
                  </a>
                  <a className="hover:text-[#f08a78] transition-colors" href="#">
                    Điều khoản
                  </a>
                  <a className="hover:text-[#f08a78] transition-colors" href="#">
                    Hỗ trợ
                  </a>
                </div>
              </div>
            </footer>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          defaultAvatar={DEFAULT_AVATAR}
          editError={editError}
          editSuccess={editSuccess}
          editAvatarUrl={editAvatarUrl}
          setEditAvatarUrl={setEditAvatarUrl}
          uploadingAvatar={uploadingAvatar}
          handleAvatarUpload={handleAvatarUpload}
          editName={editName}
          setEditName={setEditName}
          editPhone={editPhone}
          setEditPhone={setEditPhone}
          editLoading={editLoading}
          handleSaveEditProfile={handleSaveEditProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          passwordError={passwordError}
          passwordSuccess={passwordSuccess}
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPasswordInput={newPasswordInput}
          setNewPasswordInput={setNewPasswordInput}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          passwordLoading={passwordLoading}
          handleChangePassword={handleChangePassword}
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {reviewWorkshop && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FEFEFD] dark:bg-[#151822] rounded-3xl p-8 max-w-md w-full border border-[#fbc4ae]/50 dark:border-slate-800 shadow-2xl flex flex-col relative animate-fade-in font-display">
            {/* Close Button */}
            <button
              onClick={() => setReviewReviewWorkshop(null)}
              className="absolute top-4 right-4 text-[#c3996c] hover:text-[#f08a78] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-2xl font-black text-[#2B2B2B] dark:text-white mb-2 pr-6">
              Đánh giá Workshop
            </h3>
            <p className="text-xs text-[#c3996c]/80 dark:text-slate-400 mb-6">
              Chia sẻ cảm nhận của bạn về workshop <span className="font-bold text-[#f08a78]">{reviewWorkshop.workshopTitle}</span>
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating Selector */}
              <div className="flex flex-col gap-1 text-center">
                <span className="text-xs font-bold text-[#c3996c]/70 dark:text-slate-400 uppercase tracking-wider">
                  Số sao đánh giá
                </span>
                <div className="flex gap-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = star <= (reviewHoverRating || reviewRating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setReviewHoverRating(star)}
                        onMouseLeave={() => setReviewHoverRating(0)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      >
                        <span
                          className="material-symbols-outlined select-none"
                          style={{
                            fontSize: "36px",
                            color: active ? "#F59E0B" : "#D1D5DB",
                            fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0"
                          }}
                        >
                          star
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#c3996c]/70 dark:text-slate-400 uppercase tracking-wider">
                  Tiêu đề đánh giá
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Ví dụ: Rất tuyệt vời, Hướng dẫn viên nhiệt tình..."
                  className="w-full rounded-xl px-4 py-2.5 bg-[#fffaf5] dark:bg-slate-800 border border-[#fbc4ae]/40 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#f08a78]/40 text-[#c3996c] dark:text-white text-sm"
                  required
                />
              </div>

              {/* Description input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#c3996c]/70 dark:text-slate-400 uppercase tracking-wider">
                  Nội dung nhận xét
                </label>
                <textarea
                  value={reviewDesc}
                  onChange={(e) => setReviewDesc(e.target.value)}
                  placeholder="Hãy chia sẻ chi tiết trải nghiệm của bạn tại buổi học..."
                  rows={4}
                  className="w-full rounded-xl px-4 py-2.5 bg-[#fffaf5] dark:bg-slate-800 border border-[#fbc4ae]/40 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#f08a78]/40 text-[#c3996c] dark:text-white text-sm resize-none"
                  required
                />
              </div>

              {/* Feedback messages */}
              {reviewError && (
                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  {reviewError}
                </div>
              )}

              {reviewSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  {reviewSuccess}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewReviewWorkshop(null)}
                  disabled={submittingReview}
                  className="flex-1 rounded-xl h-11 px-4 border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] dark:text-slate-200 text-sm font-bold hover:bg-[#fbc4ae]/15 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="flex-1 rounded-xl h-11 px-4 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold transition-colors shadow-lg shadow-[#f08a78]/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submittingReview ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Đang gửi...
                    </>
                  ) : (
                    "Gửi đánh giá"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
