import { useNavigate, Link } from 'react-router-dom';
export default function HostCreateWorkshop() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2c2a] px-10 py-3 shadow-sm">
      <div className="flex items-center gap-4">
      <div className="size-8 text-primary">
      <span className="material-symbols-outlined text-4xl leading-none">manufacturing</span>
      </div>
      <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Hands &amp; Hour</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
      <div className="flex items-center gap-9 hidden md:flex">
      <a className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Khám phá</a>
      <a className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Giảng dạy</a>
      <a className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Giới thiệu</a>
      </div>
      <div className="flex gap-3">
      <button className="flex items-center justify-center overflow-hidden rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
      <span className="material-symbols-outlined text-xl">notifications</span>
      </button>
      <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20">
      <img alt="User Avatar" className="h-full w-full object-cover" data-alt="Portrait of a smiling woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe7ESQapHwLMFAJYqUfTSBhA_M6KmKk6AWU_CvJIkVi7tMHaxl5E58ryzXJ1G1u1AhN0imFHgqAqvLfBfK73zSzDjUx1MCJddtxMkog07vMw6pTX33wDirEMimguagNp554ngYqOe8xCV5_X8JTApeMoK5sNnRrw4ddYv3oUK_D3VIeqJgcbYJ20GknahELvaREKsD_4_gCP312kh3ZZwigwhl5znZXOa3d4gNHwqVbkdotcqEnfPlLVV9LQdyf1dAFSZG4-sa0uEP"/>
      </div>
      </div>
      </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 md:py-12 pb-24">
      {/* Header Section */}
      <div className="mb-10 animate-fade-in-up">
      <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">Tạo Workshop Mới</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">Chia sẻ tay nghề của bạn với Đà Nẵng. Cùng thiết lập không gian sáng tạo của bạn nào.</p>
      </div>
      <form className="space-y-12">
      {/* Basic Details Section */}
      <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">1</span>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Thông Tin Cơ Bản</h2>
      </div>
      <div className="space-y-6">
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Tên Workshop</label>
      <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="vd: Lớp học làm gốm ngắm hoàng hôn trên biển" type="text"/>
      </div>
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-3">Danh mục</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <label className="cursor-pointer group">
      <input checked="" className="peer sr-only" name="category" type="radio"/>
      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-primary group-hover:text-primary/80">brush</span>
      <span className="font-semibold text-sm text-slate-600 dark:text-slate-300 peer-checked:text-primary">Hội họa</span>
      </div>
      </label>
      <label className="cursor-pointer group">
      <input className="peer sr-only" name="category" type="radio"/>
      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-primary group-hover:text-primary/80">emoji_food_beverage</span>
      <span className="font-semibold text-sm text-slate-600 dark:text-slate-300 peer-checked:text-primary">Làm gốm</span>
      </div>
      </label>
      <label className="cursor-pointer group">
      <input className="peer sr-only" name="category" type="radio"/>
      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-primary group-hover:text-primary/80">diamond</span>
      <span className="font-semibold text-sm text-slate-600 dark:text-slate-300 peer-checked:text-primary">Trang sức</span>
      </div>
      </label>
      <label className="cursor-pointer group">
      <input className="peer sr-only" name="category" type="radio"/>
      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-primary group-hover:text-primary/80">content_cut</span>
      <span className="font-semibold text-sm text-slate-600 dark:text-slate-300 peer-checked:text-primary">Dệt may</span>
      </div>
      </label>
      </div>
      </div>
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Mô tả</label>
      <textarea className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 min-h-[120px]" placeholder="Mô tả những gì người tham gia sẽ được học và tạo ra..."></textarea>
      </div>
      </div>
      </section>
      {/* Schedule Settings */}
      <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">2</span>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cài Đặt Lịch Trình</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Ngày mở lớp</label>
      <div className="flex flex-wrap gap-2">
      <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors" type="button">Th 5</button>
      <button className="w-10 h-10 rounded-full bg-primary text-white border border-primary text-sm font-medium shadow-md shadow-primary/30" type="button">Th 5</button>
      <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors" type="button">Th 5</button>
      <button className="w-10 h-10 rounded-full bg-primary text-white border border-primary text-sm font-medium shadow-md shadow-primary/30" type="button">Th 5</button>
      <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors" type="button">Th 6</button>
      <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors" type="button">Th 7</button>
      <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors" type="button">CN</button>
      </div>
      </div>
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Khung giờ</label>
      <div className="space-y-3">
      <div className="flex items-center gap-3">
      <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0" type="time" value="09:00"/>
      <span className="text-slate-400 text-sm">đến</span>
      <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 text-sm focus:border-primary focus:ring-0" type="time" value="11:30"/>
      <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-full" type="button">
      <span className="material-symbols-outlined text-lg">close</span>
      </button>
      </div>
      <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline" type="button"><span className="material-symbols-outlined text-lg">add</span> Thêm khung giờ khác</button>
      </div>
      </div>
      </div>
      </section>
      {/* Ticket Settings */}
      <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">3</span>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Vé &amp; Sức Chứa</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Giá mỗi người (VND)</label>
      <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₫</span>
      <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-8 pr-4 py-3.5 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="500,000" type="number"/>
      </div>
      <p className="text-xs text-slate-400 mt-2">Đã bao gồm phí nền tảng và thuế.</p>
      </div>
      <div>
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">Số lượng tối đa</label>
      <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-1 w-fit">
      <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-500 transition-colors" type="button">
      <span className="material-symbols-outlined">remove</span>
      </button>
      <input className="w-16 text-center bg-transparent border-none text-slate-900 dark:text-white font-bold focus:ring-0 p-0" type="number" value="8"/>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-500 transition-colors" type="button">
      <span className="material-symbols-outlined">add</span>
      </button>
      </div>
      </div>
      </div>
      </section>
      {/* Media Upload */}
      <section className="bg-white dark:bg-[#1a2c2a] rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">4</span>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Thư Viện Không Gian Làm Việc</h2>
      </div>
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-3xl">cloud_upload</span>
      </div>
      <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">Nhấp để tải lên hoặc kéo và thả</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">SVG, PNG, JPG hoặc GIF (tối đa 800x400px)</p>
      <button className="px-5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:shadow-md transition-all" type="button">Chọn tệp</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="relative aspect-square rounded-xl overflow-hidden group">
      <img alt="Pottery workshop preview" className="w-full h-full object-cover" data-alt="Close up of pottery wheel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi5a7PVINUIbyvMnrwquc0lRpn6rwFYJFUdq746APDfLDEgyi5f6PqYKgVanOiPZYqIgtKjKhlHSCO__qUTGOkmBeC57hHDeafQfUAdO2m2VvxaPdCWodQEy0pn-gBeDAVpxdCS-RW0sSEksHlflc6UXLeTBX-rktlwxw3Yet3JHryGT-FU8qbez8GUBajD92ClF-WcUX8Iw3kmSI-UcXhg7lRB4fvv_pcUujkxRGjKq2ktMDC92i5mypTytIO5ge1uy6fKyp9wu2q"/>
      <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
      <span className="material-symbols-outlined text-sm">delete</span>
      </button>
      </div>
      <div className="relative aspect-square rounded-xl overflow-hidden group">
      <img alt="Pottery tools preview" className="w-full h-full object-cover" data-alt="Ceramic tools on table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAehGa7ocPJUFrUQr5h9fP_Jvv8PLtH2wtYLINDe018Ee6hlMJC5dpG215judOwspg2YhisrUS7IJB-_ePv72RAza06Uw_9Rirhh-5wjPhUEJrNZvSPU-y3ZjTfvs3imZI4JCjeE3xa9tlHUzZwVRmQHfUXik7c8Fv_r8bh2RL1OFalyc-OkH-sLKhlLidHTYyXYu1__q2FbHY38cyO_UoVq18dihn4lnBxp_JzaPNeRTWOZffC5e-YIZAwoxn1qug7sXIw197eCvd5"/>
      <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
      <span className="material-symbols-outlined text-sm">delete</span>
      </button>
      </div>
      </div>
      </section>
      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a2c2a] border-t border-slate-200 dark:border-slate-800 p-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:pt-4">
      <div className="max-w-[960px] mx-auto flex flex-col-reverse md:flex-row items-center justify-end gap-4">
      <button className="w-full md:w-auto px-8 py-4 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" type="button">Th 7</button>
      {/* Using the secondary (orange) color requested by user for the main CTA */}
      <button className="w-full md:w-auto px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 bg-primary shadow-primary/30" type="submit">
      <span>Đăng Workshop</span>
      <span className="material-symbols-outlined">rocket_launch</span>
      </button>
      </div>
      </div>
      </form>
      </main>
      </div>
    </>
  );
}
