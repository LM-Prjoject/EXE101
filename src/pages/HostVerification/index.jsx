import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { changeName, changePhone } from '../../api/user';
import { registerHost } from '../../api/host';

export default function HostVerification() {
  const navigate = useNavigate();
  const { currentUser, userProfile, authToken } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Determine current role based on user profile (latest from DB) or JWT token
  const currentRole = String(userProfile?.role || currentUser?.role || '').trim().toLowerCase();
  const isHost = currentRole === 'host';

  // Check pending status in local storage specific to the current user
  const pendingKey = `host_registration_pending_${currentUser?.id}`;
  const [isPending, setIsPending] = useState(() => {
    return localStorage.getItem(pendingKey) === 'true';
  });

  // Redirect if already a Host and clear the pending status
  useEffect(() => {
    if (isHost) {
      localStorage.removeItem(pendingKey);
      navigate('/host/dashboard');
    }
  }, [isHost, pendingKey, navigate]);

  // Load initial values from profile
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setPhone(userProfile.phoneNumber || '');
    } else if (currentUser) {
      setName(currentUser.name || '');
      setPhone(currentUser.phoneNumber || '');
    }
  }, [userProfile, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ tên hoặc tên thương hiệu.');
      return;
    }
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại để liên hệ.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const initialName = userProfile?.name || currentUser?.name || '';
      const initialPhone = userProfile?.phoneNumber || currentUser?.phoneNumber || '';

      // Update name if changed
      if (name.trim() !== initialName && name.trim()) {
        await changeName(name.trim(), authToken);
      }
      
      // Update phone if changed
      if (phone.trim() !== initialPhone && phone.trim()) {
        await changePhone(phone.trim(), authToken);
      }

      // Register as Host
      await registerHost();

      // Save pending status locally
      localStorage.setItem(pendingKey, 'true');
      setIsPending(true);

      // Redirect to step 2 (Success state)
      navigate('/host/verify-step2');
    } catch (err) {
      const errMsg = err?.message || '';
      if (errMsg.includes('Failed to register host')) {
        // Treat as successful pending application
        localStorage.setItem(pendingKey, 'true');
        setIsPending(true);
        navigate('/host/verify-step2');
      } else {
        setError(errMsg || 'Đăng ký làm Host thất bại. Vui lòng kiểm tra kết nối.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPending = () => {
    localStorage.removeItem(pendingKey);
    setIsPending(false);
  };

  // ── RENDER PENDING STATE ──
  if (isPending) {
    return (
      <div
        className="bg-background-light dark:bg-background-dark text-[#2B2B2B] dark:text-slate-100 font-display min-h-screen flex flex-col"
        style={{ paddingBottom: "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))" }}
      >
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-[#f08a78]/10 bg-[#FEFEFD] dark:bg-[#151822] px-6 md:px-10 py-3 shadow-sm sticky top-0 z-50">
          <Link to="/home" className="flex items-center gap-4">
            <img src="/img/onlyLogo.png" alt="Hands & Hour logo" className="h-9 w-9 object-contain" />
            <h2 className="text-xl font-black tracking-tight flex items-center">
              <span className="text-[#c3996c]">Hands</span>{" "}
              <span className="text-[#f08a78]">&amp;</span>{" "}
              <span className="text-[#c3996c]">Hour</span>
            </h2>
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#f08a78]/10 text-[#f08a78]">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        {/* Pending Content */}
        <main className="flex-1 flex justify-center items-center py-10 px-4 md:px-8">
          <div className="max-w-[700px] w-full bg-[#FEFEFD] dark:bg-slate-800/40 border border-[#f08a78]/15 rounded-3xl p-8 md:p-12 shadow-xl shadow-[#f08a78]/5 flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f08a78]/5 rounded-full blur-2xl -translate-y-6 translate-x-6 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fbc4ae]/5 rounded-full blur-2xl translate-y-6 -translate-x-6 pointer-events-none"></div>

            {/* Icon */}
            <div className="size-20 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-200">
              <span className="material-symbols-outlined text-4xl animate-pulse">hourglass_top</span>
            </div>

            {/* Texts */}
            <h1 className="text-3xl font-black text-[#2B2B2B] dark:text-white mb-3">Đơn đăng ký đang chờ duyệt</h1>
            <p className="text-slate-500 dark:text-[#d5ddc3] text-base max-w-[500px] leading-relaxed mb-8">
              Yêu cầu trở thành Host của bạn đang được kiểm tra bởi đội ngũ quản trị. Chúng tôi sẽ thông báo kết quả qua email khi hồ sơ được phê duyệt.
            </p>

            {/* Candidate details */}
            <div className="w-full bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 text-left mb-8 text-sm">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 pb-1.5 border-b border-slate-200/50 dark:border-slate-800">Thông tin đăng ký</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Họ &amp; Tên:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Email liên hệ:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{userProfile?.email || userProfile?.Email || currentUser?.email || currentUser?.Email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Số điện thoại:</span>
                  <span className="text-slate-800 dark:text-white font-bold">{phone}</span>
                </div>
              </div>
            </div>

            {/* Button Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => navigate('/home')} 
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-all text-sm font-bold"
              >
                Về Trang Chủ
              </button>
              <button 
                onClick={handleResetPending} 
                className="px-6 py-3 rounded-xl border border-[#f08a78] text-[#f08a78] hover:bg-[#f08a78]/5 transition-all text-sm font-bold"
              >
                Gửi lại / Thay đổi thông tin
              </button>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // ── RENDER DEFAULT FORM ──
  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark text-[#2B2B2B] dark:text-slate-100 font-display min-h-screen flex flex-col"
        style={{ paddingBottom: "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))" }}
      >
        {/* Top Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#f08a78]/10 bg-[#FEFEFD] dark:bg-surface-dark px-6 md:px-10 py-3 shadow-sm sticky top-0 z-50">
          <Link to="/home" className="flex items-center gap-4">
            <img
              src="/img/onlyLogo.png"
              alt="Hands & Hour logo"
              className="h-9 w-9 object-contain"
            />
            <h2 className="text-xl font-black tracking-tight flex items-center">
              <span>
                <span className="text-[#c3996c]">Hands</span>{" "}
                <span className="text-[#f08a78]">&amp;</span>{" "}
                <span className="text-[#c3996c]">Hour</span>
              </span>
              <span className="text-[#f08a78] text-xs ml-2 uppercase tracking-wider border border-[#f08a78]/30 px-2 py-0.5 rounded-full bg-[#f08a78]/10">CHẾ ĐỘ HOST</span>
            </h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link to="/advanced-search" className="text-text-main dark:text-white hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal">Khám phá Workshop</Link>
              <a className="text-text-main dark:text-white hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" href="#">Trung tâm Hỗ trợ</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                <img 
                  alt="User Avatar" 
                  className="w-full h-full object-cover" 
                  src={userProfile?.avatarLink || "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ueQ290U45_l4-BzSHl7LqK2UiWmNHL7k6j3G3tVlgoTliJgtpGo-QSsguvy-iDYlX31dv-3gjGF8b_vGPQZCi8X-JqpfUv-yKqteYgzv7hnBThM7kyCs5GoZS2eovukRjfsVdA5IPUbhNvIhZmYERaOeZWiWCBBj8DvzwAkiuHZ9bA0-XOAy-QVobu3cYJYnCxWif-sD5o9iMTn6IjXzfsekjY1m-BhLTb8cPT9s_N424h2oEFviA0-ukylo6QiLXsc6rYUVlHPl"} 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex justify-center py-8 px-4 md:px-8">
          <div className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column: Form */}
            <div className="flex-1 w-full max-w-[640px] mx-auto lg:mx-0">
              {/* Progress Stepper */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex gap-6 justify-between items-end">
                  <p className="text-[#f08a78] text-sm font-bold uppercase tracking-widest">BƯỚC 1 TRÊN 2</p>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Thông tin cơ bản</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-[#f08a78] rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              {/* Header Text */}
              <div className="flex flex-col gap-4 mb-10">
                <h1 className="text-[#2B2B2B] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Trở thành <span className="text-[#f08a78]">Host</span></h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed">Chia sẻ đam mê của bạn với Đà Nẵng! Hãy xác nhận thông tin cơ bản để gửi yêu cầu đăng ký host.</p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="space-y-6">
                  {/* Brand Name / Full Name */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors">Tên Thương hiệu / Họ và tên <span className="text-red-500">*</span></span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined">storefront</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-surface-light dark:bg-surface-dark text-[#2B2B2B] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#f08a78]/50 focus:border-[#f08a78] transition-all shadow-sm" 
                        placeholder="ví dụ: Gốm nhà Joy hoặc Nguyễn Văn A" 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Đây là tên hiển thị trên trang cá nhân của bạn.</p>
                  </label>

                  {/* Email (Readonly) */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors font-medium opacity-80">Địa chỉ Email</span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined opacity-60">mail</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed outline-none shadow-sm" 
                        type="email" 
                        value={userProfile?.email || userProfile?.Email || currentUser?.email || currentUser?.Email || ''} 
                        disabled 
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email liên kết với tài khoản của bạn.</p>
                  </label>

                  {/* Phone Number */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors">Số điện thoại liên hệ <span className="text-red-500">*</span></span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined">call</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-surface-light dark:bg-surface-dark text-[#2B2B2B] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#f08a78]/50 focus:border-[#f08a78] transition-all shadow-sm" 
                        placeholder="+84 ..." 
                        required 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Chúng tôi và học viên sẽ liên hệ với bạn qua số điện thoại này.</p>
                  </label>
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <button 
                    disabled={loading}
                    className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#f08a78] hover:bg-[#ee7a66] disabled:bg-[#fbc4ae] text-white text-lg font-bold py-4 px-8 transition-all shadow-lg shadow-[#f08a78]/30 hover:shadow-[#f08a78]/50 translate-y-0 hover:-translate-y-0.5" 
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        <span>Đang gửi yêu cầu...</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi đơn đăng ký</span>
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Illustration/Info */}
            <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative h-full min-h-[600px] rounded-3xl overflow-hidden bg-[#fbc4ae] dark:bg-surface-dark border border-[#f08a78]/10 p-12">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f08a78]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbc4ae]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                <div className="aspect-square w-full relative mb-8">
                  <img 
                    alt="Creative workshop activity" 
                    className="w-full h-full object-cover rounded-2xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8EzFd_hOu7uAOah5UL5LdoCpyXEmQ9wCTmNrkmjDdy6-DfFO8_X95F6vZJiT3ZW-Va8Lp1mGvOpQ4EHZ17byUodfXzwGP0lNSjndN_5MY4Gvm268IYLZ9-U6qISzBi0jEVZrfrkpAoAwLuXePU0ou4EaT5OfFDuo-8ZtXeQUgggrgBCqMnWrHD7_GIiCoXb5FncTTwSCgo-1GJ5yMO9QXi2HNwUdO8DqIYJrosQtFPXh2Q_O03yMiLt49DJiznxRq2Dm8t1AWk5Qd" 
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Trạng thái</p>
                      <p className="text-sm font-bold text-[#2B2B2B] dark:text-white">Đã xác minh Host</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-10 min-w-10 rounded-full bg-[#f08a78]/20 text-[#f08a78] flex items-center justify-center">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2B2B2B] dark:text-white">Kiếm tiền từ đam mê</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">Biến kỹ năng sáng tạo thành nguồn thu nhập ổn định bằng cách tổ chức các workshop tại địa phương.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-10 min-w-10 rounded-full bg-[#fbc4ae]/20 text-[#fbc4ae] flex items-center justify-center">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2B2B2B] dark:text-white">Kết nối với cộng đồng</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">Gặp gỡ những người cùng chí hướng và xây dựng cộng đồng sáng tạo của riêng bạn.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
