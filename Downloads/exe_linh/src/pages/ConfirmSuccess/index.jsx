import { useNavigate, Link } from 'react-router-dom';
export default function ConfirmSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <header className="w-full bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-4 lg:px-40 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
      <div className="flex items-center gap-10">
      <Link className="flex items-center gap-3 text-slate-900 dark:text-white group" to="/home">
      <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-slate-900">
      <span className="material-symbols-outlined font-bold">handshake</span>
      </div>
      <h2 className="text-lg font-bold tracking-tight">Hands &amp; Hour</h2>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
      <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Hội thảo</a>
      <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Giảng viên</a>
      <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Blog</a>
      </nav>
      </div>
      <div className="flex items-center gap-4">
      <div className="hidden lg:flex w-64 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl items-center px-3 gap-2">
      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">search</span>
      <input className="bg-transparent border-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0" placeholder="Tìm kiếm hội thảo..." type="text"/>
      </div>
      <div className="flex items-center gap-3">
      <button className="size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors relative">
      <span className="material-symbols-outlined">notifications</span>
      <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
      </button>
      <div className="size-10 rounded-xl bg-slate-200 dark:bg-slate-600 overflow-hidden" data-alt="User profile picture" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0KGXfThSzEcW3nmU50S7n6S7qrML1ShQkU7IZ_J5r0qUkSppZRIWjsFILr2ilVzosIuHcB7Zfy4Fnunj6vXq27lYn5aXQADu5_bs9L4R_oHc0X_-9WssPE7wodTkNJdosJ1QOxhYu7IT2LYR5ErYCPNi_xGgD8wWCYB-OIsWyX-vjxepyDdRh1ZjXbrs_kHnWWpRBtIka1_Lv5j6SUIfsNfrjy2qZjI6nanjhQ6yQX2qaacoK1DxJCk_HKrwUqMsQwC4YgFWoYJX8')`, backgroundSize: 'cover' }}></div>
      </div>
      </div>
      </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-start pt-10 pb-20 px-4">
      {/* Hero Confirmation */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative">
      {/* Simulated Confetti/Decor */}
      <div className="absolute -top-10 -left-10 text-primary opacity-60 transform -rotate-12">
      <span className="material-symbols-outlined text-6xl">celebration</span>
      </div>
      <div className="absolute -top-6 -right-10 text-[#FFD700] opacity-60 transform rotate-12">
      <span className="material-symbols-outlined text-6xl">star</span>
      </div>
      <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-6">
      <span className="material-symbols-outlined text-3xl">check_circle</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Đã xác nhận đặt chỗ! 🎉</h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg">Sẵn sàng để bắt tay vào việc thôi! Chúng tôi đã gửi email xác nhận đến <span className="font-semibold text-slate-900 dark:text-white">alex.morgan@example.com</span>.</p>
      </div>
      {/* E-Ticket Container */}
      <div className="w-full max-w-[900px] flex flex-col lg:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      {/* Left Side: Visual & Info */}
      <div className="flex-1 p-8 md:p-10 flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 h-full w-[1px] border-r-2 border-dashed border-slate-200 dark:border-slate-700 hidden lg:block translate-x-[1px]"></div>
      {/* Circle cutouts for ticket look on desktop */}
      <div className="absolute top-0 right-0 size-8 bg-background-light dark:bg-background-dark rounded-full -translate-y-1/2 translate-x-1/2 hidden lg:block"></div>
      <div className="absolute bottom-0 right-0 size-8 bg-background-light dark:bg-background-dark rounded-full translate-y-1/2 translate-x-1/2 hidden lg:block"></div>
      <div className="flex items-start justify-between">
      <div>
      <p className="text-primary font-bold tracking-wider text-xs uppercase mb-1">VÉ ĐIỆN TỬ #HH-8291</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Hội thảo Làm Ly Gốm</h3>
      </div>
      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-slate-500">local_activity</span>
      </div>
      </div>
      {/* Workshop Image */}
      <div className="w-full h-48 rounded-xl bg-slate-200 dark:bg-slate-700 relative overflow-hidden group">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Person shaping clay on a pottery wheel close up" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBr8DXXEjsgz2cV6UgzOShqrw9bBkYhtIexpp8VcdjEAVjB9W0pqYNjNZXNSVMsRm9zpeNkPdhTEyJlbzAYWAYmAsAvHoboxayg3GXJBA0XlhQ9ojyHh31W7VZA9YSvT7pOWQEqrXIRi0zq-bjLZOEsJJDEVlZdmAFtuJvLtL6l-xqqwYgQXshV-59y4PNGC4KSBRMnTzC0emMiWrEhQQWWhguIHIFJ3d2TL28sqDrigJ1zDq8--9wC8nBDSRVv9E_tA5YJLWmpfY8F')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
      <div className="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
      <span className="material-symbols-outlined text-base">palette</span>
      <span>Phù hợp cho người mới</span>
      </div>
      </div>
      </div>
      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      <div className="flex items-start gap-3">
      <div className="size-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary">calendar_month</span>
      </div>
      <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-0.5">Địa điểm</p>
      <p className="text-slate-900 dark:text-slate-100 font-semibold">Thứ Bảy, 24 Th10</p>
      <p className="text-slate-600 dark:text-slate-300 text-sm">10:00 AM - 12:00 PM</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="size-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary">location_on</span>
      </div>
      <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-0.5">Địa điểm</p>
      <p className="text-slate-900 dark:text-slate-100 font-semibold">Dragon Bridge Studio</p>
      <p className="text-slate-600 dark:text-slate-300 text-sm">Tran Hung Dao, Da Nang</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="size-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary">person</span>
      </div>
      <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-0.5">Người hướng dẫn</p>
      <div className="flex items-center gap-2">
      <div className="size-6 rounded-full bg-slate-300 overflow-hidden" data-alt="Instructor portrait" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBla3u4yrs4rLpNYlOxLlqy266Jp6R8QUXlc9n6M_zu-9vKDS0GD5gsPynkATK_FZTM7B6iWj5ysLRCjz44k6GyoRlGuiv7prNC3tKwLtqJZV-P6dAJFL3hqkG9wITllRKietAjE6wffVbr33MYFvPtALfy_HvUb7659qq7C1EgHNPbYHJ8CwQt9zNebscXPIbHhA5g7F_UY0L3eEAHxsSoge_fuWgiLFXUUgCB562BopbYwEVZGBAzkc-3eeJfjoYSc8rvvQ3ie2Vd')`, backgroundSize: 'cover' }}></div>
      <p className="text-slate-900 dark:text-slate-100 font-semibold">Linh Nguyen</p>
      </div>
      </div>
      </div>
      </div>
      {/* Action Buttons (Mobile) */}
      <div className="lg:hidden flex flex-col gap-3 mt-4">
      <button className="flex items-center justify-center gap-2 w-full h-12 bg-primary hover:bg-primary-dark text-slate-900 font-bold rounded-xl transition-colors">
      <span className="material-symbols-outlined">download</span>
                              Download Ticket
                          </button>
      </div>
      </div>
      {/* Right Side: QR & Map */}
      <div className="w-full lg:w-[320px] bg-slate-50 dark:bg-slate-800/50 p-8 flex flex-col items-center justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700 relative">
      {/* Ticket Notch decorations (Desktop right side) */}
      <div className="absolute top-0 left-0 size-8 bg-background-light dark:bg-background-dark rounded-full -translate-y-1/2 -translate-x-1/2 hidden lg:block z-10"></div>
      <div className="absolute bottom-0 left-0 size-8 bg-background-light dark:bg-background-dark rounded-full translate-y-1/2 -translate-x-1/2 hidden lg:block z-10"></div>
      <div className="flex flex-col items-center w-full gap-6">
      <div className="text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Quét khi vào cửa</p>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mx-auto w-fit">
      {/* Simulated QR Code using CSS Grid/Gradient */}
      <div className="size-32 bg-slate-900" data-alt="QR Code for entry ticket" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsPT-Q2AO66_MhvZzeoxDfeQnGC1W0mFgkRYDP2_qh26wZjSr4_h6M_Gf1lUII221zhtkggBogeVNQlXtP2drUSp3X4KscxNZ650-RuPtn0IXH2OAZYdljPfyLUQQBZfySbRzpsDOzkr98hNvtUjAFtbqsJVojPSMcGwZZ2xgIn3CEi74Im6K0nQHw9EcsS8UD5CunBhLL6onYTtozone7gJ_LmquDNQ3mL9gIHTxeYPvz-xyOcvN4vnfvTKMqHz16IbVXHdTu6h8e')`, backgroundSize: 'cover' }}></div>
      </div>
      </div>
      {/* Mini Map */}
      <div className="w-full h-32 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-600">
      <div className="absolute inset-0 bg-cover bg-center opacity-80" data-alt="Map view of Da Nang city area" data-location="Da Nang" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaR3e69-U7vthjgUJuCAzt0eYYwfGhv8zT-QVT9hd69MwuWdFLIl7ExaRFTl00TwM63k4yl-h0lWOE6EUW-MprAdaOi7rbfSz-eHgFvrTKIqYvUKqXQ-1yEDDlsQDpgKa0hlbYKOaD6-svsDX3HPLX_8x_jB4CZrLqI4_XgC44wYiJ65E6wiEUT0RKP-4R2aob9Q2avp9QLHNVeVX_jDSWtFBQJLHq6N9T8fq796Dqba3XVjWieg7_GMuP4j8ihxBcmr5m2fjMme6x')` }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
      <span className="material-symbols-outlined text-slate-900 text-sm">location_on</span>
      </div>
      </div>
      <a className="absolute bottom-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded text-slate-800 hover:bg-white" href="#">Mở bản đồ</a>
      </div>
      </div>
      <div className="mt-8 text-center w-full">
      <button className="hidden lg:flex items-center justify-center gap-2 w-full h-12 bg-primary hover:bg-primary-dark text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-primary/20"><span className="material-symbols-outlined">download</span> Tải vé xuống</button>
      <p className="text-xs text-slate-400 mt-4">Gặp sự cố? <a className="text-primary hover:underline" href="#">Liên hệ Hỗ trợ</a></p>
      </div>
      </div>
      </div>
      {/* Secondary Actions */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-[600px]">
      <button className="flex-1 min-w-[200px] h-14 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-all group"><span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">calendar_add_on</span> Thêm vào lịch</button>
      <button className="flex-1 min-w-[200px] h-14 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-all group"><span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">history_edu</span> Xem lịch đặt chỗ</button>
      </div>
      </main>
      {/* Footer Simple */}
      <footer className="w-full bg-white dark:bg-slate-800 py-8 border-t border-slate-100 dark:border-slate-700">
      <div className="max-w-[1200px] mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-slate-500 dark:text-slate-400 text-sm">© 2023 Hands &amp; Hour. Được làm với ❤️ tại Đà Nẵng.</p>
      <div className="flex gap-6">
      <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
      <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">photo_camera</span></a>
      <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
      </div>
      </div>
      </footer>
      </div>
    </>
  );
}
