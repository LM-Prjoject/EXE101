import { useNavigate, Link } from 'react-router-dom';
export default function HostVerifyStep2() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark px-6 md:px-10 py-4">
      <div className="flex items-center gap-4 text-primary">
      <div className="size-8">
      <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6_330)">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </g>
      <defs><clippath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clippath></defs>
      </svg>
      </div>
      <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Hands &amp; Hour</h2>
      </div>
      <div className="flex gap-4">
      <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary">
      <span className="material-symbols-outlined">help</span>
      </button>
      <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      </div>
      </header>
      <main className="flex-1 flex justify-center p-4 md:p-10">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Side: Form Content */}
      <div className="lg:col-span-7 flex flex-col gap-8">
      {/* Progress Stepper */}
      <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end">
      <div className="flex flex-col">
      <span className="text-primary font-bold text-sm uppercase tracking-wider">Bước 2 trên 2</span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Xác minh danh tính</h1>
      </div>
      <p className="text-primary font-bold">100%</p>
      </div>
      <div className="h-2.5 w-full bg-primary/20 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
      </div>
      </div>
      {/* Form Section */}
      <div className="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-6">
      {/* ID Input */}
      <div className="flex flex-col gap-2">
      <label className="text-slate-700 dark:text-slate-300 font-medium">Số CCCD / Hộ chiếu</label>
      <input className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background-light dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Nhập số định danh của bạn" type="text"/>
      </div>
      {/* Photo Upload Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
      <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Ảnh chụp mặt trước CCCD</label>
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors min-h-[160px]">
      <span className="material-symbols-outlined text-primary text-4xl mb-2">add_a_photo</span>
      <span className="text-xs text-slate-500 text-center">Tải lên hoặc kéo thả tệp tại đây</span>
      </div>
      </div>
      <div className="flex flex-col gap-2">
      <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Ảnh chụp mặt sau CCCD</label>
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors min-h-[160px]">
      <span className="material-symbols-outlined text-primary text-4xl mb-2">add_a_photo</span>
      <span className="text-xs text-slate-500 text-center">Tải lên hoặc kéo thả tệp tại đây</span>
      </div>
      </div>
      </div>
      {/* Supporting Documents */}
      <div className="flex flex-col gap-2">
      <label className="text-slate-700 dark:text-slate-300 font-medium">Chứng chỉ / Tài liệu bổ sung (không bắt buộc)</label>
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
      <span className="material-symbols-outlined text-primary text-4xl mb-2">upload_file</span>
      <span className="text-sm text-slate-600 dark:text-slate-400">Tải lên chứng chỉ nghề nghiệp hoặc bằng cấp liên quan</span>
      <span className="text-xs text-slate-400 mt-1">Định dạng: PDF, JPG, PNG (Tối đa 5MB)</span>
      </div>
      </div>
      <div className="flex items-start gap-3 mt-2">
      <input className="mt-1 rounded border-primary/40 text-primary focus:ring-primary" id="terms" type="checkbox"/>
      <label className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed" htmlFor="terms">
                                  Tôi cam đoan mọi thông tin cung cấp là chính xác và chịu hoàn toàn trách nhiệm trước pháp luật. 
                                  <a className="text-primary hover:underline" href="#">Điều khoản bảo mật thông tin.</a>
      </label>
      </div>
      <button className="mt-4 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
      <span className="material-symbols-outlined">verified_user</span>
                              Hoàn tất xác thực
                          </button>
      </div>
      <button className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">arrow_back</span>
                          Quay lại bước trước
                      </button>
      </div>
      {/* Right Side: Informational Illustration */}
      <div className="lg:col-span-5 flex flex-col justify-center">
      <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 mb-8 flex items-center justify-center overflow-hidden">
      <img alt="Professional Workshop Host" className="w-full h-full object-cover mix-blend-overlay opacity-80" data-alt="A friendly workshop host showing a handmade ceramic piece" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArsCHjF-qNGu4GZgEL8kIej3vqe7Ls6FshNVwL19o_EN08HXVMtyfkvQzX1Mm9-Qd8NMl3mvfwQdeI_HOAkRz93cpfWKcrRLbEkpuEw35kZ6sLf8bZPSGs2ZYjnhb7zma5_UuaMhmQY7XdIR2gGk9AnIWqeV30NSgZPIMwswAA1kXO-KzFV7sXOrbq_SHiDNDb9lyIgSm24_DCBbUC18ZLCkXSKfdAgU8nG39UpSx9swCD8JEUCjZzrDQjU9gFZLRVBAAaDt0sE3Ad"/>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Tại sao cần xác thực?</h3>
      <ul className="flex flex-col gap-4">
      <li className="flex gap-3">
      <span className="material-symbols-outlined text-primary">check_circle</span>
      <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-800 dark:text-slate-200">Xây dựng lòng tin:</span> Khách hàng tin tưởng hơn vào các Host đã qua xác thực.</p>
      </li>
      <li className="flex gap-3">
      <span className="material-symbols-outlined text-primary">check_circle</span>
      <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-800 dark:text-slate-200">Ưu tiên hiển thị:</span> Workshop của bạn sẽ được ưu tiên xuất hiện trong kết quả tìm kiếm.</p>
      </li>
      <li className="flex gap-3">
      <span className="material-symbols-outlined text-primary">check_circle</span>
      <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-800 dark:text-slate-200">Bảo vệ cộng đồng:</span> Đảm bảo môi trường học tập an toàn cho tất cả mọi người.</p>
      </li>
      </ul>
      <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg flex items-center gap-4">
      <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">support_agent</span>
      </div>
      <div className="flex flex-col">
      <span className="text-sm font-bold">Cần hỗ trợ?</span>
      <span className="text-xs text-slate-500">Chúng tôi sẵn sàng giúp đỡ bạn 24/7.</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      <footer className="p-6 text-center text-slate-400 text-sm">
              © 2024 Hands &amp; Hour Workshop Marketplace. All rights reserved.
          </footer>
      </div>
      </div>
    </>
  );
}
