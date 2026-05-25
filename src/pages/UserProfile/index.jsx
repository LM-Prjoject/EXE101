import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { DEFAULT_AVATAR } from "../../utils/userProfile";
import EditProfileModal from "../../components/EditProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import HostSidebar from "../../components/HostSidebar";
import HostHeader from "../../components/HostHeader";
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
  const isHost = normalizedRole === "host";

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

                <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                    <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <span className="material-symbols-outlined text-xl">
                        search
                      </span>
                    </div>

                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                      placeholder="Tìm kiếm workshop..."
                      readOnly
                      onClick={() => navigate("/advanced-search")}
                    />
                  </div>
                </label>
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
                  onClick={() => navigate("/host/verification")}
                  className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"
                >
                  <span className="truncate">Trở thành Host</span>
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
                      <span>{isHost ? "Host" : "User"}</span>
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
                        <div className="flex items-center gap-2.5 py-1.5 border-b border-[#fbc4ae]/20 dark:border-slate-800">
                          <span className="material-symbols-outlined text-[#c3996c] text-lg shrink-0">
                            phone_iphone
                          </span>
                          <span className="font-semibold text-[#c3996c] min-w-[100px]">
                            Số điện thoại:
                          </span>
                          <span>{user.phoneNumber || "Chưa cập nhật"}</span>
                        </div>

                        <div className="flex items-center gap-2.5 py-1.5 border-b border-[#fbc4ae]/20 dark:border-slate-800">
                          <span className="material-symbols-outlined text-[#c3996c] text-lg shrink-0">
                            verified
                          </span>
                          <span className="font-semibold text-[#c3996c] min-w-[100px]">
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

              <div className="flex justify-between items-end mb-6">
                <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                  Hoạt động gần đây
                </h3>
              </div>

              <div className="bg-white dark:bg-[#151822] rounded-3xl p-6 shadow-sm border border-[#fbc4ae]/40 dark:border-slate-800">
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-[#f08a78] text-4xl mb-3">
                    history
                  </span>
                  <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg">
                    Chưa có hoạt động gần đây
                  </h4>
                </div>
              </div>
            </div>
          </main>

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
    </>
  );
}
