import { useNavigate, Link } from 'react-router-dom';
import HostHeader from '../../components/HostHeader';
import HostSidebar from '../../components/HostSidebar';
export default function HostInstructorProfile() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
        <div className="relative flex min-h-screen w-full">
          {/* Sidebar Navigation */}
          <HostSidebar />
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {/* Header */}
            <HostHeader title="Review" />
            {/* Filters */}
            <div className="px-8 mt-6">
              <div className="flex border-b border-primary/10">
                <button className="px-4 py-3 text-sm font-bold text-primary border-b-2 border-primary">Tất cả đánh giá</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Chưa trả lời (14)</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Đánh giá cao nhất</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">Đánh giá thấp nhất</button>
              </div>
            </div>
            {/* Reviews List */}
            <section className="p-8 space-y-6 max-w-5xl">
              {/* Review Item 1 */}
              <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                    <img className="w-full h-full object-cover" data-alt="Portrait of review author Sarah J." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-sc_fN6yIxrOAwtd-jDrHaIIkry5IEyyewcTo4ljYmfD0JusXCgoKKOeLQ5FDgyIFPzYmMK1gZrgjgfmVoYNQuri2fPkajGFBbYCiRuMHnvKaMvbhx0gYbR-aQ2IyfkDSxLjFEFXfVwJgqYb7x6aoFNV6PzjqxkQ-YU1iWUkQ9JG-kRXJWJC_a_rZHXkF4U55YAy_xh-t9JOcdOjOUJ1aNcteP76NoqQfvSbfuLZPFuVqQnjJ_XcTUm42vofYVnDG9ocOOGwSviUY" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Gốm sứ cho người mới bắt đầu</span>
                          <span>•</span>
                          <span>12 tháng 10, 2023</span>
                        </div>
                      </div>
                      <div className="flex text-primary">
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                      </div>
                    </div>
                    <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Workshop này thật sự tuyệt vời! Người hướng dẫn rất kiên nhẫn và không khí rất thư giãn. Tôi đã làm được ba chiếc bát nhỏ mà tôi thực sự tự hào. Rất khuyến khích cho bất kỳ ai muốn thử làm gốm!</p>
                    {/* Reply Section */}
                    <div className="mt-4 pt-4 border-t border-primary/5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-sm">reply</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PHẢN HỒI CỦA BẠN</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic bg-primary/5 p-3 rounded-lg border-l-4 border-primary/30">"Cảm ơn Sarah! Rất vui khi được đón tiếp bạn tại studio. Kỹ thuật tráng men của bạn thực sự khá tiến bộ đối với một người mới bắt đầu!"</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Review Item 2 */}
              <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                    <img className="w-full h-full object-cover" data-alt="Portrait of review author Michael C." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtMagh2fhtcS0MOsUSxRVZFVozcfzN1grC41gc58P7mCOCPx0Gu51rY9bCWDV4NAzNInSe_nFfsyaeIaUBXvCsutVHWT5ftacthJ2WvRh7zb8mCxhRO701DwPE4188I1MJNdR1pyU8UcKKJ8DWFZDdnShRWW0reuwwXyPS6TvYBm9tS-R3_cMu6xV5e58lMjNitqhyXuVZ-ntJ-MDQjfTheYkoacrAViMBJMqwYmihJyzS3nKZv1ehvgEjLWnZoHOiV1K7-LWoQJrj" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">Michael Chen</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Chế tác gỗ nâng cao</span>
                          <span>•</span>
                          <span>10 tháng 10, 2023</span>
                        </div>
                      </div>
                      <div className="flex text-primary">
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined text-sm">star</span>
                      </div>
                    </div>
                    <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Kiến thức kỹ thuật được chia sẻ rất tốt. Tốc độ hơi nhanh đối với tôi, nhưng các vật liệu được cung cấp rất chất lượng. Tôi rất muốn có một buổi bổ sung chỉ để học các kỹ thuật hoàn thiện.</p>
                    {/* Unreplied State */}
                    <div className="mt-4 flex flex-col gap-3">
                      <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-primary focus:ring-primary" placeholder="Nhập phản hồi của bạn..."></textarea>
                      <div className="flex justify-end">
                        <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-6 rounded-lg transition-all shadow-sm shadow-primary/20">Gửi phản hồi</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Review Item 3 */}
              <div className="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                    <img className="w-full h-full object-cover" data-alt="Portrait of review author David R." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubyufP15O0AFCv1cG6VS7QYL6x2M5jiAdGOHujYZ1UeoqowsPeSlum1zFpqlJ3j1IuuGFUskqCceGUqbzWfKPHLdxL5QHPkGz9dLyLixjGY_LRPliTsdHknA24xt3aafQ9WD9bZtQxIcphVDCEU69h0HsIEzCft21Jhgg1lJpmCHMlhF7fFFmzXGTXtfw6r0OvrIn5rOxt_JwQ-yhNcaG4cS7mVYAs5R55DKwuBNaoPuIAu5cxM5eUKGPgBeTB4g31Dy-zfTo20HY" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">David Ross</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Làm tiểu cảnh Terrarium</span>
                          <span>•</span>
                          <span>05 tháng 10, 2023</span>
                        </div>
                      </div>
                      <div className="flex text-primary">
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                        <span className="material-symbols-outlined material-symbols-filled text-sm">star</span>
                      </div>
                    </div>
                    <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Các workshop của Hands &amp; Hour chưa bao giờ làm tôi thất vọng. Đây là lần thứ ba tôi đặt chỗ với Alex và như mọi khi, sự giao tiếp và buổi workshop thực tế đều rất xuất sắc. Bình tiểu cảnh của tôi đang phát triển rất tốt!</p>
                    <div className="mt-4 flex gap-4 text-slate-400">
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">thumb_up</span>
                        <span className="text-xs">Hữu ích (4)</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">reply</span>
                        <span className="text-xs">Phản hồi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Pagination */}
            <footer className="p-8 mt-auto flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold">1</button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 font-bold">2</button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500 font-bold">3</button>
                <span className="mx-2 text-slate-400">...</span>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-primary/5 text-slate-500">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
