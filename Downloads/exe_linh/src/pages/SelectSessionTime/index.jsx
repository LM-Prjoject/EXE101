import { useNavigate, Link } from 'react-router-dom';
export default function SelectSessionTime() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-text-main antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
      <div className="flex items-center gap-10">
      <Link className="flex items-center gap-3 group" to="/home">
      <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-text-main shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
      <span className="material-symbols-outlined !text-3xl">brush</span>
      </div>
      <h2 className="text-text-main dark:text-white text-xl font-bold tracking-tight">Hands &amp; Hour</h2>
      </Link>
      <div className="hidden lg:flex relative w-80">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
      <span className="material-symbols-outlined">search</span>
      </div>
      <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-background-light dark:bg-background-dark/50 text-text-main dark:text-gray-200 placeholder-text-secondary focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium" placeholder="Tìm kiếm workshop, giảng viên..." type="text"/>
      </div>
      </div>
      <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-8">
      <Link className="text-sm font-semibold text-text-main dark:text-gray-200 hover:text-primary transition-colors" to="/login">Workshop</Link>
      <Link className="text-sm font-semibold text-text-main dark:text-gray-200 hover:text-primary transition-colors" to="/register">Giảng viên</Link>
      <a className="text-sm font-semibold text-text-main dark:text-gray-200 hover:text-primary transition-colors" href="#">Blog</a>
      </nav>
      <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-800">
      <Link to="/login" className={"text-sm font-semibold text-text-main dark:text-gray-200 hover:text-primary transition-colors" }>Đăng nhập</Link>
      <Link to="/register" className="bg-primary hover:bg-primary-dark text-text-main font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-primary/20">Đăng ký</Link>
      </div>
      </div>
      </div>
      </header>
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-8">
      <a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
      <span className="material-symbols-outlined !text-sm">chevron_right</span>
      <a className="hover:text-primary transition-colors" href="#">Workshop Gốm</a>
      <span className="material-symbols-outlined !text-sm">chevron_right</span>
      <span className="text-text-main dark:text-white">Đặt chỗ</span>
      </nav>
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
      {/* Main Content: Date & Slot Selection */}
      <div className="flex-1 flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
      <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight">Chọn Ngày &amp; Giờ</h1>
      <p className="text-text-secondary text-lg">Chọn một khung giờ thuận tiện cho buổi trải nghiệm gốm sáng tạo của bạn.</p>
      </div>
      {/* Calendar Section */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-text-main dark:text-white">Tháng 10, 2023</h3>
      <div className="flex gap-2">
      <button className="size-9 rounded-full bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="size-9 rounded-full bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </div>
      </div>
      {/* Days Header */}
      <div className="grid grid-cols-7 mb-4 text-center">
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">CN</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T2</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T3</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T4</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T5</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T6</span>
      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">T7</span>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-4 text-center">
      {/* Empty Previous Month Days */}
      <span></span><span></span><span></span>
      {/* Days */}
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-not-allowed opacity-50">1</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-not-allowed opacity-50">2</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-not-allowed opacity-50">3</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">4</button>
      {/* Selected Day */}
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold bg-primary text-text-main shadow-lg shadow-primary/30 transform scale-110">5</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">6</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">7</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">8</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">9</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">10</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">11</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">12</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">13</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">14</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">15</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">16</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">17</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">18</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">19</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">20</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">21</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">22</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">23</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">24</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">25</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">26</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">27</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">28</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">29</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">30</button>
      <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-text-main dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">31</button>
      </div>
      </div>
      {/* Available Slots */}
      <div>
      <h2 className="text-xl font-bold text-text-main dark:text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">schedule</span> Lịch trống ngày 5 tháng 10</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Morning Slot (Disabled/Full) */}
      <div className="relative group cursor-not-allowed opacity-60">
      <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 transition duration-200"></div>
      <div className="relative bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-5 h-full">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-500">
      <span className="material-symbols-outlined">wb_sunny</span>
      </div>
      <span className="px-2 py-1 rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold uppercase tracking-wide">Hết chỗ</span>
      </div>
      <h3 className="text-lg font-bold text-gray-500 mb-1">Sáng</h3>
      <p className="text-sm font-medium text-gray-400 mb-4">09:00 - 12:00</p>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-2">
      <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
      </div>
      <p className="text-xs text-gray-400">0 chỗ còn trống</p>
      </div>
      </div>
      {/* Afternoon Slot (Selected) */}
      <div className="relative group cursor-pointer">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
      <div className="relative bg-surface-light dark:bg-surface-dark border-2 border-primary rounded-2xl p-5 h-full shadow-xl shadow-primary/10">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-primary/20 text-text-main p-2 rounded-lg">
      <span className="material-symbols-outlined">light_mode</span>
      </div>
      <span className="size-6 rounded-full bg-primary text-text-main flex items-center justify-center">
      <span className="material-symbols-outlined text-sm font-bold">check</span>
      </span>
      </div>
      <h3 className="text-lg font-bold text-text-main dark:text-white mb-1">Chiều</h3>
      <p className="text-sm font-medium text-text-secondary mb-4">14:00 - 17:00</p>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-2">
      <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
      </div>
      <p className="text-xs text-text-secondary font-medium">4 chỗ còn trống</p>
      </div>
      </div>
      {/* Evening Slot */}
      <div className="relative group cursor-pointer">
      <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-primary/50 rounded-2xl p-5 h-full transition-colors">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-gray-100 dark:bg-gray-800 text-text-secondary p-2 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      <span className="material-symbols-outlined">bedtime</span>
      </div>
      <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide">Sắp hết chỗ</span>
      </div>
      <h3 className="text-lg font-bold text-text-main dark:text-white mb-1">Tối</h3>
      <p className="text-sm font-medium text-text-secondary mb-4">18:00 - 21:00</p>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-2">
      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
      </div>
      <p className="text-xs text-text-secondary font-medium">8 chỗ còn trống</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Sidebar: Summary */}
      <div className="w-full lg:w-96 flex-shrink-0">
      <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-bold text-text-main dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Tóm tắt đặt chỗ</h3>
      {/* Workshop Item */}
      <div className="flex gap-4 mb-6">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
      <img alt="Person shaping clay on a pottery wheel" className="w-full h-full object-cover" data-alt="Close up of hands working on pottery wheel with clay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-0Bmoyr81G0ZPQblUanvlMjYF3yfpdPG0D-QeeESm4OIIiS7F4vfKx2u65KAgWtp8WMfP3ZYlCjcWvI5j8auZba2hRJSu00B4VJCFABlt0AN9ImUqsCOcl03oVNCjTL8bQjfqk7ctnam0kTFvnxPyHwCB3hlqZz5x3WIn3fFX-SvNDGaFdCpiIfbI_nlKJAWRp0Ci05sVj31N4LBnFqrHRc7wLIJmLYVtxyUxuaiICL57xGDvpsvdXGHppPAsspMxYNVLLEtfdNP"/>
      </div>
      <div>
      <h4 className="font-bold text-text-main dark:text-white leading-tight mb-1">Nhập môn Bàn xoay Gốm</h4>
      <p className="text-sm text-text-secondary mb-1">với Nghệ nhân Lan</p>
      <div className="flex items-center text-xs text-text-secondary gap-1">
      <span className="material-symbols-outlined !text-sm">location_on</span>
                                      Da Nang, Vietnam
                                  </div>
      </div>
      </div>
      {/* Details List */}
      <div className="space-y-4 mb-8">
      <div className="flex items-start gap-3">
      <div className="bg-background-light dark:bg-background-dark p-2 rounded-lg text-text-main">
      <span className="material-symbols-outlined !text-lg">calendar_today</span>
      </div>
      <div>
      <p className="text-xs text-text-secondary uppercase font-bold tracking-wide">Ngày</p>
      <p className="text-sm font-medium text-text-main dark:text-white">Thứ 5, 5 thg 10, 2023</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="bg-background-light dark:bg-background-dark p-2 rounded-lg text-text-main">
      <span className="material-symbols-outlined !text-lg">schedule</span>
      </div>
      <div>
      <p className="text-xs text-text-secondary uppercase font-bold tracking-wide">Thời gian</p>
      <p className="text-sm font-medium text-text-main dark:text-white">14:00 - 17:00 (Chiều)</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="bg-background-light dark:bg-background-dark p-2 rounded-lg text-text-main">
      <span className="material-symbols-outlined !text-lg">group</span>
      </div>
      <div>
      <p className="text-xs text-text-secondary uppercase font-bold tracking-wide">Khách</p>
      <div className="flex items-center gap-3 mt-1">
      <button className="size-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-text-main transition-colors">
      <span className="material-symbols-outlined !text-sm">remove</span>
      </button>
      <span className="text-sm font-bold text-text-main dark:text-white">1</span>
      <button className="size-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-text-main transition-colors">
      <span className="material-symbols-outlined !text-sm">add</span>
      </button>
      </div>
      </div>
      </div>
      </div>
      {/* Pricing */}
      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 mb-6">
      <div className="flex justify-between items-center mb-2">
      <span className="text-text-secondary text-sm">Phí workshop</span>
      <span className="text-text-main dark:text-white font-medium">500.000₫</span>
      </div>
      <div className="flex justify-between items-center mb-2">
      <span className="text-text-secondary text-sm">Phí dịch vụ</span>
      <span className="text-text-main dark:text-white font-medium">25.000₫</span>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <span className="text-text-main dark:text-white font-bold text-lg">Tổng cộng</span>
      <span className="text-2xl font-black text-primary-dark dark:text-primary">525.000₫</span>
      </div>
      </div>
      <button className="w-full bg-primary hover:bg-primary-dark text-text-main text-base font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/25 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
      <span>Tiến hành thanh toán</span>
      <span className="material-symbols-outlined !text-xl">arrow_forward</span>
      </button>
      <p className="text-xs text-center text-text-secondary mt-4">Hủy miễn phí trước 24 giờ khi bắt đầu.</p>
      </div>
      </div>
      </div>
      </main>
      {/* Footer Simple */}
      <footer className="mt-auto border-t border-gray-100 dark:border-gray-800 py-8 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-[1280px] mx-auto px-6 text-center text-text-secondary text-sm">
      <p>© 2023 Hands &amp; Hour. Được tạo ra với tất cả tình yêu tại Đà Nẵng.</p>
      </div>
      </footer>
      </div>
    </>
  );
}
