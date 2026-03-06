import { useNavigate, Link } from 'react-router-dom';
export default function HostManageParticipants() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-slate-500">
      <span className="text-sm font-medium">Khóa học của tôi</span>
      <span className="material-symbols-outlined text-sm">chevron_right</span>
      <span className="text-sm font-bold text-slate-900 dark:text-white">Gốm cho người mới bắt đầu</span>
      </div>
      <div className="flex items-center gap-4">
      <div className="relative group hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary" placeholder="Tìm kiếm người tham gia..." type="text"/>
      </div>
      <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity"><img alt="Host profile" className="w-full h-full object-cover" src="https://placeholder.pics/svg/300"/></div>
      </div>
      </header>
      <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Title and Summary */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Gốm cho người mới bắt đầu</h2>
      <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-1">
      <span className="material-symbols-outlined text-sm">calendar_today</span>
      <span className="text-sm">Oct 24, 2023</span>
      </div>
      <div className="flex items-center gap-1">
      <span className="material-symbols-outlined text-sm">schedule</span>
      <span className="text-sm">2:00 PM - 5:00 PM</span>
      </div>
      <div className="flex items-center gap-1">
      <span className="material-symbols-outlined text-sm">location_on</span>
      <span className="text-sm">The Creative Hub, NY</span>
      </div>
      </div>
      </div>
      <div className="flex gap-2">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined text-lg">download</span> Xuất CSV</button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined text-lg">mail</span> Gửi email cho tất cả</button>
      </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-500 mb-1">Tổng số đăng ký</p>
      <div className="flex items-end gap-2">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">18</h3>
      <span className="text-xs text-green-500 font-bold mb-1">+2 hôm nay</span>
      </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-500 mb-1">Số lượng vé</p>
      <div className="flex items-end gap-2">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">18/20</h3>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
      <div className="bg-primary h-full w-[90%]"></div>
      </div>
      </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-500 mb-1">Danh sách chờ</p>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">5</h3>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-500 mb-1">Doanh thu</p>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">$810.00</h3>
      </div>
      </div>
      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-800 flex gap-8">
      <button className="pb-4 border-b-2 border-primary text-primary text-sm font-bold">Tất cả người tham gia (18)</button>
      <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold">Đã xác nhận (15)</button>
      <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold">Đang chờ (3)</button>
      <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold">Danh sách chờ (5)</button>
      </div>
      {/* Participants Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full text-left">
      <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
      <tr>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Người tham gia</th>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại vé</th>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đặt</th>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Liên hệ</th>
      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hành động</th>
      </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {/* Row 1 */}
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">SJ</div>
      <div>
      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Sarah Jenkins</p>
      <p className="text-xs text-slate-500 mt-1">Lần đầu tham gia</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="text-sm font-medium">Vé Thường</span>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Đã xác nhận</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">Oct 12, 2023</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">mail</span> Gửi email cho tất cả</button>
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-base">call</span>
      </button>
      </div>
      </td>
      <td className="px-6 py-4"><div className="flex items-center gap-3"><button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-all border border-primary/20">Check-in</button><button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button></div></td>
      </tr>
      {/* Row 2 */}
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">MC</div>
      <div>
      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Michael Chen</p>
      <p className="text-xs text-slate-500 mt-1">Khách hàng thân thiết</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="text-sm font-medium">Vé Thường</span>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Đã xác nhận</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">Oct 14, 2023</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">mail</span> Gửi email cho tất cả</button>
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-base">call</span>
      </button>
      </div>
      </td>
      <td className="px-6 py-4"><div className="flex items-center gap-3"><button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-all border border-primary/20">Check-in</button><button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button></div></td>
      </tr>
      {/* Row 3 */}
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-bold">DW</div>
      <div>
      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">David Wilson</p>
      <p className="text-xs text-slate-500 mt-1">Học sinh/Sinh viên</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="text-sm font-medium">Vé Sớm</span>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Chờ thanh toán</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">Oct 15, 2023</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">mail</span> Gửi email cho tất cả</button>
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-base">call</span>
      </button>
      </div>
      </td>
      <td className="px-6 py-4"><div className="flex items-center gap-3"><button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-all border border-primary/20">Check-in</button><button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button></div></td>
      </tr>
      {/* Row 4 */}
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 font-bold">EM</div>
      <div>
      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Emily Miller</p>
      <p className="text-xs text-slate-500 mt-1">Lần đầu tham gia</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="text-sm font-medium">Vé Thường</span>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Đã xác nhận</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">Oct 16, 2023</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">mail</span> Gửi email cho tất cả</button>
      <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-base">call</span>
      </button>
      </div>
      </td>
      <td className="px-6 py-4"><div className="flex items-center gap-3"><button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-all border border-primary/20">Check-in</button><button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button></div></td>
      </tr>
      </tbody>
      </table>
      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
      <p className="text-sm text-slate-500">Hiển thị 1 đến 4 trên tổng số 18 kết quả</p>
      <div className="flex gap-2">
      <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled="">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm font-bold">1</button>
      <button className="px-3 py-1 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">2</button>
      <button className="px-3 py-1 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">3</button>
      <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
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
