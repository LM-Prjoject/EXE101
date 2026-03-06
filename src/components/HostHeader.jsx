import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HostHeader({ title, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                {/* Render optional extra buttons like "Xuất dữ liệu" */}
                {children}

                <div className="relative hidden sm:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm" placeholder="Tìm kiếm..." type="text" />
                </div>
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span className="material-symbols-outlined">settings</span>
                </button>

                {/* Avatar Menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="size-10 rounded-full overflow-hidden border-2 border-primary focus:outline-none"
                        data-alt="User avatar menu toggle"
                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwB4tz0ieppXFnrIVev9IpSWGz-dGSCDN1AYoJKvKxNJoN0z1y0m278AA465wXZAsPBGWk-vwe4xFsBvXxnGMcsYt1hGoandOA0HxSoCsE989bhNiHT_dEXERtCTtEmWnHU_hMKamqRlT8z_nXat__RHmgcp--D2p7a4FdPA7Fe79GKwN11ALE0qM0pTpVEY4mTCAcEZw1OYzYbvzDu0KziFP7GR8GyEAJpjKLghoiRcKsMXuti2VaOrpLJh6FfStocb660SMiTl93")`, backgroundSize: "cover" }}
                    ></button>

                    {/* Popover Menu - conditionally rendered based on isMenuOpen */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-fade-in-up">
                            <Link className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" to="/host/dashboard" onClick={() => setIsMenuOpen(false)}>
                                <span className="material-symbols-outlined text-slate-500 text-xl">dashboard</span>
                                <span className="text-sm font-medium">Bảng điều khiển</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" to="/host/workshops" onClick={() => setIsMenuOpen(false)}>
                                <span className="material-symbols-outlined text-slate-500 text-xl">handyman</span>
                                <span className="text-sm font-medium">Workshop của tôi</span>
                            </Link>
                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                            <button
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-red-500 text-left"
                                onClick={handleLogout}
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                                <span className="text-sm font-medium">Đăng xuất</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
