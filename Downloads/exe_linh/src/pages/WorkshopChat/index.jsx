import { useNavigate, Link } from 'react-router-dom';
export default function WorkshopChat() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 text-primary mb-6">
      <span className="material-symbols-outlined text-3xl font-bold">layers</span>
      <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Bạn Đồng Hành Workshop</h2>
      </div>
      <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
      <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Tìm kiếm cuộc trò chuyện..." type="text"/>
      </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
      <div className="px-4 mb-2">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">Workshop Đã Đặt</h3>
      </div>
      <nav className="space-y-1 px-2">
      {/* Active Item */}
      <Link className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary group" to="/home">
      <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
      <span className="material-symbols-outlined">flatware</span>
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold truncate">Hội Gốm Sứ</p>
      <p className="text-xs text-primary/70 truncate font-medium">Alex: Mọi người đã mua đất sét chưa?</p>
      </div>
      <div className="size-2 rounded-full bg-primary"></div>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" to="/home">
      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
      <span className="material-symbols-outlined">palette</span>
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">Đội Vẽ Tranh Canvas</p>
      <p className="text-xs text-slate-500 truncate">Sarah: Rất mong chờ đến Thứ Sáu!</p>
      </div>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" to="/home">
      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
      <span className="material-symbols-outlined">carpenter</span>
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">Phù Thủy Mộc</p>
      <p className="text-xs text-slate-500 truncate">Marcus: Hãy xem những mối nối này này.</p>
      </div>
      </Link>
      <Link className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" to="/home">
      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
      <span className="material-symbols-outlined">brush</span>
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">Trung Tâm Nghệ Thuật Kỹ Thuật Số</p>
      <p className="text-xs text-slate-500 truncate">Leo: Đang gửi bộ cọ vẽ đây</p>
      </div>
      </Link>
      </nav>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
      <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
      <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">JD</div>
      <div className="flex-1 text-left">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Jane Doe</p>
      <p className="text-xs text-slate-500">Xem hồ sơ</p>
      </div>
      <span className="material-symbols-outlined text-slate-400">settings</span>
      </button>
      </div>
      </aside>
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
      {/* Top Navigation */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
      <div className="flex items-center gap-4">
      <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined text-3xl">flatware</span>
      </div>
      <div>
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">Hội Gốm Sứ <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider">Trò Chuyện Workshop</span></h1>
      <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
      <div className="size-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <img alt="Participant Alex" data-alt="Avatar of participant Alex" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5HZPue2IVUS5lgz2_ScTfFu_RJCnz9aTM64llna1Z2SCxVUxbtUX_xpWT8lzKLLdCkn_xZYQKhGvSdkU8QExEQutHN7JztdiE0-KkS9UJK2f4UHxKYDm3prLQr5UOE8sj4fbcZirthOuaiTTp1FyDfWfTKCeKUFrosXIZfGbCFuRMnPd0F0C7hWxpU4UIWMJkhvq5hL0ig4GCxnNJub-qLvdTGd9MOR-WhrkOpDX8O_Mj4IdTyjy6U2lrrkxEnHZFX4Z7Kw8ZZ0ww"/>
      </div>
      <div className="size-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <img alt="Participant Sarah" data-alt="Avatar of participant Sarah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeOxM8nNxo2pc4tfyX-GJFGRR-R-HhBrThwMF2YiFs6MepzRXuDZJ4NGJCIWrLpxQdzDuQRQc8m3FosvCJmo5Y9VNrurh8ClY_9WB1b8eOuDqz3z7h0G9Fuxpar37740xURL076ITKplEf3r0NaQxdtVe6sILlIqFxBsDVzgTRJjk1bOcTKSrr5l0VRMWUjr95b1t3H1UNfSdcxVlNHDg560haqv_y46u2XNdX2TqYAGJISSyjF3g5ZqKPCtM4oxnZtLRKQQl2OK24"/>
      </div>
      <div className="size-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <img alt="Participant Jordan" data-alt="Avatar of participant Jordan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAnx_0jDK07BfnS5RJx9WHZetLi6-ljJ4uuhkCh0Qz829ga20Zy5YMEAQiB1iI0SwXokx-hw_gmEpZIVytBo1j6LnT755ZIt-L8BLeqb92aMGg9w7juz35rEzqE72cf0whI86OlprU7E7IT30MXDZhh4a2MS-45-qsSNoBj8HX9-xDOdab5oUA4d0Vl-vMOI_HGkyn9aXfhBKnjCpeY9fan6G7Hz1UOF9MveQoXNfKlZfzFkmBbqAmrlWMY5VBlo_OUsL6yuei-4Gw"/>
      </div>
      <div className="size-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                      +12
                                  </div>
      </div>
      <span className="text-xs text-slate-500">15 thành viên đang hoạt động</span>
      </div>
      </div>
      </div>
      <div className="flex items-center gap-3">
      <Link className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium" to="/home"><span className="material-symbols-outlined text-lg">arrow_back</span> Quay lại Workshop</Link>
      <div className="h-6 w-px bg-slate-200 dark:border-slate-800"></div>
      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
      <span className="material-symbols-outlined">call</span>
      </button>
      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
      <span className="material-symbols-outlined">more_vert</span>
      </button>
      </div>
      </header>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="flex justify-center">
      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[11px] font-bold text-slate-500 tracking-wide uppercase">Hôm nay</span>
      </div>
      {/* Received Message */}
      <div className="flex items-end gap-3 max-w-2xl">
      <div className="size-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
      <img alt="Alex's avatar" data-alt="Detailed avatar for workshop participant Alex" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-uAdoHDkG_g8v5fB2qlMkgR83qm3f6xjuiJDEoDUu0-yO7k3jT6JOqsKSbYemKLkRP1lcVQBdrP5zGW0uagvBqOLE6dnmDBJsixCQxKhkAy4qqT0Tv6i82MgQblf_e7FIqe7AvKGZgns8RGcaBGnm8dPst2pHGu1lmWIGVM7oWUhuna7uxBSWDiNrjeIW9AWAP0oysz7Kgap9VjmiYlge9x3lEMz6fN9UCeFMjQ6hO5dwEWrSRk-a_5Ke8MwJtBYk0cgkpgM75K5-"/>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 ml-1">Alex Chen</span>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-sm leading-relaxed">Mọi người đã mua đất sét cho ngày mai chưa? Workshop nói chúng ta cần ít nhất 5kg cho dự án bình hoa.</p>
      </div>
      <span className="text-[10px] text-slate-400 ml-1">10:24 AM</span>
      </div>
      </div>
      {/* Another Received Message */}
      <div className="flex items-end gap-3 max-w-2xl">
      <div className="size-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
      <img alt="Jordan's avatar" data-alt="Detailed avatar for workshop participant Jordan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDls4EuN8KAmRvPccTsGhHHpgAxVgn58DA51KQRS2kzeb1MRBEh2zFH5O4gsnC54NTs_Iv4lev_2QhWauh2CNmZxz0ib30RMVOD1sdcx4E3fh6Mq_GnBSsF_NfPwNZ0spMWJxFsQp5DRgPto1uilh1lGanby-QXsWD4HRdVqUApY-HObXE8nH2yOeBM_d-nRcupvtgUMKiggV0RwTx1gD85nw4LFUQQKvWJsYbpKiKLflBfAdXWbPx0_aBFjAWlSo7ZlmajlRtJr80N"/>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 ml-1">Jordan Smith</span>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-sm leading-relaxed">Tôi sẽ ghé qua cửa hàng vật liệu trong một giờ nữa, nếu ai cần tôi mua giúp gì không! 🏺</p>
      </div>
      <span className="text-[10px] text-slate-400 ml-1">10:26 AM</span>
      </div>
      </div>
      {/* Sent Message */}
      <div className="flex items-end gap-3 max-w-2xl ml-auto flex-row-reverse">
      <div className="size-9 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                          JD
                      </div>
      <div className="flex flex-col gap-1 items-end">
      <span className="text-xs font-semibold text-slate-500 mr-1">Bạn</span>
      <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none shadow-md">
      <p className="text-sm leading-relaxed">Tôi vừa mua xong! Sẵn sàng để bắt đầu nặn rồi. Jordan, bạn có thể kiểm tra xem họ còn bộ cắt dây nào không?</p>
      </div>
      <div className="flex items-center gap-1 mr-1">
      <span className="text-[10px] text-slate-400">10:30 AM</span>
      <span className="material-symbols-outlined text-[14px] text-primary">done_all</span>
      </div>
      </div>
      </div>
      {/* Image Attachment Message */}
      <div className="flex items-end gap-3 max-w-2xl">
      <div className="size-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
      <img alt="Alex's avatar" data-alt="Detailed avatar for workshop participant Alex" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATx0I5aix1JQ_I2Ed8jRxExXlmxY8_bCEKT34BbrhUQ2TlJqRz4BLSq6MPvaVGVlkcoQlCk9veNwoAFpljr_V0KaSFClKJ9EMoTJibdEGi5Vg9fCDO3h7S7BYqM-AB7NKacIbRSRL3IIV1xpfHei8BqqYYktp6SZvObRpE43U8x4mbPau_ZSwUSirn0XdFAgERFpzTXcKijqfXaJLGl3J1y6rOD7CfCsqOU9yGgLQ1jK8QeyBDLtETnrbpl7IDTAB3L_ZP03L4pEc9"/>
      </div>
      <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 ml-1">Alex Chen</span>
      <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="rounded-xl overflow-hidden mb-2">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
      <span className="material-symbols-outlined text-4xl text-primary/60">image</span>
      </div>
      </div>
      <p className="text-sm px-2 pb-1">Tìm thấy nguồn cảm hứng này cho các hình khối ngày mai!</p>
      </div>
      <span className="text-[10px] text-slate-400 ml-1">10:32 AM</span>
      </div>
      </div>
      </div>
      {/* Input Area */}
      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">add_circle</span>
      </button>
      <div className="flex-1 min-h-[44px] flex items-center">
      <textarea className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400" placeholder="Nhập tin nhắn..." rows="1"></textarea>
      </div>
      <div className="flex items-center gap-1">
      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
      <span className="material-symbols-outlined">mood</span>
      </button>
      <button className="size-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/20">
      <span className="material-symbols-outlined">send</span>
      </button>
      </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">Hãy luôn thân thiện và sáng tạo! 🎨</p>
      </div>
      </main>
      </div>
      </div>
    </>
  );
}
