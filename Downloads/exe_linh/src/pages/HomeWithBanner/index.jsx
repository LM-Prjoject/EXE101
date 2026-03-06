import { useNavigate, Link } from 'react-router-dom';
export default function HomeWithBanner() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary selection:text-white">
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-md lg:px-10">
            <div className="flex items-center gap-4 text-text-main">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[28px]">palette</span>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight text-text-main">Hands &amp; Hour</h2>
            </div>
            <div className="hidden flex-1 justify-end gap-8 md:flex"><div className="flex items-center gap-8">
              <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors" to="/home">Workshop</Link>
              <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors" to="/login">Người hướng dẫn</Link>
              <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors" to="/login">Blog</Link>
            </div>
              <div className="relative">
                <button onClick={() => navigate('/user-profile')} className="flex items-center gap-2 rounded-full border border-gray-100 p-1 pr-3 transition-all hover:border-primary/30 hover:bg-gray-50">
                  <img alt="User Avatar" className="size-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC-F37kS69QjL6m-hH_K2xR5pE0XpP_1u7L-H7t4E-4r3f-W9z-x6L-I_0" />
                  <span className="text-sm font-bold text-text-main">Alex Nguyen</span>
                  <span className="material-symbols-outlined text-[18px] text-text-muted">expand_more</span>
                </button>
                {/* Simulated Open Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 z-50">
                  <div className="flex flex-col gap-1">
                    <Link className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-text-main hover:bg-gray-50 transition-colors" to="/user-profile"><span className="material-symbols-outlined text-[20px] text-text-muted">person</span> Hồ sơ của tôi</Link>
                    <a className="flex items-center justify-between rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm shadow-primary/30" href="#">Người hướng dẫn</a>
                    <Link className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-text-main hover:bg-gray-50 transition-colors" to="/home"><span className="material-symbols-outlined text-[20px] text-text-muted">settings</span> Cài đặt</Link>
                    <div className="my-1 h-px bg-gray-100"></div>
                    <Link className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors" to="/login"><span className="material-symbols-outlined text-[20px]">logout</span> Đăng xuất</Link>
                  </div>
                </div>
              </div></div>
            <button className="flex md:hidden text-text-main">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>
          {/* Main Content */}
          <main className="flex flex-1 flex-col items-center px-4 py-8 md:px-10">
            <div className="flex w-full max-w-[1200px] flex-col gap-8">
              {/* Hero Section / Search */}
              <section className="flex flex-col items-center gap-6 py-8">
                <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-text-main md:text-5xl">Khám phá các <span className="text-primary">Workshop</span> Sáng tạo <br className="hidden md:block" /> tại Đà Nẵng</h1>
                <div className="w-full max-w-2xl">
                  <label className="relative flex h-14 w-full items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-primary">
                    <div className="flex h-full items-center justify-center pl-4 text-text-muted">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="h-full flex-1 border-none bg-transparent px-4 text-base text-text-main placeholder:text-text-muted focus:ring-0" placeholder="Tìm kiếm gốm sứ, hội họa, cà phê..." />
                    <button onClick={() => navigate('/advanced-search')} className="mr-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark">Tìm kiếm</button>
                  </label>
                </div>
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="group flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-text-main transition-all hover:border-primary hover:text-primary">
                    <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">location_on</span>
                    Da Nang
                    <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">expand_more</span>
                  </button>
                  <button className="group flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-text-main transition-all hover:border-primary hover:text-primary"><span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">map</span> Quận/Huyện <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">expand_more</span></button>
                  <button className="group flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-text-main transition-all hover:border-primary hover:text-primary"><span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">attach_money</span> Giá cả <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">expand_more</span></button>
                  <button className="group flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-text-main transition-all hover:border-primary hover:text-primary"><span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">schedule</span> Khung giờ <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary">expand_more</span></button>
                  <button className="flex h-10 items-center gap-2 rounded-full bg-gray-100 px-4 text-sm font-medium text-text-muted hover:bg-gray-200">Xóa tất cả</button>
                </div>
              </section>
              {/* Trending Title */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-text-main">Workshop Nổi bật</h2>
                <a className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark" href="#">Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
              </div>
              {/* Workshop Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Card 1 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Hands molding clay on pottery wheel" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Person making pottery on a wheel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACxRnhwZWb5Z6cW22407yx99ivO6wzAziPDsqVKYPgfrVGsCwIMzAu4PqF_6MKWvQxxOshlcJUiukZ7_ZiL5gAiszcQbxXsxXuKjnyVHvLs7t3-nYEBtdg7rmGSQWJoCc2F_Q-rp3vt9Dl50Q_OeEE1s4YsBge_oUMHwHFCvAqmd1d2hycW43pxqbkB3UTyRCdO7qFz505D1X8fsLk09NyKpwTQYWfBcjTnbJgzUTC9xjzLRWF3LqLZqrLCXy5f1adTOtE1KPQCK4f" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.9 (120)
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-lg bg-primary px-2 py-1 text-xs font-bold text-white shadow-sm">Lựa chọn HH</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pottery</span>
                      <span className="text-xs font-medium text-text-muted">Hai Chau</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Introduction to Wheel Throwing
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">400,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Paint brushes and colorful palette close up" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Colorful paint brushes and canvas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAowF_66-tLmzrvYyPyf58nsoMLOPaYbGY8Dfu2Jm31QjPJ1ZIvr7jUwpZdumL8W5jh5yaMyoM2BNehF8vYSz0c4zZkXW66vRi9j1vlH6bSq5L7Aj4F5AkdhrjeZ-NpydAs8QMf-nnCcEP40b5aVjvAqbs2uB9tiCUblMsIKlEboiluJaI6bouBwkAK9RZdU0BGe8X6E-skNHzfTwnA5B5UcxrZUq6-77Jku4w9RR3zMDJE9UmBbdXIGv_NeNdJgL5lqHTUPs02EnR" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.8 (85)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Painting</span>
                      <span className="text-xs font-medium text-text-muted">Son Tra</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Canvas &amp; Cocktails: Sunset Beach
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">350,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Making scented candles with dried flowers" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Hand pouring wax for candles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxePwP_NlKXZOvYX-UJWjBUV5LDKVe7rqu5UKYg_fS1tOy_sTN_yttqjyh5FJl-kuEmQ07ZiNNMaH0De_jpee_IdE3VXHDO6-Nvr5MeWcfzCKzyTIm3jQ0ER5SEd0kgoTFCG0E3Q6DE7IQo1yGiNpquVrFZHZlpS03avJOyxdneW4fLHbghK6FzZEPDrlgvYHKkZeNyvxYo2WuCsjOTt5xJ8E4xsOBsVku7iJrmLiOw0eit2OKTv_TJgcS6tZOhhXILEx_RRCbeD9V" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 5.0 (42)
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">Còn 3 chỗ</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Crafts</span>
                      <span className="text-xs font-medium text-text-muted">Ngu Hanh Son</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Scented Candle Making Workshop
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">280,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 4 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Barista pouring latte art into coffee cup" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Latte art coffee preparation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxO5w-0lvKYuICp3DOv1-xZvvCb3JnTAB03nzaWy_6rgaNtMxujRthAeib5sR1HcH59Pz-erQ1lksi868Y4NcNxOj-ITr-SrKjapCFePLy7tAx-2lLp1Ll1YC_TQRQcjBd4aTErW3-UUYXx6Nm3WGCeZLejlB0z2ZgpfunB5aoOoqfS9eTIxijzdiakGV2plIHo7xWk-UtrXROt6NibBQoC4yVE2W_w2qEoM3T5gTSmcU3HOqaUB0_SDQpiPs5j96Y6H-E3eN_NfJT" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.7 (200+)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Coffee</span>
                      <span className="text-xs font-medium text-text-muted">Hai Chau</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Barista Basics: Latte Art 101
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">500,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 5 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Arranging flowers in a vase" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Person arranging flowers bouquet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAve00R-xNJ32ma4HnhCzniKWJHzemzVh56T7gpLTUkv1ihRNgx2QU2anyR31zJ8Y37EQL4U6I0TLFKtJX7OqOMqSi-9RoANDlcjXgae2ey-5QSnMyHpx8zAUX7nA1XId27TrsG4kwy7D9PQlF2zyQlUAPqYZ1XY55e55IEYH2ZcPqxuhZvzTps49-a9H3XI9hKqn0J83VZCP7dhXxGqf6s_fDNtaGWAOn6BsgIbvJWpwLzqXnw3kWZkXqPZRFkKSjRgkIylnEmU4cc" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.9 (56)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Floristry</span>
                      <span className="text-xs font-medium text-text-muted">Cam Le</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Weekend Flower Arrangement
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">450,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 6 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Leather crafting tools and leather piece" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Leather workshop tools on table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD76ZAY7bs33xD-hSiRiT3Mrde5fzpImfFRCNyaWqe7h38wyTmmzLDNN0I7oVKbw1i1ovKUtABFyxlrjTWwvxhDGVSBhECiwjFefJS66VP1PhXBD51b8M1GX8JHM57g9xlkCRoM9DfpFMONJXv28TSKw7gx_6BlDYDjw2xIzuVTxtMXN7teIBV3DkVXtvUO-R4TDiOqneeNRcXKjB6IJ0ZuPOBuajOvA8RjsTUXm6olAI7y73kZLLRUOHfHX2r8Hm9DTEVqKjprVPgn" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.6 (30)
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-lg bg-primary px-2 py-1 text-xs font-bold text-white shadow-sm">Mới</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Leather</span>
                      <span className="text-xs font-medium text-text-muted">Son Tra</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Handmade Leather Wallet Class
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">600,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 7 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Traditional lantern making" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Colorful lanterns hanging" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhycDIivFQA8Aka4m7b_DmdcUGfTcBJwJemCkSGUH-IbdViLKFfQ882z3p2hHaXGk2F9wXLC1gqjiWCb03sEFzc7Mb8mxcqL33iRmAjj13_lE-czjwYBDAjsp3RMfcddpXPwuMAhHOYZBMTHJFK6swvrJ88iPa1EC2Ko95YJgR-BanvT2UnP3w38aglErJxCcGqf0zWpXRBt7k_H6ysKrS7ST-jQJDjfdcbyEEmKABd7_XByOBwX9egK0ag8YvhcYyjGyQlQxtNoqX" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 4.8 (112)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Culture</span>
                      <span className="text-xs font-medium text-text-muted">Hoi An</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Traditional Lantern Making
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">150,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 8 */}
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img alt="Person knitting with wool" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Hands knitting with wool yarn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQrvxoveSs9viH9kx7VOzbzzUHPzVbSB_exIbkXM6TQFrgP5YPy-hEyRvl2Wbf4xsdCYb-v0I3c56hHJldf4zZqtEPwocywQyYH8drgYtEY0HpQgQZmTuIw1V8IVqLqklcPuvESWjNQuQk7s8t2BR2RLxwPZ7yG9ipGzBX0kMIV6PBslez_XCXnI7rq_Mo5bTLnOxI4taTluTUGS2xYyaCLXCfZ8QTGcmRGacPqp-1v4cXarX5yxKUViYk7cVCSLoV3FRzOtYQhd78" />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-1">star</span> 5.0 (15)
                      </span>
                    </div>
                    <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">Sắp hết chỗ</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Textiles</span>
                      <span className="text-xs font-medium text-text-muted">Thanh Khe</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-text-main group-hover:text-primary">
                      Modern Embroidery for Beginners
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted">Giá từ</span>
                        <span className="font-bold text-text-main">300,000₫</span>
                      </div>
                      <button className="rounded-lg bg-gray-50 p-2 text-text-main hover:bg-primary/10 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <section className="relative mt-12 overflow-hidden rounded-3xl bg-primary px-6 py-12 md:px-12 md:py-16 shadow-xl shadow-primary/20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <img alt="Community moments background" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhycDIivFQA8Aka4m7b_DmdcUGfTcBJwJemCkSGUH-IbdViLKFfQ882z3p2hHaXGk2F9wXLC1gqjiWCb03sEFzc7Mb8mxcqL33iRmAjj13_lE-czjwYBDAjsp3RMfcddpXPwuMAhHOYZBMTHJFK6swvrJ88iPa1EC2Ko95YJgR-BanvT2UnP3w38aglErJxCcGqf0zWpXRBt7k_H6ysKrS7ST-jQJDjfdcbyEEmKABd7_XByOBwX9egK0ag8YvhcYyjGyQlQxtNoqX" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
                  <div className="max-w-xl text-center lg:text-left">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md"><span className="material-symbols-outlined text-[16px]">auto_awesome</span> Bộ sưu tập cộng đồng</div>
                    <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">Khoảnh khắc Workshop</h2>
                    <p className="mt-4 text-lg text-white/90">Xem những tác phẩm tuyệt đẹp và những gương mặt hạnh phúc từ các workshop gần đây. Tìm cảm hứng sáng tạo tại Đà Nẵng.</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <Link className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-gray-50 hover:shadow-lg active:scale-95" to="/community">Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                  </div>
                </div>
              </section><div className="flex justify-center py-8">
                <button className="flex h-12 w-full max-w-[200px] items-center justify-center rounded-xl border-2 border-primary bg-transparent text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white">Tải thêm</button>
              </div>
              {/* Featured Section: Map */}
              <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex flex-1 flex-col justify-center p-8 lg:p-12">
                    <div className="mb-4 inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Khám phá Đà Nẵng</div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-main">Tìm Workshop Gần Bạn</h2>
                    <p className="mb-8 text-lg text-text-muted">Khám phá không gian sáng tạo ngay tại khu phố của bạn. Từ bãi biển Mỹ Khê đến những con phố ở Hải Châu.</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
                          <span className="material-symbols-outlined text-text-main">location_on</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-text-muted">Vị trí hiện tại</span>
                          <span className="font-bold text-text-main">Son Tra, Da Nang</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-8 w-fit rounded-xl bg-text-main px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-black">Xem Bản đồ Tương tác</button>
                  </div>
                  <div className="relative min-h-[300px] flex-1 bg-gray-100 lg:min-h-auto">
                    <img alt="Map of Da Nang" className="absolute inset-0 h-full w-full object-cover" data-alt="Map view of Da Nang city" data-location="Da Nang" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEFLY4Rcn7HgYmIvDt-EdZ2-eSTOvYryeabyd6DdJUqigR9BeEXj9AsV-djnd3yzrSx4MLi2HYAuM56XjviOCv5AMohFNCY8R7d0YBLgQk0gd1zFAwOtIdZQZMUoy03fcKMHOcoyajWK6Ygawbjq2T8a0Kk_lf5wiTS1JX8B0kWBF7DyIk8bmepS2MGQmtrQWejIwP_FP_Ad4LbwgAlBhKDuEUhcm-npSBkrJvkW7xtFRgnDJRrvDX5pYAJIhaVZ5uz8RX35dmQ8oo" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 lg:to-white"></div>
                  </div>
                </div>
              </section>
              {/* Categories */}
              <section className="py-8">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-main">Workshop Nổi bật</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">brush</span>
                    </div>
                    <span className="font-bold text-text-main">Nghệ thuật</span>
                  </a>
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <span className="font-bold text-text-main">Gốm sứ</span>
                  </a>
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">local_florist</span>
                    </div>
                    <span className="font-bold text-text-main">Cắm hoa</span>
                  </a>
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">coffee</span>
                    </div>
                    <span className="font-bold text-text-main">Cà phê</span>
                  </a>
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">cut</span>
                    </div>
                    <span className="font-bold text-text-main">Thủ công</span>
                  </a>
                  <a className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-primary/5 hover:ring-primary" href="#">
                    <div className="flex size-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">restaurant</span>
                    </div>
                    <span className="font-bold text-text-main">Ẩm thực</span>
                  </a>
                </div>
              </section>
            </div>
          </main>
          {/* Footer */}
          <footer className="mt-10 border-t border-gray-100 bg-white py-12">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 lg:px-10">
              <div className="flex flex-col justify-between gap-10 md:flex-row">
                <div className="flex max-w-sm flex-col gap-4">
                  <div className="flex items-center gap-3 text-text-main">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-tight">Hands &amp; Hour</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">Kết nối những tâm hồn sáng tạo tại Đà Nẵng. Khám phá niềm đam mê tiếp theo của bạn hoặc chia sẻ kỹ năng với cộng đồng sôi động của chúng tôi.</p>
                </div>
                <div className="flex flex-wrap gap-10 md:gap-20">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-text-main">Khám phá</h4>
                    <div className="flex flex-col gap-2">
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Workshop</a>
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Người hướng dẫn</a>
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Thẻ quà tặng</a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-text-main">Công ty</h4>
                    <div className="flex flex-col gap-2">
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Về chúng tôi</a>
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Tuyển dụng</a>
                      <a className="text-sm text-text-muted hover:text-primary" href="#">Liên hệ</a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-text-main">Theo dõi</h4>
                    <div className="flex gap-4">
                      <a className="text-text-muted hover:text-primary" href="#"><span className="material-symbols-outlined">public</span></a>
                      <a className="text-text-muted hover:text-primary" href="#"><span className="material-symbols-outlined">photo_camera</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
                <p className="text-xs text-text-muted">© 2023 Hands &amp; Hour. Bảo lưu mọi quyền.</p>
                <div className="flex gap-6">
                  <a className="text-xs text-text-muted hover:text-primary" href="#">Chính sách bảo mật</a>
                  <a className="text-xs text-text-muted hover:text-primary" href="#">Điều khoản dịch vụ</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
