import { useNavigate, Link } from "react-router-dom";

export default function EnterParticipantInfo() {
  const navigate = useNavigate();

  const BRAND = {
    primary: "#c3996c", // warm gold (text)
    accent: "#f08a78", // salmon (main)
    soft: "#fbc4ae", // peach (support)
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
  };

  return (
    <>
      <div
        className="font-display text-slate-900 dark:text-slate-100"
        style={{ background: BRAND.lightBg }}
      >
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            {/* Header */}
            <header
              className="flex items-center justify-between whitespace-nowrap border-b px-6 md:px-20 py-4 bg-white/85 backdrop-blur-md dark:bg-[#0b0f14]/80"
              style={{ borderColor: `${BRAND.soft}99` }}
            >
              <div className="flex items-center gap-3">
                {/* Logo (to hơn nhưng không làm header cao) */}
                <Link to="/home" className="flex items-center gap-3">
                  <div className="relative w-8 h-8 overflow-visible shrink-0">
                    <img
                      src="/img/onlyLogo.png"
                      alt="Hands & Hour logo"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 object-contain"
                    />
                  </div>

                  <h2 className="text-slate-900 dark:text-white text-xl font-extrabold leading-tight tracking-tight">
                    <span style={{ color: BRAND.primary }}>Hands</span>{" "}
                    <span style={{ color: BRAND.accent }}>&amp;</span>{" "}
                    <span style={{ color: BRAND.primary }}>Hour</span>
                  </h2>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex h-10 cursor-pointer items-center justify-center rounded-xl px-3 gap-2 font-bold transition-colors border"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                    color: BRAND.primary,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = BRAND.accent)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = `${BRAND.soft}99`)
                  }
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Quay lại
                </button>

                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2"
                  style={{
                    borderColor: `${BRAND.soft}99`,
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYD_b0RkLHCD_9l3q_f3WvTYslCw1nyfxic5sQpqaqOiaIWUxWbZqxixGV9ApsOHN6UMZl6EE2xVBqToVr0ju4tBF8vZLqLO0tdC_7OjcOHayilOjnaSUv5ovfS60kXPPXzmu53jqTiE83ikRbzjsvNNFp-A_w8VPoMW9KXLwGyw0YzZLfTd5pGZBG08aihTRF_IrO3jGIaDkiGP1bq5JXc0Ahnt-a5OuddDjcnZZQSIty01cShijzuK-tTL7PVSmaqAQZW37HZQs5")',
                  }}
                />
              </div>
            </header>

            {/* Main */}
            <main className="flex flex-1 justify-center py-8 px-4 md:px-0">
              <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold leading-tight">
                    Chi tiết người tham gia
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base">
                    Hoàn thành thông tin bên dưới để giữ chỗ cho buổi hội thảo
                    của bạn.
                  </p>
                </div>

                {/* Workshop Card */}
                <div
                  className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 shadow-xl border"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="w-full md:w-1/3 h-48 md:h-auto bg-center bg-no-repeat bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOgdjgG7k9szyk92VZio4A_eMvX_xJpcH3EbBAnPj2OxGFkM45nczAEN9VFDESGmLAl8ya8lN7zZsPQR1Ax7zfOKSJLiBy6vG69YFP-jHzJbzMmKUZP5_DzcPi891211B-EJBjvaVhrz_sjHmy5mqUcyO1LGNFajwEAIj9RjTUQAKG9XzKiJvmqFJFy1qoAT7YvacC8ZEbhXiIm0W8EVT6gHI0_5bAzvrFgw0RVU677x6fDh8-cqAGniu5gGhe9yT2wQubFR0yMFiQ")',
                      }}
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border"
                            style={{
                              background: `${BRAND.soft}33`,
                              borderColor: `${BRAND.soft}99`,
                              color: BRAND.accent,
                            }}
                          >
                            HỘI THẢO ĐÃ CHỌN
                          </span>
                          <h2 className="text-slate-900 dark:text-white text-2xl font-extrabold leading-tight">
                            Modern Pottery &amp; Glazing
                          </h2>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">
                            TỔNG GIÁ
                          </p>
                          <p
                            className="text-2xl font-black"
                            style={{ color: BRAND.primary }}
                          >
                            $85.00
                          </p>
                        </div>
                      </div>

                      <div
                        className="grid grid-cols-2 gap-4 border-t border-dashed pt-4"
                        style={{ borderColor: `${BRAND.soft}99` }}
                      >
                        {[
                          {
                            icon: "calendar_today",
                            label: "Date",
                            value: "Oct 24, 2023",
                          },
                          {
                            icon: "schedule",
                            label: "Time",
                            value: "10:00 AM - 1:00 PM",
                          },
                        ].map((x) => (
                          <div key={x.icon} className="flex items-center gap-3">
                            <div
                              className="size-10 rounded-lg flex items-center justify-center border"
                              style={{
                                background: `${BRAND.soft}22`,
                                borderColor: `${BRAND.soft}99`,
                                color: BRAND.accent,
                              }}
                            >
                              <span className="material-symbols-outlined">
                                {x.icon}
                              </span>
                            </div>
                            <div>
                              <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase">
                                {x.label}
                              </p>
                              <p className="text-slate-700 dark:text-slate-300 text-sm font-extrabold">
                                {x.value}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div className="flex items-center gap-3 col-span-2">
                          <div
                            className="size-10 rounded-lg flex items-center justify-center border"
                            style={{
                              background: `${BRAND.soft}22`,
                              borderColor: `${BRAND.soft}99`,
                              color: BRAND.accent,
                            }}
                          >
                            <span className="material-symbols-outlined">
                              location_on
                            </span>
                          </div>
                          <div>
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase">
                              Location
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 text-sm font-extrabold">
                              Creative Hub, Downtown Studio A
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* dashed divider + notches */}
                  <div
                    className="absolute right-[33.33%] top-0 bottom-0 border-l border-dashed hidden md:block"
                    style={{ borderColor: `${BRAND.soft}99` }}
                  >
                    <div
                      className="absolute -top-3 -left-3 size-6 rounded-full"
                      style={{ background: BRAND.lightBg }}
                    />
                    <div
                      className="absolute -bottom-3 -left-3 size-6 rounded-full"
                      style={{ background: BRAND.lightBg }}
                    />
                  </div>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-6">
                  <div
                    className="rounded-2xl p-6 border shadow-sm"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-900 dark:text-white text-lg font-extrabold flex items-center gap-2">
                        <span
                          className="flex size-7 items-center justify-center rounded-full text-sm font-black"
                          style={{ background: BRAND.accent, color: "white" }}
                        >
                          1
                        </span>
                        Người tham gia chính
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        Liên hệ chính
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-extrabold">
                          Họ và tên
                        </span>
                        <input
                          className="w-full rounded-xl border bg-white/70 dark:bg-white/5 h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2"
                          style={{
                            borderColor: `${BRAND.soft}99`,
                            boxShadow: "none",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`)
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.boxShadow = "none")
                          }
                          placeholder="ví dụ: Nguyễn Văn A"
                          required
                          type="text"
                        />
                      </label>

                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-extrabold">
                          Địa chỉ Email
                        </span>
                        <input
                          className="w-full rounded-xl border bg-white/70 dark:bg-white/5 h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2"
                          style={{ borderColor: `${BRAND.soft}99` }}
                          onFocus={(e) =>
                            (e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`)
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.boxShadow = "none")
                          }
                          placeholder="alex@example.com"
                          required
                          type="email"
                        />
                      </label>

                      <label className="flex flex-col gap-2 md:col-span-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-extrabold">
                          Số điện thoại
                        </span>
                        <div className="flex gap-2">
                          <select
                            className="w-24 rounded-xl border bg-white/70 dark:bg-white/5 h-12 text-sm focus:outline-none"
                            style={{ borderColor: `${BRAND.soft}99` }}
                          >
                            <option>+84</option>
                            <option>+1</option>
                            <option>+44</option>
                            <option>+61</option>
                          </select>
                          <input
                            className="flex-1 rounded-xl border bg-white/70 dark:bg-white/5 h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                            style={{ borderColor: `${BRAND.soft}99` }}
                            placeholder="090x xxx xxx"
                            type="tel"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Optional guests (kept disabled) */}
                  <div
                    className="rounded-2xl p-6 border shadow-sm opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-900 dark:text-white text-lg font-extrabold flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-sm font-black">
                          2
                        </span>
                        Khách mời bổ sung (Tùy chọn)
                      </h3>
                      <button
                        className="text-sm font-extrabold hover:underline"
                        style={{ color: BRAND.accent }}
                        type="button"
                      >
                        Thêm khách
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 blur-[1px] pointer-events-none">
                      <div
                        className="h-12 rounded-xl"
                        style={{ background: `${BRAND.soft}22` }}
                      />
                      <div
                        className="h-12 rounded-xl"
                        style={{ background: `${BRAND.soft}22` }}
                      />
                    </div>
                  </div>

                  {/* Info + actions */}
                  <div className="flex flex-col gap-4 mt-4">
                    <div
                      className="flex items-start gap-3 p-4 rounded-2xl border"
                      style={{
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}99`,
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: BRAND.primary }}
                      >
                        info
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Bằng cách nhấp vào 'Tiếp tục thanh toán', bạn đồng ý với
                        chính sách hủy hội thảo. Bạn có thể hủy để được hoàn
                        tiền đầy đủ tối đa 48 giờ trước khi sự kiện bắt đầu.
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 h-14 px-6 rounded-xl font-extrabold transition-colors border"
                        style={{
                          background: "transparent",
                          borderColor: `${BRAND.soft}99`,
                          color: BRAND.primary,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = BRAND.accent)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = `${BRAND.soft}99`)
                        }
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                        Quay lại
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/payment")}
                        className="flex-1 md:flex-none md:min-w-[240px] flex items-center justify-center gap-2 h-14 px-8 rounded-xl font-black text-lg transition-all"
                        style={{
                          background: BRAND.accent,
                          color: "white",
                          boxShadow: "0 12px 30px rgba(240,138,120,0.22)",
                        }}
                      >
                        Tiếp tục thanh toán{" "}
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </main>

            {/* Footer */}
            <footer
              className="border-t py-10 px-6 md:px-20 bg-white/85 backdrop-blur-md dark:bg-[#0b0f14]/80"
              style={{ borderColor: `${BRAND.soft}99` }}
            >
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 text-slate-500">
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour logo"
                    className="h-6 w-6 object-contain opacity-80"
                  />
                  <p className="text-sm font-medium">
                    © 2023 Hands &amp; Hour. Bảo lưu mọi quyền.
                  </p>
                </div>

                <div className="flex gap-8">
                  {[
                    "Chính sách bảo mật",
                    "Điều khoản dịch vụ",
                    "Trung tâm trợ giúp",
                  ].map((t) => (
                    <a
                      key={t}
                      className="text-sm font-semibold transition-colors"
                      href="#"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = BRAND.accent)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#94a3b8")
                      }
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
