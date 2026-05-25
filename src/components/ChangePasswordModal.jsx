export default function ChangePasswordModal({
  passwordError,
  passwordSuccess,
  oldPassword,
  setOldPassword,
  newPasswordInput,
  setNewPasswordInput,
  confirmNewPassword,
  setConfirmNewPassword,
  passwordLoading,
  handleChangePassword,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-[#2b2b2b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FEFEFD] dark:bg-[#151822] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#fbc4ae]/45 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#fbc4ae]/30 pb-4">
          <h3 className="text-xl font-bold text-[#c3996c]">Đổi mật khẩu</h3>

          <button
            onClick={onClose}
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
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Mật khẩu hiện tại
            </label>

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
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Mật khẩu mới
            </label>

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
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Xác nhận mật khẩu mới
            </label>

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
              onClick={onClose}
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
  );
}
