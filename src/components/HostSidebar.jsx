import { Link, useLocation } from 'react-router-dom';

export default function HostSidebar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 sticky top-0 h-screen z-20">
            <Link to="/" className="p-6 flex items-center gap-3">
                <img
                    src="/img/logo.png"
                    alt="Hands & Hour logo"
                    className="h-9 w-9 object-contain"
                />
                <h2 className="text-xl font-black tracking-tight">
                    <span className="text-[#c3996c]">Hands</span>{" "}
                    <span className="text-[#6f8b6f]">&amp;</span>{" "}
                    <span className="text-[#c3996c]">Hour</span>
                </h2>
            </Link>
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${path === '/host/dashboard' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'}`} to="/host/dashboard">
                    <span className="material-symbols-outlined" style={path === '/host/dashboard' ? { fontVariationSettings: `'FILL' 1` } : {}}>dashboard</span>
                    <span>Bảng điều khiển</span>
                </Link>

                <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${path === '/host/schedule' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'}`} to="/host/schedule">
                    <span className="material-symbols-outlined" style={path === '/host/schedule' ? { fontVariationSettings: `'FILL' 1` } : {}}>calendar_today</span>
                    <span>Lịch trình</span>
                </Link>
                <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${path === '/host/profile' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'}`} to="/host/profile">
                    <span className="material-symbols-outlined" style={path === '/host/profile' ? { fontVariationSettings: `'FILL' 1` } : {}}>person</span>
                    <span>Review</span>
                </Link>
                <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${path === '/host/income' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'}`} to="/host/income">
                    <span className="material-symbols-outlined" style={path === '/host/income' ? { fontVariationSettings: `'FILL' 1` } : {}}>account_balance_wallet</span>
                    <span>Thu nhập</span>
                </Link>
                  <Link to="/host/create-workshop" className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Tạo Workshop
                </Link>
            </nav>
        </aside>
    );
}
