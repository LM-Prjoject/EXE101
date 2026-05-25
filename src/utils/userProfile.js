export const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE";

export function getJoinedYear(user) {
  const createdOn = user?.createdOn || user?.CreatedOn;
  if (!createdOn) return null;

  const year = new Date(createdOn).getFullYear();
  return Number.isNaN(year) ? null : year;
}

export function getAvatarUrl(user) {
  return (
    user?.avatarLink ||
    user?.AvatarLink ||
    user?.avatarUrl ||
    user?.AvatarUrl ||
    user?.avatar ||
    user?.Avatar ||
    DEFAULT_AVATAR
  );
}

export function buildUserView(profile, currentUser) {
  const name =
    profile?.name ||
    profile?.Name ||
    currentUser?.name ||
    currentUser?.Name ||
    currentUser?.email?.split("@")[0] ||
    currentUser?.Email?.split("@")[0] ||
    "Người dùng";

  return {
    id: profile?.id || profile?.Id || currentUser?.id || currentUser?.Id,
    name,
    email:
      profile?.email ||
      profile?.Email ||
      currentUser?.email ||
      currentUser?.Email ||
      "Chưa cập nhật email",
    phoneNumber:
      profile?.phoneNumber ||
      profile?.PhoneNumber ||
      "Chưa cập nhật số điện thoại",
    role:
      profile?.role ||
      profile?.Role ||
      currentUser?.role ||
      currentUser?.Role ||
      "user",
    verified: profile?.verified ?? profile?.Verified,
    isActive: profile?.isActive ?? profile?.IsActive,
    joinedYear: getJoinedYear(profile),
    avatarUrl: getAvatarUrl(profile || currentUser),
  };
}