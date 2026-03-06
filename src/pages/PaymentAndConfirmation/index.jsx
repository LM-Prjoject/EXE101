import { useNavigate, Link } from "react-router-dom";

export default function PaymentAndConfirmation() {
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
        className="font-display min-h-screen flex flex-col text-slate-900 dark:text-slate-100"
        style={{ background: BRAND.lightBg }}
      >
        {/* Top Navigation Bar */}
        <header
          className="w-full sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            background: "rgba(254,254,253,0.85)",
            borderColor: `${BRAND.soft}99`,
          }}
        >
          <div className="px-6 lg:px-10 py-3 mx-auto max-w-[1280px]">
            <div className="flex items-center justify-between">
              {/* Logo & Nav */}
              <div className="flex items-center gap-8">
                <Link
                  to="/home"
                  className="flex items-center gap-3 text-slate-900 dark:text-slate-100"
                >
                  {/* Logo to hơn nhưng không làm header cao */}
                  <div className="relative w-8 h-8 overflow-visible shrink-0">
                    <img
                      src="/img/onlyLogo.png"
                      alt="Hands & Hour logo"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 object-contain"
                    />
                  </div>

                  <h2 className="text-xl font-black leading-tight tracking-tight">
                    <span style={{ color: BRAND.primary }}>Hands</span>{" "}
                    <span style={{ color: BRAND.accent }}>&amp;</span>{" "}
                    <span style={{ color: BRAND.primary }}>Hour</span>
                  </h2>
                </Link>


              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex relative items-center">
                  <span
                    className="material-symbols-outlined absolute left-3"
                    style={{ color: "#94a3b8" }}
                  >
                    search
                  </span>
                  <input
                    className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 w-64 placeholder-slate-400"
                    style={{
                      background: `${BRAND.soft}22`,
                      borderColor: `${BRAND.soft}99`,
                    }}
                    placeholder="Tìm kiếm lớp học..."
                    type="text"
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`)
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>

                <Link
                  to="/login"
                  className="text-sm px-5 py-2 rounded-xl transition-colors font-black"
                  style={{
                    background: BRAND.accent,
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(0.95)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                  Thanh toán an toàn
                </h1>
                <p className="text-slate-500">
                  Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại Đà
                  Nẵng.
                </p>
              </div>

              {/* Booking Summary Card */}
              <section
                className="rounded-2xl p-6 shadow-sm border"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: BRAND.accent }}
                  >
                    shopping_bag
                  </span>
                  <h2 className="text-xl font-extrabold">Tóm tắt đơn hàng</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative group border"
                    style={{ borderColor: `${BRAND.soft}99` }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAtFqC8B6fN1RQPNch--25CDDS09j0u4M3l8hzPZ62twvAF3241_rQUigW9NJQZO_oSTY5WILKub-FWgspUPYYh3ALyFPqz9kQxTXP6zHWfbC0IzJa4iLXiWzHr6GFabS3PKqcO1nyLyCScqW1IJ0rda3XtgkX6AoihIs5AlFQR37qEgaZkRJcmLWGV5fd7y0LLIDd39SgvqrsKHVSO0MN7RhbGEjHRfr7sYfgiphFdnFYh1PcWRWsOaRWNaTD4Dm6349u__5IRP0M')",
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-extrabold">
                          Workshop Làm Cốc Gốm
                        </h3>
                        <span
                          className="font-black text-lg"
                          style={{ color: BRAND.primary }}
                        >
                          750k ₫
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm mb-4">
                        Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại
                        Đà Nẵng.
                      </p>

                      <div className="space-y-2">
                        {[
                          {
                            icon: "calendar_month",
                            text: "Thứ Bảy, ngày 28 tháng 10 năm 2023",
                          },
                          { icon: "schedule", text: "10:00 - 12:00 (2 Tiếng)" },
                          { icon: "person", text: "1 Người" },
                          {
                            icon: "location_on",
                            text: "Khu vực bãi biển Mỹ Khê, Đà Nẵng",
                          },
                        ].map((x) => (
                          <div
                            key={x.icon}
                            className="flex items-center gap-2 text-slate-600 text-sm"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {x.icon}
                            </span>
                            <span>{x.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-6 pt-4 border-t border-dashed"
                  style={{ borderColor: `${BRAND.soft}99` }}
                >
                  <div className="flex justify-between items-center text-slate-600 text-sm mb-2">
                    <span>Tạm tính</span>
                    <span>750,000 ₫</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-sm mb-2">
                    <span>Phí dịch vụ</span>
                    <span>25,000 ₫</span>
                  </div>
                  <div className="flex justify-between items-center font-black text-lg mt-4">
                    <span>Tổng thanh toán</span>
                    <span style={{ color: BRAND.accent }}>775,000 ₫</span>
                  </div>
                </div>
              </section>

              {/* Cancellation Policy Preview */}
              <div
                className="rounded-2xl p-4 flex gap-3 items-start border"
                style={{
                  background: `${BRAND.soft}22`,
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <span
                  className="material-symbols-outlined mt-0.5"
                  style={{ color: BRAND.primary }}
                >
                  verified_user
                </span>
                <div>
                  <h4 className="font-extrabold text-sm">Hủy miễn phí</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Hủy tối đa 24 giờ trước khi workshop bắt đầu để được hoàn
                    tiền đầy đủ.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <section
                className="rounded-2xl p-6 shadow-sm border h-full"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: BRAND.accent }}
                  >
                    payments
                  </span>
                  <h2 className="text-xl font-extrabold">
                    Phương thức thanh toán
                  </h2>
                </div>

                {/* Payment Tabs */}
                <div
                  className="flex gap-2 p-1 rounded-lg mb-6 border"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                  }}
                >
                  <button
                    className="flex-1 py-2 text-sm font-extrabold rounded shadow-sm transition-all"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      color: "#0f172a",
                      border: `1px solid ${BRAND.soft}99`,
                    }}
                    type="button"
                  >
                    Chuyển khoản
                  </button>
                  {["Thẻ tín dụng", "Ví điện tử"].map((t) => (
                    <button
                      key={t}
                      className="flex-1 py-2 text-sm font-semibold transition-all rounded"
                      style={{ color: "#64748b" }}
                      type="button"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = BRAND.accent)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#64748b")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* QR Payment Active State */}
                <div className="flex flex-col items-center">
                  <div className="text-center mb-4">
                    <p className="text-sm font-semibold">
                      Quét mã qua VietQR hoặc Ứng dụng Ngân hàng
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Hoàn tất đặt chỗ cho một chuyến trải nghiệm sáng tạo tại
                      Đà Nẵng.
                    </p>
                  </div>

                  <div
                    className="relative w-56 h-56 bg-white border-2 rounded-2xl p-2 mb-4 shadow-lg"
                    style={{ borderColor: `${BRAND.soft}cc` }}
                  >
                    <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-white p-2">
                        <img
                          alt="QR Code for payment"
                          className="w-full h-full object-contain"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv1fZtm74XkdoFuB0LmB4oxImJlQ4dZtyQRpDnJjCvAgbIZI56nMAcAiHf7geTojLS-tmUbCnGdV1aLLaTOfgsXOix8JdkDhmQ0BqIEpD3C4MERfJpwUjqqJZxBSAu5HoY1W4ylmJifj7Xzf9Y2sHsewt2lIENsCZ9BNaQMp_CeUWvmLzJ9yg7kFqnEXCvdkiJKLHmdICpsAQeC3_DlxINEMo_nzhbpJ3ZO15-l8FNgAqnNscjhbWD0vMNBoERrI2BFtXeGP9YwrHU"
                        />
                      </div>

                      {/* Center Logo Overlay */}
                      <div className="absolute bg-white p-1.5 rounded-full shadow-md z-10">
                        <img
                          src="/img/onlyLogo.png"
                          alt="Hands & Hour logo"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full rounded-xl p-3 mb-6 border"
                    style={{
                      background: `${BRAND.soft}18`,
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-black">
                        Tên tài khoản
                      </span>
                      <span className="text-sm font-extrabold">
                        HANDS AND HOUR LLC
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-black">
                        Ngân hàng
                      </span>
                      <span className="text-sm font-extrabold">Vietcombank</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-black">
                        Số tài khoản
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">
                          0071 0000 8293
                        </span>
                        <button
                          type="button"
                          style={{ color: BRAND.accent }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.filter = "brightness(0.95)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.filter = "none")
                          }
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            content_copy
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="flex items-start gap-2">
                      <input
                        className="rounded mt-1"
                        id="terms"
                        type="checkbox"
                        style={{ accentColor: BRAND.accent }}
                      />
                      <label className="text-xs text-slate-600" htmlFor="terms">
                        Tôi đồng ý với{" "}
                        <a
                          className="font-bold hover:underline"
                          style={{ color: BRAND.accent }}
                          href="#"
                        >
                          Điều khoản dịch vụ
                        </a>{" "}
                        và{" "}
                        <a
                          className="font-bold hover:underline"
                          style={{ color: BRAND.accent }}
                          href="#"
                        >
                          Chính sách hủy
                        </a>
                        .
                      </label>
                    </div>

                    <button
                      type="button"
                      className="w-full font-black text-base py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      style={{
                        background: BRAND.accent,
                        color: "white",
                        boxShadow: "0 14px 30px rgba(240,138,120,0.22)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "brightness(0.95)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "none")
                      }
                      onClick={() => navigate("/confirm-success")}
                    >
                      Xác nhận thanh toán
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        lock
                      </span>{" "}
                      Thanh toán bảo mật SSL
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="mt-auto py-8 border-t"
          style={{
            borderColor: `${BRAND.soft}99`,
            background: "rgba(254,254,253,0.85)",
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm">
              © 2023 Hands &amp; Hour. Được tạo ra với sự tận tâm tại Đà Nẵng.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}