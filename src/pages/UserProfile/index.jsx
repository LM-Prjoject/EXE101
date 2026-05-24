import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithFallback, parseJsonResponse, buildError } from "../../api/client";
import { getUserById, changeName, changePhone, changeAvatar } from "../../api/user";

import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../api/auth";

const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE";

function getJoinedYear(user) {
  if (!user?.createdOn) return null;
  const year = new Date(user.createdOn).getFullYear();
  return Number.isNaN(year) ? null : year;
}

function formatCurrency(value) {
  if (value == null) return "Liên hệ";
  return `${Number(value).toLocaleString("vi-VN")}₫`;
}

function formatDate(dateStr) {
  if (!dateStr) return "Đang cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

function formatTimeOnly(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
  return timeStr;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");



  // States for Pop-up Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleOpenEditModal = () => {
    setEditName(profile?.name || currentUser?.name || "");
    setEditPhone(profile?.phoneNumber || "");
    setEditAvatarUrl(profile?.avatarLink || profile?.avatar || profile?.avatarUrl || "");
    setEditError("");
    setEditSuccess("");
    setShowEditModal(true);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setEditError("");
    setEditSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Call primary backend to upload the image file
      const response = await fetchWithFallback("/api/Image", {
        method: "POST",
        body: formData,
      });

      const body = await parseJsonResponse(response);
      if (!response.ok) {
        throw buildError(response, body);
      }

      if (body && body.url) {
        setEditAvatarUrl(body.url);
        setEditSuccess("Tải ảnh đại diện lên thành công!");
      } else {
        throw new Error("Không nhận được URL ảnh từ máy chủ.");
      }
    } catch (err) {
      setEditError(err?.message || "Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveEditProfile = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");

    try {
      const currentName = profile?.name || currentUser?.name || "";
      const currentPhone = profile?.phoneNumber || "";
      const currentAvatar = profile?.avatarLink || profile?.avatar || profile?.avatarUrl || "";

      // 1. change-name if changed
      if (editName && editName !== currentName) {
        await changeName(editName, authToken);
      }

      // 2. change-phone if changed
      if (editPhone !== currentPhone) {
        await changePhone(editPhone, authToken);
      }

      // 3. change-avatar if changed
      if (editAvatarUrl !== currentAvatar) {
        await changeAvatar(editAvatarUrl, authToken);
      }

      setEditSuccess("Cập nhật hồ sơ thành công!");
      
      // Reload profile data
      if (currentUser?.id) {
        const updatedData = await getUserById(currentUser.id);
        setProfile(updatedData);
      }

      // Close modal after 1s
      setTimeout(() => {
        setShowEditModal(false);
      }, 1000);
    } catch (err) {
      setEditError(err?.message || "Lỗi khi cập nhật hồ sơ. Vui lòng thử lại.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleOpenPasswordModal = () => {
    setOldPassword("");
    setNewPasswordInput("");
    setConfirmNewPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowPasswordModal(true);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPasswordInput !== confirmNewPassword) {
      setPasswordError("Mật khẩu mới không trùng khớp.");
      setPasswordSuccess("");
      return;
    }

    setPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    try {
      if (!authToken) {
        throw new Error("Yêu cầu đăng nhập để đổi mật khẩu.");
      }
      await changePassword(authToken, oldPassword, newPasswordInput);
      setPasswordSuccess("Đổi mật khẩu thành công!");
      setPasswordError("");
      setTimeout(() => {
        setShowPasswordModal(false);
      }, 1200);
    } catch (err) {
      setPasswordError(err?.message || "Không thể đổi mật khẩu. Vui lòng thử lại.");
      setPasswordSuccess("");
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser?.id) {
      setLoadingProfile(false);
      setProfileError("Không tìm thấy thông tin đăng nhập.");
      return;
    }

    let ignore = false;
    async function loadProfile() {
      setLoadingProfile(true);
      setProfileError("");

      try {
        const data = await getUserById(currentUser.id);
        if (!ignore) setProfile(data);
      } catch (err) {
        if (!ignore) setProfileError(err?.message || "Không thể tải thông tin user.");
      } finally {
        if (!ignore) setLoadingProfile(false);
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, [currentUser?.id]);



  const user = useMemo(() => {
    const name = profile?.name || currentUser?.name || currentUser?.email?.split("@")[0] || "Người dùng";
    return {
      id: profile?.id || currentUser?.id,
      name,
      email: profile?.email || currentUser?.email || "Chưa cập nhật email",
      phoneNumber: profile?.phoneNumber || "Chưa cập nhật số điện thoại",
      role: profile?.role || currentUser?.role || "user",
      verified: profile?.verified,
      isActive: profile?.isActive,
      joinedYear: getJoinedYear(profile),
      avatarUrl: profile?.avatarUrl || profile?.avatar || profile?.avatarLink || DEFAULT_AVATAR,
    };
  }, [profile, currentUser]);

  return (
    <>
      <div
        className="bg-[#F6F2E9] dark:bg-[#0f1115] font-display antialiased text-[#c3996c] dark:text-slate-100 min-h-screen flex flex-col"
      >
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-4">
                {/* Logo */}
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
                    <span className="material-symbols-outlined text-xl">search</span>
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
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Workshops
                </a>
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Khám phá
                </a>
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Cộng đồng
                </a>
              </div>

              {/* CTA: accent là màu chủ đạo */}
              {user.role !== "host" && (
                <button onClick={() => navigate('/host/verification')} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"><span className="truncate">Trở thành Host</span></button>
              )}

              <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-6">
                <button className="relative group">
                  <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">
                    notifications
                  </span>
                  <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151822]"></span>
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

          {/* Main Content Area */}
          <main className="flex-1 flex justify-center py-8 px-4 sm:px-8">
            <div className="flex flex-col max-w-[1100px] w-full">
              {/* Hero Card: soft làm nền phụ */}
              <div className="bg-[#fbc4ae]/25 dark:bg-[#151822] rounded-3xl p-8 mb-8 shadow-soft flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f08a78]/18 via-[#fbc4ae]/10 to-transparent dark:from-[#f08a78]/12 dark:via-[#fbc4ae]/6 dark:to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center md:items-start gap-6 w-full md:flex-row">
                  {/* Avatar */}
                  <div className="relative mt-4 md:mt-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white dark:border-[#151822] shadow-md"
                      data-alt={`${user.name} avatar`}
                      style={{
                        backgroundImage: `url("${user.avatarUrl}")`,
                      }}
                    />
                    <button onClick={handleOpenEditModal} className="absolute bottom-1 right-1 bg-white/90 dark:bg-slate-700 p-2 rounded-full shadow-md text-[#c3996c]/80 hover:text-[#f08a78] transition-colors border border-[#fbc4ae]/60 dark:border-slate-600">
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
                      <span>{user.role === "host" ? "Host" : "User"}</span>
                      <span className="mx-2">•</span>
                      <span>{user.joinedYear ? `Thành viên từ ${user.joinedYear}` : `ID: ${user.id || "N/A"}`}</span>
                    </div>
                    {profileError ? (
                      <p className="mt-4 text-rose-500 font-semibold">{profileError}</p>
                    ) : (
                      <div className="mt-4 space-y-2 text-sm text-[#2B2B2B] dark:text-slate-300 w-full max-w-md">
                        <div className="flex items-center gap-2.5 py-1.5 border-b border-[#fbc4ae]/20 dark:border-slate-800">
                          <span className="material-symbols-outlined text-[#c3996c] text-lg shrink-0">phone_iphone</span>
                          <span className="font-semibold text-[#c3996c] min-w-[100px]">Số điện thoại:</span>
                          <span>{user.phoneNumber || "Chưa cập nhật"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 py-1.5 border-b border-[#fbc4ae]/20 dark:border-slate-800">
                          <span className="material-symbols-outlined text-[#c3996c] text-lg shrink-0">verified</span>
                          <span className="font-semibold text-[#c3996c] min-w-[100px]">Trạng thái:</span>
                          <span className={user.verified ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>
                            {user.verified == null ? "Chưa có dữ liệu" : user.verified ? "Đã xác minh" : "Chưa xác minh"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-4 md:pt-12 w-full md:w-auto min-w-[200px]">
                    {/* Primary action: accent */}
                    <button onClick={handleOpenEditModal} className="flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#f08a78] text-white text-sm font-bold hover:bg-[#ee7a66] transition-colors shadow-lg shadow-[#f08a78]/25">
                      <span className="material-symbols-outlined text-lg">
                        settings
                      </span>
                      <span>Chỉnh sửa hồ sơ</span>
                    </button>

                    <button onClick={handleOpenPasswordModal} className="flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#fbc4ae]/25 dark:bg-slate-800 border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] dark:text-slate-200 text-sm font-bold hover:bg-[#fbc4ae]/35 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        lock
                      </span>
                      <span>Đổi mật khẩu</span>
                    </button>

                    {/* Secondary: soft + border */}
                    <button className="flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#fbc4ae]/25 dark:bg-slate-800 border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] dark:text-slate-200 text-sm font-bold hover:bg-[#fbc4ae]/35 dark:hover:bg-slate-700 transition-colors">
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
                  <p className="text-[#c3996c]/70 dark:text-[#d5ddc3] text-sm mt-2">
                    Backend `/api/User/{user.id}` hiện chỉ trả thông tin user cơ bản.
                  </p>
                </div>
                <div className="flex flex-col gap-6" style={{ display: "none" }}>
                  <div className="flex flex-col sm:flex-row gap-4 border-b border-[#fbc4ae]/40 dark:border-slate-700 pb-6 last:border-0 last:pb-0">
                    <div
                      className="w-full sm:w-32 h-24 rounded-xl bg-cover bg-center shrink-0"
                      data-alt="Macrame wall hanging details"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzoOt3HezeYwguY8xKoh29hUCArqfep6xIYj7OEBuMzqJFdEwVbFjajoJX_mTHZi4JpzYtgcJAy50aImOUdqxwRSQ1BFnJipCUguHLPMMktwL7myIk-hcfgP9iCsrnwiGW5hglEj9SCq98bwl8Pmxb61o6Yph9IRScyq5ZNxoEWrOEwOWb8IBt7d4txFOrZ1t_dXZjsR9TJfQkiq57v6ClDyrjlygR0ragWoqT04Qgit8s1Gi1Vlsb0U9LXnOms0psi1uLO68Esgqe")',
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-bold text-[#2B2B2B] dark:text-slate-100 text-lg">
                            Workshop làm Macrame treo tường
                          </h5>
                          <p className="text-xs text-[#2B2B2B]/60 dark:text-[#d5ddc3] mb-2">
                            Đã tham gia 15 thg 9, 2025 • Trung tâm Đà Nẵng
                          </p>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[20px] fill-current"
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#c3996c]/75 dark:text-slate-300 text-sm italic bg-[#fffaf5] dark:bg-slate-800 p-3 rounded-lg mt-2 border border-[#fbc4ae]/40">
                        "Tôi cực kỳ thích buổi học này! Người hướng dẫn rất kiên
                        nhẫn và các vật liệu được cung cấp đều chất lượng cao.
                        Tôi đã mang về nhà một tác phẩm tuyệt đẹp."
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      className="w-full sm:w-32 h-24 rounded-xl bg-cover bg-center shrink-0"
                      data-alt="Candle making wax pouring"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDr9JjVZF2iYn1wJ9XkxebJGkgpaaJlrG7mmmOm0MvJOrxDL4yHliy0khKKlcH1kkmAcSrHdbgbEFziVlbI6fU5bljkfjp_32e615RvQu2-qf8zg2csArKtK2YEYM5UNCWBo0P9NoumIgjAFyisCU-gJHrIo7QCKCvz5i28qCZ1RI7OHz3dgG4_2pbB70pfwDq5-xHvAXTZkDOceXO8T0kgpT5hE5tx06gbzSQnSBBWf5olFw9_hued-vB6ty8Rv2jY29-zKraRktFB")',
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-bold text-[#2B2B2B] dark:text-slate-100 text-lg">
                            Workshop làm nến thơm
                          </h5>
                          <p className="text-xs text-[#2B2B2B]/60 dark:text-[#d5ddc3] mb-2">
                            Đã tham gia 02 thg 8, 2025 • Hội An
                          </p>
                        </div>
                        <div className="flex text-amber-400">
                          {[1, 1, 1, 1, 0].map((filled, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-[20px] ${
                                filled
                                  ? "fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#c3996c]/75 dark:text-slate-300 text-sm italic bg-[#fffaf5] dark:bg-slate-800 p-3 rounded-lg mt-2 border border-[#fbc4ae]/40">
                        "Trải nghiệm thú vị nhưng tôi ước có nhiều lựa chọn mùi
                        hương hơn. Tuy nhiên rất phù hợp cho người mới bắt đầu!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer Simple */}
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
        <div className="fixed inset-0 bg-[#2b2b2b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FEFEFD] dark:bg-[#151822] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#fbc4ae]/45 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#fbc4ae]/30 pb-4">
              <h3 className="text-xl font-bold text-[#c3996c]">Chỉnh sửa hồ sơ</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#c3996c]/70 hover:text-[#f08a78] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Status alerts */}
            {editError && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-sm font-semibold">
                {editError}
              </div>
            )}
            {editSuccess && (
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-xl text-sm font-semibold">
                {editSuccess}
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSaveEditProfile} className="flex flex-col gap-4">
              {/* Avatar Preview & Upload */}
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="relative group cursor-pointer">
                  <div 
                    className="size-24 rounded-full bg-cover bg-center border-4 border-[#fbc4ae]/40 dark:border-slate-700 shadow-md group-hover:opacity-85 transition-opacity"
                    style={{ backgroundImage: `url("${editAvatarUrl || DEFAULT_AVATAR}")` }}
                  />
                  <label htmlFor="avatar-file-input" className="absolute bottom-0 right-0 bg-[#f08a78] hover:bg-[#ee7a66] text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors border border-white dark:border-[#151822]">
                    <span className="material-symbols-outlined text-sm block">
                      photo_camera
                    </span>
                  </label>
                  <input
                    type="file"
                    id="avatar-file-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploadingAvatar}
                  />
                </div>
                {uploadingAvatar && (
                  <span className="text-xs text-[#c3996c] animate-pulse">Đang tải ảnh lên...</span>
                )}
                <div className="w-full">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Hoặc nhập URL ảnh đại diện</label>
                  <input
                    type="text"
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                    placeholder="https://example.com/avatar.jpg"
                    disabled={uploadingAvatar}
                  />
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Tên hiển thị</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                  placeholder="Nhập tên mới"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Số điện thoại</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={editLoading}
                  className="flex-1 py-2.5 rounded-xl border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-2.5 rounded-xl bg-[#f08a78] hover:bg-[#ee7a66] text-white transition-colors font-bold text-sm shadow-md shadow-[#f08a78]/25 disabled:opacity-50"
                >
                  {editLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-[#2b2b2b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FEFEFD] dark:bg-[#151822] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#fbc4ae]/45 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#fbc4ae]/30 pb-4">
              <h3 className="text-xl font-bold text-[#c3996c]">Đổi mật khẩu</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-[#c3996c]/70 hover:text-[#f08a78] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {passwordError && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-sm font-semibold">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-xl text-sm font-semibold">
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  disabled={passwordLoading}
                  className="flex-1 py-2.5 rounded-xl border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 py-2.5 rounded-xl bg-[#f08a78] hover:bg-[#ee7a66] text-white transition-colors font-bold text-sm shadow-md shadow-[#f08a78]/25 disabled:opacity-50"
                >
                  {passwordLoading ? "Đang đổi mật khẩu..." : "Lưu mật khẩu mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
