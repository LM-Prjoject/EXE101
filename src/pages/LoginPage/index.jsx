import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Palette:
  // primary: #c3996c (warm gold)
  // accent:  #f08a78 (salmon)
  // soft:    #fbc4ae (peach)
  // mint:    #d5ddce (pale green)
  // deep:    #6f8b6f (deep olive)

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      setLoading(false);
      if (user) {
        navigate(user.role === 'host' ? '/host/dashboard' : '/home');
      } else {
        setError('Email hoặc mật khẩu không đúng.');
      }
    }, 500);
  }

  function fillDemo(role) {
    setEmail(role === 'host' ? 'host@demo.com' : 'user@demo.com');
    setPassword('123456');
    setError('');
  }

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", height: '100vh', overflow: 'hidden', background: 'linear-gradient(180deg,#fbc4ae 0%,#fff 40%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 24, boxShadow: '0 10px 40px rgba(195,153,108,0.12)', overflow: 'hidden', display: 'flex', minHeight: 680 }}>

        {/* ── LEFT: Hero panel ── */}
        <div style={{ flex: '0 0 48%', background: 'linear-gradient(170deg, #fbc4ae 0%, #d5ddce 100%)', position: 'relative', display: 'flex', flexDirection: 'column', padding: '2.5rem', paddingRight: '6.5rem' }}>

          {/* Logo — click về home */}
          <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', zIndex: 2 }}>
            <img src="/public/img/onlyLogo.png" alt="Logo" style={{ height: 140, objectFit: 'contain' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#c3996c', letterSpacing: '-0.02em' }}>Hands &amp; Hour</span>
          </Link>

          {/* Main copy */}
          <div style={{ marginTop: '0rem', marginBottom: 0, zIndex: 2, paddingTop: 0 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2b2b2b', lineHeight: 1.2, margin: '0 0 1rem' }}>
              Giải phóng<br />
              <span style={{ color: '#f08a78' }}>Sáng tạo</span> của Bạn<br />
              Ngay Hôm Nay.
            </h1>
            <p style={{ color: '#4a6663', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: 340 }}>
              Gia nhập cộng đồng những người làm thủ công sôi động nhất Đà Nẵng.
            </p>

            {/* Avatar row */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
  {/* Hàng 1: avatar */}
  <div style={{ display: 'flex' }}>
    {[
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRukATfo1BzF-10reJdFWGWYpQcYy4CydvuN2SC30FPJLa3QzKDmCN6zbQb--gPLag_7cILHAmPayz6hWnQ_WH387376Fuv2-CwJScPuuOrX8-FjenncpC-f9SIsrRO4bZbHAoVp4aAqBPjKQW3HV9OSmD2GY2BlSR781XqgLEeyZ-UTjLxJxg5YMvS8YpRuUilfXW_Qnw60z871JlGF7OYES1GWT2N1BjwJ2rqFh9xtpR7fiSoZZJykpm8jhz-P29_RYFyXyCm7Iy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQM5woL7I0jhiuuwLuCC1HqfOKpIPY7k0icRcbWf1QgCN8gsFzdC8Cr3e6ak9s_dHxIGcizyCTsPPKvbzEdAdhxTE7DxxCUGSSoFBh1LBf4BBXGDSIYoOlbEm2m_u76f84tOnUg6Hx08ba_RwJBuyrJtoYj3zOipEiOyl7arGYjNHdoccqTF7rgAcrs2h0MHinakPS5RnlRKfro3Tjz62EAdEF9o1Wvo8uUdYdlTIL-1gRrzl6H5Z4zC9eO9wRgH-J4uRHwJN6TyP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZBISV6viUM6PxlhuqOkLMJXsiIdXg783Nn_DiEIetUIy8lSCibGBRXA9IkhQWhnn3-5MMu71-ezcjdVh0EPSanebE-5nAWrzg0tWeh6iirN0YSDHY6arllT2n7RQrscGNF6KtilnMk8CyqXR8D-BXu4USi68OPRBf5prHPS7nxwKdh4yKTRHn_8AkHGwI2QsrY6jyuMu9s2bGhbGWDZecQ026qraebQ51rrkK5_oVOpcCm61lf2wfrKIfQWU3nZjNvYfAvyJQVBuK',
    ].map((src, i) => (
      <img
        key={i}
        src={src}
        alt=""
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #fff',
          marginLeft: i === 0 ? 0 : -10,
        }}
      />
    ))}
  </div>

  {/* Hàng 2: text */}
  <div>
    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#2b2b2b', lineHeight: 1.2 }}>
      Nhà sáng tạo tích cực
    </div>
    <div style={{ fontSize: '0.72rem', color: '#4a6663' }}>
      Gia nhập đại gia đình +2k
    </div>
  </div>
</div>

          </div>

          {/* Hero image bottom-right */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '60%', height: '45%', pointerEvents: 'none', zIndex: 1 }}>
            <div style={{
              width: '100%', height: '100%', borderTopLeftRadius: 40,
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVuYw4Ml7FWZHuzPBEVU7Xp02fj1WwEDd7InL0SFz1iWQ-OaoUPHPgW0zRRBst7fQiVJ-UwaU1PlWVbaz8pe2Wvhscb4gaA64U0xSUY5WP5cwnbF3ADOYVQnXwSWvtTd1sGq9AJorjNOZgyOsJldxp2GWxP8S5L-ymMPBKWVMpuMia1Ffyi_hSHSHjVWXodBof_LMeFvBjgDoOiUU_J5mmYISANOOeejUXGcSSt1lfgJ2thpwhxs_5xqgNoJ_EggMfchns3i-KOIb_')",
              backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '-8px -8px 32px rgba(195,153,108,0.08)',
            }} />
          </div>

          {/* Decorative blobs */}
          <div style={{ position: 'absolute', bottom: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(240,138,120,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(195,153,108,0.08)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        </div>

        {/* ── RIGHT: Login form ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 3.5rem' }}>

          {/* Mobile logo */}
          <Link to="/home" style={{ display: 'none', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1.5rem' }}>
            <img src="/public/img/onlyLogo.png" alt="Logo" style={{ height: 32, objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, color: '#2b2b2b' }}>Hands &amp; Hour</span>
          </Link>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#2b2b2b', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>Chào mừng trở lại! 👋</h2>
            <p style={{ color: '#4a6663', fontSize: '0.95rem', margin: 0 }}>Đăng nhập để tiếp tục hành trình sáng tạo.</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fff3f2', border: '1px solid #f8c6bf', borderRadius: 12, color: '#dc2626', fontSize: '0.875rem', fontWeight: 500 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2b2b2b', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 20, pointerEvents: 'none' }}>mail</span>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email" required
                  placeholder="user@demo.com"
                  style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 40, paddingRight: 12, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: '0.9rem', background: '#fff', color: '#2b2b2b', outline: 'none', transition: 'border-color 0.15s' }}
                  onFocus={e => { e.target.style.borderColor = '#c3996c'; }}
                  onBlur={e => { e.target.style.borderColor = '#e5e7eb'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2b2b2b' }}>Mật khẩu</label>
                <a href="#" style={{ fontSize: '0.78rem', color: '#f08a78', fontWeight: 600, textDecoration: 'none' }}>Quên mật khẩu?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 20, pointerEvents: 'none' }}>lock</span>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password" required
                  placeholder="••••••••"
                  style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 40, paddingRight: 12, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: '0.9rem', background: '#fff', color: '#2b2b2b', outline: 'none', transition: 'border-color 0.15s' }}
                  onFocus={e => { e.target.style.borderColor = '#c3996c'; }}
                  onBlur={e => { e.target.style.borderColor = '#e5e7eb'; }}
                />
              </div>
            </div>
            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              marginTop: '0.5rem', width: '100%', padding: '0.875rem', background: loading ? '#d9c8b0' : '#c3996c',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: 14,
              cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.15s, transform 0.1s', boxShadow: '0 6px 18px rgba(195,153,108,0.18)',
            }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#f08a78'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#fbc4ae'; }}
            >
              {loading && <span className="material-symbols-outlined" style={{ fontSize: 18, animation: 'spin 1s linear infinite' }}>progress_activity</span>}
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e9e2da' }} />
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>HOẶC TIẾP TỤC VỚI</span>
            <div style={{ flex: 1, height: 1, background: '#e9e2da' }} />
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.75rem', border: '1.5px solid #e9e2da', borderRadius: 12, background: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#374151', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#c3996c'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e9e2da'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Google
            </button>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.75rem', border: '1.5px solid #e9e2da', borderRadius: 12, background: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#374151', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#c3996c'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e9e2da'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: '#f08a78', fontWeight: 700, textDecoration: 'none' }}>Đăng ký ngay</Link>
          </p>
          {/* Demo accounts */}
            <div style={{ marginTop: '1.75rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4a6663', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Tài khoản demo</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { role: 'user', icon: '👤', label: 'User', email: 'user@demo.com' },
                  { role: 'host', icon: '🎯', label: 'Host', email: 'host@demo.com' },
                ].map(({ role, icon, label, email: demoEmail }) => (
                  <button key={role} onClick={() => fillDemo(role)} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 1rem',
                    background: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(195,153,108,0.24)',
                    borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s', flex: 1,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#c3996c'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderColor = 'rgba(195,153,108,0.24)'; }}
                  >
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2b2b2b' }}>{label}</div>
                      <div style={{ fontSize: '0.68rem', color: '#4a6663' }}>{demoEmail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}