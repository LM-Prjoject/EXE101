import { Link, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="bg-[#F6F2E9] dark:bg-[#0f1115] font-display antialiased text-[#c3996c] dark:text-slate-100 min-h-screen flex flex-col"
        style={{
          paddingBottom:
            "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
        }}
      >
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex size-10 items-center justify-center overflow-visible">
                  <img
                    src="/public/img/onlyLogo.png"
                    alt="Hands & Hour Logo"
                    className="h-8 w-8 object-contain scale-150 origin-center"
                  />
                </div>

                <h2 className="text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-[#c3996c]/70 dark:text-[#d5ddc3] flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined text-xl">
                      search
                    </span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 focus:border-none h-full placeholder:text-[#c3996c]/60 dark:placeholder:text-[#d5ddc3] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                    placeholder="Tìm kiếm workshop..."
                    value=""
                    readOnly
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-1 justify-end gap-8 items-center">
              <div className="hidden lg:flex items-center gap-9">
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Workshops
                </a>
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Khám phá
                </a>
                <a
                  className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal"
                  href="#"
                >
                  Cộng đồng
                </a>
              </div>

              {/* CTA: accent là màu chủ đạo */}
              <button onClick={() => navigate('/host/verification')} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"><span className="truncate">Trở thành Host</span></button>

              <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-6">
                <button className="relative group">
                  <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">
                    notifications
                  </span>
                  <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151822]"></span>
                </button>

                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                  data-alt="Portrait of Linh Nguyen"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE")',
                  }}
                />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex justify-center py-8 px-4 sm:px-8">
            <div className="flex flex-col max-w-[1100px] w-full">
              {/* Hero Card: soft làm nền phụ */}
              <div className="bg-[#fbc4ae]/25 dark:bg-[#151822] rounded-3xl p-8 mb-8 shadow-soft flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f08a78]/18 via-[#fbc4ae]/10 to-transparent dark:from-[#f08a78]/12 dark:via-[#fbc4ae]/6 dark:to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center md:items-start gap-6 w-full md:flex-row">
                  {/* Avatar */}
                  <div className="relative mt-4 md:mt-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white dark:border-[#151822] shadow-md"
                      data-alt="Portrait of Linh Nguyen"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE")',
                      }}
                    />
                    <button className="absolute bottom-1 right-1 bg-white/90 dark:bg-slate-700 p-2 rounded-full shadow-md text-[#c3996c]/80 hover:text-[#f08a78] transition-colors border border-[#fbc4ae]/60 dark:border-slate-600">
                      <span className="material-symbols-outlined text-lg block">
                        edit
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center md:items-start flex-1 pt-4 md:pt-12 text-center md:text-left">
                    <h1 className="text-[#2B2B2B] dark:text-slate-100 text-3xl font-bold leading-tight tracking-[-0.015em]">
                      Linh Nguyen
                    </h1>
                    <p className="text-[#2B2B2B]/70 dark:text-[#d5ddc3] text-base font-medium mt-1">
                      Người yêu gốm &amp; họa sĩ cuối tuần
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-[#2B2B2B]/60 dark:text-[#d5ddc3]">
                      <span className="material-symbols-outlined text-lg">
                        location_on
                      </span>
                      <span>Đà Nẵng, Việt Nam</span>
                      <span className="mx-2">•</span>
                      <span>Thành viên từ 2023</span>
                    </div>
                    <p className="mt-4 text-[#2B2B2B] dark:text-slate-300 max-w-lg leading-relaxed">
                      Tôi yêu thích khám phá các làng nghề truyền thống Việt Nam
                      và gặp gỡ những người bạn mới. Luôn tìm kiếm những buổi
                      làm gốm hoặc workshop màu nước bên bờ biển!
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 md:pt-12 w-full md:w-auto min-w-[200px]">
                    {/* Primary action: accent */}
                    <button className="flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#f08a78] text-white text-sm font-bold hover:bg-[#ee7a66] transition-colors shadow-lg shadow-[#f08a78]/25">
                      <span className="material-symbols-outlined text-lg">
                        settings
                      </span>
                      <span>Chỉnh sửa hồ sơ</span>
                    </button>

                    {/* Secondary: soft + border */}
                    <button className="flex items-center justify-center gap-2 w-full rounded-xl h-11 px-4 bg-[#fbc4ae]/25 dark:bg-slate-800 border border-[#fbc4ae]/60 dark:border-slate-700 text-[#c3996c] dark:text-slate-200 text-sm font-bold hover:bg-[#fbc4ae]/35 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        share
                      </span>
                      <span>Chia sẻ hồ sơ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#fbc4ae]/60 dark:border-slate-800 mb-8 sticky top-[72px] bg-[#fffaf5] dark:bg-[#0f1115] z-40 pt-2">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                  <Link
                    className="flex items-center gap-2 border-b-[3px] border-[#f08a78] pb-3 px-1 text-[#f08a78]"
                    to="/home"
                  >
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                    <span className="text-sm font-bold whitespace-nowrap">
                      Workshop đã đặt
                    </span>
                  </Link>

                  {[
                    { icon: "history", label: "Đã tham gia" },
                    { icon: "star", label: "Đánh giá của tôi" },
                    { icon: "favorite", label: "Đã lưu" },
                  ].map((t) => (
                    <Link
                      key={t.icon}
                      className="flex items-center gap-2 border-b-[3px] border-transparent pb-3 px-1 text-[#c3996c]/70 dark:text-[#d5ddc3] hover:text-[#f08a78] dark:hover:text-[#f08a78] transition-colors"
                      to="/home"
                    >
                      <span className="material-symbols-outlined">
                        {t.icon}
                      </span>
                      <span className="text-sm font-bold whitespace-nowrap">
                        {t.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                  Workshop sắp tới
                </h3>
                <a
                  className="text-[#f08a78] text-sm font-bold hover:underline"
                  href="/my-schedule"
                >
                  Xem lịch
                </a>
              </div>

              {/* Cards giữ nguyên layout, chỉ đổi accent/soft/border */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Card 1 */}
                <div className="group bg-white dark:bg-[#151822] rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-all duration-300 border border-[#fbc4ae]/40 dark:border-slate-800 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#c3996c] dark:text-white shadow-sm z-10">
                      Ngày mai, 14:00
                    </div>
                    <button className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                    <div
                      className="bg-center bg-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                      data-alt="Pottery wheel with clay hands"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvNj2dKCDD7m_I4BpTxsjwD9FhctgiyIOaTVu5qqo0rBffnihj8DHFgBixXw6FeLhXdPG--GdTbdEHYi0-sxWIZHWkWtz4jlcaGDPEhRw5y2eb8-y8fIU0n85d0Gx1OSPz0Jo_e_VscQIISC5ivROj4B2uNARTOXElCgz6HGV673IqSgS2d0hzV6gBLjJYZ0We8YvGTdvsX4b1XbK3_KtfDrl5HbkG8OH08oNnAyr2v9pHdRTSOdmWUD58iDhPv-jM3Mgc4KwA1cKW")',
                      }}
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[#f08a78] text-xs font-bold uppercase tracking-wider">
                        Làm gốm
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span>4.9</span>
                      </div>
                    </div>

                    <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg mb-2 line-clamp-2">
                      Nhập môn xoay gốm với đất sét địa phương
                    </h4>
                    <p className="text-[#c3996c]/70 dark:text-[#d5ddc3] text-sm mb-4 line-clamp-2 flex-1">
                      Học các kỹ thuật cơ bản để định hình đất sét trên bàn xoay
                      trong không gian studio thư giãn.
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="bg-center bg-cover rounded-full size-8 border border-white dark:border-slate-700"
                        data-alt="Host portrait female"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJeEMvRSBgYk4yIc0K-7XKks7EGd2eq-LEb0V9QpfTyypDby2YqEDDpSNJMSi9DOiVdp2StCaAz_t-mRlb77hVXYx8z9uyspY1ihC8bjQ7Gh1do7uVh-z5wcgPa4IQikmZ-kkWqIApi9RqtEjW8KD-VRZEUW2ucNmSQO30Ihsw7LFYM7KakMPs1tyeMYbzwNMLLWijEt_hJVjKnVwdPp48DpCeHh6W6y09H8y-RYYJ0IKUZUNIpXndw6RPM9FdEH1PSXr_KtGLMv8L")',
                        }}
                      />
                      <div className="text-xs">
                        <p className="text-[#c3996c]/60 dark:text-[#d5ddc3]">
                          Tổ chức bởi
                        </p>
                        <p className="font-bold text-[#c3996c] dark:text-slate-200">
                          Mai Arts Studio
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#fbc4ae]/40 dark:border-slate-800 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#c3996c]/60 dark:text-[#d5ddc3]">
                          Tổng thanh toán
                        </span>
                        <span className="text-[#c3996c] dark:text-slate-100 font-bold">
                          450k VND
                        </span>
                      </div>
                      <button className="bg-white dark:bg-slate-700 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-600 text-[#c3996c] dark:text-slate-200 text-xs font-bold py-2 px-4 rounded-lg border border-[#fbc4ae]/60 dark:border-slate-600 transition-colors">
                        Chi tiết vé
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2 (tương tự, giữ nguyên nội dung, đã đổi màu chính) */}
                <div className="group bg-white dark:bg-[#151822] rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-all duration-300 border border-[#fbc4ae]/40 dark:border-slate-800 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#c3996c] dark:text-white shadow-sm z-10">
                      Thứ 7, 28 thg 10
                    </div>
                    <button className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>

                    <div
                      className="bg-center bg-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                      data-alt="Watercolor painting supplies"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpen0juWHPSdkBVbHH5xztv97vtUZ61AwGN_gwB1o6M4ygApTUoMWEVUatH2IsHy2XIxYhZGaeCxksx_2nLudq-OjhPYBdSWXLHFj1x9U_r2pb99AoQvhNsSzmIL6zv4JmZqiYQul7ZtQYvZ4TuMPrwhRGh1YuuxfW2CJiwj-znUryMyR5ULPlyTHdWl7pUrnQ8HCPDrhvp6XOwiaJU68Rwrue3Yy0UDuIP5fg6PxINwTSscF3yFbHgi47HJzAPgU4YTJxDxP-vqc1")',
                      }}
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[#f08a78] text-xs font-bold uppercase tracking-wider">
                        Hội họa
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span>5.0</span>
                      </div>
                    </div>

                    <h4 className="text-[#2B2B2B] dark:text-slate-100 font-bold text-lg mb-2 line-clamp-2">
                      Vẽ màu nước hoàng hôn bên biển Mỹ Khê
                    </h4>
                    <p className="text-[#c3996c]/70 dark:text-[#d5ddc3] text-sm mb-4 line-clamp-2 flex-1">
                      Ghi lại những sắc màu rực rỡ của hoàng hôn Đà Nẵng bằng kỹ
                      thuật vẽ màu nước loang.
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="bg-center bg-cover rounded-full size-8 border border-white dark:border-slate-700"
                        data-alt="Host portrait male"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB53huTVqyEYEux9NSxJ6lMBEIPeHtdTqGCJqzkWn2aSgyRSB5IpZQgvgt5fTJ-XbDYtXS5v5bDAKi2z-pelMVHH_8MLu5pnUz3D5Mopmy2fz0tcUHIdXGigAe53Bu3lTxEx1hNFXa_9H3l4Nc8EOsB1Bb8MJFSqiuEl7KYPzHbCNOwyy6efW5XEo7CFo6RqGXGDeJJ7iobRNuxstYolCsu2wVikvdgwv9gCwz4i-86YmUe8Hp46Uph0do2dkiwhUoukZaTClED-THo")',
                        }}
                      />
                      <div className="text-xs">
                        <p className="text-[#c3996c]/60 dark:text-[#d5ddc3]">
                          Tổ chức bởi
                        </p>
                        <p className="font-bold text-[#c3996c] dark:text-slate-200">
                          Tuan Colors
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#fbc4ae]/40 dark:border-slate-800 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#c3996c]/60 dark:text-[#d5ddc3]">
                          Tổng thanh toán
                        </span>
                        <span className="text-[#c3996c] dark:text-slate-100 font-bold">
                          300k VND
                        </span>
                      </div>
                      <button className="bg-white dark:bg-slate-700 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-600 text-[#c3996c] dark:text-slate-200 text-xs font-bold py-2 px-4 rounded-lg border border-[#fbc4ae]/60 dark:border-slate-600 transition-colors">
                        Chi tiết vé
                      </button>
                    </div>
                  </div>
                </div>

                {/* Explore card: accent + soft */}
                <div className="group bg-gradient-to-br from-[#f08a78]/15 to-transparent dark:from-[#f08a78]/20 dark:to-[#151822] rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-[#f08a78]/35 flex flex-col items-center justify-center p-8 text-center h-full min-h-[350px]">
                  <div className="bg-white dark:bg-[#151822] p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[#f08a78] text-4xl">
                      add
                    </span>
                  </div>
                  <h4 className="text-[#c3996c] dark:text-slate-100 font-bold text-lg mb-2">
                    Khám phá thêm
                  </h4>
                  <p className="text-[#c3996c]/70 dark:text-[#d5ddc3] text-sm mb-6 max-w-[200px]">
                    Tìm kiếm cuộc phiêu lưu sáng tạo tiếp theo của bạn tại Đà
                    Nẵng.
                  </p>
                  <button className="bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-[#f08a78]/25 transition-all">
                    Xem tất cả workshop
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <h3 className="text-[#2B2B2B] dark:text-slate-100 text-2xl font-bold">
                  Hoạt động gần đây
                </h3>
              </div>

              <div className="bg-white dark:bg-[#151822] rounded-3xl p-6 shadow-sm border border-[#fbc4ae]/40 dark:border-slate-800">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-4 border-b border-[#fbc4ae]/40 dark:border-slate-700 pb-6 last:border-0 last:pb-0">
                    <div
                      className="w-full sm:w-32 h-24 rounded-xl bg-cover bg-center shrink-0"
                      data-alt="Macrame wall hanging details"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzoOt3HezeYwguY8xKoh29hUCArqfep6xIYj7OEBuMzqJFdEwVbFjajoJX_mTHZi4JpzYtgcJAy50aImOUdqxwRSQ1BFnJipCUguHLPMMktwL7myIk-hcfgP9iCsrnwiGW5hglEj9SCq98bwl8Pmxb61o6Yph9IRScyq5ZNxoEWrOEwOWb8IBt7d4txFOrZ1t_dXZjsR9TJfQkiq57v6ClDyrjlygR0ragWoqT04Qgit8s1Gi1Vlsb0U9LXnOms0psi1uLO68Esgqe")',
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-bold text-[#2B2B2B] dark:text-slate-100 text-lg">
                            Workshop làm Macrame treo tường
                          </h5>
                          <p className="text-xs text-[#2B2B2B]/60 dark:text-[#d5ddc3] mb-2">
                            Đã tham gia 15 thg 9, 2023 • Trung tâm Đà Nẵng
                          </p>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[20px] fill-current"
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#c3996c]/75 dark:text-slate-300 text-sm italic bg-[#fffaf5] dark:bg-slate-800 p-3 rounded-lg mt-2 border border-[#fbc4ae]/40">
                        "Tôi cực kỳ thích buổi học này! Người hướng dẫn rất kiên
                        nhẫn và các vật liệu được cung cấp đều chất lượng cao.
                        Tôi đã mang về nhà một tác phẩm tuyệt đẹp."
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      className="w-full sm:w-32 h-24 rounded-xl bg-cover bg-center shrink-0"
                      data-alt="Candle making wax pouring"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDr9JjVZF2iYn1wJ9XkxebJGkgpaaJlrG7mmmOm0MvJOrxDL4yHliy0khKKlcH1kkmAcSrHdbgbEFziVlbI6fU5bljkfjp_32e615RvQu2-qf8zg2csArKtK2YEYM5UNCWBo0P9NoumIgjAFyisCU-gJHrIo7QCKCvz5i28qCZ1RI7OHz3dgG4_2pbB70pfwDq5-xHvAXTZkDOceXO8T0kgpT5hE5tx06gbzSQnSBBWf5olFw9_hued-vB6ty8Rv2jY29-zKraRktFB")',
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-bold text-[#2B2B2B] dark:text-slate-100 text-lg">
                            Workshop làm nến thơm
                          </h5>
                          <p className="text-xs text-[#2B2B2B]/60 dark:text-[#d5ddc3] mb-2">
                            Đã tham gia 02 thg 8, 2023 • Hội An
                          </p>
                        </div>
                        <div className="flex text-amber-400">
                          {[1, 1, 1, 1, 0].map((filled, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-[20px] ${
                                filled
                                  ? "fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#c3996c]/75 dark:text-slate-300 text-sm italic bg-[#fffaf5] dark:bg-slate-800 p-3 rounded-lg mt-2 border border-[#fbc4ae]/40">
                        "Trải nghiệm thú vị nhưng tôi ước có nhiều lựa chọn mùi
                        hương hơn. Tuy nhiên rất phù hợp cho người mới bắt đầu!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer Simple */}
          <footer className="bg-[#FEFEFD] dark:bg-[#151822] border-t border-[#fbc4ae]/60 dark:border-slate-800 py-8 px-10 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-[#c3996c]/60 dark:text-[#d5ddc3]">
              <p>
                © 2023 Hands &amp; Hour. Được tạo nên với tâm hồn nghệ sĩ tại Đà
                Nẵng.
              </p>
              <div className="flex gap-6">
                <a className="hover:text-[#f08a78] transition-colors" href="#">
                  Quyền riêng tư
                </a>
                <a className="hover:text-[#f08a78] transition-colors" href="#">
                  Điều khoản
                </a>
                <a className="hover:text-[#f08a78] transition-colors" href="#">
                  Hỗ trợ
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
