import { useNavigate, Link } from 'react-router-dom';
export default function HostMyWorkshops() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex h-screen">
      {/* Sidebar */}
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 relative px-6"><div className="flex items-center gap-3 mr-8">
      <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
      <span className="material-symbols-outlined">draw</span>
      </div>
      <div>
      <h1 className="text-lg font-bold leading-tight">Hands &amp; Hour</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">Tài khoản Người tổ chức</p>
      </div>
      </div>
      <div className="flex items-center gap-4">
      <h2 className="text-xl font-bold">Xưởng của tôi</h2>
      </div>
      <div className="flex items-center gap-4">
      <div className="relative w-64">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
      <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50" placeholder="Tìm kiếm xưởng..." type="text"/>
      </div>
      <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
      <span className="material-symbols-outlined">notifications</span>
      <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
      </button>
      {/* Avatar Menu (Simulated Clicked State Overlay) */}
      <div className="relative">
      <button className="size-10 rounded-full overflow-hidden border-2 border-primary ring-2 ring-primary/20">
      <img alt="User Avatar" className="w-full h-full object-cover" data-alt="Close up of a smiling artisan workshop owner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1uQVuNYWmUtaHwOCiw8twtNwMEhPO2KqzieFPVMROKhwH_n3Kv-2GCEvxcgEisn5kykdQt8EsXEcc3vhB8IbDPetSjdAEUqkxAznHNcGX13fCgjCsVcvNo-P2u9l6Rw-a7z-B8BTw3-HQak9KWVKOEysFsRZ9abi6MzQvFUsuBVe3P8T8bCD7NQAMnF81iRUJuEGljppJj2V-ut_H2iBgDHDPpYb_qALsQMWSas5oi6CgfFzh-OwKYgzIB6IakISK3JfYu3fJlnW"/>
      </button>
      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
      <Link className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700" to="/home"><span className="material-symbols-outlined text-lg">dashboard</span> Bảng điều khiển</Link>
      <Link className="flex items-center gap-3 px-4 py-2 text-sm text-primary bg-primary/5 font-medium" to="/home"><span className="material-symbols-outlined text-lg">event_note</span> Xưởng của tôi</Link>
      <hr className="my-1 border-slate-100 dark:border-slate-700"/>
      <Link className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" to="/home"><span className="material-symbols-outlined text-lg">logout</span> Đăng xuất</Link>
      </div>
      </div>
      </div>
      </header>
      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 gap-8">
      <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">Đang hoạt động (8)</button>
      <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Bản nháp (3)</button>
      <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Đã hoàn thành</button>
      <div className="ml-auto pb-4">
      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-primary/20"><span className="material-symbols-outlined">add</span> Tạo xưởng mới</button>
      </div>
      </div>
      {/* Grid of Workshops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Workshop Card 1 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
      <img alt="Pottery Workshop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Clay pottery wheel in a sunlit studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3n9uA7g_zLaxLURGu8SNWodG_fQxCIH6MM_4lyl48Qk-vuZksetI-OhgOnegnavTBcyMwCwHvw3GeD6UPFstxpWStoqOVUPGvWybobW5QXnP-K_c28GRVFf9hrWqlsLaVTW2L3PRjcH1HL8tHq0siwG9SUGhOqPgslhs_0pTWlZqNLBG2UsOkzOjM9CpPEkEq8srRtxw8R_1knOQzXeWyoaemFBNPk5_nFqpZDqCKHoN5YPkEwLqwQDTav3LbnjnpeEuZQfjB5paI"/>
      <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Đã xác nhận</div>
      </div>
      <div className="p-5 space-y-3">
      <div>
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Gốm bàn xoay: Cơ bản &amp; Nâng cao</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tiếp theo: ngày mai, 10:00 SA</p>
      </div>
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
      <span className="material-symbols-outlined text-lg">group</span>
      <span>12 / 15 đã tham gia</span>
      </div>
      <span className="font-bold text-primary">$65</span>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <span className="text-xs font-medium text-primary flex items-center gap-1">Quản lý người tham gia <span className="material-symbols-outlined text-sm">chevron_right</span></span>
      </div>
      </div>
      </div>
      {/* Workshop Card 2 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
      <img alt="Woodworking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close up of wood carving tools on a bench" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApWRGHppt3d26ge1nEJ6Qo9_tA6LTuMzGP0RH8RCwMdGXS9FdaK4kyPQhGhAKCIGja2da4Bju8ZRGn-4goDqzKkm4_oskF0q70Synzi5To18dHZQArvyIUCo9GmBnc42KaxmJ7Jsq75_fOhPTCqq6RAafU5WNWgAvxkMZe6XjGXKjA178UZNuy6-dRFKzVKyJVlqW6Hp0YZTG6aRdVwlp3pBhmlJshVupo_kH3GAwqezkQxO5bmNpu1MxAQUgWCk7onubZxeCCgFbC"/>
      <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">Đang hoạt động</div>
      </div>
      <div className="p-5 space-y-3">
      <div>
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Mộc nâng cao: Kỹ thuật ghép mộng</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bắt đầu: 12 Th10, 2:00 CH</p>
      </div>
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
      <span className="material-symbols-outlined text-lg">group</span>
      <span>8 / 10 đã tham gia</span>
      </div>
      <span className="font-bold text-primary">$120</span>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <span className="text-xs font-medium text-primary flex items-center gap-1">Quản lý người tham gia <span className="material-symbols-outlined text-sm">chevron_right</span></span>
      </div>
      </div>
      </div>
      {/* Workshop Card 3 (Draft) */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer opacity-90 border-dashed">
      <div className="aspect-video relative overflow-hidden grayscale">
      <img alt="Bread Making" className="w-full h-full object-cover" data-alt="Freshly baked sourdough bread on a cooling rack" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbrrtuiFUgADash9urhdXn2D7breK0VFQzgQAGTRACypSAjtbEFfcZtkQ5kBcNU2kDhm5eBy6bAeroykT3IVn6emLSxJXpj6_yienwXl9tzvwevIJGl2q4fVhT7qBFwn2IYKgUNa8ff5Y4h5YNFKHOajHNJQVLvEiFTlbHxbqooVukcy8e2E76LRp63p7iuwVit3uq6fpkkgP2ba1cXgEssbrJ5NHbVsuKUF3AdUjJk4tRBQLIcTx5F_Ez0723ek8DTirmI-0QOIQc"/>
      <div className="absolute top-3 left-3 px-2 py-1 bg-slate-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Bản nháp</div>
      </div>
      <div className="p-5 space-y-3">
      <div>
      <h3 className="font-bold text-lg leading-tight text-slate-400">Lớp học làm bánh mì Sourdough</h3>
      <p className="text-xs text-slate-400 mt-1 italic">Bản nháp đã lưu 2 giờ trước</p>
      </div>
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-slate-400">Tiếp tục chỉnh sửa <span className="material-symbols-outlined text-sm">edit</span></div>
      <span className="font-bold text-slate-300">TBD</span>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">Tiếp tục chỉnh sửa <span className="material-symbols-outlined text-sm">edit</span></span>
      </div>
      </div>
      </div>
      {/* Workshop Card 4 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
      <img alt="Macrame" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Boho style macrame wall hanging in progress" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiX490jwheslWG2EA7J8H0NIwCcvdqtq8ttAW3J_P4Sh70CsDHYwOp8BvvGr_lZvhMXhwSfa_1LOUIDfjKMq9LIcbW4NbG9JjT_AoL3RQx_RigDd7d_jvVSLBnYSuUVjSOv16Okg408sWznQdZRrqzGMIJ_jIMw4eMCnojRW4xiQWbe-hR_UOnINucUTp4qumOt00QIvGiZuDm3udkLa__hiExC_KkcTpre0aVrGbU5Ns_1a0kf4CQ4qfzRs3YZyIB-6ugjZJ_UacS"/>
      <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">Đang hoạt động</div>
      </div>
      <div className="p-5 space-y-3">
      <div>
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Cơ bản về thắt dây Macrame treo tường</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bắt đầu: 15 Th10, 6:00 CH</p>
      </div>
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
      <span className="material-symbols-outlined text-lg">group</span>
      <span>5 / 8 đã tham gia</span>
      </div>
      <span className="font-bold text-primary">$45</span>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <span className="text-xs font-medium text-primary flex items-center gap-1">Quản lý người tham gia <span className="material-symbols-outlined text-sm">chevron_right</span></span>
      </div>
      </div>
      </div>
      {/* Workshop Card 5 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
      <img alt="Painting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Oil paints on a colorful artist palette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPhv_ouk2iDpLS4nBiwX0tRMte9JaP5h0EYX0glITxE1pIWlQvMTI1wIRw3SigBogKiJqda4wTRV48O1a6jvZTHWnfY4D6sYFrIXAYmWni_yb5Z4YCqZsjeP_EH16iAobTObwb8J2ssvtChX-dDr_CJfjiq6fEWF4wXen2_GqyNzwcsO2Z5Pv5hj03-du9dupMaZmFi_sM7RsZDWp61kbwlpNqleF2NRHO_guQgsmzWBNfccYC25HCgWFbJzTjwtadHsJ9ZSxjDtQ2"/>
      <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Đã xác nhận</div>
      </div>
      <div className="p-5 space-y-3">
      <div>
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Vẽ tranh phong cảnh Ấn tượng</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bắt đầu: 18 Th10, 11:00 SA</p>
      </div>
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
      <span className="material-symbols-outlined text-lg">group</span>
      <span>10 / 10 đã tham gia</span>
      </div>
      <span className="font-bold text-primary">$80</span>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <span className="text-xs font-medium text-primary flex items-center gap-1">Quản lý người tham gia <span className="material-symbols-outlined text-sm">chevron_right</span></span>
      </div>
      </div>
      </div>
      {/* Add New Workshop (Ghost Card) */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 space-y-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
      <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
      <span className="material-symbols-outlined">add</span>
      </div>
      <div className="text-center">
      <p className="font-bold text-slate-500 dark:text-slate-400">Thêm xưởng mới</p>
      <p className="text-xs text-slate-400">Tạo danh sách mới cho người hâm mộ của bạn</p>
      </div>
      </div>
      </div>
      </main>
      </div>
      </div>
      </div>
    </>
  );
}
