import { useNavigate, Link } from 'react-router-dom';
export default function CommunityMomentsFeed() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="px-6 md:px-10 lg:px-40 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
      <Link className="flex items-center gap-3 text-text-main dark:text-white" to="/home">
      <div className="size-8 text-primary">
      <svg className="w-full h-full" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      <h2 className="text-xl font-bold tracking-tight">Hands &amp; Hour</h2>
      </Link>
      <div className="hidden lg:flex w-full max-w-sm items-center rounded-xl bg-background-light dark:bg-background-dark border border-transparent focus-within:border-primary/50 transition-colors">
      <div className="pl-4 text-text-sub dark:text-gray-400">
      <span className="material-symbols-outlined text-[20px]">search</span>
      </div>
      <input className="w-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub dark:placeholder:text-gray-500 py-2.5 px-3 text-sm" placeholder="Tìm kiếm workshop, người sáng tạo..." type="text"/>
      </div>
      </div>
      <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-6">
      <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" to="/login">Workshop</Link>
      <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" to="/register">Cộng đồng</Link>
      <a className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" href="#">Giảng viên</a>
      </nav>
      <div className="flex gap-3">
      <Link to="/login" className={"hidden sm:flex h-10 px-5 items-center justify-center rounded-xl bg-background-light dark:bg-gray-800 text-text-main dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" }>Đăng nhập</Link>
      <Link to="/register" className="bg-primary hover:bg-primary-dark text-text-main font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-primary/20">Đăng ký</Link>
      </div>
      </div>
      </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-40 py-8">
      {/* Hero / Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
      <div className="flex flex-col gap-3 max-w-2xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider w-fit"><span className="material-symbols-outlined text-[16px]">celebration</span> BỘ SƯU TẬP CỘNG ĐỒNG</div>
      <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white tracking-tight">Khoảnh khắc Workshop</h1>
      <p className="text-text-sub dark:text-gray-400 text-lg">Xem cộng đồng sáng tạo tại Đà Nẵng đang làm gì! Từ bàn xoay gốm đến khung tranh, hãy khám phá niềm vui của đồ thủ công.</p>
      </div>
      <button className="flex items-center gap-2 h-12 px-6 rounded-xl bg-text-main dark:bg-white text-white dark:text-text-main font-bold shadow-xl hover:translate-y-[-2px] transition-transform"><span className="material-symbols-outlined">add_a_photo</span> Chia sẻ khoảnh khắc</button>
      </div>
      {/* Filters */}
      <div className="sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-primary text-white font-medium text-sm shadow-md shadow-primary/20 transition-all"><span className="material-symbols-outlined text-[18px]">grid_view</span> Tất cả</button>
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-sub dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary dark:hover:text-primary transition-all"><span className="material-symbols-outlined text-[18px]">brush</span> Gốm sứ</button>
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-sub dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary dark:hover:text-primary transition-all"><span className="material-symbols-outlined text-[18px]">palette</span> Hội họa</button>
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-sub dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary dark:hover:text-primary transition-all"><span className="material-symbols-outlined text-[18px]">styler</span> Thêu thùa</button>
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-sub dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary dark:hover:text-primary transition-all"><span className="material-symbols-outlined text-[18px]">diamond</span> Trang sức</button>
      <button className="flex h-10 shrink-0 items-center gap-2 px-5 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-sub dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary dark:hover:text-primary transition-all"><span className="material-symbols-outlined text-[18px]">local_florist</span> Cắm hoa</button>
      </div>
      </div>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {/* Card 1: Photobooth Mode (Featured) */}
      <div className="break-inside-avoid relative group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      {/* Image Container with Frame Effect */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 dark:bg-rose-900/20 p-4 flex items-center justify-center">
      <div className="absolute inset-0 border-4 border-dashed border-rose-300 dark:border-rose-700 m-2 rounded-lg pointer-events-none z-10"></div>
      {/* Sticker */}
      <div className="absolute top-6 right-6 z-20 transform rotate-12 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-1 rounded shadow-lg border-2 border-white">TÔI ĐÃ LÀM NÓ!</div>
      <img alt="Happy woman holding handmade pottery mug" className="w-full h-full object-cover rounded shadow-md transform group-hover:scale-105 transition-transform duration-500" data-alt="Happy woman holding handmade pottery mug" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8v6j4wX99_YXuqq5AM89SUb-vIjFkLK7ejp_-Th3kbSIK0trKMOUEflGx6Tu8R1OG07tark9zsClcU9DRKK9hrgDJ1lwph4REmVe5zak-zb5fnYKxEolPt81_4HDNEwQdfh4bABnhghjXkK2jYEIcc7IZXD1S9R4peb9AEHR3nwzq3LU8EGOsdYEV5fuPK3GGr_rucjdauO21fRpY0xMvYDJ3QCZSyitE1nOI61d8ySWv7Ez4zhZkeLx5Rq3pCRftnh6TldBErbxB"/>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
      <div className="flex items-center gap-2">
      <img alt="User Avatar" className="size-8 rounded-full border-2 border-white dark:border-surface-dark" data-alt="User profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWlXr0CnWpu9FdmcGXPAJccXHbnEgqQn6NPJp5w0lU5sXLSAabsN3mT4w4YKWzm3v0NUAd-0qw8xKXZDUWY1mp_Tu5jWZTcjXGoGURGMrIBRMDhN91G2fsW-LRLvs9dK1H3VEKceI4QQii1Jl-njVds4lndyXngd1RjrK1lEP6XWDuglZVkSrVU_G-JrfGc5DDgrBlT-BbQJX2dDZXsG84rAI9SPuPLGtuICbafBHPBRA500tQJ7X-c0xBnUQ75s4Gzu7XodDHsymN"/>
      <div className="flex flex-col">
      <span className="text-sm font-bold text-text-main dark:text-white leading-none">Linh Nguyen</span>
      <span className="text-xs text-text-sub dark:text-gray-500">Workshop Gốm sứ</span>
      </div>
      </div>
      <button className="text-rose-500 hover:scale-110 transition-transform">
      <span className="material-symbols-outlined fill-current">favorite</span>
      </button>
      </div>
      </div>
      </div>
      {/* Card 2: Normal Post */}
      <div className="break-inside-avoid">
      <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
      <div className="aspect-square relative group">
      <img alt="Colorful abstract oil painting on canvas" className="w-full h-full object-cover" data-alt="Colorful abstract oil painting on canvas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWqOodFQX7EIbkUw6KCSq98VzsWP5ITyETm9DNPHMmPEcnhs1mexk8RNGprDlrnbGSavhD8nAMYSwkLGjzNgY0WAduRko8A3EAHL_r7aJZgR7n-d2HBtl2wSu5grerdDAf_CFirLMJ4q54oEnvUAtI6F_ip20ZBmEXm4skwxIxkfVlkJqNpul8SKlO4x0fpserAdSzmRxRowg8d5JFcAbJG6hNckJhsVaFPxGHQYkjJIJYWUcqZzYojZw2iBMH2AWyVlvXHeUFJzj6"/>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
      <div className="flex items-center gap-1 text-white font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
      <span className="material-symbols-outlined text-[18px]">favorite</span> 24
                                   </div>
      </div>
      </div>
      <div className="p-4">
      <div className="flex items-start justify-between mb-2">
      <h3 className="font-bold text-text-main dark:text-white">Hoàng hôn trừu tượng</h3>
      <div className="flex text-yellow-400 text-[14px]">
      <span className="material-symbols-outlined fill-current">star</span>
      <span className="material-symbols-outlined fill-current">star</span>
      <span className="material-symbols-outlined fill-current">star</span>
      <span className="material-symbols-outlined fill-current">star</span>
      <span className="material-symbols-outlined fill-current">star</span>
      </div>
      </div>
      <p className="text-sm text-text-sub dark:text-gray-400 line-clamp-2">Lần đầu thử vẽ tranh sơn dầu và tôi thực sự bị mê hoặc bởi kết quả này!</p>
      <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-700 flex items-center gap-2">
      <img alt="User Avatar" className="size-6 rounded-full" data-alt="User profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoYMOfuhSrCgzKcb1j4gxGdT6YQgiHkgjJFmIAZlJ9fdFpXJdeK6lcw3LxkTt884V7oALpEkfJbCt4S3_Sy5TVDQMeFl-sZA7vh0CS6YDkSHIHgsgv1zOTcbfVGXIjjXmVDkhTKvIguxffybZHDBaTZYpGjF6vQtJCNCZ7YhpZjNoXpBYxf7TrqUWLO_yIaavlltb22CVGmBD-qfhuK9DWKd_2k2VLBk6I1Q-bf9MohtS8Zcx7f60EH4ifZiSUFP6OnMQdiGfBiyVJ"/>
      <span className="text-xs font-medium text-text-sub dark:text-gray-500">bởi Sarah Jenkins</span>
      </div>
      </div>
      </div>
      </div>
      {/* Card 3: Photobooth Mode */}
      <div className="break-inside-avoid relative group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-blue-50 dark:bg-blue-900/20 p-3 flex items-center justify-center">
      {/* Frame decorations */}
      <div className="absolute top-2 left-2 size-3 rounded-full bg-blue-300 dark:bg-blue-600"></div>
      <div className="absolute top-2 right-2 size-3 rounded-full bg-blue-300 dark:bg-blue-600"></div>
      <div className="absolute bottom-2 left-2 size-3 rounded-full bg-blue-300 dark:bg-blue-600"></div>
      <div className="absolute bottom-2 right-2 size-3 rounded-full bg-blue-300 dark:bg-blue-600"></div>
      {/* Sticker */}
      <div className="absolute bottom-8 left-4 z-20 bg-white dark:bg-surface-dark text-text-main dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-gray-200 dark:border-gray-700 flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-blue-500">water_drop</span> Mới ra lò</div>
      <img alt="Blue ceramic vase on wooden table" className="w-full h-full object-cover rounded-lg shadow-inner" data-alt="Blue ceramic vase on wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZFRJzXDTfH46MFEujI-zg4kFY6DCPoj2yk4pLGwGOPgE1bRzzahfdWMC0S8deAmJ4gWUsJ7cBMVRwlBm3yKWoFSP80p8pzDa2l0PNT53lIeLZZUUBJudsgjfniKxw15zl4nfLuYfylp0KNFc6o6diAR_tQyBOecubA6bJAOLGyDRzvo8XxpNannw16IMkcFEpIfbFar90HbcW8uHbjXb5RvZpy5k3-oT3rfj6LjDoLMkHBP93-9ZWXMoL0SUN7NaqzDw5-yo_n8Ln"/>
      </div>
      <div className="mt-3 px-1">
      <p className="text-sm font-bold text-text-main dark:text-white">Bình sóng xanh 🌊</p>
      <div className="flex justify-between items-center mt-2">
      <span className="text-xs text-text-sub dark:text-gray-500">Da Nang Pottery Studio</span>
      <button className="text-text-sub dark:text-gray-500 hover:text-rose-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">favorite</span>
      </button>
      </div>
      </div>
      </div>
      </div>
      {/* Card 4: Normal Post */}
      <div className="break-inside-avoid">
      <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
      <div className="aspect-[4/3] relative">
      <img alt="Hands creating floral arrangement" className="w-full h-full object-cover" data-alt="Hands creating floral arrangement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE9qsY-yHPHKozcUQ4iS4w-m4E9KcUDEs-VMBjP5AM47TV9iKr1C5-JBqXoup2MhhPdJX83fSWoGyaAVr_j2MvP_ePWtIMWxs87MSMZx9yMPDnIcBhgzR1NDO31CghRnLfBCY_TQMCyjd2lJhnwPOtkRuejz5WeSYROHAzcLxrRDotjnNYA3lMTxBqW-SU66IaC_2wFYN-QI0hrMi7fw06VIzIRaJkbxbVnYjYfSgw0hM-JtciTNZrhBd7cF6rD8lFTssBPDfWm28I"/>
      </div>
      <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Cắm hoa</span>
      <div className="flex text-yellow-400 text-[12px] ml-auto">
      <span className="material-symbols-outlined fill-current text-[16px]">star</span>
      <span className="material-symbols-outlined fill-current text-[16px]">star</span>
      <span className="material-symbols-outlined fill-current text-[16px]">star</span>
      <span className="material-symbols-outlined fill-current text-[16px]">star</span>
      <span className="material-symbols-outlined fill-current text-[16px]">star_half</span>
      </div>
      </div>
      <p className="text-sm font-medium text-text-main dark:text-white mb-1">Một buổi chiều chủ nhật ý nghĩa</p>
      <p className="text-xs text-text-sub dark:text-gray-400">Giảng viên rất kiên nhẫn với những người mới bắt đầu như chúng tôi.</p>
      </div>
      </div>
      </div>
      {/* Card 5: Photobooth Mode */}
      <div className="break-inside-avoid relative group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-purple-50 dark:bg-purple-900/20 p-2">
      <div className="h-full w-full rounded-lg border-2 border-purple-200 dark:border-purple-800 relative overflow-hidden">
      <img alt="Silver ring with gemstone" className="w-full h-full object-cover" data-alt="Silver ring with gemstone" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2zv-8naHDbh5xq_wXprGVGg_nA_ocdGEkfRlfJYD_VrPdP3NXukc_WvKSzzxuwzo920a_QQ5uf48y1BK8eMh7xrEl1z8bTXOT8eC2emF9PNTAcdY3LEFeU-ZcgK7V0YQcXUKepMU7Zm7dMb-nNRBiMtQfUF7ueaMDVLxauujZ8wKUiFOdpLezKeAftBuyXSXIfMoX7pYQOKJ4OilRFLkcV3AOewXDeWlRt4KY4I2ek_5U3rMA6iJlBTfUwllOIZo0JY36p4s644c"/>
      {/* Overlay Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 dark:bg-yellow-600/50 rotate-2 shadow-sm"></div>
      </div>
      {/* Sticker */}
      <div className="absolute bottom-3 right-3 z-20">
      <span className="text-2xl filter drop-shadow-md">✨</span>
      </div>
      </div>
      <div className="mt-3 flex items-center gap-3 px-1">
      <img alt="User Avatar" className="size-8 rounded-full border-2 border-purple-100" data-alt="User profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwvPZVZsZI0ULjyAItCujuNr-pOQIPVV0eP0_ZKcMVqyVi9P0FUI_Mjn2XF071-HxwjPk5AfSh60WJE3psxkttHpXQQkEER_06-7TGyEPO7aBo65v0_gG8GaNmaEndNagRkpEXQz88NxllvJqWHKq2uyYswpXvpOZhnVvnYsw2BwtBb2tijPJMqtzFElVQYBxBG_s7QAMBOlPMIZ3kAC4XpRcbbj_wPoZ3CqxRu3R3wOQteHbR4G7_KyoQFAqttAzjdNzrkiZkO96m"/>
      <div className="flex flex-col">
      <span className="text-sm font-bold text-text-main dark:text-white">Nhẫn bạc</span>
      <span className="text-xs text-text-sub dark:text-gray-500">@JewelryClass</span>
      </div>
      </div>
      </div>
      </div>
      {/* Card 6: Normal Post */}
      <div className="break-inside-avoid">
      <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
      <div className="aspect-[3/4] relative">
      <img alt="Handmade tote bag with painted design" className="w-full h-full object-cover" data-alt="Handmade tote bag with painted design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByC-eQvTr_aljqsHqtpaREx5aniFQqZ3LTJMjvCR7SwoGf6OD_wVj5hBuO9Vn7Ltzhbb2kG9Ymmffisch4MtDJ0AZBJfX10F4BnuGKwyRj_w5kEXe50-LY7UHwaDHuSUOOh5_OYe5kYsS0hpqoOVgnQ3fCKFqwLBzCfx8Lx4THmo93KITLydrwDDFvQjcZhREAEotxIv-ELk3lD6Cjqw-K1iWDbAoCzih6E0ZUsJb02hHLWXiKdijb01jn510v9HujRRS8H4cCkzzo"/>
      </div>
      <div className="p-4">
      <h3 className="font-bold text-text-main dark:text-white mb-1">Workshop Túi vải Eco</h3>
      <p className="text-sm text-text-sub dark:text-gray-400">Cuối cùng cũng tự tay làm được chiếc túi riêng để đi chợ! 🌿</p>
      <div className="flex gap-2 mt-3">
      <span className="px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold uppercase">Eco</span>
      <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase">Art</span>
      </div>
      </div>
      </div>
      </div>
      {/* Card 7: Photobooth Mode */}
      <div className="break-inside-avoid relative group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 p-4">
      <div className="w-full h-full bg-white dark:bg-surface-dark p-1 shadow-md rotate-1 transform transition-transform group-hover:rotate-0">
      <img alt="Macrame wall hanger" className="w-full h-full object-cover" data-alt="Macrame wall hanger" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUFEst7_lPRcjZ4kOm6rWdMCh4uGsmkMZFp2-cAVag9Fmrei2KhxZWHX-_2buf8Fg7MnM8wOREmmwEwWFKIN0TQweOHOaJ9xsHxlGeItzwvqQ4aPdUStB02rSUGXS-AvJFFMswqA1CHO7TL972H6Fa8dL0BoZ7XEPQCXbskBeKBNqgjAIXISqEqSsvXiA6fYstEeZOB8p8ZF39gXlcGJcB7MwgXXzP90WV6KNCzr_1TfelDydvxaYswLkcHfSYX3BYnivbAbIlWhWv"/>
      </div>
      {/* Sticker */}
      <div className="absolute top-4 left-4 z-20 -rotate-12">
      <div className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-wide">THỦ CÔNG</div>
      </div>
      </div>
      <div className="mt-3 px-1 flex justify-between items-center">
      <div className="flex -space-x-2">
      <img alt="Liker 1" className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark" data-alt="User avatar small" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJTGXD3kpOlQgGRYAyTGOUjmMihcdKdv6U2ZfofbKGSjXU6qi97zwdM6QKwtN-P_zZG-70_zaw0PwJYbI3i5dCdTA4kjp2hOzCdEiMjqXfcr9QHdfWLXnUHHmmCJ3kw0L4-ZAdbPXJgfjagwVZr59Xmjg6XFlLIUXOhx2N163NVfCy8FriKADELXf54t4auIHal9NmA2FlHMW1X0iQLbkRORuwihayAJ-5D2bsIkURbWEkQclYSTxW_tIyZ1BE842yZSfo2X6qAdXN"/>
      <img alt="Liker 2" className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark" data-alt="User avatar small" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqnpzQCJ4GUeEnxGwhVD7YlMIFEdSJaPeFQ9sn99lnfimPTfM8EdmmJSVKIliRlvDEu_40wCdf60rbGDN3dC5_udZa_XIFZTNjgYybEgWkJnsiAI-OuHIr-hh3jInqzI97rUTOWJmYPinR7gwOyvx5JpG-LY7pYkbf1Ac2WfjPlBb0qO7MtJOk1QKTE3unbVUR62AFJym-k_UMv70l3bCXRzqk7Kaq-k4r-OgbwSk4e_YNhSye60Fn78t3xhi_Tbe74fFnTWIOcVIu"/>
      <div className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-500">+12</div>
      </div>
      <span className="text-xs font-medium text-text-sub dark:text-gray-400">2 giờ trước</span>
      </div>
      </div>
      </div>
      </div>
      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
      <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark text-text-main dark:text-white border border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors disabled:opacity-50">
      <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="size-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
      <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark text-text-sub dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
      <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark text-text-sub dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
      <span className="flex items-center justify-center text-text-sub dark:text-gray-500">...</span>
      <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark text-text-sub dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">12</button>
      <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark text-text-main dark:text-white border border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors">
      <span className="material-symbols-outlined">chevron_right</span>
      </button>
      </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-40 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-text-main dark:text-white">
      <div className="size-6 text-primary">
      <svg className="w-full h-full" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
      </div>
      <span className="text-lg font-bold">Hands &amp; Hour</span>
      </div>
      <div className="text-sm text-text-sub dark:text-gray-500">© 2023 Hands &amp; Hour. Được tạo ra với tình yêu tại Đà Nẵng.</div>
      <div className="flex gap-4">
      <a className="text-text-sub dark:text-gray-500 hover:text-primary transition-colors" href="#">
      <i className="material-symbols-outlined">photo_camera</i>
      </a>
      <a className="text-text-sub dark:text-gray-500 hover:text-primary transition-colors" href="#">
      <i className="material-symbols-outlined">mail</i>
      </a>
      </div>
      </div>
      </div>
      </footer>
      </div>
    </>
  );
}
