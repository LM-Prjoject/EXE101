import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { confirmOtp } from '../../api/auth';

export default function RegisterAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const autoSubmitRef = useRef(false);
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('register');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      setMessage('Đăng ký thành công. Mã OTP đã được gửi đến email của bạn.');
      setStep('confirm');
    } catch (err) {
      setError(err?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  async function confirmAccount(submitEmail = email, submitOtp = otp) {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await confirmOtp(submitEmail, submitOtp);
      setMessage('Xác thực OTP thành công. Bạn có thể đăng nhập ngay bây giờ.');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setError(err?.message || 'Xác thực OTP thất bại. Vui lòng kiểm tra lại mã.');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(event) {
    event.preventDefault();
    await confirmAccount();
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email')?.trim();
    const otpParam = params.get('otp')?.trim();

    if (location.pathname === '/register/confirm' && emailParam && otpParam) {
      setEmail(emailParam);
      setOtp(otpParam);
      setStep('confirm');
      setError('');
      setMessage('');
      autoSubmitRef.current = true;
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (autoSubmitRef.current && step === 'confirm' && email && otp && !loading) {
      autoSubmitRef.current = false;
      confirmAccount();
    }
  }, [step, email, otp, loading]);

  return (
    <>
      {/* PAGE WRAPPER: đồng bộ nền với Login */}
      <div className="font-display flex flex-col min-h-screen bg-[linear-gradient(180deg,#fbc4ae_0%,#fff_40%)]">
        {/* Navbar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e9e2da] px-6 py-4 lg:px-20 bg-white z-10 relative">
          <Link to="/home" className="flex items-center gap-3 text-[#2b2b2b] no-underline">
            <img src="/img/onlyLogo.png" alt="Logo" className="h-10 object-contain" />
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#c3996c]">Hands &amp; Hour</h2>
          </Link>

          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#4a6663] text-sm font-medium hover:text-[#c3996c] transition-colors" href="#">
                Workshop
              </a>
              <a className="text-[#4a6663] text-sm font-medium hover:text-[#c3996c] transition-colors" href="#">
                Về chúng tôi
              </a>
              <Link to="/register" className="text-[#4a6663] text-sm font-medium hover:text-[#c3996c] transition-colors">
                trở thành người tổ chức
              </Link>
            </div>

            <div className="flex gap-2">
              <Link
                to="/login"
                className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#c3996c]/10 hover:bg-[#c3996c]/20 text-[#2b2b2b] text-sm font-bold leading-normal transition-colors"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          <button className="md:hidden text-[#2b2b2b]">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
          {/* Abstract Background Shapes (đồng bộ tông) */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#c3996c]/12 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#f08a78]/18 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Registration Container */}
          <div className="w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-[24px] shadow-[0_10px_40px_rgba(195,153,108,0.12)] overflow-hidden min-h-[600px] z-10">
            {/* Left Side */}
            <div className="hidden md:flex flex-col w-1/2 relative bg-[#fbc4ae] p-12 justify-between">
              <div className="absolute inset-0 z-0">
                <img
                  alt="Pottery workshop hands molding clay"
                  className="w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5EVMedLKul_yuGrqpJUDeLeUIkZJmANRiRsB0HF32Yzs8PgkaDn-wU-kH6zcDvsnTFubQlqEeKP2YHFhEAFUrHtwvr7XW-0S_JJ_dsL8s3VKHDzlAudljCldz06DExlW8KNGmPCy5Rp0yuG_PXpS23wNn4qoJ6n9yzhE5cINfAm2u9FknXRcV3X7mt9CcSFYQPXJLJVxTaCBV1z_fPXj9huynpP-jlWNz9Gws-Y4G0dx9JRq2rbQvMhDMyZdZzpBO8q2FBYm9qoVp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
                  Tham gia cộng đồng sáng tạo của chúng tôi
                </h1>
                <p className="text-white/90 text-lg font-medium leading-normal mb-8">
                  Khám phá các Workshop, gặp gỡ các nghệ nhân địa phương và học những nghề thủ công mới tại Đà Nẵng.
                </p>

                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <div className="flex -space-x-2">
                    <img
                      alt="User avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeL8Zb7qMYedHPbq2g3S-ha47gPum62lSsJv1XIQxVDduBpSmGFWOor6VQulXBH4EvgHuh3CGLBRlHXe78Ydod6hFZkjBCPV6tMNcOzk_-GfytSjpP67ekb8LVPf-wkHIfPRuAXkVNHAn8PrH-kA1q7hyq34GbS1T9uf6ze-n0EbIkxQZ2TWMzCiDQHdW9xVceu2KN2oQ89CFizXMMT53OjzbmlUm-God9uIK7fsPc6EVOabqdzWIXR_4ndJ9KzA4tP9OdEsWbJK6a"
                    />
                    <img
                      alt="User avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrrnjcwPew1dlhWFZOx2kECc5a1j5bNJbXQyvIQTaIsK7zYYkkD1nw5aOfUVnR1Jd7CEKtnugEGt2WhuoQd3QpBrsP1iz8_KfuYArVqd79n3wDMl7IgZRG5JDqDxY7j7nPf7QFDI9V3YRlZoAt8c3Ngxys_F2suPHGJ3vQz9UoN6233Mk-xk7PAkUTbCLRkdISXCcMpgI2kbHDh-oPBXcx_jw7vubf3TJmaJYAzSqeviiD4c_aZEk4kZqi6qbkrdD-QWYIBeSagDmr"
                    />
                    <img
                      alt="User avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9MVorx6AV5HL98atCCPdontf4sESVeqLM0qVUzJnVXQDGDUn5G6Ht7PSsWZfceDawn7ukULmIEbWy7GmcuTYYinJHEG1QCkGAFqxElZajPMiNPfr1w_Yj98QJspd6P_KNiYKheZUMvYMF9k-w2OUv3clsgudE-Ai9JLKj4DtB-06ZvPe83k0iyEVo-vlA8RMHYBRbudKtj6OHmofan3BBk1cHGyUsePm2pYZfOAX0dZbs3fbJQqoL7tRCT5jPtwpJSjx4n9Qsj324"
                    />
                  </div>
                  <span>Tham gia cùng hơn 2.000 người sáng tạo</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-[#2b2b2b] mb-2">Tạo tài khoản</h2>
                  <p className="text-[#4a6663]">Đăng ký để đặt Workshop đầu tiên của bạn ngay hôm nay.</p>
                </div>

                {error && (
                  <div className="mb-5 rounded-2xl border border-[#f8d4d0] bg-[#fff1f0] px-4 py-3 text-sm text-[#b91c1c]">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="mb-5 rounded-2xl border border-[#d1fae5] bg-[#ecfdf5] px-4 py-3 text-sm text-[#065f46]">
                    {message}
                  </div>
                )}

                {step === 'register' ? (
                  <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-[#2b2b2b] text-sm font-bold">Họ và tên</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-[#e9e2da] bg-white px-4 h-12 text-base focus:border-[#c3996c] focus:ring-1 focus:ring-[#c3996c] focus:outline-none transition-shadow placeholder:text-[#4a6663]/55"
                        placeholder="Họ và tên"
                        type="text"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[#2b2b2b] text-sm font-bold">Địa chỉ Email</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#e9e2da] bg-white px-4 h-12 text-base focus:border-[#c3996c] focus:ring-1 focus:ring-[#c3996c] focus:outline-none transition-shadow placeholder:text-[#4a6663]/55"
                        placeholder="abc@gmail.com"
                        type="email"
                        required
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[#2b2b2b] text-sm font-bold">Mật khẩu</span>
                      <div className="relative">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-xl border border-[#e9e2da] bg-white pl-4 pr-12 h-12 text-base focus:border-[#c3996c] focus:ring-1 focus:ring-[#c3996c] focus:outline-none transition-shadow placeholder:text-[#4a6663]/55"
                          placeholder="Nhập mật khẩu"
                          type={showPassword ? 'text' : 'password'}
                          minLength={8}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            {showPassword ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                      </div>
                    </label>

                    <button
                      className="mt-2 w-full h-12 bg-[#fbc4ae] hover:bg-[#f08a78] text-white font-bold rounded-full transition-all transform active:scale-[0.98] shadow-[0_6px_18px_rgba(195,153,108,0.18)]"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Đang gửi...' : 'Tạo tài khoản'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleConfirm} className="flex flex-col gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-[#2b2b2b] text-sm font-bold">Email</span>
                      <input
                        value={email}
                        disabled
                        className="w-full rounded-xl border border-[#e9e2da] bg-[#f3f4f6] px-4 h-12 text-base text-[#6b7280] focus:outline-none"
                        type="email"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[#2b2b2b] text-sm font-bold">Mã OTP</span>
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded-xl border border-[#e9e2da] bg-white px-4 h-12 text-base focus:border-[#c3996c] focus:ring-1 focus:ring-[#c3996c] focus:outline-none transition-shadow placeholder:text-[#4a6663]/55"
                        placeholder="Nhập mã OTP"
                        type="text"
                        required
                      />
                    </label>

                    <button
                      className="mt-2 w-full h-12 bg-[#fbc4ae] hover:bg-[#f08a78] text-white font-bold rounded-full transition-all transform active:scale-[0.98] shadow-[0_6px_18px_rgba(195,153,108,0.18)]"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center">
                  <p className="text-[#4a6663] text-sm">
                    Đã có tài khoản?{' '}
                    <Link className="text-[#f08a78] font-bold hover:underline" to="/login">
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-6 text-[#4a6663]/60 text-xs">© 2025 Hands &amp; Hour. Bảo lưu mọi quyền.</footer>
      </div>
    </>
  );
}