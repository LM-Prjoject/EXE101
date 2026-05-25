import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StaffLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/staff/users', label: 'Quản lý Users', icon: 'people' },
    { to: '/staff/hosts', label: 'Duyệt Host', icon: 'assignment_ind' },
    { to: '/staff/workshops', label: 'Quản lý Workshops', icon: 'storefront' },
    { to: '/staff/bookings', label: 'Quản lý Đặt chỗ', icon: 'book_online' },
    { to: '/staff/settings', label: 'Cài đặt hệ thống', icon: 'settings' },
  ];

  const displayName = currentUser?.name || currentUser?.email?.split('@')[0] || 'Staff';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', height: '100vh', background: '#F6F2E9', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Left Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.02)',
        height: '100vh',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0
      }}>
        <div>
          {/* Logo / Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <img
              src="/img/onlyLogo.png"
              alt="Hands & Hour Logo"
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b', margin: 0 }}>
                Hands <span style={{ color: '#3b82f6' }}>&amp;</span> Hour
              </h2>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Staff Portal
              </span>
            </div>
          </div>

          {/* User Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            background: 'rgb(219, 234, 254)',
            marginBottom: '2rem'
          }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE"
              alt="Staff avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgb(59, 130, 246)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgb(59, 130, 246)' }}>
                Staff
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {menuItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.625rem',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'rgb(59, 130, 246)' : '#64748b',
                    background: active ? 'rgb(219, 234, 254)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom logout */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.625rem',
            border: 'none',
            background: 'transparent',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            width: '100%',
            textAlign: 'left',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            logout
          </span>
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Right Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
    </div>
  );
}
