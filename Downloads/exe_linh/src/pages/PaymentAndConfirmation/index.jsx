import { useNavigate, Link } from 'react-router-dom';
export default function PaymentAndConfirmation() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white dark:bg-[#1a2c2b] border-b border-[#f0f4f4] dark:border-[#2a3c3b] sticky top-0 z-50">
      <div className="px-6 lg:px-10 py-3 mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
      {/* Logo & Nav */}
      <div className="flex items-center gap-8">
      <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
      <div className="size-8 text-primary">
      <svg className="w-full h-full" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      <h2 className="text-xl font-bold leading-tight tracking-tight">Hands &amp; Hour</h2>
      </div>
      <nav className="hidden md:flex items-center gap-6">
      <Link className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" to="/login">Lớp học</Link>
      <a className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Giảng viên</a>
      <a className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Cộng đồng</a>
      </nav>
      </div>
      {/* Search & Actions */}
      <div className="flex items-center gap-4">
      <div className="hidden sm:flex relative items-center">
      <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
      <input className="pl-10 pr-4 py-2 bg-[#f0f4f4] dark:bg-[#253534] border-none rounded-xl text-sm focus:ring-2 focus:ring-primary w-64 text-slate-900 dark:text-slate-100 placeholder-slate-400" placeholder="Tìm kiếm lớp học..." type="text"/>
      </div>
      <Link to="/login" className={"bg-primary hover:bg-[#14bcae] text-slate-900 font-bold text-sm px-5 py-2 rounded-xl transition-colors" }>Đăng nhập</Link>
      </div>
      </div>
      </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Checkout Title & Order Summary */}
      <div className="lg:col-span-7 flex flex-col gap-6">
      <div>
      <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">Thanh toán an toàn</h1>
      <p className="text-slate-500 dark:text-slate-400">Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại Đà Nẵng.</p>
      </div>
      {/* Booking Summary Card */}
      <section className="bg-white dark:bg-[#1a2c2b] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-[#2a3c3b]">
      <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-slate-100">
      <span className="material-symbols-outlined text-primary">shopping_bag</span>
      <h2 className="text-xl font-bold">Tóm tắt đơn hàng</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
      <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Person shaping clay on a pottery wheel" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAtFqC8B6fN1RQPNch--25CDDS09j0u4M3l8hzPZ62twvAF3241_rQUigW9NJQZO_oSTY5WILKub-FWgspUPYYh3ALyFPqz9kQxTXP6zHWfbC0IzJa4iLXiWzHr6GFabS3PKqcO1nyLyCScqW1IJ0rda3XtgkX6AoihIs5AlFQR37qEgaZkRJcmLWGV5fd7y0LLIDd39SgvqrsKHVSO0MN7RhbGEjHRfr7sYfgiphFdnFYh1PcWRWsOaRWNaTD4Dm6349u__5IRP0M')` }}>
      </div>
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
      <div>
      <div className="flex justify-between items-start mb-1">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Workshop Làm Cốc Gốm</h3>
      <span className="text-primary font-bold text-lg">750k ₫</span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại Đà Nẵng.</p>
      <div className="space-y-2">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
      <span>Thứ Bảy, ngày 28 tháng 10 năm 2023</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
      <span className="material-symbols-outlined text-[18px]">schedule</span>
      <span>10:00 - 12:00 (2 Tiếng)</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
      <span className="material-symbols-outlined text-[18px]">person</span>
      <span>1 Người</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
      <span className="material-symbols-outlined text-[18px]">location_on</span>
      <span>Khu vực bãi biển Mỹ Khê, Đà Nẵng</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-[#2a3c3b]">
      <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-sm mb-2">
      <span>Tạm tính</span>
      <span>750,000 ₫</span>
      </div>
      <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-sm mb-2">
      <span>Phí dịch vụ</span>
      <span>25,000 ₫</span>
      </div>
      <div className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-slate-100 mt-4">
      <span>Tổng thanh toán</span>
      <span className="text-primary">775,000 ₫</span>
      </div>
      </div>
      </section>
      {/* Cancellation Policy Preview */}
      <div className="bg-primary/10 rounded-xl p-4 flex gap-3 items-start">
      <span className="material-symbols-outlined text-primary mt-0.5">verified_user</span>
      <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Hủy miễn phí</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Hủy tối đa 24 giờ trước khi workshop bắt đầu để được hoàn tiền đầy đủ.</p>
      </div>
      </div>
      </div>
      {/* Right Column: Payment Methods */}
      <div className="lg:col-span-5 flex flex-col gap-6">
      <section className="bg-white dark:bg-[#1a2c2b] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-[#2a3c3b] h-full">
      <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-slate-100">
      <span className="material-symbols-outlined text-primary">payments</span>
      <h2 className="text-xl font-bold">Phương thức thanh toán</h2>
      </div>
      {/* Payment Tabs */}
      <div className="flex gap-2 p-1 bg-[#f0f4f4] dark:bg-[#253534] rounded-lg mb-6">
      <button className="flex-1 py-2 text-sm font-semibold rounded shadow-sm bg-white dark:bg-[#1a2c2b] text-slate-900 dark:text-slate-100 transition-all">Chuyển khoản</button>
      <button className="flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-all">Thẻ tín dụng</button>
      <button className="flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-all">Ví điện tử</button>
      </div>
      {/* QR Payment Active State */}
      <div className="flex flex-col items-center">
      <div className="text-center mb-4">
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Quét mã qua VietQR hoặc Ứng dụng Ngân hàng</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại Đà Nẵng.</p>
      </div>
      <div className="relative w-56 h-56 bg-white border-2 border-primary rounded-xl p-2 mb-4 shadow-lg group">
      {/* QR Code Placeholder using a gradient/pattern approach */}
      <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-white p-2">
      <img alt="QR Code for payment" className="w-full h-full object-contain" data-alt="Black and white QR code pattern for mobile payment scanning" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv1fZtm74XkdoFuB0LmB4oxImJlQ4dZtyQRpDnJjCvAgbIZI56nMAcAiHf7geTojLS-tmUbCnGdV1aLLaTOfgsXOix8JdkDhmQ0BqIEpD3C4MERfJpwUjqqJZxBSAu5HoY1W4ylmJifj7Xzf9Y2sHsewt2lIENsCZ9BNaQMp_CeUWvmLzJ9yg7kFqnEXCvdkiJKLHmdICpsAQeC3_DlxINEMo_nzhbpJ3ZO15-l8FNgAqnNscjhbWD0vMNBoERrI2BFtXeGP9YwrHU"/>
      </div>
      {/* Center Logo Overlay */}
      <div className="absolute bg-white p-1 rounded-full shadow-md z-10">
      <div className="text-primary">
      <svg fill="none" height="24" viewbox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      </div>
      </div>
      </div>
      <div className="w-full bg-[#f6f8f8] dark:bg-[#253534] rounded-lg p-3 mb-6">
      <div className="flex justify-between items-center mb-2">
      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Tên tài khoản</span>
      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">HANDS AND HOUR LLC</span>
      </div>
      <div className="flex justify-between items-center mb-2">
      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Ngân hàng</span>
      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Vietcombank</span>
      </div>
      <div className="flex justify-between items-center">
      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Số tài khoản</span>
      <div className="flex items-center gap-2">
      <span className="text-sm font-mono text-slate-900 dark:text-slate-100">0071 0000 8293</span>
      <button className="text-primary hover:text-[#14bcae]">
      <span className="material-symbols-outlined text-[16px]">content_copy</span>
      </button>
      </div>
      </div>
      </div>
      <div className="w-full space-y-3">
      <div className="flex items-start gap-2">
      <input className="rounded border-slate-300 text-primary focus:ring-primary mt-1" id="terms" type="checkbox"/>
      <label className="text-xs text-slate-600 dark:text-slate-400" htmlFor="terms">Tôi đồng ý với <a className="text-primary hover:underline" href="#">Điều khoản dịch vụ</a> và <a className="text-primary hover:underline" href="#">Chính sách hủy</a>.</label>
      </div>
      <button className="w-full bg-primary hover:bg-[#14bcae] text-slate-900 font-bold text-base py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(24,216,197,0.39)] transition-all transform hover:-translate-y-0.5 active:translate-y-0">Xác nhận thanh toán</button>
      <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span> Thanh toán bảo mật SSL</p>
      </div>
      </div>
      </section>
      </div>
      </div>
      </main>
      {/* Footer Simplified */}
      <footer className="mt-auto py-8 border-t border-[#f0f4f4] dark:border-[#2a3c3b] bg-white dark:bg-[#1a2c2b]">
      <div className="container mx-auto px-6 text-center">
      <p className="text-slate-400 text-sm">© 2023 Hands &amp; Hour. Được tạo ra với sự tận tâm tại Đà Nẵng.</p>
      </div>
      </footer>
      </div>
    </>
  );
}
