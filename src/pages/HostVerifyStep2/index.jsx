import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HostVerifyStep2() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`host_registration_pending_${currentUser.id}`, 'true');
    }
  }, [currentUser]);

  const name = userProfile?.name || userProfile?.Name || currentUser?.name || currentUser?.Name || 'Thành viên';
  const email = userProfile?.email || userProfile?.Email || currentUser?.email || currentUser?.Email || 'N/A';
  const phone = userProfile?.phoneNumber || userProfile?.PhoneNumber || currentUser?.phoneNumber || currentUser?.PhoneNumber || 'Chưa cập nhật';

  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark text-[#2B2B2B] dark:text-slate-100 min-h-screen flex flex-col"
        style={{ paddingBottom: "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))" }}
      >
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-[#f08a78]/10 bg-white dark:bg-background-dark px-6 md:px-10 py-4 shadow-sm sticky top-0 z-50">
          <Link to="/home" className="flex items-center gap-4">
            <img
              src="/img/onlyLogo.png"
              alt="Hands & Hour logo"
              className="h-9 w-9 object-contain"
            />
            <h2 className="text-xl font-black tracking-tight">
              <span className="text-[#c3996c]">Hands</span>{" "}
              <span className="text-[#f08a78]">&amp;</span>{" "}
              <span className="text-[#c3996c]">Hour</span>
            </h2>
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#f08a78]/10 text-[#f08a78] hover:bg-[#f08a78]/20 transition-all">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#f08a78]/10 text-[#f08a78] hover:bg-[#f08a78]/20 transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Main Success Content */}
        <main className="flex-1 flex justify-center items-center py-10 px-4 md:px-8">
          <div className="max-w-[800px] w-full bg-white dark:bg-slate-800/40 border border-[#f08a78]/15 rounded-3xl p-8 md:p-12 shadow-xl shadow-[#f08a78]/5 flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f08a78]/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fbc4ae]/5 rounded-full blur-3xl translate-y-12 -translate-x-12 pointer-events-none"></div>

            {/* Step indicator */}
            <div className="flex flex-col gap-2 mb-6 w-full max-w-[200px]">
              <div className="flex justify-between items-center text-[#f08a78] font-bold text-xs uppercase tracking-wider">
                <span>BƯỚC 2 TRÊN 2</span>
                <span>Hoàn tất</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-500 rounded-full"></div>
            </div>

            {/* Animated Check Icon */}
            <div className="size-24 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center mb-8 border border-emerald-150 animate-pulse" style={{ animationDuration: '3s' }}>
              <span className="material-symbols-outlined text-6xl">verified</span>
            </div>

            {/* Main Text */}
            <h1 className="text-3xl md:text-4xl font-black text-[#2B2B2B] dark:text-white mb-4">Đã gửi đơn đăng ký thành công!</h1>
            <p className="text-slate-500 dark:text-[#d5ddc3] text-lg max-w-[580px] leading-relaxed mb-10">
              Cảm ơn bạn đã đăng ký trở thành Host của Hands &amp; Hour. Hệ thống đã ghi nhận đơn đăng ký của bạn. Ban quản trị (Staff) đang tiến hành xem xét và duyệt hồ sơ.
            </p>

            {/* Information Card */}
            <div className="w-full max-w-[500px] bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-left mb-10">
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-4 pb-2 border-b border-slate-200/50 dark:border-slate-800">Thông tin đăng ký</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Họ &amp; Tên / Thương hiệu:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Địa chỉ Email:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Số điện thoại liên hệ:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Trạng thái duyệt:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/55">
                    <span className="size-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    <span>Đang chờ phê duyệt</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Process Explanation */}
            <div className="flex flex-col gap-4 text-left max-w-[580px] mb-12">
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#f08a78]/10 text-[#f08a78] font-bold flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-[#2B2B2B] dark:text-white">Kiểm tra thông tin (1-2 ngày làm việc)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Staff sẽ rà soát thông tin liên hệ và lịch sử tài khoản của bạn để đảm bảo tính an toàn cho cộng đồng.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#fbc4ae]/20 text-[#fbc4ae] font-bold flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-[#2B2B2B] dark:text-white">Nhận thông báo qua email</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hệ thống sẽ gửi email tự động thông báo kết quả duyệt (Chấp nhận/Từ chối kèm lý do) đến hộp thư của bạn.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#d5ddce] text-[#6f8b6f] font-bold flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-[#2B2B2B] dark:text-white">Kích hoạt chế độ Host</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ngay khi được duyệt, tài khoản của bạn sẽ tự động chuyển sang chế độ Host. Bạn có thể truy cập dashboard để tạo và đăng ký workshop mới.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => navigate('/home')} 
                className="px-8 py-3.5 rounded-xl border border-[#f08a78] text-[#f08a78] hover:bg-[#f08a78]/5 transition-all text-sm font-bold shadow-sm"
              >
                Về Trang Chủ
              </button>
              <button 
                onClick={() => navigate('/user-profile')} 
                className="px-8 py-3.5 rounded-xl bg-[#f08a78] text-white hover:bg-[#ee7a66] transition-all text-sm font-bold shadow-lg shadow-[#f08a78]/20"
              >
                Xem Hồ Sơ Của Tôi
              </button>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-slate-500 dark:text-slate-400 text-xs mt-auto">
          © 2026 Hands &amp; Hour. Tất cả các quyền được bảo lưu.
        </footer>
      </div>
    </>
  );
}
