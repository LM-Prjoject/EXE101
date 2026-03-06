import { useNavigate, Link } from "react-router-dom";

export default function WorkshopChat() {
  const navigate = useNavigate();

  const BRAND = {
    primary: "#c3996c",
    accent: "#f08a78",
    soft: "#fbc4ae",
    lightBg: "#f6f2e9",
    darkBg: "#0b0f14",
    darkCard: "#0f141b",
  };

  return (
    <>
      <div
        className="font-display antialiased text-slate-900 dark:text-slate-100"
        style={{ background: BRAND.lightBg }}
      >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className="w-80 flex-shrink-0 border-r flex flex-col"
            style={{
              borderColor: `${BRAND.soft}99`,
              background: "rgba(255,255,255,0.80)",
            }}
          >
            <div
              className="p-6 border-b"
              style={{ borderColor: `${BRAND.soft}99` }}
            >
              <div className="flex items-center gap-3 mb-6">
                {/* Logo */}
                <div className="relative w-9 h-9 overflow-visible shrink-0">
                  <img
                    src="/img/onlyLogo.png"
                    alt="Hands & Hour logo"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 object-contain"
                  />
                </div>

                <h2 className="text-xl font-black leading-tight tracking-tight">
                  Bạn Đồng Hành Workshop
                </h2>
              </div>

              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "#94a3b8" }}
                >
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none"
                  style={{
                    background: `${BRAND.soft}22`,
                    border: `1px solid ${BRAND.soft}99`,
                  }}
                  placeholder="Tìm kiếm cuộc trò chuyện..."
                  type="text"
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND.soft}66`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 mb-2">
                <h3
                  className="text-xs font-black uppercase tracking-wider px-2"
                  style={{ color: "#94a3b8" }}
                >
                  Workshop Đã Đặt
                </h3>
              </div>

              <nav className="space-y-1 px-2">
                {/* Active Item */}
                <Link
                  className="flex items-center gap-3 px-3 py-3 rounded-xl group border"
                  to="/home"
                  style={{
                    background: `${BRAND.soft}22`,
                    borderColor: `${BRAND.soft}99`,
                  }}
                >
                  <div
                    className="size-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${BRAND.soft}33`,
                      color: BRAND.primary,
                    }}
                  >
                    <span className="material-symbols-outlined">flatware</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold truncate">Hội Gốm Sứ</p>
                    <p
                      className="text-xs truncate font-semibold"
                      style={{ color: "#7c6a57" }}
                    >
                      Alex: Mọi người đã mua đất sét chưa?
                    </p>
                  </div>

                  <div
                    className="size-2 rounded-full"
                    style={{ background: BRAND.accent }}
                  />
                </Link>

                {/* Inactive Items */}
                {[
                  {
                    icon: "palette",
                    title: "Đội Vẽ Tranh Canvas",
                    msg: "Sarah: Rất mong chờ đến Thứ Sáu!",
                  },
                  {
                    icon: "carpenter",
                    title: "Phù Thủy Mộc",
                    msg: "Marcus: Hãy xem những mối nối này này.",
                  },
                  {
                    icon: "brush",
                    title: "Trung Tâm Nghệ Thuật Kỹ Thuật Số",
                    msg: "Leo: Đang gửi bộ cọ vẽ đây",
                  },
                ].map((c) => (
                  <Link
                    key={c.title}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors border border-transparent"
                    to="/home"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${BRAND.soft}18`;
                      e.currentTarget.style.borderColor = `${BRAND.soft}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div
                      className="size-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${BRAND.soft}22`,
                        color: "#64748b",
                      }}
                    >
                      <span className="material-symbols-outlined">{c.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold truncate text-slate-700">
                        {c.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate font-medium">
                        {c.msg}
                      </p>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            <div
              className="p-4 border-t"
              style={{ borderColor: `${BRAND.soft}99` }}
            >
              <button className="flex items-center gap-3 w-full p-2 rounded-lg transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.background = `${BRAND.soft}18`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="size-9 rounded-full flex items-center justify-center font-black text-xs"
                  style={{ background: BRAND.accent, color: "white" }}
                >
                  JD
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-extrabold">Jane Doe</p>
                  <p className="text-xs text-slate-500">Xem hồ sơ</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">
                  settings
                </span>
              </button>
            </div>
          </aside>

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col relative" style={{ background: BRAND.lightBg }}>
            {/* Top Navigation */}
            <header
              className="h-20 flex items-center justify-between px-8 border-b backdrop-blur-md z-10"
              style={{
                background: "rgba(254,254,253,0.80)",
                borderColor: `${BRAND.soft}99`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="size-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${BRAND.soft}22`,
                    color: BRAND.primary,
                    border: `1px solid ${BRAND.soft}66`,
                  }}
                >
                  <span className="material-symbols-outlined text-3xl">
                    flatware
                  </span>
                </div>

                <div>
                  <h1 className="text-lg font-black">
                    Hội Gốm Sứ{" "}
                    <span
                      className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border"
                      style={{
                        background: `${BRAND.soft}22`,
                        borderColor: `${BRAND.soft}99`,
                        color: BRAND.primary,
                      }}
                    >
                      Trò Chuyện Workshop
                    </span>
                  </h1>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HZPue2IVUS5lgz2_ScTfFu_RJCnz9aTM64llna1Z2SCxVUxbtUX_xpWT8lzKLLdCkn_xZYQKhGvSdkU8QExEQutHN7JztdiE0-KkS9UJK2f4UHxKYDm3prLQr5UOE8sj4fbcZirthOuaiTTp1FyDfWfTKCeKUFrosXIZfGbCFuRMnPd0F0C7hWxpU4UIWMJkhvq5hL0ig4GCxnNJub-qLvdTGd9MOR-WhrkOpDX8O_Mj4IdTyjy6U2lrrkxEnHZFX4Z7Kw8ZZ0ww",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCeOxM8nNxo2pc4tfyX-GJFGRR-R-HhBrThwMF2YiFs6MepzRXuDZJ4NGJCIWrLpxQdzDuQRQc8m3FosvCJmo5Y9VNrurh8ClY_9WB1b8eOuDqz3z7h0G9Fuxpar37740xURL076ITKplEf3r0NaQxdtVe6sILlIqFxBsDVzgTRJjk1bOcTKSrr5l0VRMWUjr95b1t3H1UNfSdcxVlNHDg560haqv_y46u2XNdX2TqYAGJISSyjF3g5ZqKPCtM4oxnZtLRKQQl2OK24",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAnx_0jDK07BfnS5RJx9WHZetLi6-ljJ4uuhkCh0Qz829ga20Zy5YMEAQiB1iI0SwXokx-hw_gmEpZIVytBo1j6LnT755ZIt-L8BLeqb92aMGg9w7juz35rEzqE72cf0whI86OlprU7E7IT30MXDZhh4a2MS-45-qsSNoBj8HX9-xDOdab5oUA4d0Vl-vMOI_HGkyn9aXfhBKnjCpeY9fan6G7Hz1UOF9MveQoXNfKlZfzFkmBbqAmrlWMY5VBlo_OUsL6yuei-4Gw",
                      ].map((src) => (
                        <div
                          key={src}
                          className="size-6 rounded-full ring-2 overflow-hidden"
                          style={{
                            background: `${BRAND.soft}22`,
                            borderColor: "transparent",
                            boxShadow:
                              "0 0 0 2px rgba(254,254,253,0.9) inset",
                          }}
                        >
                          <img alt="Participant" src={src} />
                        </div>
                      ))}

                      <div
                        className="size-6 rounded-full flex items-center justify-center text-[10px] font-black"
                        style={{
                          background: `${BRAND.soft}33`,
                          color: BRAND.primary,
                          boxShadow:
                            "0 0 0 2px rgba(254,254,253,0.9) inset",
                        }}
                      >
                        +12
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      15 thành viên đang hoạt động
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-semibold border"
                  style={{
                    borderColor: `${BRAND.soft}99`,
                    color: "#475569",
                    background: "transparent",
                  }}
                  to="/home"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${BRAND.soft}18`;
                    e.currentTarget.style.color = BRAND.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#475569";
                  }}
                >
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>{" "}
                  Quay lại Workshop
                </Link>

                <div className="h-6 w-px" style={{ background: `${BRAND.soft}99` }} />

                {["call", "more_vert"].map((ic) => (
                  <button
                    key={ic}
                    className="p-2 transition-colors rounded-lg"
                    type="button"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    <span className="material-symbols-outlined">{ic}</span>
                  </button>
                ))}
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex justify-center">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase border"
                  style={{
                    background: `${BRAND.soft}18`,
                    borderColor: `${BRAND.soft}66`,
                    color: "#64748b",
                  }}
                >
                  Hôm nay
                </span>
              </div>

              {/* Received Message */}
              <div className="flex items-end gap-3 max-w-2xl">
                <div className="size-9 rounded-full flex-shrink-0 overflow-hidden border"
                     style={{ borderColor: `${BRAND.soft}66`, background: `${BRAND.soft}22` }}>
                  <img
                    alt="Alex's avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-uAdoHDkG_g8v5fB2qlMkgR83qm3f6xjuiJDEoDUu0-yO7k3jT6JOqsKSbYemKLkRP1lcVQBdrP5zGW0uagvBqOLE6dnmDBJsixCQxKhkAy4qqT0Tv6i82MgQblf_e7FIqe7AvKGZgns8RGcaBGnm8dPst2pHGu1lmWIGVM7oWUhuna7uxBSWDiNrjeIW9AWAP0oysz7Kgap9VjmiYlge9x3lEMz6fN9UCeFMjQ6hO5dwEWrSRk-a_5Ke8MwJtBYk0cgkpgM75K5-"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    Alex Chen
                  </span>
                  <div
                    className="p-4 rounded-2xl rounded-bl-none shadow-sm border"
                    style={{
                      background: "rgba(255,255,255,0.80)",
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <p className="text-sm leading-relaxed">
                      Mọi người đã mua đất sét cho ngày mai chưa? Xưởng nói chúng
                      ta cần ít nhất 5kg cho dự án bình hoa.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-1">
                    10:24 AM
                  </span>
                </div>
              </div>

              {/* Another Received Message */}
              <div className="flex items-end gap-3 max-w-2xl">
                <div className="size-9 rounded-full flex-shrink-0 overflow-hidden border"
                     style={{ borderColor: `${BRAND.soft}66`, background: `${BRAND.soft}22` }}>
                  <img
                    alt="Jordan's avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDls4EuN8KAmRvPccTsGhHHpgAxVgn58DA51KQRS2kzeb1MRBEh2zFH5O4gsnC54NTs_Iv4lev_2QhWauh2CNmZxz0ib30RMVOD1sdcx4E3fh6Mq_GnBSsF_NfPwNZ0spMWJxFsQp5DRgPto1uilh1lGanby-QXsWD4HRdVqUApY-HObXE8nH2yOeBM_d-nRcupvtgUMKiggV0RwTx1gD85nw4LFUQQKvWJsYbpKiKLflBfAdXWbPx0_aBFjAWlSo7ZlmajlRtJr80N"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    Jordan Smith
                  </span>
                  <div
                    className="p-4 rounded-2xl rounded-bl-none shadow-sm border"
                    style={{
                      background: "rgba(255,255,255,0.80)",
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <p className="text-sm leading-relaxed">
                      Tôi sẽ ghé qua cửa hàng vật liệu trong một giờ nữa, nếu ai
                      cần tôi mua giúp gì không! 🏺
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-1">
                    10:26 AM
                  </span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex items-end gap-3 max-w-2xl ml-auto flex-row-reverse">
                <div
                  className="size-9 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs"
                  style={{ background: BRAND.accent, color: "white" }}
                >
                  JD
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xs font-semibold text-slate-500 mr-1">
                    Bạn
                  </span>
                  <div
                    className="p-4 rounded-2xl rounded-br-none shadow-md"
                    style={{
                      background: BRAND.accent,
                      color: "white",
                      boxShadow: "0 16px 34px rgba(240,138,120,0.20)",
                    }}
                  >
                    <p className="text-sm leading-relaxed">
                      Tôi vừa mua xong! Sẵn sàng để bắt đầu nặn rồi. Jordan, bạn
                      có thể kiểm tra xem họ còn bộ cắt dây nào không?
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mr-1">
                    <span className="text-[10px] text-slate-400">10:30 AM</span>
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ color: BRAND.primary }}
                    >
                      done_all
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Attachment Message */}
              <div className="flex items-end gap-3 max-w-2xl">
                <div className="size-9 rounded-full flex-shrink-0 overflow-hidden border"
                     style={{ borderColor: `${BRAND.soft}66`, background: `${BRAND.soft}22` }}>
                  <img
                    alt="Alex's avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATx0I5aix1JQ_I2Ed8jRxExXlmxY8_bCEKT34BbrhUQ2TlJqRz4BLSq6MPvaVGVlkcoQlCk9veNwoAFpljr_V0KaSFClKJ9EMoTJibdEGi5Vg9fCDO3h7S7BYqM-AB7NKacIbRSRL3IIV1xpfHei8BqqYYktp6SZvObRpE43U8x4mbPau_ZSwUSirn0XdFAgERFpzTXcKijqfXaJLGl3J1y6rOD7CfCsqOU9yGgLQ1jK8QeyBDLtETnrbpl7IDTAB3L_ZP03L4pEc9"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    Alex Chen
                  </span>
                  <div
                    className="p-2 rounded-2xl rounded-bl-none shadow-sm border"
                    style={{
                      background: "rgba(255,255,255,0.80)",
                      borderColor: `${BRAND.soft}99`,
                    }}
                  >
                    <div className="rounded-xl overflow-hidden mb-2">
                      <div
                        className="aspect-video flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.soft}33, ${BRAND.accent}22)`,
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-4xl"
                          style={{ color: `${BRAND.primary}aa` }}
                        >
                          image
                        </span>
                      </div>
                    </div>
                    <p className="text-sm px-2 pb-1">
                      Tìm thấy nguồn cảm hứng này cho các hình khối ngày mai!
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-1">
                    10:32 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div
              className="p-6 border-t"
              style={{
                background: "rgba(254,254,253,0.85)",
                borderColor: `${BRAND.soft}99`,
              }}
            >
              <div
                className="max-w-4xl mx-auto flex items-end gap-3 p-2 rounded-2xl border"
                style={{
                  background: `${BRAND.soft}18`,
                  borderColor: `${BRAND.soft}99`,
                }}
              >
                <button
                  type="button"
                  className="p-2 transition-colors"
                  style={{ color: "#94a3b8" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = BRAND.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <span className="material-symbols-outlined">add_circle</span>
                </button>

                <div className="flex-1 min-h-[44px] flex items-center">
                  <textarea
                    className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 text-sm text-slate-700 placeholder-slate-400"
                    placeholder="Nhập tin nhắn..."
                    rows={1}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 transition-colors"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = BRAND.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#94a3b8")
                    }
                  >
                    <span className="material-symbols-outlined">mood</span>
                  </button>

                  <button
                    type="button"
                    className="size-10 rounded-xl flex items-center justify-center transition-transform active:scale-95"
                    style={{
                      background: BRAND.accent,
                      color: "white",
                      boxShadow: "0 14px 30px rgba(240,138,120,0.20)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(0.95)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] text-slate-400 mt-3 font-semibold">
                Hãy luôn thân thiện và sáng tạo! 🎨
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}