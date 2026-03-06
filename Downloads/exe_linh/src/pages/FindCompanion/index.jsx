import { useNavigate, Link } from 'react-router-dom';
export default function FindCompanion() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-neutral-surface dark:bg-neutral-surface-dark border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
      {/* Logo */}
      <Link className="flex items-center gap-3 group" to="/home">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
      <span className="material-symbols-outlined text-2xl">palette</span>
      </div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Hands &amp; Hour</h1>
      </Link>
      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md">
      <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
      <span className="material-symbols-outlined">search</span>
      </div>
      <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all" placeholder="Tìm kiếm workshop tại Đà Nẵng..." type="text"/>
      </div>
      </div>
      {/* Navigation & Actions */}
      <div className="flex items-center gap-6">
      <nav className="hidden lg:flex items-center gap-6">
      <Link className="text-sm font-medium hover:text-primary transition-colors" to="/login">Workshops</Link>
      <Link className="text-sm font-medium hover:text-primary transition-colors" to="/register">Sự kiện</Link>
      <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Blog</a>
      </nav>
      <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6">
      <Link to="/login" className={"hidden sm:flex h-10 px-4 items-center justify-center rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" }>Đăng nhập</Link>
      <Link to="/register" className="bg-primary hover:bg-primary-dark text-text-main font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-primary/20">Đăng ký</Link>
      </div>
      </div>
      </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
      <a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
      <span className="material-symbols-outlined text-base">chevron_right</span>
      <a className="hover:text-primary transition-colors" href="#">Workshops</a>
      <span className="material-symbols-outlined text-base">chevron_right</span>
      <span className="text-slate-900 dark:text-slate-100 font-medium">Bãi biển Mỹ Khê, Đà Nẵng</span>
      </nav>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
      <div className="flex items-center gap-3 mb-2">
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">Arts &amp; Crafts</span>
      <div className="flex items-center gap-1 text-amber-500">
      <span className="material-symbols-outlined fill-current text-sm">star</span>
      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Bãi biển Mỹ Khê, Đà Nẵng</span>
      <span className="text-sm text-slate-400 font-medium">(128 đánh giá)</span>
      </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">Workshop Vẽ Tranh Canvas Hoàng Hôn</h1>
      <div className="flex items-center gap-2 text-slate-500 mt-2">
      <span className="material-symbols-outlined text-lg">location_on</span>
      <span>Bãi biển Mỹ Khê, Đà Nẵng</span>
      </div>
      </div>
      <div className="flex gap-3">
      <button className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-red-500 group">
      <span className="material-symbols-outlined group-hover:fill-current">favorite</span>
      </button>
      <button className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-primary">
      <span className="material-symbols-outlined">share</span>
      </button>
      </div>
      </div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] mb-12 rounded-2xl overflow-hidden">
      <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Close up of artist painting on canvas with colorful acrylics" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3xTVFNo4qKB-rTZ7U4cIUiwjOqiwC0Z0pqDV9F-cVCRdRh2DKVJaqW_VE-0W2ly-J0aTnPBznFMLpMv7ejDvI5R6na3IbMY9FDq9JpYCBj_9Bsw52zjpLM_wvaQR_mJ4WTA_OLBmvs4abSrtig-O-sxeDpmfW8-ivzsOU_lkIk1WZC_dPGkR3scHRQ-A80EKsh0a1IwKGgsa2RUKEg-O7zEKGkxlRrCxVwFoSKcOCwFTmIfFag4HNZ_Jf1A2ICdEE6Qi7KjprMVuC')` }}></div>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
      </div>
      <div className="md:col-span-1 relative group cursor-pointer">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Bright art studio workshop space with easels" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDF6QmJfID8hl4ipHUp4UbZfmkMKmxu8ayIuR7Nr_GuJl0qrvgBwmghz43gSDTOJsBu2SS0MDWWvk0fb7Vem40CDpaemqyBFXU9VE7_N3XtMXFxqZUSEg2ziLd6N95LbrBt25SpLw8VY4cbmfUJPJdUGNswreEsEQXh74fIrt1h8e4PC7x7kBFcahwvhRxbuavMSd-vY-19yPXPUEX24-yIsfP9_EHe7p9kPCpZEHMI7x7Jnopw1daCmRbUaV-yzrRrAlYUvCczdNCl')` }}></div>
      </div>
      <div className="md:col-span-1 relative group cursor-pointer">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Finished colorful canvas paintings on display" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc6GJMxdoNULmQ6L_DNepv7zt1qKyFD9SbuzYJrwta3E4bA9pDJz8e-KEaD24jNGxABrDHF-a7Tj_JUSlJxferyPxmVfCGiFTUyx7Mppm9OY97pDjIj8BIfophresBnT32X241XUJgwKxurZGNFO525cE6bbXGVA9jGFFj036PfwziR2e7jA5NH7U0PCh9xJqYL563oVijVv-5A2ydWb1NZ7aiuLTURAxJ9u7d6POEWYMIZEYWy-l0qoaCZ8ZWpmSo6ZsexnIoZPom')` }}></div>
      </div>
      <div className="md:col-span-1 relative group cursor-pointer">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Group of friends painting and laughing together" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtF6KctFIh_nkzOzMUaS0Z_lWGLuZ8aRWO3YsLr9T05FkJV4PnzM3UGuWJkirmizEnkSdAN6WsD7lpEOUeIGucwoGoqr9jnYBueYLo2vazx4zDEsxmaTc4MrAhs5u3bCFC1YgNwUxKb640MskVWoYMj6GkSls-ckTZpaHKGdztTDn6QINNR6vMlQ1S3BC-j7KOuNQaTR0LJBXdHOY_HXvuHGWIjfGoLaGSEGDRK1HuPN8hes8G6gEF_krNJcV-aquw9oeB8GU4Ki-C')` }}></div>
      </div>
      <div className="md:col-span-1 relative group cursor-pointer">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Art supplies brushes and palette paints" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHSJ8ba9oGkeZyL95Jnp5m2YnJThkXbjWKkH1967cj3ahj_MtqYjl2R-HTEYcKFu2fBf76756UICMDQiRyoNAXfA5x5Z1o_wGgRTUzIo98qPsDhw6x0Z7h_KhRgVwEADwsVSBOipzRBMq-bdmGuT4g6FwgJXVrPTSmbqL7L3aYMp8P8LQhLtjybUJt2aNqbH3L3IfqzoaOvTa8tl_Y1762kT98SWVFNqmnR3U7rScFK5eqhIoRnUghnWutOPTDgSXJz1P5gUtDRfkT')` }}></div>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <span className="text-white font-bold text-lg flex items-center gap-2"><span className="material-symbols-outlined">grid_view</span> Xem tất cả ảnh</span>
      </div>
      </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
      {/* Left Column: Details */}
      <div className="lg:col-span-2 space-y-10">
      {/* About */}
      <section className="bg-neutral-surface dark:bg-neutral-surface-dark p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-xl">info</span></span> Về buổi Workshop</h2>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
      <p className="mb-4">Thỏa sức sáng tạo cùng workshop Vẽ Tranh Canvas Hoàng Hôn! Tọa lạc ngay gần bãi biển Mỹ Khê xinh đẹp, buổi học này được thiết kế cho cả người mới bắt đầu và những người đam mê hội họa. Bạn sẽ được hướng dẫn từng bước bởi họa sĩ địa phương giàu kinh nghiệm của chúng tôi, anh Minh, người chuyên về tranh phong cảnh acrylic.</p>
      <p>Tất cả vật liệu đều được cung cấp sẵn, bao gồm toan vẽ 40x50cm, sơn acrylic, cọ vẽ và tạp dề. Thưởng thức đồ uống miễn phí (cà phê, trà hoặc nước trái cây) trong khi bạn vẽ. Kết thúc buổi học kéo dài 3 giờ, bạn sẽ có tác phẩm của riêng mình để mang về làm kỷ niệm độc đáo từ Đà Nẵng.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
      <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thời lượng</span>
      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-primary">schedule</span> 3 Giờ</span>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cấp độ</span>
      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-primary">stairs</span> Cơ bản</span>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ngôn ngữ</span>
      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-primary">translate</span> Tiếng Anh, Tiếng Việt</span>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số lượng khách</span>
      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-primary">groups</span> Tối đa 10</span>
      </div>
      </div>
      </section>
      {/* Location */}
      <section className="bg-neutral-surface dark:bg-neutral-surface-dark p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-xl">info</span></span> Về buổi Workshop</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-4">123 Tran Bach Dang, My An, Ngu Hanh Son, Da Nang</p>
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden relative" data-location="Da Nang" style={{}}>
      {/* Simulated Map Image */}
      <div className="absolute inset-0 bg-cover bg-center" data-alt="Map view of Da Nang city streets" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtIWSx14MMPaeWx1lHgEP9j_vka6UJwxYzU1PiS5fBFzq4MxiU4dMUu72wR2DZ72Pfwh_WLOj2wXdl4tk0Bq9i0c1cOjbLAOkYAeltsd5A-JK2kEGC9scx0-ucB0_BG7CJ3gPhB2ne9vb4FS1hsT976fMmsvPNow8tkZXnrvCmtvdL0c_-Sx_S5YUpZhFut6muNCa7DITe2OcxzakoQmNMQf23-B_ecG7tnWYsp37jFCX4uUwGQ8NsNr42OQyKV_tY3mFyrbk3ue4l')` }}></div>
      <div className="absolute inset-0 bg-white/10 backdrop-grayscale-[0.5]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
      <span className="material-symbols-outlined text-5xl text-secondary drop-shadow-xl animate-bounce">location_on</span>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-full blur-[2px]"></div>
      </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg text-xs font-bold cursor-pointer hover:bg-slate-50">Mở trong Google Maps</div>
      </div>
      </section>
      {/* Reviews */}
      <section className="bg-neutral-surface dark:bg-neutral-surface-dark p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-xl">reviews</span></span> Đánh giá</h2>
      <a className="text-primary font-bold text-sm hover:underline" href="#">View all 128 reviews</a>
      </div>
      <div className="space-y-6">
      {/* Review Item 1 */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
      <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0" data-alt="Portrait of a smiling woman" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYykjwKwh16H2OcyB07_nWyYO-gOSQkdLk0FGRTOknlUIwmQbqJdoqmJ0d8fvaPpmcFMxEvWxCXjrWr-y5KpSK2BlGz7uxsBZU6cq_2vko7OMa7NLUIIPIaHQcJWqHgMiJZia5U6op-FJK4gGOPG3i4zzsOxETV96ml3KrQlTX4hIr_13sC5Ox7ugVmqtK3aX_vpZFuA8Xdvm3P2IzFwKL-945IQfW2dO_Fru1gKVqlIvDsbNHf4jXcF_hkipBJ_0SMtnU6yoUgEjz')` }}></div>
      <div>
      <div className="flex items-center gap-2 mb-1">
      <span className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
      <span className="text-slate-400 text-sm">• 2 ngày trước</span>
      </div>
      <div className="flex text-amber-500 text-sm mb-2">
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                              Absolutely loved this workshop! Minh was so patient and the studio atmosphere is incredibly relaxing. I'm not an artist but I came home with a painting I'm actually proud of. Highly recommend for a rainy afternoon in Da Nang.
                                          </p>
      </div>
      </div>
      </div>
      {/* Review Item 2 */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
      <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0" data-alt="Portrait of a man with glasses" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASmhpeMSElhn4r2bJICOuvNA6d1Hz9beCVp7STiPlzxVpccDKRHjTbL_RKzUxeaqcp2dUYX5Kq46MeEofzXBKXDQOZ6lL0ojratageJdQXl-JDFVbTHlAj-g5DB5booXPPoMop5YwMGRaojdbDvTFLLBv7fqvnRdRAVQmQPJFb8OAkf4IAIYsBsfuTtdbD3JVZGxlOMTSwXo_3jAYTP_M4U9AI92veH7u-YfkdGjun1dBrhietkD4CULLhRjBvsX9W8QGpeSWV46aj')` }}></div>
      <div>
      <div className="flex items-center gap-2 mb-1">
      <span className="font-bold text-slate-900 dark:text-white">David Chen</span>
      <span className="text-slate-400 text-sm">• 1 tuần trước</span>
      </div>
      <div className="flex text-amber-500 text-sm mb-2">
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined fill-current text-base">star</span>
      <span className="material-symbols-outlined text-base">star</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                              Great experience overall. The materials were high quality. I wish we had a bit more time towards the end to dry the paintings properly, but the staff helped pack them carefully.
                                          </p>
      </div>
      </div>
      </div>
      </div>
      </section>
      </div>
      {/* Right Column: Booking Card (Sticky) */}
      <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
      <div className="bg-neutral-surface dark:bg-neutral-surface-dark p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-start mb-6">
      <div>
      <span className="text-slate-500 text-sm font-medium">Giá mỗi người</span>
      <div className="flex items-baseline gap-1 mt-1">
      <span className="text-3xl font-bold text-slate-900 dark:text-white">450k</span>
      <span className="text-lg font-medium text-slate-500">VND</span>
      </div>
      </div>
      <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Còn chỗ</div>
      </div>
      {/* Date Picker Mockup */}
      <div className="space-y-4 mb-6">
      <div>
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Chọn ngày</label>
      <div className="relative">
      <select className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer font-medium">
      <option>Sat, Oct 28 - 2:00 PM</option>
      <option>Sun, Oct 29 - 9:00 AM</option>
      <option>Sun, Oct 29 - 2:00 PM</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
      <span className="material-symbols-outlined">calendar_month</span>
      </div>
      </div>
      </div>
      <div className="space-y-4">
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Thông tin người tham gia</label>
      {/* Participant 1 */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
      <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-primary uppercase tracking-wider">Người tham gia 1</span>
      </div>
      <div className="space-y-3">
      <input className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="Họ và tên" type="text"/>
      <input className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="Địa chỉ Email" type="email"/>
      <input className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="Số điện thoại" type="tel"/>
      </div>
      </div>
      {/* Add Another Participant Button */}
      <button className="w-full py-2 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm font-bold"><span className="material-symbols-outlined text-lg">add_circle</span> Thêm người tham gia</button>
      </div>
      </div>
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 text-sm font-medium mb-6 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg">
      <span className="material-symbols-outlined text-lg">local_fire_department</span>
      <span>Chỉ còn 4 chỗ cho ngày này!</span>
      </div>
      <button className="w-full py-3.5 px-6 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-secondary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">Đặt ngay</button>
      <div className="mt-4 text-center">
      <span className="text-xs text-slate-400">Chưa cần thanh toán hôm nay</span>
      </div>
      </div>
      {/* Policies Card */}
      {/* Find a Buddy Section */}
      <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20">
      <div className="flex items-center gap-3 mb-3">
      <span className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
      <span className="material-symbols-outlined">groups_2</span>
      </span>
      <div>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bạn đang tìm bạn đồng hành?</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kết nối với những người tham gia khác để cùng sáng tạo!</p>
      </div>
      </div>
      <button className="w-full py-2.5 px-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"><span className="material-symbols-outlined text-lg">forum</span> Tìm bạn đồng hành</button>
      </div><div className="bg-white dark:bg-neutral-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-start gap-3 mb-3">
      <span className="material-symbols-outlined text-slate-400">verified_user</span>
      <div>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Chính sách hủy bỏ</h4>
      <p className="text-xs text-slate-500 mt-1">Hủy miễn phí tối đa 24 giờ trước khi buổi workshop bắt đầu.</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Related Workshops */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
      <h2 className="text-2xl font-bold mb-8">Bạn cũng có thể thích</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="group bg-white dark:bg-neutral-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Hands working on a pottery wheel with clay" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0CIHZLmqpfmD3uGSK8bTEU-WGACEoRaEMeaPgwX-_1nGsqxmgBP2DpLzOj779dP65ojIIisQoC1252SdI0BYWmOlDAiLC5IQCgJgyPrtUnBaY9K1ciVQn7YLxxkUK-KslS1O4wy1Gh6--jfqVBKokCt8rF9KyqRj9y3CetFq_ZLx7xEouLY1t_fpyd4DgWjw8RMh5PQLrtM-VBrwlxmS19SuZvqYtVJ4zsh8PhUfNMBbpcPMBu1tWP7x9t6pUHQz2mtxN1-bcpQuU')` }}></div>
      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
      <span className="material-symbols-outlined text-amber-500 text-sm fill-current">star</span> 4.8
                              </div>
      </div>
      <div className="p-4">
      <div className="text-xs font-bold text-primary mb-2">Thủ công</div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">Làm nến thơm</h3>
      <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">3 giờ</span>
      <span className="font-bold text-slate-900 dark:text-white">350k VND</span>
      </div>
      </div>
      </div>
      {/* Card 2 */}
      <div className="group bg-white dark:bg-neutral-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Aromatic candles on a wooden table" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3dTPe3fBkPgCoCl3Z6Zq5I-9PehDnzi02A8_96ySVhNEZBBuGDN6X0J7jZyDDcvSxQYsKNRuQVgJ0Gvte7z0h-Bs3auNd0hjZgCv-RXmvAzeDFoaMw96-XpGgDxW_2IYsGIhsJIecbJoYXZoY72K9FetK3QGFNEyL1U4_Xf6OmqHlBl3q8k7dWKqAhcBceqatvKM7LWFH0SC58kJc0g-NnjrPB_Kvb62vzBCSM5Hf-LfjAVdJYmdlkHBXGJbDjq-QkpjpKvKlqbIv')` }}></div>
      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
      <span className="material-symbols-outlined text-amber-500 text-sm fill-current">star</span> 4.9
                              </div>
      </div>
      <div className="p-4">
      <div className="text-xs font-bold text-primary mb-2">Thủ công</div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">Làm nến thơm</h3>
      <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">3 giờ</span>
      <span className="font-bold text-slate-900 dark:text-white">300k VND</span>
      </div>
      </div>
      </div>
      {/* Card 3 */}
      <div className="group bg-white dark:bg-neutral-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Tote bag with embroidery design" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAd5EZFFyKoKYORXukrXvhD4-sCxcWKBkhEh0lixxwgVT07qnxd3Fz9SjQB2f5GeXSFWPBLxRUiyp8Xv3ryl7fV4GP36DABwyC4LpPoHUTcnrHl58Lpw6_s18jzzEagtwtLq5cZa7TQEqBEFW-sp61U5J9dWBKO6dgsvAxZYZ8M8rE-D-B_UaWt5sUXel6I8R1BV7bj-I4TTJpUZqZAhKE3cE437TL0ud0ICDBnVc63sinkk44yhN0IncrBeiMgqsDP1i1FRAFUOmY_')` }}></div>
      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
      <span className="material-symbols-outlined text-amber-500 text-sm fill-current">star</span> 5.0
                              </div>
      </div>
      <div className="p-4">
      <div className="text-xs font-bold text-primary mb-2">Dệt may</div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">Thêu túi Tote</h3>
      <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">3 giờ</span>
      <span className="font-bold text-slate-900 dark:text-white">380k VND</span>
      </div>
      </div>
      </div>
      {/* Card 4 */}
      <div className="group bg-white dark:bg-neutral-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Assorted handmade jewelry beads" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvTYSDBdEWQPEkA4kBlbifLt3SzWz3ZRBBpmj6yYdPG73a0mfCO9y4vpMqqSSwv1FQVzEM3_GM7CruOvGMCLEYGQV31t84wDzY3GAlA3icjsXMp9bGA7olDixzYpgTsf_z92lL2fSs5IKIOcLF4ADjHwTwvlPe1lE15Qti1CwL8bbVHLlOzlzHKy4bqk5wfwuw3_5Bh7rHOI8fHHxFo97B--D_VVv8FqL0bDMZYdFgAz_nmZM4IWtVENtcyrMLH0up-3aA40TDybfy')` }}></div>
      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
      <span className="material-symbols-outlined text-amber-500 text-sm fill-current">star</span> 4.7
                              </div>
      </div>
      <div className="p-4">
      <div className="text-xs font-bold text-primary mb-2">Trang sức</div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">Workshop làm vòng tay hạt</h3>
      <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">1.5 giờ</span>
      <span className="font-bold text-slate-900 dark:text-white">250k VND</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-surface-dark border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-[1280px] mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
      <span className="material-symbols-outlined text-xl">palette</span>
      </div>
      <span className="text-lg font-bold text-slate-900 dark:text-white">Hands &amp; Hour</span>
      </div>
      <div className="text-slate-500 text-sm">© 2023 Hands &amp; Hour Đà Nẵng. Bảo lưu mọi quyền.</div>
      <div className="flex gap-4">
      <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
      <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">camera_alt</span></a> {/* Instagram equiv */}
      </div>
      </div>
      </div>
      </footer>
      </div>
    </>
  );
}
