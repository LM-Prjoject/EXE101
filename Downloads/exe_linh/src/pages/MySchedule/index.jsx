import { useNavigate, Link } from 'react-router-dom';
export default function MySchedule() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4">
      <div className="size-8 text-primary">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6_330)">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </g>
      <defs><clippath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clippath></defs>
      </svg>
      </div>
      <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Hands &amp; Hour</h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
      <div className="hidden md:flex gap-2">
      <button className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
      <span className="material-symbols-outlined text-[20px]">notifications</span>
      </button>
      <button className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
      <span className="material-symbols-outlined text-[20px]">person</span>
      </button>
      </div>
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" data-alt="User profile picture of a young professional" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtjLTI1_kMhchllvJ4qvNKAwWPm-8MvE25kdc7tHUv4zthJ3dLUjvE-wG7OJhcs0NZ_r1f5X1PC5I0eY7JGj8moZV-CKzIRQLICNdqVS5uoW0LH5plOq2ORn-8cTTK6zmIsZ0hiLZyGVlBhxQe_SVLTTf_K8Hmw5yYWYypOFp9RViS_LSAWBaMbk0zFuk9erL6Ce5OHrbHp1Whmp5v6j_lOpCKmwk1KWMJLuq49MNpvRsN87TiKWpK4iVaaNeKiJ187oo_nRH6dhV4")` }}></div>
      </div>
      </header>
      <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-10 py-8">
      {/* Page Header */}
      <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Lịch của tôi</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Quản lý hành trình sáng tạo và các buổi học sắp tới của bạn</p>
      </div>
      {/* Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left: Full-month Calendar */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 self-start">
      <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-bold">Tháng 10 năm 2023</h3>
      <div className="flex gap-2">
      <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </div>
      </div>
      <div className="grid grid-cols-7 gap-y-4 text-center">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">CN</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T2</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T3</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T4</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T5</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T6</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">T7</span>
      {/* Empty start slots */}
      <div></div><div></div><div></div>
      {/* Calendar Days */}
      <div className="relative py-3 group cursor-pointer">
      <span className="text-slate-400">1</span>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-300 rounded-full"></div>
      </div>
      <div className="py-3"><span>2</span></div>
      <div className="py-3"><span>3</span></div>
      <div className="py-3"><span>4</span></div>
      <div className="py-3"><span>5</span></div>
      <div className="py-3 relative group">
      <span className="text-slate-400">6</span>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-300 rounded-full"></div>
      </div>
      <div className="py-3"><span>7</span></div>
      <div className="py-3"><span>8</span></div>
      <div className="py-3"><span>9</span></div>
      <div className="py-3"><span>10</span></div>
      <div className="py-3"><span>11</span></div>
      <div className="py-3"><span>12</span></div>
      <div className="py-3"><span>13</span></div>
      <div className="py-3"><span>14</span></div>
      {/* Today / Upcoming */}
      <div className="py-3 bg-primary/10 text-primary font-bold rounded-lg relative">
      <span>15</span>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
      </div>
      <div className="py-3"><span>16</span></div>
      <div className="py-3"><span>17</span></div>
      <div className="py-3 relative group cursor-pointer">
      <span>18</span>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
      </div>
      <div className="py-3"><span>19</span></div>
      <div className="py-3"><span>20</span></div>
      <div className="py-3"><span>21</span></div>
      <div className="py-3"><span>22</span></div>
      <div className="py-3 relative group cursor-pointer">
      <span>23</span>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
      </div>
      <div className="py-3"><span>24</span></div>
      <div className="py-3"><span>25</span></div>
      <div className="py-3"><span>26</span></div>
      <div className="py-3"><span>27</span></div>
      <div className="py-3"><span>28</span></div>
      <div className="py-3"><span>29</span></div>
      <div className="py-3"><span>30</span></div>
      <div className="py-3"><span>31</span></div>
      </div>
      {/* Calendar Legend */}
      <div className="mt-8 flex gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2">
      <div className="size-2 bg-primary rounded-full"></div>
      <span className="text-xs text-slate-500 font-medium">Hội thảo sắp tới</span>
      </div>
      <div className="flex items-center gap-2">
      <div className="size-2 bg-slate-300 rounded-full"></div>
      <span className="text-xs text-slate-500 font-medium">Buổi học đã qua</span>
      </div>
      </div>
      </div>
      {/* Right: Upcoming Events List */}
      <div className="lg:col-span-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Sự kiện sắp tới</h2>
      <button className="text-primary text-sm font-bold hover:underline">Xem tất cả</button>
      </div>
      {/* Workshop Card 1 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
      <div className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" data-alt="Handmade pottery wheel spinning with clay" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBR9_Zw1qzHIAGG_gh4gkAKpCRIQ2e_iDlQAQbHsc_ncuJUxiz6QnBAZ379E3zzA6y3TpHpYvQlPwjO9uTPDobmebquBAqurUTeDghs5RAeXfXIIRV3f7cDEXx2PIBBK9bThyZbTbA2jTvk2fYqNjfRnzjkGjPeZF1puj6zHI7_gQrIKaz-cdqWSF_XY3F21sycGxPqfYM2yCxQQumlEcZ9Hh0xQJyMr7T8oI0UzZQqLRHjK7uSM4WCOG7cuCCvNi3yg6RC9O0ChxlJ")` }}></div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
      <div className="flex justify-between items-start mb-2">
      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">Trung cấp</span>
      <span className="text-slate-400 material-symbols-outlined cursor-pointer hover:text-primary">bookmark</span>
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Cơ bản về Xoay Gốm</h4>
      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-base">person</span>Người hướng dẫn: Elena Gilbert</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-col">
      <span className="text-xs font-bold text-slate-400 uppercase">Ngày &amp; Giờ</span>
      <span className="text-sm font-semibold">Oct 15, 2:00 PM</span>
      </div>
      <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">Xem chi tiết</button>
      </div>
      </div>
      </div>
      {/* Workshop Card 2 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
      <div className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" data-alt="A person painting on a canvas with watercolors" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAV8akr-2gvIOuF2BOP2hAaDcTBy2ishvGYw4J_glZCYUANFbqgXPd7c-9AuW-inYCdiRL-_BSY7eTCLLR3l5f7qRtPnfy8a4lKMwOM59P3n_YSdbVNHFxyr2AL9zpQU-7m79ZM7WQAqCGbV8X8Hd6e-pXwyKx_uJ46BBSVkjE5wV0f6H9l04tjs3jPUYm23SX0YzR0dbbMzF-DfmhSU8G1JSpUuemZUFaSYD4Ro8m7dmN_hc5xtMRj8HAocW8mCBRh_jPR1Hiyk6f2")` }}></div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
      <div className="flex justify-between items-start mb-2">
      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">Sơ cấp</span>
      <span className="text-slate-400 material-symbols-outlined cursor-pointer hover:text-primary">bookmark</span>
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Phong cảnh Màu nước</h4>
      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-base">person</span>Người hướng dẫn: Marcus Thorne</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-col">
      <span className="text-xs font-bold text-slate-400 uppercase">Ngày &amp; Giờ</span>
      <span className="text-sm font-semibold">Oct 18, 10:30 AM</span>
      </div>
      <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">Xem chi tiết</button>
      </div>
      </div>
      </div>
      {/* Workshop Card 3 */}
      <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
      <div className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" data-alt="Macrame wall hanging being woven" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_YgEWUOL6s8JGXoYMNYOZvPMTkIr7ECeqBV8rYJKnaWtYkkBQZ9J07jKUCQ5GmscYfjT6-O0WA4_ejxKVS27YoNKnbGZklMosR2WaePBzxkiDVtrgVgYW0BsLcgejJ9_IHbxQVblgPIPfxIXfcW4YPsi2OXdABHyYBMatnBO7cUSE-GT96PuQqqMMyO62mHnh11aeuioz0FtwpkQAdSRhW6Y_av0Q92GRJcU5AZWKb29rhYWNTDFrDgmKCJbHg8Yt6nUoFfRXJ7Ol")` }}></div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
      <div className="flex justify-between items-start mb-2">
      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">Nâng cao</span>
      <span className="text-slate-400 material-symbols-outlined cursor-pointer hover:text-primary">bookmark</span>
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Dệt Macrame Nâng cao</h4>
      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-base">person</span>Người hướng dẫn: Sarah Jenkins</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-col">
      <span className="text-xs font-bold text-slate-400 uppercase">Ngày &amp; Giờ</span>
      <span className="text-sm font-semibold">Oct 23, 4:00 PM</span>
      </div>
      <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">Xem chi tiết</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around py-3">
      <button className="flex flex-col items-center gap-1 text-slate-400">
      <span className="material-symbols-outlined">home</span>
      <span className="text-[10px]">Trang chủ</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-primary">
      <span className="material-symbols-outlined">calendar_today</span>
      <span className="text-[10px]">Lịch trình</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400">
      <span className="material-symbols-outlined">explore</span>
      <span className="text-[10px]">Khám phá</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400">
      <span className="material-symbols-outlined">settings</span>
      <span className="text-[10px]">Cài đặt</span>
      </button>
      </nav>
      </div>
      </div>
    </>
  );
}
