import { useNavigate, Link } from 'react-router-dom';
export default function HostDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light text-text-main h-screen overflow-hidden flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 h-full bg-surface-light border-r border-gray-100 flex flex-col justify-between p-6 flex-shrink-0 z-20 shadow-sm relative">
      <div className="flex flex-col gap-8">
      {/* Brand */}
      <div className="flex items-center gap-3">
      <div className="bg-primary/10 rounded-xl p-2">
      <span className="material-symbols-outlined text-primary text-3xl">palette</span>
      </div>
      <div className="flex flex-col">
      <h1 className="text-text-main text-lg font-bold leading-tight">Hands &amp; Hour</h1>
      <p className="text-text-muted text-xs font-medium">Cổng Người tổ chức</p>
      </div>
      </div>
      {/* Navigation Links */}
      <div className="flex flex-col gap-2">
      <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-colors" to="/home">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="text-sm font-bold">Bảng điều khiển</span>
      </Link>
      <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-muted hover:text-text-main transition-colors group" to="/home">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">calendar_month</span>
      <span className="text-sm font-medium">Lịch</span>
      </Link>
      <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-muted hover:text-text-main transition-colors group" to="/home">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">star</span>
      <span className="text-sm font-medium">Đánh giá</span>
      </Link>
      <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-muted hover:text-text-main transition-colors group" to="/home">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">payments</span>
      <span className="text-sm font-medium">Thu nhập</span>
      </Link>
      </div>
      </div>
      {/* Create Button & User Profile */}
      <div className="flex flex-col gap-6">
      <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
      <span className="material-symbols-outlined text-[20px]">add</span>
      <span className="text-sm font-bold">Tạo Workshop</span>
      </button>
      <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-200 bg-cover bg-center border-2 border-white shadow-sm" data-alt="Portrait of a smiling female workshop host" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbsdGo94f442fWs1sV_q1aniclUx_9Za5TUK5e0TqEURYe_bb4r_HUa2X81Deqzst28u8xDNhsXJNhUkWQUJMIr47_ORCbSZ81x701blNMjT8-DWk11UO42p-5teYq_tPFZlIJ3qrTnwtpGoaLP4_vxGdIrfalLSPW5m4E0STNo5c62psj9wZoYbrTC53JssvZmMw9IkSOGdeOMOmOgl-PhiWW3dZDLz_5gHcz5nK4egnQeobEC8puF5uLRGogaWXKlSnjAicg6V-g');"></div>
      <div className="flex flex-col">
      <p className="text-sm font-bold text-text-main">Sarah Nguyen</p>
      <p className="text-xs text-text-muted">Bậc thầy Gốm sứ</p>
      </div>
      </div>
      </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background-light p-8 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
      <h2 className="text-3xl md:text-4xl font-black text-text-main mb-2">Chào mừng trở lại, Sarah! 👋</h2>
      <p className="text-text-muted text-base md:text-lg">Here's what's happening with your creative workshops in Da Nang.</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-text-muted bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
      <span className="material-symbols-outlined text-primary">location_on</span>
                          Da Nang, Vietnam
                      </div>
      </header>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stat Card 1 */}
      <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-primary-light p-3 rounded-xl text-primary">
      <span className="material-symbols-outlined">confirmation_number</span>
      </div>
      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">+12%</span>
      </div>
      <div>
      <p className="text-text-muted text-sm font-medium mb-1">Tổng lượt đặt chỗ</p>
      <h3 className="text-3xl font-bold text-text-main">Workshop đang hoạt động</h3>
      </div>
      </div>
      {/* Stat Card 2 */}
      <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-blue-50 p-3 rounded-xl text-blue-500">
      <span className="material-symbols-outlined">event_available</span>
      </div>
      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">+2 Mới</span>
      </div>
      <div>
      <p className="text-text-muted text-sm font-medium mb-1">Lịch trống sắp tới</p>
      <h3 className="text-3xl font-bold text-text-main">Workshop đang hoạt động</h3>
      </div>
      </div>
      {/* Stat Card 3 */}
      <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
      <div className="bg-orange-50 p-3 rounded-xl text-orange-500">
      <span className="material-symbols-outlined">attach_money</span>
      </div>
      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">+5%</span>
      </div>
      <div>
      <p className="text-text-muted text-sm font-medium mb-1">Tổng doanh thu</p>
      <h3 className="text-3xl font-bold text-text-main">Workshop đang hoạt động</h3>
      </div>
      </div>
      </div>
      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Revenue Chart & My Workshops */}
      <div className="lg:col-span-2 flex flex-col gap-8">
      {/* Revenue Chart Section */}
      <div className="bg-surface-light p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
      <div>
      <h3 className="text-lg font-bold text-text-main">Workshop đang hoạt động</h3>
      <p className="text-sm text-text-muted">Thu nhập từ các buổi workshop của bạn</p>
      </div>
      <select className="bg-gray-50 border-none text-sm font-medium text-text-main rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/50 cursor-pointer">
      <option>Tuần này</option>
      <option>Tuần trước</option>
      </select>
      </div>
      {/* Simple CSS Bar Chart */}
      <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
      {/* Mon */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 45%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">T2</span>
      </div>
      {/* Tue */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 60%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">T3</span>
      </div>
      {/* Wed */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 30%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">T4</span>
      </div>
      {/* Thu */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 75%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">T5</span>
      </div>
      {/* Fri */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary group-hover:bg-primary-dark transition-all duration-500 rounded-t-lg shadow-lg shadow-primary/20" style="height: 90%;"></div>
      </div>
      <span className="text-xs font-bold text-text-main">T6</span>
      </div>
      {/* Sat */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 85%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">T7</span>
      </div>
      {/* Sun */}
      <div className="flex flex-col items-center gap-3 group w-full">
      <div className="w-full bg-gray-100 rounded-t-lg relative h-48 flex items-end overflow-hidden">
      <div className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg" style="height: 50%;"></div>
      </div>
      <span className="text-xs font-bold text-text-muted">CN</span>
      </div>
      </div>
      </div>
      {/* My Workshops List */}
      <div className="bg-surface-light rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
      <h3 className="text-lg font-bold text-text-main">Workshop đang hoạt động</h3>
      <button className="text-sm font-semibold text-primary hover:text-primary-dark">Xem tất cả</button>
      </div>
      <div className="divide-y divide-gray-100">
      {/* Workshop Item 1 */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center group hover:bg-gray-50 transition-colors">
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gray-200 bg-cover bg-center shrink-0 shadow-sm" data-alt="Hands working on a pottery wheel with clay" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbDKaFrFVXqSMO-GHo3Xq6KQGIOT6piFrdP471RPb3_puk80MKZd5zEytldrcF5OgwO4wn2uVMd5uBcqC5iZaICzSPzIQwhRFP36yxhGQAE6QqRKXikTvj1f93Fv3EPiDLz7fknIoJOxrb85a5YNV3-oUDvN92bIqEhDBjG326YXt2smvlAea_fEn651Wj7iVTwtv1OdoVyaeiV2FEjzM_Op-lJi33T1077qkdscQ-63-Qn3-5M25kMS9n6QMn5TZdtVhAU9eVbPvX');"></div>
      <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-text-main truncate group-hover:text-primary transition-colors">Vietnamese Pottery Basics</h4>
      <p className="text-sm text-text-muted mt-1">Buổi tiếp theo: Ngày mai, 10:00 SA</p>
      </div>
      <div className="flex items-center gap-6">
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Đã đặt</p>
      <p className="text-base font-bold text-text-main">8/10</p>
      </div>
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Giá</p>
      <p className="text-base font-bold text-text-main">450k ₫</p>
      </div>
      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">more_vert</span>
      </button>
      </div>
      </div>
      {/* Workshop Item 2 */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center group hover:bg-gray-50 transition-colors">
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gray-200 bg-cover bg-center shrink-0 shadow-sm" data-alt="Abstract painting on canvas with colorful acrylics" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-2ire9Z6_BoWCHX18qTayPoyKn50XAy5cYYU8Qy5pg7CYkknYVSLkJnLoeV8hr4Cf_HLDXPSQkH8SN1HveDRnjoTl6SG9khEHl48LaR_PzD5glse0r9xVKSlain6VxVYxD1jCXIdOqaXTYeFM-Ryxk13p-EXYRdysQSSPEM_tXrJ9P0VMgEffXVq9p00HKO8_ff5SU7dP1Q-1wAggdGnAoWS1RrNIQZ4ZJX72BeTfQLAoyhWPtiToSWpJEzqnTY5bdeCpL11ldts');"></div>
      <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-text-main truncate group-hover:text-primary transition-colors">Acrylic Pouring Art</h4>
      <p className="text-sm text-text-muted mt-1">Buổi tiếp theo: Ngày mai, 10:00 SA</p>
      </div>
      <div className="flex items-center gap-6">
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Đã đặt</p>
      <p className="text-base font-bold text-text-main">12/12</p>
      </div>
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Giá</p>
      <p className="text-base font-bold text-text-main">500k ₫</p>
      </div>
      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">more_vert</span>
      </button>
      </div>
      </div>
      {/* Workshop Item 3 */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center group hover:bg-gray-50 transition-colors">
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gray-200 bg-cover bg-center shrink-0 shadow-sm" data-alt="Traditional lantern making materials on a table" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOB2tkfd4WIjiNLhgiUqIZ3Ge8JT5ibsehkuuaawbNz90O5Y-4KP2o-LNdrhhlFgDQcrGmZPNdX5kQBE1TVS8rFCAjJjtN5tgUOofJ-55F4U6zkni6hxXcTBI26D9n5IvBwpdcpMZ385SrlaWclUsM-2jIkI1-ge64ZLYE9W3FCf1VgRJPwIcPHcYPuhs_CukmTHv_71kR1-dvc6hrSm07IjH7A9D-6QG58n6SECbOKA3E82FdYycwJfm-vJG8ytVsQGoyZK9AMVAb');"></div>
      <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-text-main truncate group-hover:text-primary transition-colors">Lantern Making Workshop</h4>
      <p className="text-sm text-text-muted mt-1">Buổi tiếp theo: Thứ 7, 4:00 CH</p>
      </div>
      <div className="flex items-center gap-6">
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Đã đặt</p>
      <p className="text-base font-bold text-text-main">4/8</p>
      </div>
      <div className="text-center">
      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Giá</p>
      <p className="text-base font-bold text-text-main">350k ₫</p>
      </div>
      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">more_vert</span>
      </button>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Right Column: Calendar & Notifications */}
      <div className="lg:col-span-1 flex flex-col gap-8">
      {/* Calendar Widget */}
      <div className="bg-surface-light rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-text-main">Lịch trình</h3>
      <button className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors">
      <span className="material-symbols-outlined">calendar_today</span>
      </button>
      </div>
      {/* Mini Calendar Header */}
      <div className="flex justify-between items-center mb-4 px-2">
      <button className="text-gray-400 hover:text-text-main"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
      <span className="text-sm font-bold text-text-main">Tháng 10 2023</span>
      <button className="text-gray-400 hover:text-text-main"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
      </div>
      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center mb-2">
      <span className="text-xs text-text-muted font-medium py-2">T2</span>
      <span className="text-xs text-text-muted font-medium py-2">T3</span>
      <span className="text-xs text-text-muted font-medium py-2">T4</span>
      <span className="text-xs text-text-muted font-medium py-2">T5</span>
      <span className="text-xs text-text-muted font-medium py-2">T6</span>
      <span className="text-xs text-text-muted font-medium py-2">T7</span>
      <span className="text-xs text-text-muted font-medium py-2">CN</span>
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 text-center gap-y-2 mb-6">
      {/* Previous month days faded */}
      <span className="text-xs text-gray-300 py-2">28</span>
      <span className="text-xs text-gray-300 py-2">29</span>
      <span className="text-xs text-gray-300 py-2">30</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">1</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">2</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">3</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">4</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">5</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">6</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">7</span>
      <span className="text-xs text-white bg-primary rounded-lg font-bold shadow-md shadow-primary/30 py-2 cursor-pointer relative">
                                      8
                                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
      </span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer relative">
                                      9
                                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
      </span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">10</span>
      <span className="text-xs text-text-main py-2 hover:bg-gray-50 rounded-lg cursor-pointer">11</span>
      {/* ... more rows conceptually ... */}
      </div>
      {/* Today's Schedule */}
      <div className="flex flex-col gap-3">
      <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">CÁC BUỔI HÔM NAY</p>
      <div className="flex gap-3 items-start p-3 bg-primary/5 rounded-xl border-l-4 border-primary">
      <div className="flex flex-col items-center min-w-[3rem]">
      <span className="text-xs font-bold text-text-main">2:00</span>
      <span className="text-[10px] text-text-muted">CH</span>
      </div>
      <div>
      <p className="text-sm font-bold text-text-main leading-tight">Pottery Basics</p>
      <p className="text-xs text-text-muted mt-1">8 người tham gia • 2 giờ</p>
      </div>
      </div>
      <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl border-l-4 border-gray-300">
      <div className="flex flex-col items-center min-w-[3rem]">
      <span className="text-xs font-bold text-text-main">5:30</span>
      <span className="text-[10px] text-text-muted">CH</span>
      </div>
      <div>
      <p className="text-sm font-bold text-text-main leading-tight">Studio Cleanup</p>
      <p className="text-xs text-text-muted mt-1">Bảo trì • 1 giờ</p>
      </div>
      </div>
      </div>
      </div>
      {/* Recent Tips/Alerts */}
      <div className="bg-gradient-to-br from-primary to-orange-400 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
      <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-white/90">tips_and_updates</span>
      <span className="text-sm font-bold text-white/90 uppercase tracking-wide">MẸO CHUYÊN GIA</span>
      </div>
      <h4 className="text-xl font-bold mb-2">Tăng lượt đặt chỗ của bạn!</h4>
      <p className="text-sm text-white/80 mb-4 leading-relaxed">Những người tổ chức thêm 3+ ảnh vào thư viện workshop sẽ thấy lượt đặt chỗ tăng 20%.</p>
      <button className="text-xs font-bold bg-white text-primary px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">Cập nhật Thư viện</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
    </>
  );
}
