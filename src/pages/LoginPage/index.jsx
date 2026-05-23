import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { requestPasswordReset, confirmPasswordReset } from '../../api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password flow states
  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'reset'
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Palette:
  // primary: #c3996c (warm gold)
  // accent:  #f08a78 (salmon)
  // soft:    #fbc4ae (peach)
  // mint:    #d5ddce (pale green)
  // deep:    #6f8b6f (deep olive)

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        if (user.role === 'host') {
          navigate('/host/dashboard');
        } else if (user.role === 'staff' || user.role === 'admin') {
          navigate('/staff/users');
        } else {
          navigate('/home');
        }
      } else {
        setError('Email hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      setError(error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await requestPasswordReset(forgotEmail);
      setSuccessMsg('Mã OTP khôi phục mật khẩu đã được gửi đến email của bạn.');
      setMode('reset');
    } catch (err) {
      setError(err?.message || 'Gửi yêu cầu thất bại. Vui lòng kiểm tra lại email.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await confirmPasswordReset(forgotEmail, otp, newPassword);
      setSuccessMsg('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.');
      setEmail(forgotEmail);
      setPassword('');
      setOtp('');
      setNewPassword('');
      setMode('login');
    } catch (err) {
      setError(err?.message || 'Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại OTP.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", height: '100vh', overflow: 'hidden', background: 'linear-gradient(180deg,#fbc4ae 0%,#fff 40%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 24, boxShadow: '0 10px 40px rgba(195,153,108,0.12)', overflow: 'hidden', display: 'flex', minHeight: 680 }}>

        {/* ── LEFT: Hero panel ── */}
        <div style={{ flex: '0 0 48%', background: 'linear-gradient(170deg, #fbc4ae 0%, #d5ddce 100%)', position: 'relative', display: 'flex', flexDirection: 'column', padding: '2.5rem', paddingRight: '6.5rem' }}>

          {/* Logo — click về home */}
          <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', zIndex: 2 }}>
            <img src="/img/onlyLogo.png" alt="Logo" style={{ height: 140, objectFit: 'contain' }} />
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
            <img src="/img/onlyLogo.png" alt="Logo" style={{ height: 32, objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, color: '#2b2b2b' }}>Hands &amp; Hour</span>
          </Link>

          {/* ── MODE: LOGIN ── */}
          {mode === 'login' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#2b2b2b', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>Chào mừng trở lại! 👋</h2>
                <p style={{ color: '#4a6663', fontSize: '0.95rem', margin: 0 }}>Đăng nhập để tiếp tục hành trình sáng tạo.</p>
              </div>

              {successMsg && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, color: '#047857', fontSize: '0.875rem', fontWeight: 500 }}>
                  ✅ {successMsg}
                </div>
              )}

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
                    <button type="button" onClick={() => { setMode('forgot'); setForgotEmail(email); setError(''); setSuccessMsg(''); }} style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.78rem', color: '#f08a78', fontWeight: 600, cursor: 'pointer', outline: 'none' }}>Quên mật khẩu?</button>
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
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#c3996c'; }}
                >
                  {loading && <span className="material-symbols-outlined" style={{ fontSize: 18, animation: 'spin 1s linear infinite' }}>progress_activity</span>}
                  {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Chưa có tài khoản?{' '}
                <Link to="/register" style={{ color: '#f08a78', fontWeight: 700, textDecoration: 'none' }}>Đăng ký ngay</Link>
              </p>
            </>
          )}

          {/* ── MODE: FORGOT PASSWORD ── */}
          {mode === 'forgot' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#2b2b2b', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>Quên mật khẩu? 🔒</h2>
                <p style={{ color: '#4a6663', fontSize: '0.95rem', margin: 0 }}>Nhập email của bạn để nhận mã OTP khôi phục mật khẩu.</p>
              </div>

              {error && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fff3f2', border: '1px solid #f8c6bf', borderRadius: 12, color: '#dc2626', fontSize: '0.875rem', fontWeight: 500 }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2b2b2b', marginBottom: 6 }}>Email khôi phục</label>
                  <div style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 20, pointerEvents: 'none' }}>mail</span>
                    <input
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      type="email" required
                      placeholder="user@demo.com"
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
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#c3996c'; }}
                >
                  {loading && <span className="material-symbols-outlined" style={{ fontSize: 18, animation: 'spin 1s linear infinite' }}>progress_activity</span>}
                  {loading ? 'Đang gửi mã...' : 'Gửi mã OTP'}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Nhớ ra mật khẩu?{' '}
                <button onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }} style={{ background: 'none', border: 'none', padding: 0, color: '#f08a78', fontWeight: 700, cursor: 'pointer', outline: 'none' }}>Đăng nhập ngay</button>
              </p>
            </>
          )}

          {/* ── MODE: RESET PASSWORD ── */}
          {mode === 'reset' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#2b2b2b', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>Đặt lại mật khẩu 🔑</h2>
                <p style={{ color: '#4a6663', fontSize: '0.95rem', margin: 0 }}>Vui lòng nhập mã OTP gửi tới <strong>{forgotEmail}</strong> cùng mật khẩu mới.</p>
              </div>

              {successMsg && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, color: '#047857', fontSize: '0.875rem', fontWeight: 500 }}>
                  ✅ {successMsg}
                </div>
              )}

              {error && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fff3f2', border: '1px solid #f8c6bf', borderRadius: 12, color: '#dc2626', fontSize: '0.875rem', fontWeight: 500 }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* OTP Code */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2b2b2b', marginBottom: 6 }}>Mã xác nhận (OTP)</label>
                  <div style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 20, pointerEvents: 'none' }}>pin</span>
                    <input
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      type="text" required
                      placeholder="Nhập mã OTP"
                      style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 40, paddingRight: 12, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: '0.9rem', background: '#fff', color: '#2b2b2b', outline: 'none', transition: 'border-color 0.15s' }}
                      onFocus={e => { e.target.style.borderColor = '#c3996c'; }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; }}
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2b2b2b', marginBottom: 6 }}>Mật khẩu mới</label>
                  <div style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 20, pointerEvents: 'none' }}>lock</span>
                    <input
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      type="password" required
                      placeholder="Tối thiểu 6 ký tự"
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
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#c3996c'; }}
                >
                  {loading && <span className="material-symbols-outlined" style={{ fontSize: 18, animation: 'spin 1s linear infinite' }}>progress_activity</span>}
                  {loading ? 'Đang thực hiện...' : 'Đặt lại mật khẩu'}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Muốn thử lại?{' '}
                <button onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }} style={{ background: 'none', border: 'none', padding: 0, color: '#f08a78', fontWeight: 700, cursor: 'pointer', outline: 'none' }}>Gửi lại mã OTP</button>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}