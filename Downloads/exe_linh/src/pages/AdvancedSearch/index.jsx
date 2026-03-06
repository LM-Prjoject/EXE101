import { useNavigate, Link } from 'react-router-dom';
export default function AdvancedSearch() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-[#f0f4f4] dark:border-white/5">
      <div className="flex items-center justify-between px-10 py-3 max-w-[1440px] mx-auto w-full">
      <div className="flex items-center gap-8 flex-1">
      <Link className="flex items-center gap-3 text-text-main dark:text-white hover:opacity-80 transition-opacity" to="/home">
      <div className="size-8 text-primary">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      <h2 className="text-xl font-bold tracking-tight">Hands &amp; Hour</h2>
      </Link>
      <div className="hidden lg:flex flex-1 max-w-md">
      <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
      <span className="material-symbols-outlined text-[20px]">search</span>
      </div>
      <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-[#f0f4f4] dark:bg-white/5 text-text-main dark:text-white placeholder-text-muted focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Tìm kiếm hội thảo, giảng viên..." type="text" value="Pottery"/>
      </div>
      </div>
      </div>
      <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-8">
      <Link className="text-sm font-medium hover:text-primary transition-colors" to="/login">Hội thảo</Link>
      <Link className="text-sm font-medium hover:text-primary transition-colors" to="/register">Giảng viên</Link>
      <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Blog</a>
      </nav>
      <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>
      <div className="flex items-center gap-4">
      <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:block" to="/login">Đăng nhập</Link>
      <Link to="/register" className="bg-primary hover:bg-primary-dark text-text-main font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-primary/20">Đăng ký</Link>
      </div>
      </div>
      </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8 text-sm text-text-muted">
      <a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      <a className="hover:text-primary transition-colors" href="#">Tìm kiếm</a>
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      <span className="text-text-main dark:text-white font-medium">Pottery</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar Filters */}
      <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
      <div className="flex items-center justify-between">
      <h3 className="font-bold text-lg">Bộ lọc</h3>
      <button className="text-sm text-primary font-medium hover:underline">Thiết lập lại</button>
      </div>
      {/* Categories */}
      <div className="space-y-4">
      <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted">Danh mục</h4>
      <div className="space-y-2">
      <label className="flex items-center gap-3 cursor-pointer group">
      <input className="sr-only peer" name="category" type="radio"/>
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-text-main rounded-full opacity-0 peer-checked:opacity-100"></div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">Tất cả danh mục</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
      <input checked="" className="sr-only peer" name="category" type="radio"/>
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-text-main rounded-full opacity-0 peer-checked:opacity-100"></div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">Gốm sứ</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
      <input className="sr-only peer" name="category" type="radio"/>
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-text-main rounded-full opacity-0 peer-checked:opacity-100"></div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">Hội họa</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
      <input className="sr-only peer" name="category" type="radio"/>
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-text-main rounded-full opacity-0 peer-checked:opacity-100"></div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">Thêu thùa</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
      <input className="sr-only peer" name="category" type="radio"/>
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-text-main rounded-full opacity-0 peer-checked:opacity-100"></div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">Làm đồ trang sức</span>
      </label>
      </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-white/10"></div>
      {/* Price Range */}
      <div className="space-y-4">
      <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted">Danh mục</h4>
      <div className="relative pt-6 pb-2">
      <div className="absolute top-0 left-0 text-xs font-medium text-text-muted">$0</div>
      <div className="absolute top-0 right-0 text-xs font-medium text-text-muted">$200+</div>
      <input className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" max="200" min="0" type="range" value="50"/>
      <div className="flex justify-between mt-2">
      <div className="border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-white/5 w-20 text-center">$10</div>
      <div className="text-text-muted">-</div>
      <div className="border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-white/5 w-20 text-center">$80</div>
      </div>
      </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-white/10"></div>
      {/* Distance */}
      <div className="space-y-4">
      <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted">Danh mục</h4>
      <div className="space-y-2">
      <label className="flex items-center gap-3 cursor-pointer">
      <input className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent" type="checkbox"/>
      <span className="text-sm font-medium">Tất cả danh mục</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
      <input checked="" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent" type="checkbox"/>
      <span className="text-sm font-medium">Gốm sứ</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
      <input className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent" type="checkbox"/>
      <span className="text-sm font-medium">Hội họa</span>
      </label>
      </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-white/10"></div>
      {/* Skill Level */}
      <div className="space-y-4">
      <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted">Danh mục</h4>
      <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1.5 rounded-lg border border-primary bg-primary/10 text-primary-dark dark:text-primary text-sm font-medium transition-colors">Gốm sứ <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button></button>
      <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary text-sm font-medium transition-colors">Trung cấp</button>
      <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary text-sm font-medium transition-colors">Nâng cao</button>
      <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary text-sm font-medium transition-colors">Trẻ em</button>
      </div>
      </div>
      </aside>
      {/* Results Grid */}
      <div className="lg:col-span-9 flex flex-col gap-6">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-main dark:text-white mb-2">Kết quả cho "Gốm sứ" tại Đà Nẵng</h1>
      <p className="text-text-muted"><span className="font-semibold text-primary">12 hội thảo</span> được tìm thấy phù hợp với tiêu chí của bạn</p>
      </div>
      <div className="flex items-center gap-3 self-start md:self-auto">
      <span className="text-sm font-medium text-text-muted whitespace-nowrap">Sắp xếp theo:</span>
      <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:border-primary transition-colors">Đề xuất <span className="material-symbols-outlined text-[18px]">expand_more</span></button>
      </div>
      <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-dark dark:text-primary rounded-lg text-sm font-medium"><span className="material-symbols-outlined text-[18px]">tune</span> Bộ lọc</button>
      </div>
      </div>
      {/* Active Filters Tags (Mobile/Desktop) */}
      <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary-dark dark:text-primary rounded-full text-xs font-bold uppercase tracking-wide">Gốm sứ <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button></div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary-dark dark:text-primary rounded-full text-xs font-bold uppercase tracking-wide">
                              $10 - $80
                              <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary-dark dark:text-primary rounded-full text-xs font-bold uppercase tracking-wide">Người mới <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button></div>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Hands shaping clay on a pottery wheel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hands shaping clay on a pottery wheel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAINYD3oeUcID87QDpLNyjVCu6VGFQZFu0dk0gmZ0-JfTlMreQefRBG0rs3tNbU7wyBVdXGOfjoJTrG14GpsCCpF9U5W_AAa5ox8D4QXjY7JZGKQGBU96LZvxgepuJ9HS9YFwP7vCrRU1axqD8TMPn-v8oMi4Pb1DGBKJztTSPtvA81wPwCSe_WTnB3IvbdxFTWh1AxykFjTy2Gmsmx0IUupV95BSeCGs6ciRhOQjgHH27BX9T6MPFYVI6oJ5nXECc3aXw0A2GB-tfJ"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      4.9 (128)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px] filled">favorite</span>
      </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Nhập môn Xoay gốm trên bàn xoay</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Học các kiến thức cơ bản về cách định tâm đất sét và tạo hình trụ trong buổi thực hành này.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">2.5 Giờ</span>
      <span>2.5 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Thứ 7, CN</span>
      <span>Sat, Sun</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">2.5 Giờ</span>
      <span>Son Tra District</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <img alt="Portrait of instructor Sarah" className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-surface-dark shadow-sm" data-alt="Portrait of instructor Sarah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjXa8BUo0HLxy1lFSfDmX1YigOqEpbUoAEvgnF-qOGk__eqYApED2SLOWIUNg0eFv1Fv65HMke3bq9HNBkl1Fr2bW-7qpw6HoJF5n31oxfqAqmAAGU92aG72kMEDtZZcE79wckL9M9UVTJOr-FnoK6aGHgZZhJks7dAJSVGDuM_qc6GnLMLFSg_EBB-hu0lWdgb0YMGFT6zfCjFAIwhw5OC6URKD28575TKgkHJ-djwYD6sKmqBvKCS-y2WCutHxUZc9lJeVApRjLu"/>
      <span className="text-xs font-medium text-text-muted">Bởi Sarah L.</span>
      </div>
      <p className="font-bold text-lg text-primary">$45</p>
      </div>
      </div>
      </div>
      </div>
      {/* Card 2 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Ceramic painting workshop with colorful glazes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Ceramic painting workshop with colorful glazes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU-usgWwq5naNuf-MuviO6bZU75XeOmBr3Z1Kkv5J_1SnaUm_fXwqkqePer-8wv8oIef3vXOQYP7Bcxz8WLKi0W848-bI0S7PAxIwrpnKVv4ynKCzXf7LaDLFpoetCsuURC2G-by85s1kJU0_7pb_gz8_-f0da0PCKzJ4FF--WNx6V0iChjkQlaqdZNIsRpczCeUEMoJSL2oux7q1k_9Gt-z1Ciqz82lIKH4orOsOcckoNehii8J9W-a482YkNICjVamZ41OtI25bn"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      4.7 (85)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      <div className="absolute bottom-3 left-3 bg-primary text-text-main text-xs font-bold px-2 py-1 rounded">
                                      POPULAR
                                  </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Tráng men &amp; Trang trí Gốm sứ</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Thể hiện sự sáng tạo của bạn bằng cách vẽ lên các món đồ gốm đã làm sẵn. Hoàn hảo để làm quà tặng.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">2 Giờ</span>
      <span>2 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Hàng ngày</span>
      <span>Daily</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">2 Giờ</span>
      <span>Hai Chau District</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <img alt="Portrait of instructor Minh" className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-surface-dark shadow-sm" data-alt="Portrait of instructor Minh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS1-lJElkZ3QiKVJwqjloidkRN8coVRqaXxgC8eGhlVnbIdlfu2mfCye8ogYChiGA7khaMVYuxe3Hv2s299rXhhh-oBQfcMhJlhvWBip1Tu82z9Dwhal2AQaHy0cESBwwaG_aglRn39MXABaIYYKlCd6jyACSCqumHrhtQqrpcNZGmaY4t5938eIFJhoqKVewHp6Ph2dwSpnUfcgI_Mxzcufn_jcfNbZhLR98JwdHIETU-cRH5O66jqM_NFZcxcMvvzHmOug12RQzy"/>
      <span className="text-xs font-medium text-text-muted">Bởi Minh T.</span>
      </div>
      <p className="font-bold text-lg text-primary">$30</p>
      </div>
      </div>
      </div>
      </div>
      {/* Card 3 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Detailed hand building pottery class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Detailed hand building pottery class" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-F0_Aj_PF2I5SwiTzuGq15Om0TRcu7odvLKDFGNCSvAFA2uQkhAT96gngUUZiSwHGSgjpDCxkP_YFjPiGb5y6kbm0egB8z59Wro_wDZD1eCTJZEaWZLbTguPFy4KvfnkH-vjAUdg5w80QuOX37EPetsTvmLWW4EPq53_XG9qDObHUNC3AZcIGuoSwjwauEgJ5bd3t9O4d175HphVbiRdl33lbH16AuKZLEEb0Qn57ywYqQpw5Imuh6O_VUcz1QM_CuFvtJcU99LWg"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      5.0 (42)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Nặn tay: Ly &amp; Bát</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Không cần bàn xoay! Học kỹ thuật nặn dây và nặn tấm để tạo ra những đồ dùng độc đáo.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">3 Giờ</span>
      <span>3 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Cuối tuần</span>
      <span>Weekends</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">3 Giờ</span>
      <span>Ngu Hanh Son</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark font-bold text-xs border-2 border-white dark:border-surface-dark">Bởi The Clay Co.</div>
      <span className="text-xs font-medium text-text-muted">Bởi The Clay Co.</span>
      </div>
      <p className="font-bold text-lg text-primary">$55</p>
      </div>
      </div>
      </div>
      </div>
      {/* Card 4 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Pottery workshop for kids" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Pottery workshop for kids" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbj5iioZg0bwITMHYVCSZY4xtLXyo7ief1MZWG34GYrYZyFI1nszBudFw8FYg2byePSO2gTyo9HQNIlfhjfRyrs21u-aUraqFRvs9tsBXaSEwuCorWYJMVzkLC_UXBzQpmyrGcYf55DFsbhKl8ErFlbG_3uAPgonbvhwSKQyIWu7Up9ViuvKBV2ST0NaaEdAP6XU0r0_zcIGSG-Zr07KSUZlU7HsZZch_j9oKuX4z7FkGATMI3_fyZxn7h4XiJFlwAjxcaz_hKGQeH"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      4.8 (210)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Câu lạc bộ Gốm Trẻ em: Vui chơi Cuối tuần</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Một môi trường vui vẻ và sáng tạo cho trẻ từ 6-12 tuổi khám phá nghệ thuật làm gốm.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">1.5 Giờ</span>
      <span>1.5 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Sáng Thứ 7</span>
      <span>Sat Morning</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">1.5 Giờ</span>
      <span>Hai Chau District</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <img alt="Portrait of instructor Elena" className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-surface-dark shadow-sm" data-alt="Portrait of instructor Elena" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1XFuBiRV3sZo-i2ClJ23OYCntk7bDatiuX5xRay1GA4sTvF1u4YlpqRjpTixUEqg7MzQW5adkLIjNpsyuMEBdwy-Ig-5aEmvQC5Nl2ZDTfqRce3d8LHV1EokiJ4HQLKGgg50pSvfQszlID2Mix_uYKTtk_NdKWHm1rAMsgdfe1hTQPLc-jvgHSTvhh70FiceVsJm7nCIWXmW8Tdii08bWg7ZcILX_hveJoFb7LsEuWu7mRU_oZgz7DsTkJ62mLmgB8wG-4s72YRiP"/>
      <span className="text-xs font-medium text-text-muted">Bởi Elena R.</span>
      </div>
      <p className="font-bold text-lg text-primary">$25</p>
      </div>
      </div>
      </div>
      </div>
      {/* Card 5 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Advanced pottery masterclass with vase making" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Advanced pottery masterclass with vase making" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH4Ao9oVzYfQoaDQzptACUwnavJVp8pXsHcA9OX5U0PAHuqC6bkeP8qQZqQ_ctcLYnYweQbKM2giVp86WUSMz0u5DKentPFUJVgOt3vKN6DopYlS0gi-4xljnVb27M28vXwmvJU29LzfE3yXz4HV-H9Z7JFwYhUGQM6CU5agX1dl8EPAEMAIAw4plEeMVu3RM-Pm737hFjCsekclR-gxcnOBTH8eq8ITqv5AK_CoE71EPxvJ7RHH3HBMO85qEn6Ww2ZZrz1Vi8JB9t"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      4.9 (56)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Lớp học Bậc thầy: Bình gốm lớn</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Dành cho những người làm gốm đã có kinh nghiệm muốn nâng cao tay nghề và làm chủ các hình khối lớn.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">4 Giờ</span>
      <span>4 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Chỉ dành cho Nâng cao</span>
      <span>Advanced Only</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">4 Giờ</span>
      <span>Son Tra District</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <img alt="Portrait of instructor James" className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-surface-dark shadow-sm" data-alt="Portrait of instructor James" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALYbb15HcJ3GcPVH_PgsH_rmGdPXVRaBPkR7AmMGrz6TunMf0OEvU3fPitEhDK-R3jNdwjG9hIMbxftpsJTUa_-f9vNy8XXZPZusOw_TLSP0XxQSrGn9skLGtIDjik7AOHQuAga_SzZDwTDTujyYW0Wa-R7PAUqcRZQ5IPiaUpAPDZ_ngAEcPRgTShlC3BJD0O_h9kR0e4uW5d2T5cKyPkp5sA8r5qrLJTM1ccHhEDqhXiLrf4O-8iFTjK0t_yujzTpYIoGyhPgdYp"/>
      <span className="text-xs font-medium text-text-muted">Bởi James K.</span>
      </div>
      <p className="font-bold text-lg text-primary">$85</p>
      </div>
      </div>
      </div>
      </div>
      {/* Card 6 */}
      <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
      <img alt="Raku firing workshop outdoor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Raku firing workshop outdoor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvSQSdK81izxFlaCHNL9SowBbjO_wkTOwJIwb6dMaKBJUvJfUxdWihg2GLpXMddSzm_BNGSOXYFRsHr0ZKqasxf2BPziWnhETrPi4aMgZiHIaNWLh5r5iFKbRplzCIZ9yH7i1YJMHlOMSoWyUVXZyW9-MWhPZE_wItzihotWX4fuzPLxujGCeb75AeyWS8L_AlHyGr3KwE5T9lqB5qjDA5gmG8HBMMyRI458VuW1Ay-cgRXAEMkRkZ0PCH3hsOtikeaENkB7SgkcY6"/>
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-main dark:text-white flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px] text-primary">star</span>
                                      5.0 (15)
                                  </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Trải nghiệm Nung Raku</h3>
      </div>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">Chứng kiến sự kỳ diệu của kỹ thuật nung Raku. Tự tráng men cho tác phẩm của bạn và xem nó biến đổi trong lửa.</p>
      <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">3.5 Giờ</span>
      <span>3.5 Hours</span>
      <span className="w-1 h-1 rounded-full bg-gray-300 mx-1">Sự kiện đặc biệt</span>
      <span>Special Event</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-main dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px] text-text-muted">3.5 Giờ</span>
      <span>Hoi An (Shuttle incl.)</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark font-bold text-xs border-2 border-white dark:border-surface-dark">Bởi Art Studio</div>
      <span className="text-xs font-medium text-text-muted">Bởi Art Studio</span>
      </div>
      <p className="font-bold text-lg text-primary">$70</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-2">
      <button className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary text-text-muted hover:text-primary transition-colors disabled:opacity-50">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="w-10 h-10 rounded-lg bg-primary text-text-main font-bold">1</button>
      <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary text-text-muted hover:text-primary transition-colors">2</button>
      <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary text-text-muted hover:text-primary transition-colors">3</button>
      <span className="text-text-muted">...</span>
      <button className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary text-text-muted hover:text-primary transition-colors">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </nav>
      </div>
      </div>
      </div>
      </main>
      {/* Footer Simple */}
      <footer className="bg-surface-light dark:bg-surface-dark border-t border-[#f0f4f4] dark:border-white/5 py-10 mt-12">
      <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3 text-text-main dark:text-white">
      <div className="size-6 text-primary">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      <span className="font-bold text-lg">Hands &amp; Hour</span>
      </div>
      <div className="text-text-muted text-sm">© 2024 Hands &amp; Hour. Được tạo ra với tình yêu tại Đà Nẵng.</div>
      <div className="flex gap-6">
      <a className="text-text-muted hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">dataset</span></a> {/* generic social icon replacement */}
      <a className="text-text-muted hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
      </div>
      </div>
      </footer>
      </div>
    </>
  );
}
