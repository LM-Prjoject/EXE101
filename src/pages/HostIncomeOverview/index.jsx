import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HostHeader from '../../components/HostHeader';
import HostSidebar from '../../components/HostSidebar';
import { createWithdrawRequest, getRevenueStatistics, getHostWorkshopsRevenue } from '../../api';

/* ─── Vietnamese bank list ─────────────────────────────────────── */
const BANKS = [
  'Vietcombank',
  'VietinBank',
  'BIDV',
  'Agribank',
  'Techcombank',
  'MB Bank',
  'ACB',
  'VPBank',
  'TPBank',
  'Sacombank',
  'HDBank',
  'VIB',
  'OCB',
  'SHB',
  'Eximbank',
  'LPBank',
  'SeABank',
  'Nam A Bank',
  'Bac A Bank',
  'PVcomBank',
];

function formatCurrency(value) {
  if (value == null) return '0 ₫';
  return `${Number(value).toLocaleString('vi-VN')} ₫`;
}

/* ─── Withdraw Modal ────────────────────────────────────────────── */
function WithdrawModal({ availableRevenue, onClose, onSuccess }) {
  const [form, setForm] = useState({ amount: '', bankName: '', bankAccount: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
  const [amountError, setAmountError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'amount') {
      const amt = parseFloat(value);
      if (isNaN(amt) || amt <= 0) {
        setAmountError('Vui lòng nhập số tiền hợp lệ (> 0).');
      } else if (amt > availableRevenue) {
        setAmountError(`Số tiền vượt quá số dư khả dụng (${formatCurrency(availableRevenue)})`);
      } else if (amt < 10000) {
        setAmountError('Số tiền rút tối thiểu là 10,000 ₫');
      } else {
        setAmountError(null);
      }
    }
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      showToast('error', 'Vui lòng nhập số tiền hợp lệ (> 0).');
      return;
    }
    if (amount > availableRevenue) {
      showToast('error', 'Số tiền vượt quá số dư khả dụng.');
      return;
    }
    if (amount < 10000) {
      showToast('error', 'Số tiền rút tối thiểu là 10,000 ₫.');
      return;
    }
    if (!form.bankName) {
      showToast('error', 'Vui lòng chọn ngân hàng.');
      return;
    }
    if (!form.bankAccount.trim()) {
      showToast('error', 'Vui lòng nhập số tài khoản.');
      return;
    }

    setLoading(true);
    try {
      await createWithdrawRequest({
        amount,
        bankName: form.bankName,
        bankAccount: form.bankAccount.trim(),
      });
      showToast('success', 'Yêu cầu rút tiền đã được gửi thành công!');
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(onClose, 2000);
    } catch (err) {
      showToast('error', err.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header gradient stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-primary" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Yêu cầu rút tiền</h2>
              <p className="text-xs text-slate-500 mt-0.5">Điền thông tin tài khoản ngân hàng của bạn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`mx-6 mb-4 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {toast.msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Số tiền muốn rút <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none">₫</span>
              <input
                id="withdraw-amount"
                name="amount"
                type="number"
                min="10000"
                step="1000"
                placeholder="Ví dụ: 500000"
                value={form.amount}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                required
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Số dư khả dụng: <strong className="text-slate-700 dark:text-slate-200">{formatCurrency(availableRevenue)}</strong></span>
              <span className="text-slate-400">Tối thiểu: 10,000 ₫</span>
            </div>
            {amountError && (
              <p className="text-xs text-red-500 mt-1 font-semibold">{amountError}</p>
            )}
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Ngân hàng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </span>
              <select
                id="withdraw-bank-name"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition appearance-none"
                required
              >
                <option value="">-- Chọn ngân hàng --</option>
                {BANKS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </span>
            </div>
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Số tài khoản <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
              </span>
              <input
                id="withdraw-bank-account"
                name="bankAccount"
                type="text"
                placeholder="Ví dụ: 1234567890"
                value={form.bankAccount}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">Nhập đúng số tài khoản để tránh thất lạc tiền</p>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <span className="material-symbols-outlined text-amber-500 text-[18px] mt-0.5 shrink-0">info</span>
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Yêu cầu sẽ được xử lý trong vòng <strong>1–3 ngày làm việc</strong>. Vui lòng kiểm tra thông tin trước khi gửi.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || !!amountError}
              className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Đang gửi...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Gửi yêu cầu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function HostIncomeOverview() {
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [stats, setStats] = useState({ totalRevenue: 0, availableRevenue: 0, upcomingRevenue: 0 });
  const [workshopsRevenue, setWorkshopsRevenue] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [errorStats, setErrorStats] = useState(null);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      setLoadingRevenue(true);
      setErrorStats(null);
      const [statsData, revenueData] = await Promise.all([
        getRevenueStatistics(new Date().getFullYear()),
        getHostWorkshopsRevenue()
      ]);
      setStats({
        totalRevenue: statsData.totalRevenue || 0,
        availableRevenue: statsData.availableRevenue || 0,
        upcomingRevenue: statsData.upcomingRevenue || 0,
      });
      setWorkshopsRevenue(revenueData || []);
    } catch (err) {
      console.error(err);
      setErrorStats(err.message || 'Không thể tải thông tin doanh thu.');
    } finally {
      setLoadingStats(false);
      setLoadingRevenue(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <HostSidebar />
          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
            <HostHeader title="Quản lý Thu nhập" />
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 w-full">
              {/* Page Title */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tổng quan thu nhập</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Xem chi tiết tổng số tiền doanh thu workshop của bạn</p>
                </div>
              </div>

              {errorStats && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    <span>{errorStats}</span>
                  </div>
                  <button
                    onClick={fetchStats}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* Financial Stats Card */}
              <div className="max-w-md bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Tổng doanh thu</span>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {loadingStats ? 'Đang tải...' : formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                  Tổng số tiền thu nhập tích lũy từ tất cả các buổi học
                </p>
              </div>

              {/* Lịch sử nguồn tiền vào */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nguồn tiền đối soát</h3>
                    <p className="text-slate-500 text-xs mt-1">Danh sách các workshop đã hoàn thành và doanh thu tương ứng</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">payments</span>
                </div>
                {loadingRevenue ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    Đang tải danh sách nguồn tiền...
                  </div>
                ) : workshopsRevenue.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">inbox</span>
                    <p>Chưa có nguồn tiền nào được đối soát hoàn tất.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-8 py-4">Workshop</th>
                          <th className="px-8 py-4 text-center">Số vé bán được</th>
                          <th className="px-8 py-4 text-right">Tổng thu nhập</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {workshopsRevenue.map((w) => (
                          <tr key={w.workshopId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-8 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                              {w.thumbnailLink ? (
                                <img
                                  src={w.thumbnailLink}
                                  alt={w.workshopTitle}
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-100 dark:border-slate-800"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                  <span className="material-symbols-outlined text-lg">image</span>
                                </div>
                              )}
                              <span>{w.workshopTitle}</span>
                            </td>
                            <td className="px-8 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                              {w.ticketCount} vé
                            </td>
                            <td className="px-8 py-4 text-right font-black text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(w.totalRevenue)}
                            </td>
                          </tr>
                        ))}
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
