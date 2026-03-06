import { useNavigate, Link } from "react-router-dom";

export default function SelectSessionTime() {
  const navigate = useNavigate();

  const BRAND = {
    primary: "#c3996c", // warm gold
    accent: "#f08a78", // salmon (main)
    soft: "#fbc4ae", // peach
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
  };

  return (
    <>
      <div
        className="font-display antialiased min-h-screen flex flex-col text-slate-900 dark:text-slate-100 overflow-x-hidden"
        style={{ background: BRAND.lightBg }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            background: "rgba(254,254,253,0.85)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
            <div className="flex items-center gap-10">
              <Link className="flex items-center gap-3 group" to="/home">
                {/* Logo to hơn nhưng không làm header cao */}
                <div className="relative w-10 h-10 overflow-visible shrink-0">
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour logo"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-14 object-contain"
                  />
                </div>

                <h2 className="text-xl font-black tracking-tight leading-none">
                  <span style={{ color: BRAND.primary }}>Hands</span>{" "}
                  <span style={{ color: BRAND.accent }}>&amp;</span>{" "}
                  <span style={{ color: BRAND.primary }}>Hour</span>
                </h2>
              </Link>

              <div className="hidden lg:flex relative w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#94a3b8" }}
                  >
                    search
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none"
                  style={{
                    background: `${BRAND.soft}22`,
                    border: `1px solid ${BRAND.soft}99`,
                  }}
                  placeholder="Tìm kiếm workshop, giảng viên..."
                  type="text"
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                {[
                  { to: "/login", label: "Workshop" },
                  { to: "/register", label: "Giảng viên" },
                ].map((x) => (
                  <Link
                    key={x.label}
                    className="text-sm font-semibold transition-colors"
                    style={{ color: "#334155" }}
                    to={x.to}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#334155")
                    }
                  >
                    {x.label}
                  </Link>
                ))}
                <a
                  className="text-sm font-semibold transition-colors"
                  style={{ color: "#334155" }}
                  href="#"
                  onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
                >
                  Blog
                </a>
              </nav>

              <div
                className="flex items-center gap-3 pl-6 border-l"
                style={{ borderColor: `${BRAND.soft}99` }}
              >
                <Link
                  to="/login"
                  className="text-sm font-semibold transition-colors"
                  style={{ color: "#334155" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = BRAND.accent)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#334155")
                  }
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="font-black py-2.5 px-5 rounded-xl transition-colors shadow-sm"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                    boxShadow: "0 12px 28px rgba(240,138,120,0.18)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(0.95)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium mb-8">
            <a
              className="transition-colors"
              href="#"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              Trang chủ
            </a>
            <span className="material-symbols-outlined !text-sm text-slate-400">
              chevron_right
            </span>
            <a
              className="transition-colors"
              href="#"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              Workshop Gốm
            </a>
            <span className="material-symbols-outlined !text-sm text-slate-400">
              chevron_right
            </span>
            <span className="text-slate-900 font-semibold">Đặt chỗ</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  Chọn Ngày &amp; Giờ
                </h1>
                <p className="text-slate-600 text-lg">
                  Chọn một khung giờ thuận tiện cho buổi trải nghiệm gốm sáng tạo
                  của bạn.
                </p>
              </div>

              {/* Calendar */}
              <div
                className="rounded-2xl p-6 shadow-sm border"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-extrabold">Tháng 10, 2023</h3>
                  <div className="flex gap-2">
                    {["chevron_left", "chevron_right"].map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        className="size-9 rounded-full flex items-center justify-center transition-colors border"
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
                        <span className="material-symbols-outlined">{ic}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-7 mb-4 text-center">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                    <span
                      key={d}
                      className="text-xs font-black uppercase tracking-wider"
                      style={{ color: "#94a3b8" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-4 text-center">
                  <span></span>
                  <span></span>
                  <span></span>

                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium cursor-not-allowed opacity-50 border"
                      style={{
                        color: "#94a3b8",
                        background: "transparent",
                        borderColor: `${BRAND.soft}66`,
                      }}
                      disabled
                    >
                      {n}
                    </button>
                  ))}

                  {[4, 6, 7, 8, 9, 10, 11].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
                      style={{ color: "#0f172a" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = `${BRAND.soft}33`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {n}
                    </button>
                  ))}

                  {/* Selected Day = 5 */}
                  <button
                    type="button"
                    className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-black transform scale-110"
                    style={{
                      background: BRAND.accent,
                      color: "white",
                      boxShadow: "0 12px 26px rgba(240,138,120,0.22)",
                    }}
                  >
                    5
                  </button>

                  {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(
                    (n) => (
                      <button
                        key={n}
                        type="button"
                        className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
                        style={{ color: "#0f172a" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${BRAND.soft}33`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {n}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Slots */}
              <div>
                <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: BRAND.primary }}
                  >
                    schedule
                  </span>
                  Lịch trống ngày 5 tháng 10
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Morning (Disabled/Full) */}
                  <div className="relative cursor-not-allowed opacity-60">
                    <div
                      className="relative border rounded-2xl p-5 h-full"
                      style={{
                        background: "rgba(255,255,255,0.70)",
                        borderColor: `${BRAND.soft}99`,
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            background: `${BRAND.soft}22`,
                            color: "#64748b",
                          }}
                        >
                          <span className="material-symbols-outlined">
                            wb_sunny
                          </span>
                        </div>
                        <span className="px-2 py-1 rounded-md text-xs font-black uppercase tracking-wide"
                              style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                          Hết chỗ
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-500 mb-1">
                        Sáng
                      </h3>
                      <p className="text-sm font-medium text-slate-400 mb-4">
                        09:00 - 12:00
                      </p>
                      <div className="w-full rounded-full h-1.5 mb-2"
                           style={{ background: `${BRAND.soft}33` }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: "100%", background: "#94a3b8" }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">0 chỗ còn trống</p>
                    </div>
                  </div>

                  {/* Afternoon (Selected) */}
                  <div className="relative group cursor-pointer">
                    <div
                      className="absolute -inset-0.5 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-200"
                      style={{
                        background: `linear-gradient(90deg, ${BRAND.accent}, ${BRAND.soft})`,
                      }}
                    />
                    <div
                      className="relative border-2 rounded-2xl p-5 h-full"
                      style={{
                        background: "rgba(255,255,255,0.75)",
                        borderColor: BRAND.accent,
                        boxShadow: "0 18px 40px rgba(240,138,120,0.14)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            background: `${BRAND.soft}33`,
                            color: BRAND.primary,
                          }}
                        >
                          <span className="material-symbols-outlined">
                            light_mode
                          </span>
                        </div>
                        <span
                          className="size-6 rounded-full flex items-center justify-center"
                          style={{ background: BRAND.accent, color: "white" }}
                        >
                          <span className="material-symbols-outlined text-sm font-bold">
                            check
                          </span>
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold mb-1">Chiều</h3>
                      <p className="text-sm font-medium text-slate-600 mb-4">
                        14:00 - 17:00
                      </p>
                      <div className="w-full rounded-full h-1.5 mb-2"
                           style={{ background: `${BRAND.soft}33` }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: "60%", background: BRAND.accent }}
                        />
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">
                        4 chỗ còn trống
                      </p>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-200"
                         style={{ background: `linear-gradient(90deg, ${BRAND.soft}, ${BRAND.accent})` }} />
                    <div
                      className="relative border rounded-2xl p-5 h-full transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.70)",
                        borderColor: `${BRAND.soft}99`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = `${BRAND.soft}99`)
                      }
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            background: `${BRAND.soft}22`,
                            color: "#64748b",
                          }}
                        >
                          <span className="material-symbols-outlined">
                            bedtime
                          </span>
                        </div>
                        <span
                          className="px-2 py-1 rounded-md text-xs font-black uppercase tracking-wide"
                          style={{
                            background: `${BRAND.soft}33`,
                            color: BRAND.accent,
                          }}
                        >
                          Sắp hết chỗ
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold mb-1">Tối</h3>
                      <p className="text-sm font-medium text-slate-600 mb-4">
                        18:00 - 21:00
                      </p>
                      <div className="w-full rounded-full h-1.5 mb-2"
                           style={{ background: `${BRAND.soft}33` }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: "20%", background: BRAND.primary }}
                        />
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">
                        8 chỗ còn trống
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div
                className="sticky top-24 rounded-2xl p-6 shadow-lg border"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <h3
                  className="text-lg font-extrabold mb-6 pb-4 border-b"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  Tóm tắt đặt chỗ
                </h3>

                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative border"
                       style={{ borderColor: `${BRAND.soft}99` }}>
                    <img
                      alt="Person shaping clay on a pottery wheel"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-0Bmoyr81G0ZPQblUanvlMjYF3yfpdPG0D-QeeESm4OIIiS7F4vfKx2u65KAgWtp8WMfP3ZYlCjcWvI5j8auZba2hRJSu00B4VJCFABlt0AN9ImUqsCOcl03oVNCjTL8bQjfqk7ctnam0kTFvnxPyHwCB3hlqZz5x3WIn3fFX-SvNDGaFdCpiIfbI_nlKJAWRp0Ci05sVj31N4LBnFqrHRc7wLIJmLYVtxyUxuaiICL57xGDvpsvdXGHppPAsspMxYNVLLEtfdNP"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold leading-tight mb-1">
                      Nhập môn Bàn xoay Gốm
                    </h4>
                    <p className="text-sm text-slate-600 mb-1">
                      với Nghệ nhân Lan
                    </p>
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                      <span className="material-symbols-outlined !text-sm">
                        location_on
                      </span>
                      Da Nang, Vietnam
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: "calendar_today", label: "Ngày", value: "Thứ 5, 5 thg 10, 2023" },
                    { icon: "schedule", label: "Thời gian", value: "14:00 - 17:00 (Chiều)" },
                  ].map((x) => (
                    <div key={x.icon} className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg border"
                        style={{
                          background: `${BRAND.soft}22`,
                          borderColor: `${BRAND.soft}99`,
                          color: BRAND.primary,
                        }}
                      >
                        <span className="material-symbols-outlined !text-lg">
                          {x.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-black tracking-wide">
                          {x.label}
                        </p>
                        <p className="text-sm font-semibold">{x.value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg border"
                      style={{
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}99`,
                        color: BRAND.primary,
                      }}
                    >
                      <span className="material-symbols-outlined !text-lg">
                        group
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-black tracking-wide">
                        Khách
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="button"
                          className="size-6 rounded-full flex items-center justify-center transition-colors border"
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
                          <span className="material-symbols-outlined !text-sm">
                            remove
                          </span>
                        </button>
                        <span className="text-sm font-black">1</span>
                        <button
                          type="button"
                          className="size-6 rounded-full flex items-center justify-center transition-colors border"
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
                          <span className="material-symbols-outlined !text-sm">
                            add
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="border-t border-dashed pt-4 mb-6"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600 text-sm">Phí workshop</span>
                    <span className="font-semibold">500.000₫</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600 text-sm">Phí dịch vụ</span>
                    <span className="font-semibold">25.000₫</span>
                  </div>
                  <div
                    className="flex justify-between items-center mt-4 pt-4 border-t"
                    style={{ borderColor: `${BRAND.soft}99` }}
                  >
                    <span className="font-black text-lg">Tổng cộng</span>
                    <span className="text-2xl font-black" style={{ color: BRAND.accent }}>
                      525.000₫
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/participant-info")}
                  className="w-full text-base font-black py-4 px-6 rounded-xl transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                    boxShadow: "0 16px 34px rgba(240,138,120,0.20)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(0.95)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                >
                  <span>Tiến hành thanh toán</span>
                  <span className="material-symbols-outlined !text-xl">
                    arrow_forward
                  </span>
                </button>

                <p className="text-xs text-center text-slate-500 mt-4">
                  Hủy miễn phí trước 24 giờ khi bắt đầu.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="mt-auto border-t py-8"
          style={{
            borderColor: `${BRAND.soft}99`,
            background: "rgba(254,254,253,0.85)",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 text-center text-slate-500 text-sm">
            <p>© 2023 Hands &amp; Hour. Được tạo ra với tất cả tình yêu tại Đà Nẵng.</p>
          </div>
        </footer>
      </div>
    </>
  );
}