import { useNavigate, Link } from 'react-router-dom';
export default function HostScheduleManagement() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 sticky top-0 h-screen">
      <div className="p-6 flex items-center gap-3">
      <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
      <span className="material-symbols-outlined">back_hand</span>
      </div>
      <div>
      <h1 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">Hands &amp; Hour</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">Workshop Host</p>
      </div>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="font-medium">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">calendar_today</span>
      <span className="font-medium">Lịch trình</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">grade</span>
      <span className="font-medium">Đánh giá</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">account_balance_wallet</span>
      <span className="font-medium">Thu nhập</span>
      </Link>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 p-2">
      <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden" data-alt="Profile picture of workshop host" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1l94jSCyam1-4s9FReN-glbTMeROEysjmhZv4MKHUO7zq1bGhKnhaUbZrOmMw-RRTVzsozYHKYEn8XKSUWgg9KknbAYE4hVpm6f6wWpY7g-XdaJWYH8FHl08jDP2FNwa5KWcvuKbvsi0HDBAWU1kc5tmWHJ9Dcni3qlCkMKVC4sw7sJQsmt40pjjGqbJLSiagSLYfm79Q1bUgZr4ChaQ_zlV37XxFMMF73EDbgSYexiKEzlf4Xs0YsxT1PvQdTJT_FlU-xOHZvmgr"); background-size: cover;'></div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold truncate">Alex Rivera</p>
      <p className="text-xs text-slate-500 truncate">Người tổ chức Chuyên nghiệp</p>
      </div>
      </div>
      </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
      <h2 className="text-lg font-bold">Quản lý Lịch trình</h2>
      </div>
      <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
      <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm" placeholder="Tìm kiếm workshop..." type="text"/>
      </div>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">settings</span>
      </button>
      {/* Avatar Menu (Open State Simulation) */}
      <div className="relative">
      <button className="size-10 rounded-full bg-primary overflow-hidden border-2 border-primary" data-alt="User avatar menu toggle" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0gFS9towzx8cMNGR4zCCgHnuzx9l3nsHpcpmrnZenkdos6sWmwGZzsIhwSjH0Enh_u8pIVU7eYahHSo2p9bRwiWc78FFldSzkZcTcsA5Pf7dPURs2Jcc3rbu_a6KhutfaozqHRKgOdP9Ng0jbBd8U3iT5AXx2nuxMaS0xYcxMYVG6Y4oOiDqv-9I_Lkef-jr3vVp75EYwOgKr0yUE92wHcmtreb6knfw7mfch8RKegLlJMRCBGXg3Xl1rKXivJeHG4W5RyzUhpxRb"); background-size: cover;'></button>
      {/* Popover Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
      <Link className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" to="/home">
      <span className="material-symbols-outlined text-slate-500 text-xl">dashboard</span>
      <span className="text-sm font-medium">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" to="/home">
      <span className="material-symbols-outlined text-slate-500 text-xl">handyman</span>
      <span className="text-sm font-medium">Workshop của tôi</span>
      </Link>
      <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
      <Link className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-red-500" to="/home">
      <span className="material-symbols-outlined text-xl">logout</span>
      <span className="text-sm font-medium">Đăng xuất</span>
      </Link>
      </div>
      </div>
      </div>
      </header>
      {/* Page Content */}
      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
      <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Lịch Workshop</h3>
      <p className="text-slate-500 dark:text-slate-400">Quản lý các khung giờ sắp tới và tình trạng sẵn có của bạn</p>
      </div>
      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"><span className="material-symbols-outlined">add_circle</span> Thêm khung giờ mới</button>
      </div>
      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold whitespace-nowrap">Tất cả Workshop <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span></button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium whitespace-nowrap">
                          Pottery 101
                          <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium whitespace-nowrap">
                          Painting Session
                          <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium whitespace-nowrap">
                          Woodworking
                          <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
      </button>
      </div>
      {/* Calendar View Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
      {/* Calendar 1: Current Month */}
      <div className="p-6">
      <div className="flex items-center justify-between mb-6">
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <h4 className="font-bold text-lg">Tháng 10 năm 2023</h4>
      <div className="size-8"></div>
      </div>
      <div className="grid grid-cols-7 gap-px mb-2">
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">CN</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T2</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T3</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T4</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T5</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T6</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T7</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
      {/* Empty cells */}
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      {/* Days */}
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">1</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">2</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">3</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">4</button>
      {/* Selected / Active Days */}
      <button className="h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/30">5</button>
      <button className="h-10 flex items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-sm relative">
                                      6
                                      <span className="absolute bottom-1 size-1 bg-primary rounded-full"></span>
      </button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">7</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">8</button>
      <button className="h-10 flex items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-sm relative">
                                      9
                                      <span className="absolute bottom-1 size-1 bg-primary rounded-full"></span>
      </button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">10</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">11</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">12</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">13</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">14</button>
      <button className="h-10 flex items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-sm relative">
                                      15
                                      <span className="absolute bottom-1 size-1 bg-primary rounded-full"></span>
      </button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">16</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">17</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">18</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">19</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">20</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">21</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">22</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">23</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">24</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">25</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">26</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">27</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">28</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">29</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">30</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">31</button>
      </div>
      </div>
      {/* Calendar 2: Next Month */}
      <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20">
      <div className="flex items-center justify-between mb-6">
      <div className="size-8"></div>
      <h4 className="font-bold text-lg">Tháng 11 năm 2023</h4>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </div>
      <div className="grid grid-cols-7 gap-px mb-2">
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">CN</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T2</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T3</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T4</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T5</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T6</div>
      <div className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">T7</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">1</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">2</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">3</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">4</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">5</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">6</button>
      <button className="h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/30">7</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">8</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">9</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">10</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">11</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">12</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">13</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">14</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">15</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">16</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">17</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">18</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">19</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">20</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">21</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">22</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">23</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">24</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">25</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">26</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">27</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">28</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">29</button>
      <button className="h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">30</button>
      </div>
      </div>
      </div>
      {/* Day Slots Detail */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center justify-between mb-6">
      <h5 className="text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">event_available</span> Khung giờ ngày 5 tháng 10, 2023</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Slot Card */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark/30 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
      <div className="flex justify-between items-start mb-4">
      <div>
      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Buổi sáng</p>
      <p className="text-lg font-bold">Pottery 101</p>
      </div>
      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase">Đã hết chỗ</span>
      </div>
      <div className="space-y-3">
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
      <span className="material-symbols-outlined text-lg">schedule</span>
      <span className="text-sm font-medium">09:00 AM - 11:30 AM</span>
      </div>
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
      <span className="material-symbols-outlined text-lg">group</span>
      <span className="text-sm font-medium">12 Người tham gia</span>
      </div>
      </div>
      <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg text-xs font-bold">Chỉnh sửa</button>
      <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg text-xs font-bold text-red-500">Hủy bỏ</button>
      </div>
      </div>
      {/* Slot Card 2 */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 dark:bg-slate-700"></div>
      <div className="flex justify-between items-start mb-4">
      <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Buổi chiều</p>
      <p className="text-lg font-bold">Painting Session</p>
      </div>
      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase">Còn 4 chỗ</span>
      </div>
      <div className="space-y-3">
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
      <span className="material-symbols-outlined text-lg">schedule</span>
      <span className="text-sm font-medium">02:00 PM - 04:30 PM</span>
      </div>
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
      <span className="material-symbols-outlined text-lg">group</span>
      <span className="text-sm font-medium">12 Người tham gia</span>
      </div>
      </div>
      <div className="mt-6 flex gap-2">
      <button className="flex-1 bg-slate-50 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold">Chỉnh sửa</button>
      <button className="flex-1 bg-slate-50 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold text-red-500">Hủy bỏ</button>
      </div>
      </div>
      {/* Empty/Add Card */}
      <button className="p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group"><span className="material-symbols-outlined">add_circle</span> Thêm khung giờ mới</button>
      </div>
      </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
      <p className="text-primary font-bold text-sm uppercase tracking-widest mb-1">Bookings This Month</p>
      <p className="text-3xl font-black text-slate-900 dark:text-slate-100">142</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
      <span className="material-symbols-outlined text-sm">trending_up</span>
                              12% increase from last month
                          </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Next Payout</p>
      <p className="text-3xl font-black text-slate-900 dark:text-slate-100">$1,240.00</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
      <span className="material-symbols-outlined text-sm">calendar_month</span>
                              Scheduled for Oct 15
                          </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Active Workshops</p>
      <p className="text-3xl font-black text-slate-900 dark:text-slate-100">4</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
      <span className="material-symbols-outlined text-sm">stars</span>
                              Avg rating 4.9/5
                          </div>
      </div>
      </div>
      </div>
      </main>
      </div>
      </div>
    </>
  );
}
