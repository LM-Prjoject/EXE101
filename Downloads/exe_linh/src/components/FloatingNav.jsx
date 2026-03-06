import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const userLinks = [
    { to: '/home', label: 'Trang Chủ', icon: 'home' },
    { to: '/advanced-search', label: 'Tìm kiếm', icon: 'search' },
    { to: '/my-schedule', label: 'Lịch', icon: 'calendar_today' },
    { to: '/community', label: 'Cộng đồng', icon: 'photo_camera' },
    { to: '/user-profile', label: 'Hồ sơ', icon: 'person' },
];

const hostLinks = [
    { to: '/host/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/host/workshops', label: 'Workshop', icon: 'menu_book' },
    { to: '/host/schedule', label: 'Lịch', icon: 'calendar_today' },
    { to: '/host/participants', label: 'Học viên', icon: 'group' },
    { to: '/host/income', label: 'Thu nhập', icon: 'payments' },
];

const AUTH_PAGES = ['/login', '/register'];

export default function FloatingNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    // Ẩn nav trên trang login/register, chưa đăng nhập, hoặc trên các trang /host vì host đã có sidebar riêng
    if (AUTH_PAGES.includes(location.pathname) || !currentUser || location.pathname.startsWith('/host')) return null;

    const isHost = currentUser.role === 'host';
    const links = isHost ? hostLinks : userLinks;
    const accentColor = isHost ? '#1a2b29' : '#2ec2b3';

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
            background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
            borderTop: `2px solid ${accentColor}25`,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.375rem 1rem', gap: '0.125rem',
        }}>
            {/* User badge */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '0.375rem 0.75rem', marginRight: '0.25rem',
                borderRadius: '0.625rem', background: `${accentColor}12`,
                minWidth: 60,
            }}>
                <img src={currentUser.avatar} alt={currentUser.name}
                    style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}` }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: accentColor, marginTop: 1, whiteSpace: 'nowrap' }}>
                    {isHost ? '🎯 Host' : '👤 User'}
                </span>
            </div>

            <div style={{ width: 1, height: 32, background: '#e2e8f0', margin: '0 0.25rem' }} />

            {/* Page links */}
            {links.map(({ to, label, icon }) => {
                const active = location.pathname === to || location.pathname.startsWith(to + '/');
                return (
                    <Link key={to} to={to} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        padding: '0.375rem 0.625rem', borderRadius: '0.625rem',
                        textDecoration: 'none',
                        color: active ? '#fff' : '#678381',
                        background: active ? accentColor : 'transparent',
                        fontSize: '0.6rem', fontWeight: 600,
                        minWidth: 48, transition: 'all 0.15s',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
                        <span>{label}</span>
                    </Link>
                );
            })}

            <div style={{ width: 1, height: 32, background: '#e2e8f0', margin: '0 0.25rem' }} />

            {/* Logout */}
            <button onClick={handleLogout} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '0.375rem 0.625rem', borderRadius: '0.625rem',
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: '#ef4444', fontSize: '0.6rem', fontWeight: 600,
                minWidth: 48, transition: 'all 0.15s',
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
                <span>Đăng xuất</span>
            </button>
        </div>
    );
}
