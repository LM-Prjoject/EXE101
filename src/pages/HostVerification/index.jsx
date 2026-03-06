import { useNavigate, Link } from 'react-router-dom';
export default function HostVerification() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark text-[#2B2B2B] dark:text-slate-100 font-display min-h-screen flex flex-col"
        style={{ paddingBottom: "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))" }}
      >
        {/* Top Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#f08a78]/10 bg-surface-light dark:bg-surface-dark px-6 md:px-10 py-3 shadow-sm sticky top-0 z-50">
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
              <a className="text-text-main dark:text-white hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" href="#">Khám phá Workshop</a>
              <a className="text-text-main dark:text-white hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" href="#">Trung tâm Hỗ trợ</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-8 rounded-full bg-slate-200 overflow-hidden" data-alt="User profile avatar placeholder">
                <img alt="User Avatar" className="w-full h-full object-cover" data-alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ueQ290U45_l4-BzSHl7LqK2UiWmNHL7k6j3G3tVlgoTliJgtpGo-QSsguvy-iDYlX31dv-3gjGF8b_vGPQZCi8X-JqpfUv-yKqteYgzv7hnBThM7kyCs5GoZS2eovukRjfsVdA5IPUbhNvIhZmYERaOeZWiWCBBj8DvzwAkiuHZ9bA0-XOAy-QVobu3cYJYnCxWif-sD5o9iMTn6IjXzfsekjY1m-BhLTb8cPT9s_N424h2oEFviA0-ukylo6QiLXsc6rYUVlHPl" />
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
                  <span className="text-[#d5ddc3] dark:text-[#d5ddc3] text-sm">Thông tin cơ bản</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-[#f08a78] rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              {/* Header Text */}
              <div className="flex flex-col gap-4 mb-10">
                <h1 className="text-[#2B2B2B] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Trở thành <span className="text-[#f08a78]">Host</span></h1>
                <p className="text-[#d5ddc3] dark:text-slate-300 text-lg font-normal leading-relaxed">Chia sẻ đam mê của bạn với Đà Nẵng! Hãy bắt đầu với các thông tin cơ bản để xác minh hồ sơ host của bạn.</p>
              </div>
              {/* Form Fields */}
              <form className="flex flex-col gap-6">
                <div className="space-y-6">
                  {/* Brand Name */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors">Tên Thương hiệu <span className="text-red-500">*</span></span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-[#d5ddc3] material-symbols-outlined">storefront</span>
                      <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-surface-light dark:bg-surface-dark text-[#2B2B2B] dark:text-white placeholder:text-[#d5ddc3] focus:outline-none focus:ring-2 focus:ring-[#f08a78]/50 focus:border-[#f08a78] transition-all shadow-sm" placeholder="ví dụ: Gốm nhà Joy" required="" type="text" />
                    </div>
                    <p className="text-xs text-[#d5ddc3] dark:text-[#d5ddc3]">Đây là tên sẽ hiển thị với khách hàng.</p>
                  </label>
                  {/* Phone Number */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors">Số điện thoại <span className="text-red-500">*</span></span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-[#d5ddc3] material-symbols-outlined">call</span>
                      <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-surface-light dark:bg-surface-dark text-[#2B2B2B] dark:text-white placeholder:text-[#d5ddc3] focus:outline-none focus:ring-2 focus:ring-[#f08a78]/50 focus:border-[#f08a78] transition-all shadow-sm" placeholder="+84 ..." required="" type="tel" />
                    </div>
                    <p className="text-xs text-[#d5ddc3] dark:text-[#d5ddc3]">Chúng tôi chỉ sử dụng số này cho mục đích xác minh.</p>
                  </label>
                  {/* Social Link */}
                  <label className="flex flex-col gap-2 group">
                    <span className="text-[#2B2B2B] dark:text-slate-100 text-base font-semibold group-focus-within:text-[#f08a78] transition-colors">Mạng xã hội / Link Portfolio <span className="text-red-500">*</span></span>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-[#d5ddc3] material-symbols-outlined">link</span>
                      <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-surface-light dark:bg-surface-dark text-[#2B2B2B] dark:text-white placeholder:text-[#d5ddc3] focus:outline-none focus:ring-2 focus:ring-[#f08a78]/50 focus:border-[#f08a78] transition-all shadow-sm" placeholder="Link Facebook, Instagram, hoặc Website" required="" type="url" />
                    </div>
                    <p className="text-xs text-[#d5ddc3] dark:text-[#d5ddc3]">Giúp chúng tôi xác minh nền tảng sáng tạo của bạn.</p>
                  </label>
                </div>
                {/* Action Button */}
                <div className="pt-6">
                  <button onClick={() => navigate('/host/verify-step2')} className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#f08a78] hover:bg-[#ee7a66] text-white text-lg font-bold py-4 px-8 transition-all shadow-lg shadow-[#f08a78]/30 hover:shadow-[#f08a78]/50 translate-y-0 hover:-translate-y-0.5" type="button">
                    <span>Tiếp theo: Xác minh</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
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
                <div className="aspect-square w-full relative mb-8" data-alt="Illustration of a creative person painting or crafting">
                  <img alt="Creative workshop activity" className="w-full h-full object-cover rounded-2xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500" data-alt="Artist painting colorful canvas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8EzFd_hOu7uAOah5UL5LdoCpyXEmQ9wCTmNrkmjDdy6-DfFO8_X95F6vZJiT3ZW-Va8Lp1mGvOpQ4EHZ17byUodfXzwGP0lNSjndN_5MY4Gvm268IYLZ9-U6qISzBi0jEVZrfrkpAoAwLuXePU0ou4EaT5OfFDuo-8ZtXeQUgggrgBCqMnWrHD7_GIiCoXb5FncTTwSCgo-1GJ5yMO9QXi2HNwUdO8DqIYJrosQtFPXh2Q_O03yMiLt49DJiznxRq2Dm8t1AWk5Qd" />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#d5ddc3] font-medium">Trạng thái</p>
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
                      <p className="text-sm text-[#d5ddc3] dark:text-[#d5ddc3] mt-1">Biến kỹ năng sáng tạo thành nguồn thu nhập ổn định bằng cách tổ chức các workshop tại địa phương.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-10 min-w-10 rounded-full bg-[#fbc4ae]/20 text-[#fbc4ae] flex items-center justify-center">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2B2B2B] dark:text-white">Kết nối với cộng đồng</h3>
                      <p className="text-sm text-[#d5ddc3] dark:text-[#d5ddc3] mt-1">Gặp gỡ những người cùng chí hướng tại Đà Nẵng và xây dựng cộng đồng sáng tạo của riêng bạn.</p>
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
