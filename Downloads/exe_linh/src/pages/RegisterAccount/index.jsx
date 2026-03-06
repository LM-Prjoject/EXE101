import { useNavigate, Link } from 'react-router-dom';
export default function RegisterAccount() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-teal-border/30 px-6 py-4 lg:px-20 bg-white dark:bg-background-dark z-10 relative">
          <div className="flex items-center gap-3 text-teal-dark dark:text-white">
            <div className="size-8 text-primary">
              <svg className="w-full h-full" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_330)">
                  <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
                </g>
                <defs>
                  <clippath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clippath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Hands &amp; Hour</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-teal-dark dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Workshop thủ công</a>
              <a className="text-teal-dark dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Về chúng tôi</a>
              <Link to="/register" className="text-teal-dark dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">trở thành người tổ chức</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary/10 hover:bg-primary/20 text-teal-dark dark:text-white text-sm font-bold leading-normal transition-colors">Đăng nhập</Link>
            </div>
          </div>
          <button className="md:hidden text-teal-dark dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-[80px] pointer-events-none"></div>
          {/* Registration Container */}
          <div className="w-full max-w-[1100px] flex flex-col md:flex-row bg-white dark:bg-[#1a2927] rounded-lg shadow-xl overflow-hidden min-h-[600px] z-10">
            {/* Left Side: Hero Image/Marketing */}
            <div className="hidden md:flex flex-col w-1/2 relative bg-teal-50 dark:bg-teal-900/10 p-12 justify-between">
              <div className="absolute inset-0 z-0">
                <img alt="Pottery workshop hands molding clay" className="w-full h-full object-cover opacity-90" data-alt="Close up of hands working on pottery wheel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5EVMedLKul_yuGrqpJUDeLeUIkZJmANRiRsB0HF32Yzs8PgkaDn-wU-kH6zcDvsnTFubQlqEeKP2YHFhEAFUrHtwvr7XW-0S_JJ_dsL8s3VKHDzlAudljCldz06DExlW8KNGmPCy5Rp0yuG_PXpS23wNn4qoJ6n9yzhE5cINfAm2u9FknXRcV3X7mt9CcSFYQPXJLJVxTaCBV1z_fPXj9huynpP-jlWNz9Gws-Y4G0dx9JRq2rbQvMhDMyZdZzpBO8q2FBYm9qoVp" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="relative z-10 mt-auto">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">Tham gia cộng đồng sáng tạo của chúng tôi</h1>
                <p className="text-white/90 text-lg font-medium leading-normal mb-8">Khám phá các workshop thủ công, gặp gỡ các nghệ nhân địa phương và học những nghề thủ công mới tại Đà Nẵng.</p>
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <div className="flex -space-x-2">
                    <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of a smiling woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeL8Zb7qMYedHPbq2g3S-ha47gPum62lSsJv1XIQxVDduBpSmGFWOor6VQulXBH4EvgHuh3CGLBRlHXe78Ydod6hFZkjBCPV6tMNcOzk_-GfytSjpP67ekb8LVPf-wkHIfPRuAXkVNHAn8PrH-kA1q7hyq34GbS1T9uf6ze-n0EbIkxQZ2TWMzCiDQHdW9xVceu2KN2oQ89CFizXMMT53OjzbmlUm-God9uIK7fsPc6EVOabqdzWIXR_4ndJ9KzA4tP9OdEsWbJK6a" />
                    <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of a smiling man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrrnjcwPew1dlhWFZOx2kECc5a1j5bNJbXQyvIQTaIsK7zYYkkD1nw5aOfUVnR1Jd7CEKtnugEGt2WhuoQd3QpBrsP1iz8_KfuYArVqd79n3wDMl7IgZRG5JDqDxY7j7nPf7QFDI9V3YRlZoAt8c3Ngxys_F2suPHGJ3vQz9UoN6233Mk-xk7PAkUTbCLRkdISXCcMpgI2kbHDh-oPBXcx_jw7vubf3TJmaJYAzSqeviiD4c_aZEk4kZqi6qbkrdD-QWYIBeSagDmr" />
                    <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of a man with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9MVorx6AV5HL98atCCPdontf4sESVeqLM0qVUzJnVXQDGDUn5G6Ht7PSsWZfceDawn7ukULmIEbWy7GmcuTYYinJHEG1QCkGAFqxElZajPMiNPfr1w_Yj98QJspd6P_KNiYKheZUMvYMF9k-w2OUv3clsgudE-Ai9JLKj4DtB-06ZvPe83k0iyEVo-vlA8RMHYBRbudKtj6OHmofan3BBk1cHGyUsePm2pYZfOAX0dZbs3fbJQqoL7tRCT5jPtwpJSjx4n9Qsj324" />
                  </div>
                  <span>Tham gia cùng hơn 2.000 người sáng tạo</span>
                </div>
              </div>
            </div>
            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-teal-dark dark:text-white mb-2">Tạo tài khoản</h2>
                  <p className="text-teal-gray dark:text-gray-400">Đăng ký để đặt workshop thủ công đầu tiên của bạn ngay hôm nay.</p>
                </div>
                <form action="#" className="flex flex-col gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="text-teal-dark dark:text-gray-200 text-sm font-bold">Họ và tên</span>
                    <input className="w-full rounded-xl border border-teal-border bg-white dark:bg-background-dark dark:border-gray-700 dark:text-white px-4 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow placeholder:text-teal-gray/50" placeholder="Nhập họ và tên của bạn" type="text" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-teal-dark dark:text-gray-200 text-sm font-bold">Địa chỉ Email</span>
                    <input className="w-full rounded-xl border border-teal-border bg-white dark:bg-background-dark dark:border-gray-700 dark:text-white px-4 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow placeholder:text-teal-gray/50" placeholder="hello@vi-du.com" type="email" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-teal-dark dark:text-gray-200 text-sm font-bold">Mật khẩu</span>
                    <div className="relative">
                      <input className="w-full rounded-xl border border-teal-border bg-white dark:bg-background-dark dark:border-gray-700 dark:text-white pl-4 pr-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow placeholder:text-teal-gray/50" placeholder="Tạo mật khẩu bảo mật" type="password" />
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-gray hover:text-teal-dark dark:text-gray-400 dark:hover:text-white transition-colors" type="button">Tạo tài khoản</button>
                    </div>
                  </label>
                  <button onClick={() => navigate('/login')} className="mt-2 w-full h-12 bg-primary hover:bg-[#25ad9f] text-teal-dark font-bold rounded-full transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20" type="button">Tạo tài khoản</button>
                </form>
                <div className="relative flex py-6 items-center">
                  <div className="flex-grow border-t border-teal-border dark:border-gray-700"></div>
                  <span className="flex-shrink-0 mx-4 text-teal-gray text-sm font-medium">Hoặc tiếp tục với</span>
                  <div className="flex-grow border-t border-teal-border dark:border-gray-700"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-teal-border dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-white dark:bg-transparent text-teal-dark dark:text-white font-medium transition-colors" type="button"><svg className="w-5 h-5" fill="none" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path><path d="M12.24 24.0008C15.4765 24.0008 18.2059 22.9382 20.19 21.1039L16.323 18.1056C15.2517 18.8375 13.8627 19.252 12.24 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"></path><path d="M5.50705 14.3003C5.00636 12.8099 5.00636 11.1961 5.50705 9.70575V6.61481H1.5166C-0.185593 10.0056 -0.185593 14.0005 1.5166 17.3912L5.50705 14.3003Z" fill="#FBBC05"></path><path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50705 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335"></path></svg> Google</button>
                  <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-teal-border dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-white dark:bg-transparent text-teal-dark dark:text-white font-medium transition-colors" type="button"><svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewbox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg> Facebook</button>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-teal-dark dark:text-gray-300 text-sm">Đã có tài khoản? <Link className="text-primary font-bold hover:underline" to="/login">Đăng nhập</Link></p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center py-6 text-teal-gray/60 text-xs">© 2023 Hands &amp; Hour. Bảo lưu mọi quyền.</footer>
      </div>
    </>
  );
}
