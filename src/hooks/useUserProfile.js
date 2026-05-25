import { useEffect, useMemo, useState } from "react";
import {
  fetchWithFallback,
  parseJsonResponse,
  buildError,
} from "../api/client";
import {
  getUserById,
  changeName,
  changePhone,
  changeAvatar,
} from "../api/user";
import { changePassword } from "../api/auth";
import { buildUserView, getAvatarUrl } from "../utils/userProfile";

export function useUserProfile({ currentUser, userProfile, authToken }) {
  const [profile, setProfile] = useState(userProfile || null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");

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

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  useEffect(() => {
    const userId = currentUser?.id || currentUser?.Id;

    if (!userId) {
      setLoadingProfile(false);
      setProfileError("Không tìm thấy thông tin đăng nhập.");
      return;
    }

    let ignore = false;

    async function loadProfile() {
      setLoadingProfile(true);
      setProfileError("");

      try {
        const data = await getUserById(userId);
        if (!ignore) setProfile(data);
      } catch (err) {
        if (!ignore) {
          setProfileError(err?.message || "Không thể tải thông tin user.");
        }
      } finally {
        if (!ignore) setLoadingProfile(false);
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [currentUser?.id, currentUser?.Id]);

  const user = useMemo(() => {
    return buildUserView(profile, currentUser);
  }, [profile, currentUser]);

  function handleOpenEditModal() {
    setEditName(profile?.name || profile?.Name || currentUser?.name || "");
    setEditPhone(profile?.phoneNumber || profile?.PhoneNumber || "");
    setEditAvatarUrl(getAvatarUrl(profile));
    setEditError("");
    setEditSuccess("");
    setShowEditModal(true);
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setEditError("");
    setEditSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetchWithFallback("/api/Image", {
        method: "POST",
        body: formData,
      });

      const body = await parseJsonResponse(response);

      if (!response.ok) {
        throw buildError(response, body);
      }

      if (!body?.url) {
        throw new Error("Không nhận được URL ảnh từ máy chủ.");
      }

      setEditAvatarUrl(body.url);
      setEditSuccess("Tải ảnh đại diện lên thành công!");
    } catch (err) {
      setEditError(err?.message || "Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleSaveEditProfile(e) {
    e.preventDefault();

    setEditLoading(true);
    setEditError("");
    setEditSuccess("");

    try {
      const userId = currentUser?.id || currentUser?.Id;
      const currentName = profile?.name || profile?.Name || currentUser?.name || "";
      const currentPhone = profile?.phoneNumber || profile?.PhoneNumber || "";
      const currentAvatar = getAvatarUrl(profile);

      if (editName && editName !== currentName) {
        await changeName(editName, authToken);
      }

      if (editPhone !== currentPhone) {
        await changePhone(editPhone, authToken);
      }

      if (editAvatarUrl !== currentAvatar) {
        await changeAvatar(editAvatarUrl, authToken);
      }

      setEditSuccess("Cập nhật hồ sơ thành công!");

      if (userId) {
        const updatedData = await getUserById(userId);
        setProfile(updatedData);
      }

      setTimeout(() => {
        setShowEditModal(false);
      }, 1000);
    } catch (err) {
      setEditError(err?.message || "Lỗi khi cập nhật hồ sơ. Vui lòng thử lại.");
    } finally {
      setEditLoading(false);
    }
  }

  function handleOpenPasswordModal() {
    setOldPassword("");
    setNewPasswordInput("");
    setConfirmNewPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowPasswordModal(true);
  }

  async function handleChangePassword(e) {
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
  }

  return {
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
  };
}