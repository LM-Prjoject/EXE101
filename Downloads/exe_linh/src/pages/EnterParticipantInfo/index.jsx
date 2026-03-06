import { useNavigate, Link } from 'react-router-dom';
export default function EnterParticipantInfo() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3">
      <div className="size-8 text-primary">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6_330)">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </g>
      <defs>
      <clippath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clippath>
      </defs>
      </svg>
      </div>
      <h2 className="text-slate-900 dark:text-white text-xl font-extrabold leading-tight tracking-tight">Hands &amp; Hour</h2>
      </div>
      <div className="flex items-center gap-4">
      <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined">arrow_back</span> Quay lại</button>
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" data-alt="User profile avatar portrait" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYD_b0RkLHCD_9l3q_f3WvTYslCw1nyfxic5sQpqaqOiaIWUxWbZqxixGV9ApsOHN6UMZl6EE2xVBqToVr0ju4tBF8vZLqLO0tdC_7OjcOHayilOjnaSUv5ovfS60kXPPXzmu53jqTiE83ikRbzjsvNNFp-A_w8VPoMW9KXLwGyw0YzZLfTd5pGZBG08aihTRF_IrO3jGIaDkiGP1bq5JXc0Ahnt-a5OuddDjcnZZQSIty01cShijzuK-tTL7PVSmaqAQZW37HZQs5")` }}></div>
      </div>
      </header>
      <main className="flex flex-1 justify-center py-8 px-4 md:px-0">
      <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-8">
      <div className="flex flex-col gap-2">
      <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold leading-tight">Chi tiết người tham gia</h1>
      <p className="text-slate-500 dark:text-slate-400 text-base">Hoàn thành thông tin bên dưới để giữ chỗ cho buổi hội thảo của bạn.</p>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-48 md:h-auto bg-center bg-no-repeat bg-cover" data-alt="Artistic pottery clay being shaped on a wheel" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOgdjgG7k9szyk92VZio4A_eMvX_xJpcH3EbBAnPj2OxGFkM45nczAEN9VFDESGmLAl8ya8lN7zZsPQR1Ax7zfOKSJLiBy6vG69YFP-jHzJbzMmKUZP5_DzcPi891211B-EJBjvaVhrz_sjHmy5mqUcyO1LGNFajwEAIj9RjTUQAKG9XzKiJvmqFJFy1qoAT7YvacC8ZEbhXiIm0W8EVT6gHI0_5bAzvrFgw0RVU677x6fDh8-cqAGniu5gGhe9yT2wQubFR0yMFiQ")` }}></div>
      <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
      <div>
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">HỘI THẢO ĐÃ CHỌN</span>
      <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Modern Pottery &amp; Glazing</h2>
      </div>
      <div className="text-right">
      <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">TỔNG GIÁ</p>
      <p className="text-2xl font-extrabold text-primary">$85.00</p>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">calendar_today</span>
      </div>
      <div>
      <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase">Date</p>
      <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">Oct 24, 2023</p>
      </div>
      </div>
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">schedule</span>
      </div>
      <div>
      <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase">Time</p>
      <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">10:00 AM - 1:00 PM</p>
      </div>
      </div>
      <div className="flex items-center gap-3 col-span-2">
      <div className="size-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">location_on</span>
      </div>
      <div>
      <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase">Location</p>
      <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">Creative Hub, Downtown Studio A</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="absolute right-[33.33%] top-0 bottom-0 border-l border-dashed border-slate-200 dark:border-slate-700 hidden md:block">
      <div className="absolute -top-3 -left-3 size-6 bg-background-light dark:bg-background-dark rounded-full"></div>
      <div className="absolute -bottom-3 -left-3 size-6 bg-background-light dark:bg-background-dark rounded-full"></div>
      </div>
      </div>
      <form className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
      <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</span> Người tham gia chính</h3>
      <span className="text-xs text-slate-400 font-medium">Liên hệ chính</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <label className="flex flex-col gap-2">
      <span className="text-slate-700 dark:text-slate-300 text-sm font-bold">Họ và tên</span>
      <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="ví dụ: Nguyễn Văn A" required="" type="text"/>
      </label>
      <label className="flex flex-col gap-2">
      <span className="text-slate-700 dark:text-slate-300 text-sm font-bold">Địa chỉ Email</span>
      <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="alex@example.com" required="" type="email"/>
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
      <span className="text-slate-700 dark:text-slate-300 text-sm font-bold">Số điện thoại</span>
      <div className="flex gap-2">
      <select className="w-24 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary h-12 text-sm">
      <option>+1</option>
      <option>+44</option>
      <option>+61</option>
      </select>
      <input className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="(555) 000-0000" type="tel"/>
      </div>
      </label>
      </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm opacity-60">
      <div className="flex items-center justify-between mb-6">
      <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-sm font-bold">2</span> Khách mời bổ sung (Tùy chọn)</h3>
      <button className="text-primary text-sm font-bold hover:underline" type="button">Thêm khách</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 blur-[1px] pointer-events-none">
      <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
      <span className="material-symbols-outlined text-primary">info</span>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Bằng cách nhấp vào 'Tiếp tục thanh toán', bạn đồng ý với chính sách hủy hội thảo. Bạn có thể hủy để được hoàn tiền đầy đủ tối đa 48 giờ trước khi sự kiện bắt đầu.</p>
      </div>
      <div className="flex items-center justify-between gap-4 py-4">
      <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" type="button"><span className="material-symbols-outlined">arrow_back</span> Quay lại</button>
      <button className="flex-1 md:flex-none md:min-w-[240px] flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all" type="submit">Tiếp tục thanh toán <span className="material-symbols-outlined">arrow_forward</span></button>
      </div>
      </div>
      </form>
      </div>
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-6 md:px-20 bg-white dark:bg-slate-900">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-slate-400">
      <div className="size-6 opacity-50">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor"></path>
      </svg>
      </div>
      <p className="text-sm font-medium">© 2023 Hands &amp; Hour. Bảo lưu mọi quyền.</p>
      </div>
      <div className="flex gap-8">
      <a className="text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Chính sách bảo mật</a>
      <a className="text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Điều khoản dịch vụ</a>
      <a className="text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Trung tâm trợ giúp</a>
      </div>
      </div>
      </footer>
      </div>
      </div>
      </div>
    </>
  );
}
