import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MySchedule() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE";

  return (
    <>
      <div className="bg-[#F6F2E9] dark:bg-[#0f1115] font-display text-[#c3996c] dark:text-slate-100">
        <div
  className="relative flex min-h-screen w-full flex-col"
  style={{
    paddingBottom:
      "calc(var(--floating-nav-h, 72px) + env(safe-area-inset-bottom))",
  }}
>
          {/* Top Navigation */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#fbc4ae]/60 dark:border-slate-800 bg-[#FEFEFD] dark:bg-[#151822] px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center overflow-visible">
                  <img src="/img/onlyLogo.png" alt="Hands & Hour Logo" className="h-8 w-8 object-contain scale-150 origin-center" />
                </div>
                <h2 className="text-xl font-black tracking-tight">
                  <span className="text-[#c3996c]">Hands</span>{" "}
                  <span className="text-[#f08a78]">&amp;</span>{" "}
                  <span className="text-[#c3996c]">Hour</span>
                </h2>
              </Link>

              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-[#c3996c]/70 flex border-none bg-[#fffaf5] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#c3996c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#f08a78]/40 border-none bg-[#fffaf5] dark:bg-slate-800 h-full placeholder:text-[#c3996c]/60 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal transition-all"
                    placeholder="Tìm kiếm workshop..."
                    readOnly
                    onClick={() => navigate("/advanced-search")}
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-1 justify-end gap-8 items-center">
              <div className="hidden lg:flex items-center gap-9">
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/home">Workshops</Link>
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/advanced-search">Khám phá</Link>
                <Link className="text-[#c3996c] dark:text-slate-200 hover:text-[#f08a78] transition-colors text-sm font-medium leading-normal" to="/community">Cộng đồng</Link>
              </div>

              {currentUser?.role !== "host" && (
                <button onClick={() => navigate("/host/verification")} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25">
                  <span className="truncate">Trở thành Host</span>
                </button>
              )}

              <div className="flex items-center gap-4 border-l border-[#fbc4ae]/60 dark:border-slate-700 pl-6">
                <button className="relative group">
                  <span className="material-symbols-outlined text-[#c3996c]/70 hover:text-[#f08a78] transition-colors">notifications</span>
                  <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151822]"></span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-sm font-semibold text-[#c3996c]">
                    Xin chào, <span className="font-black">{currentUser?.name || currentUser?.email?.split("@")[0] || "Khách"}</span>
                  </span>
                  <Link to="/user-profile">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f08a78] cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url("${DEFAULT_AVATAR}")` }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-10 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-[#2B2B2B] dark:text-white tracking-tight">
                Lịch của tôi
              </h1>
              <p className="text-[#c3996c]/70 dark:text-slate-400 mt-2">
                Quản lý hành trình sáng tạo và các buổi học sắp tới của bạn
              </p>
            </div>

            {/* Content Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Full-month Calendar */}
              <div className="lg:col-span-5 bg-white dark:bg-[#151822] rounded-2xl p-8 shadow-sm border border-[#fbc4ae]/40 dark:border-slate-800 self-start">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-[#c3996c] dark:text-white">
                    Tháng 4 năm 2026
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                    <button className="p-2 hover:bg-[#fbc4ae]/25 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 text-center">
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    CN
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T2
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T3
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T4
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T5
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T6
                  </span>
                  <span className="text-xs font-bold text-[#c3996c]/55 uppercase tracking-widest">
                    T7
                  </span>

                  {/* Empty start slots */}
                  <div></div>
                  <div></div>
                  <div></div>

                  {/* Days */}
                  <div className="relative py-3 group cursor-pointer">
                    <span className="text-[#c3996c]/50">1</span>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#c3996c]/40 rounded-full"></div>
                  </div>

                  {Array.from({ length: 13 }).map((_, idx) => (
                    <div key={idx} className="py-3">
                      <span className="text-[#c3996c] dark:text-slate-100">
                        {idx + 2}
                      </span>
                    </div>
                  ))}

                  {/* Today / Upcoming (accent) */}
                  <div className="py-3 bg-[#f08a78]/20 text-[#f08a78] font-bold rounded-lg relative">
                    <span>15</span>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f08a78] rounded-full"></div>
                  </div>

                  {Array.from({ length: 16 }).map((_, idx) => {
                    const day = idx + 16;
                    const hasUpcoming = day === 18 || day === 23;
                    return (
                      <div
                        key={day}
                        className={`py-3 relative ${
                          hasUpcoming ? "group cursor-pointer" : ""
                        }`}
                      >
                        <span className="text-[#c3996c] dark:text-slate-100">
                          {day}
                        </span>
                        {hasUpcoming && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f08a78] rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="mt-8 flex gap-6 pt-6 border-t border-[#fbc4ae]/40 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-[#f08a78] rounded-full"></div>
                    <span className="text-xs text-[#c3996c]/70 font-medium">
                      Hội thảo sắp tới
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-[#c3996c]/35 rounded-full"></div>
                    <span className="text-xs text-[#c3996c]/70 font-medium">
                      Buổi học đã qua
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Upcoming Events List */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2B2B2B] dark:text-white">
                    Sự kiện sắp tới
                  </h2>
                  <button className="text-[#f08a78] text-sm font-bold hover:underline">
                    Xem tất cả
                  </button>
                </div>

                {/* Card helper */}
                {[
                  {
                    level: "Trung cấp",
                    title: "Cơ bản về Xoay Gốm",
                    teacher: "Elena Gilbert",
                    time: "Oct 15, 2:00 PM",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR9_Zw1qzHIAGG_gh4gkAKpCRIQ2e_iDlQAQbHsc_ncuJUxiz6QnBAZ379E3zzA6y3TpHpYvQlPwjO9uTPDobmebquBAqurUTeDghs5RAeXfXIIRV3f7cDEXx2PIBBK9bThyZbTbA2jTvk2fYqNjfRnzjkGjPeZF1puj6zHI7_gQrIKaz-cdqWSF_XY3F21sycGxPqfYM2yCxQQumlEcZ9Hh0xQJyMr7T8oI0UzZQqLRHjK7uSM4WCOG7cuCCvNi3yg6RC9O0ChxlJ",
                  },
                  {
                    level: "Sơ cấp",
                    title: "Phong cảnh Màu nước",
                    teacher: "Marcus Thorne",
                    time: "Oct 18, 10:30 AM",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV8akr-2gvIOuF2BOP2hAaDcTBy2ishvGYw4J_glZCYUANFbqgXPd7c-9AuW-inYCdiRL-_BSY7eTCLLR3l5f7qRtPnfy8a4lKMwOM59P3n_YSdbVNHFxyr2AL9zpQU-7m79ZM7WQAqCGbV8X8Hd6e-pXwyKx_uJ46BBSVkjE5wV0f6H9l04tjs3jPUYm23SX0YzR0dbbMzF-DfmhSU8G1JSpUuemZUFaSYD4Ro8m7dmN_hc5xtMRj8HAocW8mCBRh_jPR1Hiyk6f2",
                  },
                  {
                    level: "Nâng cao",
                    title: "Dệt Macrame Nâng cao",
                    teacher: "Sarah Jenkins",
                    time: "Oct 23, 4:00 PM",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_YgEWUOL6s8JGXoYMNYOZvPMTkIr7ECeqBV8rYJKnaWtYkkBQZ9J07jKUCQ5GmscYfjT6-O0WA4_ejxKVS27YoNKnbGZklMosR2WaePBzxkiDVtrgVgYW0BsLcgejJ9_IHbxQVblgPIPfxIXfcW4YPsi2OXdABHyYBMatnBO7cUSE-GT96PuQqqMMyO62mHnh11aeuioz0FtwpkQAdSRhW6Y_av0Q92GRJcU5AZWKb29rhYWNTDFrDgmKCJbHg8Yt6nUoFfRXJ7Ol",
                  },
                ].map((w) => (
                  <div
                    key={w.title}
                    className="group bg-white dark:bg-[#151822] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#fbc4ae]/40 dark:border-slate-800 flex flex-col md:flex-row"
                  >
                    <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt={w.title}
                        style={{ backgroundImage: `url("${w.img}")` }}
                      />
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-[#f08a78]/20 text-[#f08a78] text-[10px] font-bold uppercase tracking-wider rounded">
                            {w.level}
                          </span>
                          <span className="text-[#c3996c]/50 material-symbols-outlined cursor-pointer hover:text-[#f08a78] transition-colors">
                            bookmark
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">
                          {w.title}
                        </h4>

                        <p className="text-sm text-[#c3996c]/70 dark:text-slate-400 mb-4 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">
                            person
                          </span>
                          Người hướng dẫn: {w.teacher}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#c3996c]/55 uppercase">
                            Ngày &amp; Giờ
                          </span>
                          <span className="text-sm font-semibold text-[#c3996c] dark:text-slate-100">
                            {w.time}
                          </span>
                        </div>

                        <button className="bg-[#f08a78] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#ee7a66] transition-colors shadow-sm shadow-[#f08a78]/25">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Bottom Nav Mobile */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FDFCFA] dark:bg-[#151822] border-t border-[#fbc4ae]/60 dark:border-slate-800 flex justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">home</span>
              <span className="text-[10px]">Trang chủ</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#f08a78]">
              <span className="material-symbols-outlined">calendar_today</span>
              <span className="text-[10px]">Lịch trình</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">explore</span>
              <span className="text-[10px]">Khám phá</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#c3996c]/55">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[10px]">Cài đặt</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}