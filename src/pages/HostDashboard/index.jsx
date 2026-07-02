import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HostHeader from '../../components/HostHeader';
import HostSidebar from '../../components/HostSidebar';
import { getMyWorkshops } from '../../api';

function formatDateDMY(value) {
  if (!value) return '';

  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function HostDashboard() {
  const navigate = useNavigate();

  // Page States
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | verified | pending | removed

  const fetchHostWorkshops = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch a large page size to get an overview of all workshops
      const data = await getMyWorkshops(1, 100);
      if (data) {
        const items = data.data || data.Data || data.items || data.Items || [];
        setWorkshops(items);
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Không thể tải danh sách workshop của bạn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostWorkshops();
  }, []);

  const visibleWorkshops = workshops.filter((w) => {
    const status = String(w.status ?? w.Status ?? '').trim().toLowerCase();
    return status !== 'draft';
  });

  // Compute overall stats
  let totalWorkshops = visibleWorkshops.length;
  let totalMaxTickets = 0;
  let totalRemainingTickets = 0;

  visibleWorkshops.forEach(w => {
    const status = String(w.status ?? w.Status ?? '').trim().toLowerCase();
    const isActiveWorkshop = status === 'verified';
    const schedules = w.schedules || w.Schedules || [];

    schedules.forEach(s => {
      const tickets = s.tickets || s.Tickets || [];
      tickets.forEach(t => {
        totalMaxTickets += t.maxTickets ?? t.MaxTickets ?? 0;
        if (isActiveWorkshop) {
          totalRemainingTickets += t.remainingTickets ?? t.RemainingTickets ?? 0;
        }
      });
    });
  });

  let totalSoldTickets = totalMaxTickets - totalRemainingTickets;
  let fillRate = totalMaxTickets > 0 ? Math.round((totalSoldTickets / totalMaxTickets) * 100) : 0;

  // Filtered workshops
  const filteredWorkshops = visibleWorkshops.filter(w => {
    const title = (w.title || w.Title || '').toLowerCase();
    const status = (w.status || w.Status || '').toLowerCase();
    
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const normalized = (status || '').toLowerCase();
    switch (normalized) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-500"></span>
            Hoạt động
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
            <span className="size-1.5 rounded-full bg-amber-500 animate-ping"></span>
            Chờ duyệt
          </span>
        );
      case 'removed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
            <span className="size-1.5 rounded-full bg-rose-500"></span>
            Đã xóa
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
            {status?.toUpperCase() || 'N/A'}
          </span>
        );
    }
  };

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <HostSidebar />
          
          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
            <HostHeader title="Tổng quan Dashboard" />
            
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 w-full">
              {/* Page Title & Quick Action */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard của bạn</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Theo dõi hoạt động, trạng thái và lượng vé còn lại của các lớp học.</p>
                </div>
                <Link
                  to="/host/create-workshop"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Tạo Workshop Mới
                </Link>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={fetchHostWorkshops}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-750 text-white rounded-lg text-xs font-bold transition"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* Statistical Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Stats Card: Total Workshops */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-xs tracking-wider uppercase">Tổng số lớp học</span>
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                      <span className="material-symbols-outlined text-[20px]">storefront</span>
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {loading ? '...' : totalWorkshops}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">Tổng số lớp bạn đang sở hữu</p>
                </div>

                {/* Stats Card: Tickets Sold */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-xs tracking-wider uppercase">Tổng vé đã bán</span>
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
                      <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {loading ? '...' : totalSoldTickets}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">Tổng số học viên đã đăng ký</p>
                </div>

                {/* Stats Card: Tickets Remaining */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-xs tracking-wider uppercase">Tổng vé còn lại</span>
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl">
                      <span className="material-symbols-outlined text-[20px]">event_seat</span>
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {loading ? '...' : totalRemainingTickets}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">Tổng số ghế trống còn trống</p>
                </div>

                {/* Stats Card: Fill Rate */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-xs tracking-wider uppercase">Tỷ lệ lấp đầy</span>
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl">
                      <span className="material-symbols-outlined text-[20px]">percent</span>
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {loading ? '...' : `${fillRate}%`}
                  </p>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${fillRate}%` }} />
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    placeholder="Tìm kiếm theo tên workshop..."
                    type="text"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex items-center bg-slate-100/70 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-fit gap-1">
                  {[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'verified', label: 'Hoạt động' },
                    { value: 'pending', label: 'Chờ duyệt' },
                    { value: 'removed', label: 'Đã xóa' },
                  ].map(tab => {
                    const active = statusFilter === tab.value;
                    return (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => setStatusFilter(tab.value)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                          active
                            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/30'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Workshops Overview & Tickets Remaining list */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Chi tiết lượng vé của từng Workshop</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Thông tin chi tiết về số lượng vé còn trống, ngày diễn ra của từng lớp.</p>
                  </div>
                  <button
                    onClick={fetchHostWorkshops}
                    disabled={loading}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <span className="material-symbols-outlined text-[20px] block">refresh</span>
                  </button>
                </div>

                {loading ? (
                  <div className="p-16 text-center text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-4">progress_activity</span>
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : filteredWorkshops.length === 0 ? (
                  <div className="p-16 text-center text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">inbox</span>
                    <p className="font-semibold text-slate-600 dark:text-slate-400">Không tìm thấy workshop nào</p>
                    <p className="text-xs text-slate-400 mt-1">Vui lòng kiểm tra lại bộ lọc hoặc tạo một workshop mới.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="py-4 px-8 w-[38%]">Workshop / Thông tin</th>
                          <th className="py-4 px-6 w-[12%] text-center">Trạng thái</th>
                          <th className="py-4 px-6 w-[20%]">Lịch trình tiếp theo</th>
                          <th className="py-4 px-6 w-[20%]">Tình trạng vé (Còn / Tổng)</th>
                          <th className="py-4 px-6 w-[10%] text-right">Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredWorkshops.map((w) => {
                          const wId = w.id ?? w.Id;
                          const wTitle = w.title ?? w.Title;
                          const wThumb = w.thumbnailLink ?? w.ThumbnailLink;
                          const wCategory = w.category ?? w.Category;
                          const wStatus = w.status ?? w.Status;
                          const wLevel = w.level ?? w.Level;
                          const wSchedules = w.schedules || w.Schedules || [];

                          // Calculate tickets count for this workshop
                          let wMaxTickets = 0;
                          let wRemainingTickets = 0;

                          wSchedules.forEach(s => {
                            const tickets = s.tickets || s.Tickets || [];
                            tickets.forEach(t => {
                              wMaxTickets += t.maxTickets ?? t.MaxTickets ?? 0;
                              wRemainingTickets += t.remainingTickets ?? t.RemainingTickets ?? 0;
                            });
                          });

                          let wSoldTickets = wMaxTickets - wRemainingTickets;
                          let wFillRate = wMaxTickets > 0 ? Math.round((wSoldTickets / wMaxTickets) * 100) : 0;

                          // Find upcoming dates
                          const dates = wSchedules.map(s => s.startOn ?? s.StartOn).filter(Boolean);
                          const formattedDates = dates.map(formatDateDMY);

                          return (
                            <tr key={wId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                              {/* Title, Thumbnail, Category */}
                              <td className="py-5 px-8">
                                <div className="flex items-center gap-4">
                                  {wThumb ? (
                                    <img
                                      src={wThumb}
                                      alt={wTitle}
                                      className="size-12 object-cover rounded-xl border border-slate-200/50 dark:border-slate-800 shadow-sm"
                                    />
                                  ) : (
                                    <div className="size-12 bg-slate-100 dark:bg-slate-850 rounded-xl flex items-center justify-center text-slate-400 border border-slate-250/20">
                                      <span className="material-symbols-outlined text-[22px]">image</span>
                                    </div>
                                  )}
                                  <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-slate-800 dark:text-white text-sm truncate" title={wTitle}>
                                      {wTitle}
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-400">
                                      <span className="bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-150 dark:border-slate-700/50">{wCategory}</span>
                                      <span>•</span>
                                      <span>Cấp độ: {wLevel}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="py-5 px-6 text-center">
                                {getStatusBadge(wStatus)}
                              </td>

                              {/* Next Schedules */}
                              <td className="py-5 px-6">
                                {formattedDates.length > 0 ? (
                                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                    {formattedDates.slice(0, 3).map((d, idx) => (
                                      <span
                                        key={idx}
                                        className="text-[11px] font-bold bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/30 px-2 py-0.5 rounded"
                                      >
                                        {d}
                                      </span>
                                    ))}
                                    {formattedDates.length > 3 && (
                                      <span className="text-[10px] font-black text-slate-400 px-1 py-0.5">
                                        +{formattedDates.length - 3} lịch
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/20 px-2.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/30">
                                    Chưa mở lịch
                                  </span>
                                )}
                              </td>

                              {/* Tickets Remaining / Max */}
                              <td className="py-5 px-6">
                                {wMaxTickets > 0 ? (
                                  <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
                                    <div className="flex justify-between items-baseline text-xs">
                                      <span className="font-bold text-slate-700 dark:text-slate-300">
                                        Còn: <strong className="text-indigo-650 dark:text-indigo-400 text-sm">{wRemainingTickets}</strong> / {wMaxTickets} vé
                                      </span>
                                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                                        Đã bán {wFillRate}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200/20">
                                      <div
                                        className={`h-full rounded-full transition-all duration-305 ${
                                          wRemainingTickets === 0
                                            ? 'bg-rose-500'
                                            : wRemainingTickets <= 3
                                            ? 'bg-amber-500'
                                            : 'bg-emerald-500'
                                        }`}
                                        style={{ width: `${wFillRate}%` }}
                                      />
                                    </div>
                                    {/* Breakdown of Ticket Types */}
                                    <div className="flex flex-col gap-0.5 mt-1 text-[10px] text-slate-400">
                                      {wSchedules.map((s, sIdx) => (
                                        <div key={sIdx}>
                                          {(s.tickets || s.Tickets || []).map((t, tIdx) => (
                                            <div key={tIdx} className="flex justify-between font-medium">
                                              <span>{(t.ticketType ?? t.TicketType) || 'Standard'}:</span>
                                              <span className="font-bold">
                                                còn {t.remainingTickets ?? t.RemainingTickets}/{t.maxTickets ?? t.MaxTickets}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/20 px-2.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/30">
                                    Không có vé
                                  </span>
                                )}
                              </td>

                              {/* Details Action Button */}
                              <td className="py-5 px-6 text-right">
                                <Link
                                  to="/host/workshops"
                                  className="p-1.5 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition"
                                  title="Quản lý chi tiết lớp học"
                                >
                                  <span className="material-symbols-outlined text-lg">edit</span>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
