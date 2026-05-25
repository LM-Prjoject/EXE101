import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getHostRegistrations, updateHostRegistration } from '../../api/host';

export default function StaffHostApprovals() {
  const { currentUser } = useAuth();

  // Table state
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter and pagination state
  const [approveFilter, setApproveFilter] = useState(1); // 1 = NotApproved (Pending), 2 = Approved, 0 = Both (All)
  const [sortBy, setSortBy] = useState(3); // 3 = CreationTime, 1 = UserName, 0 = Id, 4 = UpdateTime
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [selectedReg, setSelectedReg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('approve'); // 'approve' or 'reject'
  const [note, setNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  // Fetch registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getHostRegistrations({
        approveFilter,
        sortBy,
        sortDesc,
        page,
        pageSize
      });
      if (data) {
        const itemsList = data.data || data.Data || data.items || data.Items || [];
        const total = data.totalCount ?? data.TotalCount ?? data.total ?? data.Total ?? 0;
        const pages = data.totalPages ?? data.TotalPages ?? Math.ceil((total || 0) / pageSize) ?? 1;

        setRegistrations(itemsList);
        setTotalCount(total);
        setTotalPages(pages || 1);
      }
    } catch (err) {
      setError(err?.message || 'Không thể tải danh sách đơn đăng ký. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [approveFilter, sortBy, sortDesc, page]);

  // Open action modal
  const openActionModal = (reg, type) => {
    setSelectedReg(reg);
    setModalType(type);
    setNote('');
    setActionError('');
    setShowModal(true);
  };

  // Submit approval / rejection
  const handleActionSubmit = async () => {
    if (!selectedReg) return;

    // Require note on rejection
    if (modalType === 'reject' && !note.trim()) {
      setActionError('Vui lòng nhập lý do từ chối đơn đăng ký.');
      return;
    }

    setActionLoading(true);
    setActionError('');

    try {
      await updateHostRegistration({
        hostId: selectedReg.userId,
        approved: modalType === 'approve',
        note: note.trim()
      });

      // Success: close modal and reload list
      setShowModal(false);
      setSelectedReg(null);
      fetchRegistrations();
    } catch (err) {
      setActionError(err?.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn đăng ký.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ color: '#1e293b' }} className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3b82f6] text-3xl">assignment_ind</span>
            Duyệt đăng ký Host
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý phê duyệt các yêu cầu nâng cấp tài khoản của người dùng thành Host để bắt đầu đăng tải workshop.
          </p>
        </div>

        {/* Statistics block */}
        <div className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="size-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Tổng hồ sơ lọc được</div>
            <div className="text-xl font-black text-slate-700">{totalCount} yêu cầu</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

        {/* Status Tabs */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái đơn đăng ký</span>
          <div className="flex items-center bg-slate-100/70 p-1 rounded-xl border border-slate-200 w-fit gap-1">
            {[
              { value: 0, label: 'Tất cả đơn', count: approveFilter === 0 ? totalCount : null },
              { value: 1, label: 'Chưa duyệt', count: approveFilter === 1 ? totalCount : null },
              { value: 2, label: 'Đã phê duyệt', count: approveFilter === 2 ? totalCount : null }

            ].map(tab => {
              const active = approveFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => { setApproveFilter(tab.value); setPage(1); }}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${active
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <span>{tab.label}</span>
                  {active && (
                    <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full font-black border border-blue-100">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reload button */}
        <button
          onClick={fetchRegistrations}
          disabled={loading}
          className="self-end md:self-center px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:bg-slate-100 text-slate-600 hover:text-slate-800 text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Tải lại
        </button>
      </div>

      {/* Main Content Area */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-3">
          <span className="material-symbols-outlined text-rose-500">error</span>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-16 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-[#3b82f6] animate-spin">progress_activity</span>
          <span className="text-sm text-slate-500 mt-4 font-medium">Đang tải danh sách đơn đăng ký...</span>
        </div>
      ) : registrations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300">inbox</span>
          <h3 className="text-lg font-bold text-slate-700 mt-4">Không tìm thấy yêu cầu nào</h3>
          <p className="text-sm text-slate-400 max-w-[340px] mt-1">Hiện không có đơn đăng ký Host nào khớp với bộ lọc đã chọn.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6">Ứng viên / Tài khoản</th>
                  <th className="py-4 px-6">Ngày gửi yêu cầu</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6">Ghi chú duyệt</th>
                  <th className="py-4 px-6">Người duyệt</th>
                  <th className="py-4 px-6 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {registrations.map((reg) => (
                  <tr key={reg.userId} className="hover:bg-slate-50/40 transition-colors">
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={reg.userAvatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ueQ290U45_l4-BzSHl7LqK2UiWmNHL7k6j3G3tVlgoTliJgtpGo-QSsguvy-iDYlX31dv-3gjGF8b_vGPQZCi8X-JqpfUv-yKqteYgzv7hnBThM7kyCs5GoZS2eovukRjfsVdA5IPUbhNvIhZmYERaOeZWiWCBBj8DvzwAkiuHZ9bA0-XOAy-QVobu3cYJYnCxWif-sD5o9iMTn6IjXzfsekjY1m-BhLTb8cPT9s_N424h2oEFviA0-ukylo6QiLXsc6rYUVlHPl"}
                          alt={reg.userName}
                          className="size-10 rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{reg.userName || 'N/A'}</span>
                          <span className="text-xs text-slate-400">ID: {reg.userId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Creation Time */}
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                      {formatDate(reg.createdOn)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {reg.approved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Đã Duyệt
                        </span>
                      ) : reg.note ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                          <span className="size-1.5 rounded-full bg-rose-500"></span>
                          Bị Từ Chối
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
                          <span className="size-1.5 rounded-full bg-amber-500 animate-ping"></span>
                          Chờ Duyệt
                        </span>
                      )}
                    </td>

                    {/* Note */}
                    <td className="py-4 px-6 text-sm text-slate-500 max-w-[200px] truncate" title={reg.note || ''}>
                      {reg.note || <span className="text-slate-300 italic">Không có ghi chú</span>}
                    </td>

                    {/* Approved By */}
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                      {reg.approvedBy || <span className="text-slate-300 italic">—</span>}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      {(!reg.approved && !reg.note) ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openActionModal(reg, 'reject')}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 font-bold text-xs flex items-center gap-1 transition-all border border-rose-100 hover:border-rose-200"
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                            Từ chối
                          </button>
                          <button
                            onClick={() => openActionModal(reg, 'approve')}
                            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1 transition-all border border-emerald-200"
                          >
                            <span className="material-symbols-outlined text-base">check</span>
                            Duyệt
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Đã xử lý</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Hiển thị trang <strong>{page}</strong> trên tổng số <strong>{totalPages}</strong> trang ({totalCount} kết quả)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-300 text-slate-600 text-xs font-bold transition-all"
                >
                  Trang trước
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-300 text-slate-600 text-xs font-bold transition-all"
                >
                  Trang sau
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Approve/Reject Confirmation Modal */}
      {showModal && selectedReg && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-[480px] p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">

            {/* Modal Title */}
            <div className="flex items-center gap-3">
              <div className={`size-11 rounded-full flex items-center justify-center ${modalType === 'approve' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                <span className="material-symbols-outlined text-2xl">
                  {modalType === 'approve' ? 'verified_user' : 'cancel_presentation'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                  {modalType === 'approve' ? 'Phê duyệt đơn đăng ký' : 'Từ chối đơn đăng ký'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Ứng viên: {selectedReg.userName} (ID: {selectedReg.userId})</p>
              </div>
            </div>

            {/* Error Message inside modal */}
            {actionError && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-150">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{actionError}</span>
              </div>
            )}

            {/* Input Note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                Ghi chú phê duyệt {modalType === 'reject' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={modalType === 'approve' ? 'Lời chúc mừng hoặc thông tin hỗ trợ cho Host mới...' : 'Nhập lý do chi tiết từ chối đơn đăng ký để gửi cho người dùng...'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm min-h-[100px] resize-none"
                disabled={actionLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                disabled={actionLoading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:bg-slate-100 text-slate-600 text-sm font-bold transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleActionSubmit}
                disabled={actionLoading}
                className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 transition-all shadow-md ${modalType === 'approve'
                    ? 'bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 shadow-emerald-500/10'
                    : 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 shadow-rose-500/10'
                  }`}
              >
                {actionLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">
                      {modalType === 'approve' ? 'check' : 'close'}
                    </span>
                    <span>{modalType === 'approve' ? 'Xác nhận Duyệt' : 'Từ chối đơn'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
