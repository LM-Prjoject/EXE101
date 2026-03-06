import { useNavigate, Link } from 'react-router-dom';
export default function HostInstructorProfile() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="relative flex min-h-screen w-full">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-primary/10 bg-white dark:bg-background-dark/50 hidden md:flex flex-col sticky top-0 h-screen">
      <div className="p-6 flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
      <span className="material-symbols-outlined">brush</span>
      </div>
      <div>
      <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">Hands &amp; Hour</h1>
      <p className="text-slate-500 dark:text-slate-400 text-xs">Chủ sở hữu workshop</p>
      </div>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 grow">
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="text-sm font-medium">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined">calendar_today</span>
      <span className="text-sm font-medium">Lịch trình</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-md shadow-primary/20" to="/home">
      <span className="material-symbols-outlined material-symbols-filled">star</span>
      <span className="text-sm font-medium">Đánh giá</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined">account_balance_wallet</span>
      <span className="text-sm font-medium">Thu nhập</span>
      </Link>
      </nav>
      {/* Avatar Menu (Simulated Clicked State/Bottom Menu) */}
      <div className="mt-auto pt-6 border-t border-primary/10">
      <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 px-3 py-2">
      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <img className="w-full h-full object-cover" data-alt="Profile picture of workshop host" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkTN5lp1O7m9xbP42vu5QFsjVA1-9_yeQqfgeAfKNwL9cr7XtXEol_cUUgJOkUBGuKZQEiAV7LU6HUHqqkrXKoUJKFAmkHzIA6gcUFZQzYck4bPk1G_2KxxReoO-4NPVgCbSVNScVP41HRk5DqEYmSMWpGcdO0OQqkjwdMxAJMhWl5qtfFE7EgWK97KdDSEHj7jkv0rLh-FgxYtT8oBENqzmtSW-8TA-Oc4m243CiyyRpXlAZunbEanfFOjTF0z_BcW2Oz042YZjai"/>
      </div>
      <div className="flex-1">
      <p className="text-sm font-semibold truncate">Alex Host</p>
      </div>
      </div>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-primary/5 transition-colors" to="/home">
      <span className="material-symbols-outlined text-sm">person</span>
      <span className="text-sm font-medium">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-primary/5 transition-colors" to="/home">
      <span className="material-symbols-outlined text-sm">skillet</span>
      <span className="text-sm font-medium">Workshop của tôi</span>
      </Link>
      </div>
      </div>
      </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="p-8 pb-4">
      <div className="flex flex-wrap justify-between items-end gap-4">
      <div className="max-w-xl">
      <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Đánh giá từ người tham gia</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Quản lý và phản hồi các ý kiến đóng góp để xây dựng uy tín của bạn.</p>
      </div>
      </div>
      {/* Rating Stats Summary */}
      <div className="flex flex-wrap gap-8 items-center mt-10 bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/5 shadow-sm">
      <div className="flex flex-col items-center px-4">
      <p className="text-5xl font-black text-slate-900 dark:text-slate-100">4.8</p>
      <div className="flex gap-0.5 my-2 text-primary">
      <span className="material-symbols-outlined material-symbols-filled text-lg">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-lg">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-lg">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-lg">star</span>
      <span className="material-symbols-outlined text-lg">star_half</span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm">124 đánh giá</p>
      </div>
      <div className="flex-1 min-w-[280px] max-w-md space-y-2">
      {/* Rating Bars */}
      <div className="flex items-center gap-3">
      <span className="text-xs font-bold w-4">5</span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style="width: 82%"></div>
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">82%</span>
      </div>
      <div className="flex items-center gap-3">
      <span className="text-xs font-bold w-4">4</span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style="width: 12%"></div>
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">12%</span>
      </div>
      <div className="flex items-center gap-3">
      <span className="text-xs font-bold w-4">3</span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style="width: 4%"></div>
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">4%</span>
      </div>
      <div className="flex items-center gap-3">
      <span className="text-xs font-bold w-4">2</span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style="width: 1%"></div>
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">1%</span>
      </div>
      <div className="flex items-center gap-3">
      <span className="text-xs font-bold w-4">1</span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style="width: 1%"></div>
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">1%</span>
      </div>
      </div>
      </div>
      </header>
      {/* Filters */}
      <div className="px-8 mt-6">
      <div className="flex border-b border-primary/10">
      <button className="px-4 py-3 text-sm font-bold text-primary border-b-2 border-primary">Tất cả đánh giá</button>
      <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Chưa trả lời (14)</button>
      <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Đánh giá cao nhất</button>
      <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Đánh giá thấp nhất</button>
      </div>
      </div>
      {/* Reviews List */}
      <section className="p-8 space-y-6 max-w-5xl">
      {/* Review Item 1 */}
      <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
      <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
      <img className="w-full h-full object-cover" data-alt="Portrait of review author Sarah J." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-sc_fN6yIxrOAwtd-jDrHaIIkry5IEyyewcTo4ljYmfD0JusXCgoKKOeLQ5FDgyIFPzYmMK1gZrgjgfmVoYNQuri2fPkajGFBbYCiRuMHnvKaMvbhx0gYbR-aQ2IyfkDSxLjFEFXfVwJgqYb7x6aoFNV6PzjqxkQ-YU1iWUkQ9JG-kRXJWJC_a_rZHXkF4U55YAy_xh-t9JOcdOjOUJ1aNcteP76NoqQfvSbfuLZPFuVqQnjJ_XcTUm42vofYVnDG9ocOOGwSviUY"/>
      </div>
      <div className="flex-1">
      <div className="flex justify-between items-start">
      <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</h4>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
      <span>Gốm sứ cho người mới bắt đầu</span>
      <span>•</span>
      <span>12 tháng 10, 2023</span>
      </div>
      </div>
      <div className="flex text-primary">
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      </div>
      </div>
      <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Workshop này thật sự tuyệt vời! Người hướng dẫn rất kiên nhẫn và không khí rất thư giãn. Tôi đã làm được ba chiếc bát nhỏ mà tôi thực sự tự hào. Rất khuyến khích cho bất kỳ ai muốn thử làm gốm!</p>
      {/* Reply Section */}
      <div className="mt-4 pt-4 border-t border-primary/5">
      <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-primary text-sm">reply</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PHẢN HỒI CỦA BẠN</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 italic bg-primary/5 p-3 rounded-lg border-l-4 border-primary/30">"Cảm ơn Sarah! Rất vui khi được đón tiếp bạn tại studio. Kỹ thuật tráng men của bạn thực sự khá tiến bộ đối với một người mới bắt đầu!"</p>
      </div>
      </div>
      </div>
      </div>
      {/* Review Item 2 */}
      <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
      <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
      <img className="w-full h-full object-cover" data-alt="Portrait of review author Michael C." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtMagh2fhtcS0MOsUSxRVZFVozcfzN1grC41gc58P7mCOCPx0Gu51rY9bCWDV4NAzNInSe_nFfsyaeIaUBXvCsutVHWT5ftacthJ2WvRh7zb8mCxhRO701DwPE4188I1MJNdR1pyU8UcKKJ8DWFZDdnShRWW0reuwwXyPS6TvYBm9tS-R3_cMu6xV5e58lMjNitqhyXuVZ-ntJ-MDQjfTheYkoacrAViMBJMqwYmihJyzS3nKZv1ehvgEjLWnZoHOiV1K7-LWoQJrj"/>
      </div>
      <div className="flex-1">
      <div className="flex justify-between items-start">
      <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100">Michael Chen</h4>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
      <span>Chế tác gỗ nâng cao</span>
      <span>•</span>
      <span>10 tháng 10, 2023</span>
      </div>
      </div>
      <div className="flex text-primary">
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined text-sm">star</span>
      </div>
      </div>
      <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Kiến thức kỹ thuật được chia sẻ rất tốt. Tốc độ hơi nhanh đối với tôi, nhưng các vật liệu được cung cấp rất chất lượng. Tôi rất muốn có một buổi bổ sung chỉ để học các kỹ thuật hoàn thiện.</p>
      {/* Unreplied State */}
      <div className="mt-4 flex flex-col gap-3">
      <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-primary focus:ring-primary" placeholder="Nhập phản hồi của bạn..."></textarea>
      <div className="flex justify-end">
      <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-6 rounded-lg transition-all shadow-sm shadow-primary/20">Gửi phản hồi</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Review Item 3 */}
      <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
      <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
      <img className="w-full h-full object-cover" data-alt="Portrait of review author David R." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubyufP15O0AFCv1cG6VS7QYL6x2M5jiAdGOHujYZ1UeoqowsPeSlum1zFpqlJ3j1IuuGFUskqCceGUqbzWfKPHLdxL5QHPkGz9dLyLixjGY_LRPliTsdHknA24xt3aafQ9WD9bZtQxIcphVDCEU69h0HsIEzCft21Jhgg1lJpmCHMlhF7fFFmzXGTXtfw6r0OvrIn5rOxt_JwQ-yhNcaG4cS7mVYAs5R55DKwuBNaoPuIAu5cxM5eUKGPgBeTB4g31Dy-zfTo20HY"/>
      </div>
      <div className="flex-1">
      <div className="flex justify-between items-start">
      <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100">David Ross</h4>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
      <span>Làm tiểu cảnh Terrarium</span>
      <span>•</span>
      <span>05 tháng 10, 2023</span>
      </div>
      </div>
      <div className="flex text-primary">
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
      </div>
      </div>
      <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Các workshop của Hands &amp; Hour chưa bao giờ làm tôi thất vọng. Đây là lần thứ ba tôi đặt chỗ với Alex và như mọi khi, sự giao tiếp và buổi workshop thực tế đều rất xuất sắc. Bình tiểu cảnh của tôi đang phát triển rất tốt!</p>
      <div className="mt-4 flex gap-4 text-slate-400">
      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-sm">thumb_up</span>
      <span className="text-xs">Hữu ích (4)</span>
      </button>
      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-sm">reply</span>
      <span className="text-xs">Phản hồi</span>
      </button>
      </div>
      </div>
      </div>
      </div>
      </section>
      {/* Pagination */}
      <footer className="p-8 mt-auto flex justify-center">
      <nav className="flex items-center gap-2">
      <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold">1</button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 font-bold">2</button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 font-bold">3</button>
      <span className="mx-2 text-slate-400">...</span>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </nav>
      </footer>
      </main>
      </div>
      </div>
    </>
  );
}
