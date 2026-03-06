import { useNavigate, Link } from "react-router-dom";

export default function AdvancedSearch() {
  const navigate = useNavigate();

  // ===== Cards data =====
  const cards = [
    {
      id: 1,
      rating: "4.9",
      reviews: "128",
      liked: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAINYD3oeUcID87QDpLNyjVCu6VGFQZFu0dk0gmZ0-JfTlMreQefRBG0rs3tNbU7wyBVdXGOfjoJTrG14GpsCCpF9U5W_AAa5ox8D4QXjY7JZGKQGBU96LZvxgepuJ9HS9YFwP7vCrRU1axqD8TMPn-v8oMi4Pb1DGBKJztTSPtvA81wPwCSe_WTnB3IvbdxFTWh1AxykFjTy2Gmsmx0IUupV95BSeCGs6ciRhOQjgHH27BX9T6MPFYVI6oJ5nXECc3aXw0A2GB-tfJ",
      title: "Nhập môn Xoay gốm trên bàn xoay",
      desc: "Học các kiến thức cơ bản về cách định tâm đất sét và tạo hình trụ trong buổi thực hành này.",
      duration: "2.5 Hours",
      schedule: "Sat, Sun",
      location: "Son Tra District",
      instructorName: "Sarah L.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjXa8BUo0HLxy1lFSfDmX1YigOqEpbUoAEvgnF-qOGk__eqYApED2SLOWIUNg0eFv1Fv65HMke3bq9HNBkl1Fr2bW-7qpw6HoJF5n31oxfqAqmAAGU92aG72kMEDtZZcE79wckL9M9UVTJOr-FnoK6aGHgZZhJks7dAJSVGDuM_qc6GnLMLFSg_EBB-hu0lWdgb0YMGFT6zfCjFAIwhw5OC6URKD28575TKgkHJ-djwYD6sKmqBvKCS-y2WCutHxUZc9lJeVApRjLu",
      price: "$45",
      badge: null,
    },
    {
      id: 2,
      rating: "4.7",
      reviews: "85",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU-usgWwq5naNuf-MuviO6bZU75XeOmBr3Z1Kkv5J_1SnaUm_fXwqkqePer-8wv8oIef3vXOQYP7Bcxz8WLKi0W848-bI0S7PAxIwrpnKVv4ynKCzXf7LaDLFpoetCsuURC2G-by85s1kJU0_7pb_gz8_-f0da0PCKzJ4FF--WNx6V0iChjkQlaqdZNIsRpczCeUEMoJSL2oux7q1k_9Gt-z1Ciqz82lIKH4orOsOcckoNehii8J9W-a482YkNICjVamZ41OtI25bn",
      title: "Tráng men & Trang trí Gốm sứ",
      desc: "Thể hiện sự sáng tạo của bạn bằng cách vẽ lên các món đồ gốm đã làm sẵn. Hoàn hảo để làm quà tặng.",
      duration: "2 Hours",
      schedule: "Daily",
      location: "Hai Chau District",
      instructorName: "Minh T.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1-lJElkZ3QiKVJwqjloidkRN8coVRqaXxgC8eGhlVnbIdlfu2mfCye8ogYChiGA7khaMVYuxe3Hv2s299rXhhh-oBQfcMhJlhvWBip1Tu82z9Dwhal2AQaHy0cESBwwaG_aglRn39MXABaIYYKlCd6jyACSCqumHrhtQqrpcNZGmaY4t5938eIFJhoqKVewHp6Ph2dwSpnUfcgI_Mxzcufn_jcfNbZhLR98JwdHIETU-cRH5O66jqM_NFZcxcMvvzHmOug12RQzy",
      price: "$30",
      badge: "PHỔ BIẾN",
    },
    {
      id: 3,
      rating: "5.0",
      reviews: "42",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-F0_Aj_PF2I5SwiTzuGq15Om0TRcu7odvLKDFGNCSvAFA2uQkhAT96gngUUZiSwHGSgjpDCxkP_YFjPiGb5y6kbm0egB8z59Wro_wDZD1eCTJZEaWZLbTguPFy4KvfnkH-vjAUdg5w80QuOX37EPetsTvmLWW4EPq53_XG9qDObHUNC3AZcIGuoSwjwauEgJ5bd3t9O4d175HphVbiRdl33lbH16AuKZLEEb0Qn57ywYqQpw5Imuh6O_VUcz1QM_CuFvtJcU99LWg",
      title: "Nặn tay: Ly & Bát",
      desc: "Không cần bàn xoay! Học kỹ thuật nặn dây và nặn tấm để tạo ra những đồ dùng độc đáo.",
      duration: "3 Hours",
      schedule: "Weekends",
      location: "Ngu Hanh Son",
      instructorName: "The Clay Co.",
      instructorInitial: "TC",
      price: "$55",
      badge: null,
    },
    {
      id: 4,
      rating: "4.8",
      reviews: "210",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbj5iioZg0bwITMHYVCSZY4xtLXyo7ief1MZWG34GYrYZyFI1nszBudFw8FYg2byePSO2gTyo9HQNIlfhjfRyrs21u-aUraqFRvs9tsBXaSEwuCorWYJMVzkLC_UXBzQpmyrGcYf55DFsbhKl8ErFlbG_3uAPgonbvhwSKQyIWu7Up9ViuvKBV2ST0NaaEdAP6XU0r0_zcIGSG-Zr07KSUZlU7HsZZch_j9oKuX4z7FkGATMI3_fyZxn7h4XiJFlwAjxcaz_hKGQeH",
      title: "Câu lạc bộ Gốm Trẻ em: Vui chơi Cuối tuần",
      desc: "Một môi trường vui vẻ và sáng tạo cho trẻ từ 6-12 tuổi khám phá nghệ thuật làm gốm.",
      duration: "1.5 Hours",
      schedule: "Sat Morning",
      location: "Hai Chau District",
      instructorName: "Elena R.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1XFuBiRV3sZo-i2ClJ23OYCntk7bDatiuX5xRay1GA4sTvF1u4YlpqRjpTixUEqg7MzQW5adkLIjNpsyuMEBdwy-Ig-5aEmvQC5Nl2ZDTfqRce3d8LHV1EokiJ4HQLKGgg50pSvfQszlID2Mix_uYKTtk_NdKWHm1rAMsgdfe1hTQPLc-jvgHSTvhh70FiceVsJm7nCIWXmW8Tdii08bWg7ZcILX_hveJoFb7LsEuWu7mRU_oZgz7DsTkJ62mLmgB8wG-4s72YRiP",
      price: "$25",
      badge: null,
    },
    {
      id: 5,
      rating: "4.9",
      reviews: "56",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH4Ao9oVzYfQoaDQzptACUwnavJVp8pXsHcA9OX5U0PAHuqC6bkeP8qQZqQ_ctcLYnYweQbKM2giVp86WUSMz0u5DKentPFUJVgOt3vKN6DopYlS0gi-4xljnVb27M28vXwmvJU29LzfE3yXz4HV-H9Z7JFwYhUGQM6CU5agX1dl8EPAEMAIAw4plEeMVu3RM-Pm737hFjCsekclR-gxcnOBTH8eq8ITqv5AK_CoE71EPxvJ7RHH3HBMO85qEn6Ww2ZZrz1Vi8JB9t",
      title: "Lớp học Bậc thầy: Bình gốm lớn",
      desc: "Dành cho những người làm gốm đã có kinh nghiệm muốn nâng cao tay nghề và làm chủ các hình khối lớn.",
      duration: "4 Hours",
      schedule: "Advanced Only",
      location: "Son Tra District",
      instructorName: "James K.",
      instructorImg:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALYbb15HcJ3GcPVH_PgsH_rmGdPXVRaBPkR7AmMGrz6TunMf0OEvU3fPitEhDK-R3jNdwjG9hIMbxftpsJTUa_-f9vNy8XXZPZusOw_TLSP0XxQSrGn9skLGtIDjik7AOHQuAga_SzZDwTDTujyYW0Wa-R7PAUqcRZQ5IPiaUpAPDZ_ngAEcPRgTShlC3BJD0O_h9kR0e4uW5d2T5cKyPkp5sA8r5qrLJTM1ccHhEDqhXiLrf4O-8iFTjK0t_yujzTpYIoGyhPgdYp",
      price: "$85",
      badge: null,
    },
    {
      id: 6,
      rating: "5.0",
      reviews: "15",
      liked: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvSQSdK81izxFlaCHNL9SowBbjO_wkTOwJIwb6dMaKBJUvJfUxdWihg2GLpXMddSzm_BNGSOXYFRsHr0ZKqasxf2BPziWnhETrPi4aMgZiHIaNWLh5r5iFKbRplzCIZ9yH7i1YJMHlOMSoWyUVXZyW9-MWhPZE_wItzihotWX4fuzPLxujGCeb75AeyWS8L_AlHyGr3KwE5T9lqB5qjDA5gmG8HBMMyRI458VuW1Ay-cgRXAEMkRkZ0PCH3hsOtikeaENkB7SgkcY6",
      title: "Trải nghiệm Nung Raku",
      desc: "Chứng kiến sự kỳ diệu của kỹ thuật nung Raku. Tự tráng men cho tác phẩm của bạn và xem nó biến đổi trong lửa.",
      duration: "3.5 Hours",
      schedule: "Special Event",
      location: "Hoi An (Shuttle incl.)",
      instructorName: "Art Studio",
      instructorInitial: "AS",
      price: "$70",
      badge: null,
    },
  ];

  const CardItem = ({ item }) => {
    return (
      <div className="group rounded-2xl overflow-hidden border border-[#fbc4ae]/55 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm hover:shadow-xl hover:shadow-[#f08a78]/15 transition-all duration-300 flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={item.img}
          />

          {/* Rating pill */}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/65 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1 border border-[#fbc4ae]/60">
            <span className="material-symbols-outlined text-[14px] text-[#c3996c]">
              star
            </span>
            {item.rating} ({item.reviews})
          </div>

          {/* Like */}
          <button
            type="button"
            className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-[#f08a78] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              favorite
            </span>
          </button>

          {/* Badge */}
          {item.badge && (
            <div className="absolute bottom-3 left-3 bg-[#f08a78] text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm shadow-[#f08a78]/25">
              {item.badge}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-extrabold text-lg leading-tight group-hover:text-[#f08a78] transition-colors mb-2 text-slate-900 dark:text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {item.desc}
          </p>

          <div className="mt-auto space-y-3">
            {/* meta 1 */}
            <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                schedule
              </span>
              <span className="font-semibold">{item.duration}</span>
              <span className="w-1 h-1 rounded-full bg-[#fbc4ae] mx-1" />
              <span className="font-semibold">{item.schedule}</span>
            </div>

            {/* meta 2 */}
            <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                location_on
              </span>
              <span className="font-semibold">{item.location}</span>
            </div>

            {/* footer */}
            <div className="pt-3 mt-3 border-t border-[#fbc4ae]/55 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.instructorImg ? (
                  <img
                    alt={`Portrait of instructor ${item.instructorName}`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-[#0f141b] shadow-sm"
                    src={item.instructorImg}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#fbc4ae]/40 flex items-center justify-center text-[#c3996c] font-extrabold text-xs border-2 border-white dark:border-[#0f141b]">
                    {item.instructorInitial || item.instructorName?.slice(0, 2)}
                  </div>
                )}

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Bởi {item.instructorName}
                </span>
              </div>

              <p className="font-extrabold text-lg text-[#c3996c]">
                {item.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
  className="min-h-screen flex flex-col overflow-x-hidden w-full font-display bg-[#f6f2e9] text-slate-900 dark:bg-[#0b0f14] dark:text-slate-100"
  style={{
    paddingBottom:
      "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
  }}
>
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-[#FEFEFD]/85 backdrop-blur-md border-[#fbc4ae]/60 dark:bg-[#0b0f14]/80 dark:border-white/10">
          <div className="flex items-center justify-between px-10 py-3 max-w-[1440px] mx-auto">
            <div className="flex items-center gap-8 flex-1">
              <Link
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                to="/home"
              >
                <img
                  src="/public/img/onlyLogo.png"
                  alt="Hands & Hour logo"
                  className="h-9 w-9 object-contain"
                />
                <h2 className="text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <div className="hidden lg:flex flex-1 max-w-md">
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">
                      search
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-transparent bg-[#fbc4ae]/25 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f08a78]/45 focus:bg-[#fbc4ae]/35 transition-all"
                    placeholder="Tìm kiếm hội thảo, giảng viên..."
                    type="text"
                    value="gốm sứ"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  className="text-sm font-semibold hover:text-[#f08a78] transition-colors"
                  to="/login"
                >
                  Hội thảo
                </Link>
                <Link
                  className="text-sm font-semibold hover:text-[#f08a78] transition-colors"
                  to="/register"
                >
                  Giảng viên
                </Link>
                <a
                  className="text-sm font-semibold hover:text-[#f08a78] transition-colors"
                  href="#"
                >
                  Blog
                </a>
              </nav>

              <div className="h-6 w-px bg-[#fbc4ae]/60 dark:bg-white/10 hidden md:block" />

              <div className="flex items-center gap-4">
                <Link
                  className="text-sm font-semibold hover:text-[#f08a78] transition-colors hidden sm:block"
                  to="/login"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-[#f08a78] hover:bg-[#f08a78]/90 text-white font-extrabold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-[#f08a78]/25"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
            <a className="hover:text-[#f08a78] transition-colors" href="#">
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <a className="hover:text-[#f08a78] transition-colors" href="#">
              Tìm kiếm
            </a>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-white font-semibold">
              Gốm sứ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg">Bộ lọc</h3>
                <button className="text-sm text-[#c3996c] font-semibold hover:underline">
                  Thiết lập lại
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Danh mục
                </h4>
                <div className="space-y-2">
                  {[
                    "Tất cả danh mục",
                    "Gốm sứ",
                    "Hội họa",
                    "Thêu thùa",
                    "Làm đồ trang sức",
                  ].map((label, idx) => (
                    <label
                      key={label}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        className="sr-only peer"
                        name="category"
                        type="radio"
                        defaultChecked={idx === 1}
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-[#fbc4ae]/80 dark:border-white/15 peer-checked:border-[#f08a78] peer-checked:bg-[#f08a78] flex items-center justify-center transition-all">
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-sm font-semibold group-hover:text-[#f08a78] transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#fbc4ae]/60 dark:bg-white/10" />

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Giá
                </h4>
                <div className="relative pt-6 pb-2">
                  <div className="absolute top-0 left-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    $0
                  </div>
                  <div className="absolute top-0 right-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    $200+
                  </div>
                  <input
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#f08a78] bg-[#fbc4ae]/70 dark:bg-white/10"
                    max="200"
                    min="0"
                    type="range"
                    value="50"
                    readOnly
                  />
                  <div className="flex justify-between mt-2">
                    <div className="border border-[#fbc4ae]/70 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-white/5 w-20 text-center font-semibold">
                      $10
                    </div>
                    <div className="text-slate-400">-</div>
                    <div className="border border-[#fbc4ae]/70 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-white/5 w-20 text-center font-semibold">
                      $80
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#fbc4ae]/60 dark:bg-white/10" />

              {/* Distance (demo) */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Khu vực
                </h4>
                <div className="space-y-2">
                  {["Tất cả", "Sơn Trà", "Hải Châu"].map((label, idx) => (
                    <label
                      key={label}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        className="w-5 h-5 rounded border-[#fbc4ae]/80 text-[#f08a78] focus:ring-[#f08a78]/20 bg-transparent"
                        type="checkbox"
                        defaultChecked={idx === 1}
                      />
                      <span className="text-sm font-semibold">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#fbc4ae]/60 dark:bg-white/10" />

              {/* Skill Level */}
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Trình độ
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-lg border border-[#f08a78]/60 bg-[#fbc4ae]/35 text-[#c3996c] text-sm font-bold transition-colors">
                    Gốm sứ{" "}
                    <button className="ml-1 hover:text-red-500" type="button">
                      <span className="material-symbols-outlined text-[14px]">
                        close
                      </span>
                    </button>
                  </button>
                  {["Trung cấp", "Nâng cao", "Trẻ em"].map((label) => (
                    <button
                      key={label}
                      className="px-3 py-1.5 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 hover:text-[#f08a78] text-sm font-semibold transition-colors"
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                    Kết quả cho{" "}
                    <span className="text-[#f08a78]">"Gốm sứ"</span> tại Đà Nẵng
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    <span className="font-black text-[#c3996c]">
                      12 hội thảo
                    </span>{" "}
                    được tìm thấy phù hợp với tiêu chí của bạn
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    Sắp xếp theo:
                  </span>
                  <div className="relative group">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-[#fbc4ae]/25 dark:bg-white/5 border border-[#fbc4ae]/60 dark:border-white/10 rounded-lg text-sm font-bold hover:border-[#f08a78]/60 hover:bg-[#fbc4ae]/35 transition-colors"
                    >
                      Đề xuất{" "}
                      <span className="material-symbols-outlined text-[18px]">
                        expand_more
                      </span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#fbc4ae]/30 text-[#f08a78] rounded-lg text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      tune
                    </span>{" "}
                    Bộ lọc
                  </button>
                </div>
              </div>

              {/* Active Filters Tags */}
              <div className="flex flex-wrap gap-2">
                {["Gốm sứ", "$10 - $80", "Người mới"].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#fbc4ae]/35 text-[#c3996c] rounded-full text-xs font-black uppercase tracking-wide border border-[#f08a78]/20"
                  >
                    {tag}
                    <button type="button" className="hover:text-red-500">
                      <span className="material-symbols-outlined text-[14px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Cards Grid (FULL) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cards.map((item) => (
                  <CardItem key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg bg-[#f08a78] text-white font-black shadow-sm shadow-[#f08a78]/20"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    3
                  </button>
                  <span className="text-slate-400">...</span>
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-[#fbc4ae]/70 dark:border-white/10 hover:border-[#f08a78]/60 text-slate-500 hover:text-[#f08a78] transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#fbc4ae]/60 dark:border-white/10 py-10 mt-12 bg-[#FEFEFD] dark:bg-[#0b0f14]">
          <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/public/img/onlyLogo.png"
                alt="Hands & Hour logo"
                className="h-7 w-7 object-contain"
              />
              <span className="font-black text-lg">
                <span className="text-[#c3996c]">Hands</span>{" "}
                <span className="text-[#f08a78]">&amp;</span>{" "}
                <span className="text-[#c3996c]">Hour</span>
              </span>
            </div>

            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © 2024 Hands &amp; Hour. Được tạo ra với tình yêu tại Đà Nẵng.
            </div>

            <div className="flex gap-6">
              <a
                className="text-slate-500 hover:text-[#f08a78] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">dataset</span>
              </a>
              <a
                className="text-slate-500 hover:text-[#f08a78] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}