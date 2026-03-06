import { useNavigate, Link } from 'react-router-dom';
export default function HostIncomeOverview() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full">
      <div className="p-6 flex items-center gap-3">
      <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
      <span className="material-symbols-outlined">back_hand</span>
      </div>
      <div>
      <h1 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">Hands &amp; Hour</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">Chủ xưởng</p>
      </div>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4"><Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="font-medium">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">calendar_today</span>
      <span className="font-medium">Lịch</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/home">
      <span className="material-symbols-outlined">grade</span>
      <span className="font-medium">Đánh giá</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">account_balance_wallet</span>
      <span className="font-medium">Thu nhập</span>
      </Link></nav>
      {/* Avatar Menu (Expanded/Active State Simulation) */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 p-2">
      <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden" data-alt="Profile picture of workshop host" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwB4tz0ieppXFnrIVev9IpSWGz-dGSCDN1AYoJKvKxNJoN0z1y0m278AA465wXZAsPBGWk-vwe4xFsBvXxnGMcsYt1hGoandOA0HxSoCsE989bhNiHT_dEXERtCTtEmWnHU_hMKamqRlT8z_nXat__RHmgcp--D2p7a4FdPA7Fe79GKwN11ALE0qM0pTpVEY4mTCAcEZw1OYzYbvzDu0KziFP7GR8GyEAJpjKLghoiRcKsMXuti2VaOrpLJh6FfStocb660SMiTl93"); background-size: cover;'></div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold truncate">Marcus Miller</p>
      <p className="text-xs text-slate-500 truncate">Chủ xưởng chuyên nghiệp</p>
      </div>
      </div>
      </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-72">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4"><div className="relative hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
      <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm" placeholder="Tìm kiếm thu nhập..." type="text"/>
      </div>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 mr-2"><span className="material-symbols-outlined text-[20px]">download</span> Xuất dữ liệu</button>
      <div className="relative">
      <button className="size-10 rounded-full bg-primary overflow-hidden border-2 border-primary" data-alt="User avatar menu toggle" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwB4tz0ieppXFnrIVev9IpSWGz-dGSCDN1AYoJKvKxNJoN0z1y0m278AA465wXZAsPBGWk-vwe4xFsBvXxnGMcsYt1hGoandOA0HxSoCsE989bhNiHT_dEXERtCTtEmWnHU_hMKamqRlT8z_nXat__RHmgcp--D2p7a4FdPA7Fe79GKwN11ALE0qM0pTpVEY4mTCAcEZw1OYzYbvzDu0KziFP7GR8GyEAJpjKLghoiRcKsMXuti2VaOrpLJh6FfStocb660SMiTl93"); background-size: cover;'><span className="material-symbols-outlined text-[20px]">download</span> Xuất dữ liệu</button>
      </div></div>
      <div className="flex items-center gap-4"><div className="relative hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
      <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm" placeholder="Tìm kiếm thu nhập..." type="text"/>
      </div>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 mr-2"><span className="material-symbols-outlined text-[20px]">download</span> Xuất dữ liệu</button>
      <div className="relative">
      <button className="size-10 rounded-full bg-primary overflow-hidden border-2 border-primary" data-alt="User avatar menu toggle" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwB4tz0ieppXFnrIVev9IpSWGz-dGSCDN1AYoJKvKxNJoN0z1y0m278AA465wXZAsPBGWk-vwe4xFsBvXxnGMcsYt1hGoandOA0HxSoCsE989bhNiHT_dEXERtCTtEmWnHU_hMKamqRlT8z_nXat__RHmgcp--D2p7a4FdPA7Fe79GKwN11ALE0qM0pTpVEY4mTCAcEZw1OYzYbvzDu0KziFP7GR8GyEAJpjKLghoiRcKsMXuti2VaOrpLJh6FfStocb660SMiTl93"); background-size: cover;'><span className="material-symbols-outlined text-[20px]">download</span> Xuất dữ liệu</button>
      </div></div>
      </header>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tổng quan thu nhập</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-1">Quản lý doanh thu xưởng và các khoản thanh toán gần đây của bạn</p>
      </div>
      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"><span className="material-symbols-outlined">account_balance_wallet</span> Rút tiền</button>
      </div>
      {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
      <span className="text-slate-500 dark:text-slate-400 font-medium">Total Revenue</span>
      <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg">
      <span className="material-symbols-outlined">trending_up</span>
      </div>
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white">$12,450.00</p>
      <p className="text-emerald-600 text-sm font-semibold mt-2 flex items-center gap-1">
                                  +12.5% <span className="text-slate-400 font-normal">vs last month</span>
      </p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
      <span className="text-slate-500 dark:text-slate-400 font-medium">Đang chờ</span>
      <div className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-lg">
      <span className="material-symbols-outlined">schedule</span>
      </div>
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white">$850.00</p>
      <p className="text-amber-600 text-sm font-semibold mt-2 flex items-center gap-1">
                                  +2.1% <span className="text-slate-400 font-normal">from pending bookings</span>
      </p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
      <span className="text-slate-500 dark:text-slate-400 font-medium">Available Balance</span>
      <div className="p-2 bg-primary/10 text-primary rounded-lg">
      <span className="material-symbols-outlined">account_balance</span>
      </div>
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white">$3,200.00</p>
      <p className="text-primary text-sm font-semibold mt-2 flex items-center gap-1">
                                  Ready for withdrawal
                              </p>
      </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-8">
      <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Doanh thu hàng tháng</h3>
      <p className="text-slate-500 text-sm">Performance for the last 6 months</p>
      </div>
      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg">
      <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 shadow-sm rounded-md">6 Tháng</button>
      <button className="px-3 py-1 text-xs font-medium text-slate-500">12 Tháng</button>
      </div>
      </div>
      <div className="h-[240px] flex items-end justify-between gap-4 px-4">
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all" style="height: 40%">
      <div className="absolute inset-0 bg-primary opacity-20 rounded-t-lg group-hover:opacity-40 transition-opacity"></div>
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $2.4k </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jan</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all" style="height: 65%">
      <div className="absolute inset-0 bg-primary opacity-40 rounded-t-lg group-hover:opacity-60 transition-opacity"></div>
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $4.1k </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Feb</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all" style="height: 45%">
      <div className="absolute inset-0 bg-primary opacity-30 rounded-t-lg group-hover:opacity-50 transition-opacity"></div>
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $2.8k </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mar</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all" style="height: 80%">
      <div className="absolute inset-0 bg-primary opacity-60 rounded-t-lg group-hover:opacity-80 transition-opacity"></div>
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $5.2k </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Apr</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all" style="height: 55%">
      <div className="absolute inset-0 bg-primary opacity-45 rounded-t-lg group-hover:opacity-65 transition-opacity"></div>
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $3.6k </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">May</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full bg-primary rounded-t-lg relative group transition-all" style="height: 100%">
      <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"> $6.8k </div>
      </div>
      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Jun</span>
      </div>
      </div>
      </div>
      {/* Workshop Distribution */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Doanh thu theo xưởng</h3>
      <div className="flex-1 space-y-6">
      <div>
      <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Cơ bản về Gốm</span>
      <span className="text-sm font-bold">$5,400</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style="width: 65%"></div>
      </div>
      </div>
      <div>
      <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tráng men Nâng cao</span>
      <span className="text-sm font-bold">$3,100</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary opacity-70 rounded-full" style="width: 40%"></div>
      </div>
      </div>
      <div>
      <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Kỹ thuật Bàn xoay 101</span>
      <span className="text-sm font-bold">$2,800</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary opacity-40 rounded-full" style="width: 35%"></div>
      </div>
      </div>
      <div>
      <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Buổi học Riêng</span>
      <span className="text-sm font-bold">$1,150</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary opacity-20 rounded-full" style="width: 15%"></div>
      </div>
      </div>
      </div>
      <button className="w-full mt-6 py-2 text-primary font-bold text-sm border-t border-slate-100 dark:border-slate-800 pt-4">Xem tất cả các lớp</button>
      </div>
      </div>
      {/* Transaction History */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Giao dịch gần đây</h3>
      <div className="flex items-center gap-3">
      <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
      <input className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 w-64" placeholder="Tìm kiếm đơn hàng..." type="text"/>
      </div>
      <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
      <span className="material-symbols-outlined text-[20px]">filter_list</span>
      </button>
      </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-left">
      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
      <tr>
      <th className="px-8 py-4">Mã giao dịch</th>
      <th className="px-8 py-4">Xưởng</th>
      <th className="px-8 py-4">Ngày</th>
      <th className="px-8 py-4">Trạng thái</th>
      <th className="px-8 py-4 text-right">Số tiền</th>
      </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-8 py-4 font-mono text-xs text-slate-500">#TRX-9482-L</td>
      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">Cơ bản về Gốm: Buổi sáng</td>
      <td className="px-8 py-4 text-sm text-slate-500">Oct 24, 2023</td>
      <td className="px-8 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Hoàn thành</span>
      </td>
      <td className="px-8 py-4 text-right font-bold text-slate-900 dark:text-white">$120.00</td>
      </tr>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-8 py-4 font-mono text-xs text-slate-500">#TRX-9479-K</td>
      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">Xưởng Tráng men Nâng cao</td>
      <td className="px-8 py-4 text-sm text-slate-500">Oct 23, 2023</td>
      <td className="px-8 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Đang chờ</span>
      </td>
      <td className="px-8 py-4 text-right font-bold text-slate-900 dark:text-white">$350.00</td>
      </tr>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-8 py-4 font-mono text-xs text-slate-500">#TRX-9475-P</td>
      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">Wheel Throwing 101</td>
      <td className="px-8 py-4 text-sm text-slate-500">Oct 22, 2023</td>
      <td className="px-8 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Hoàn thành</span>
      </td>
      <td className="px-8 py-4 text-right font-bold text-slate-900 dark:text-white">$120.00</td>
      </tr>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-8 py-4 font-mono text-xs text-slate-500">#TRX-9471-M</td>
      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">Buổi học Riêng cho Cặp đôi</td>
      <td className="px-8 py-4 text-sm text-slate-500">Oct 21, 2023</td>
      <td className="px-8 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Hoàn thành</span>
      </td>
      <td className="px-8 py-4 text-right font-bold text-slate-900 dark:text-white">$240.00</td>
      </tr>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-8 py-4 font-mono text-xs text-slate-500">#TRX-9468-S</td>
      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">Cơ bản về Gốm: Buổi sáng</td>
      <td className="px-8 py-4 text-sm text-slate-500">Oct 21, 2023</td>
      <td className="px-8 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Đã hoàn tiền</span>
      </td>
      <td className="px-8 py-4 text-right font-bold text-slate-900 dark:text-white">-$120.00</td>
      </tr>
      </tbody>
      </table>
      </div>
      <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
      <p className="text-sm text-slate-500">Hiển thị 5 trong số 142 giao dịch</p>
      <div className="flex items-center gap-2">
      <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md shadow-sm">Trước</button>
      <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md shadow-sm">Sau</button>
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
