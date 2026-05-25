export default function EditProfileModal({
  defaultAvatar,
  editError,
  editSuccess,
  editAvatarUrl,
  setEditAvatarUrl,
  uploadingAvatar,
  handleAvatarUpload,
  editName,
  setEditName,
  editPhone,
  setEditPhone,
  editLoading,
  handleSaveEditProfile,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-[#2b2b2b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FEFEFD] dark:bg-[#151822] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#fbc4ae]/45 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#fbc4ae]/30 pb-4">
          <h3 className="text-xl font-bold text-[#c3996c]">Chỉnh sửa hồ sơ</h3>

          <button
            onClick={onClose}
            className="text-[#c3996c]/70 hover:text-[#f08a78] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

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

        <form onSubmit={handleSaveEditProfile} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group cursor-pointer">
              <div
                className="size-24 rounded-full bg-cover bg-center border-4 border-[#fbc4ae]/40 dark:border-slate-700 shadow-md group-hover:opacity-85 transition-opacity"
                style={{
                  backgroundImage: `url("${editAvatarUrl || defaultAvatar}")`,
                }}
              />

              <label
                htmlFor="avatar-file-input"
                className="absolute bottom-0 right-0 bg-[#f08a78] hover:bg-[#ee7a66] text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors border border-white dark:border-[#151822]"
              >
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
              <span className="text-xs text-[#c3996c] animate-pulse">
                Đang tải ảnh lên...
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Tên hiển thị
            </label>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
              placeholder="Nhập tên mới"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Số điện thoại
            </label>

            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded-xl bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100 text-sm focus:ring-2 focus:ring-[#f08a78]/40 focus:outline-none"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
}
