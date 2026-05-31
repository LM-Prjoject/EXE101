import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHostWithdrawRequests, updateHostWithdrawRequest } from '../api/staff';

export default function StaffWithdrawRequests() {
  const { authToken } = useAuth();

  // Data states
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filters & Pagination
  const [statusFilter, setStatusFilter] = useState(1); // 1 = Pending, 2 = Approved, 3 = Rejected, 0 = All
  const [sortBy, setSortBy] = useState(0); // 0 = Id, 1 = UserName, 2 = Amount, 3 = Status
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Copy success indicator
  const [copiedId, setCopiedId] = useState(null);

  // Modal states
  const [selectedReq, setSelectedReq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('approve'); // 'approve' | 'reject'
  const [note, setNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getHostWithdrawRequests(authToken, {
        statusFilter,
        sortBy,
        sortDesc,
        page,
        pageSize,
      });

      if (data) {
        const items = data.data || data.Data || data.items || data.Items || [];
        const total = data.totalCount ?? data.TotalCount ?? data.total ?? data.Total ?? 0;
        const pages = data.totalPages ?? data.TotalPages ?? Math.ceil((total || 0) / pageSize) ?? 1;

        setRequests(items);
        setTotalCount(total);
        setTotalPages(pages || 1);
      }
    } catch (err) {
      setError(err?.message || 'Không thể tải danh sách yêu cầu rút tiền. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, sortBy, sortDesc, page]);

  // Handle Copy Bank Account
  const handleCopyAccount = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open modal
  const openActionModal = (req, type) => {
    setSelectedReq(req);
    setModalType(type);
    setNote('');
    setActionError('');
    setShowModal(true);
  };

  // Submit action
  const handleActionSubmit = async () => {
    if (!selectedReq) return;

    if (modalType === 'reject' && !note.trim()) {
      setActionError('Vui lòng nhập lý do từ chối yêu cầu rút tiền.');
      return;
    }

    setActionLoading(true);
    setActionError('');

    try {
      await updateHostWithdrawRequest(authToken, {
        id: selectedReq.id,
        status: modalType === 'approve' ? 'approved' : 'rejected',
        note: note.trim(),
      });

      setShowModal(false);
      setSelectedReq(null);
      fetchRequests();
    } catch (err) {
      setActionError(err?.message || 'Có lỗi xảy ra khi cập nhật trạng thái yêu cầu.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
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
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ color: '#1e293b' }} className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto animate-in fade-in duration-300">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#3b82f6] text-4xl">payments</span>
            Duyệt yêu cầu rút tiền
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý phê duyệt hoặc từ chối các yêu cầu rút tiền từ tài khoản doanh thu của Host/Người hướng dẫn.
          </p>
        </div>

        {/* Info Stat Card */}
        <div className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="size-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Tổng số yêu cầu lọc</div>
            <div className="text-2xl font-black text-slate-700">{totalCount} yêu cầu</div>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Status Filters */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bộ lọc trạng thái</span>
          <div className="flex items-center bg-slate-100/70 p-1 rounded-xl border border-slate-200/60 w-fit gap-1">
            {[
              { value: 0, label: 'Tất cả' },
              { value: 1, label: 'Chờ duyệt' },
              { value: 2, label: 'Đã duyệt' },
              { value: 3, label: 'Từ chối' },
            ].map(tab => {
              const active = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => { setStatusFilter(tab.value); setPage(1); }}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  {active && (
                    <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full font-black border border-blue-100">
                      {totalCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting and Refresh */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sắp xếp theo</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={0}>Mã yêu cầu (ID)</option>
              <option value={1}>Tên Host</option>
              <option value={2}>Số tiền</option>
              <option value={3}>Trạng thái</option>
            </select>
          </div>

          <button
            onClick={() => setSortDesc(prev => !prev)}
            className="mt-6 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all shadow-sm"
            title="Đảo chiều sắp xếp"
          >
            <span className="material-symbols-outlined text-lg align-middle">
              {sortDesc ? 'arrow_downward' : 'arrow_upward'}
            </span>
          </button>

          <button
            onClick={fetchRequests}
            disabled={loading}
            className="mt-6 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:bg-slate-100 text-slate-600 hover:text-slate-800 text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Tải lại
          </button>
        </div>
      </div>

      {/* Main Content */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-3">
          <span className="material-symbols-outlined text-rose-500">error</span>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-16 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-[#3b82f6] animate-spin">progress_activity</span>
          <span className="text-sm text-slate-500 mt-4 font-medium">Đang tải danh sách yêu cầu rút tiền...</span>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300">inbox</span>
          <h3 className="text-lg font-bold text-slate-700 mt-4">Không tìm thấy yêu cầu nào</h3>
          <p className="text-sm text-slate-400 max-w-[340px] mt-1">Hiện không có yêu cầu rút tiền nào khớp với bộ lọc đã chọn.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6">ID / Host</th>
                  <th className="py-4 px-6">Số tiền</th>
                  <th className="py-4 px-6">Thông tin ngân hàng</th>
                  <th className="py-4 px-6">Ngày yêu cầu</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6">Ghi chú</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* ID & Host Name */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">{req.hostName || 'N/A'}</span>
                        <span className="text-xs text-slate-400">Yêu cầu #{req.id} • Host ID: {req.hostId}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 font-bold text-slate-900 text-base">
                      {formatCurrency(req.amount)}
                    </td>

                    {/* Bank Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-0.5 max-w-[220px]">
                        <span className="font-semibold text-slate-700 text-xs uppercase bg-slate-100 px-2 py-0.5 rounded w-fit border border-slate-200/50">
                          {req.bankName}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="font-mono text-sm font-bold text-slate-800 select-all">{req.bankAccount}</span>
                          <button
                            onClick={() => handleCopyAccount(req.bankAccount, req.id)}
                            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors relative"
                            title="Sao chép số tài khoản"
                          >
                            <span className="material-symbols-outlined text-[16px] block">
                              {copiedId === req.id ? 'check_circle' : 'content_copy'}
                            </span>
                            {copiedId === req.id && (
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded font-black whitespace-nowrap shadow animate-bounce">
                                Đã chép!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Request Date */}
                    <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                      {formatDate(req.createdOn)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {req.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Đã Duyệt
                        </span>
                      ) : req.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 shadow-sm">
                          <span className="size-1.5 rounded-full bg-rose-500"></span>
                          Đã Từ Chối
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
                          <span className="size-1.5 rounded-full bg-amber-500 animate-ping"></span>
                          Chờ Duyệt
                        </span>
                      )}
                    </td>

                    {/* Notes & Actions Info */}
                    <td className="py-4 px-6 text-sm text-slate-500 max-w-[200px] truncate" title={req.note || ''}>
                      {req.note ? (
                        <div className="flex flex-col">
                          <span className="italic">"{req.note}"</span>
                          {req.updatedBy && (
                            <span className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase">Duyệt bởi: {req.updatedBy}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-300 italic">Không có ghi chú</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      {req.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openActionModal(req, 'reject')}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-all border border-rose-100 hover:border-rose-200"
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                            Từ chối
                          </button>
                          <button
                            onClick={() => openActionModal(req, 'approve')}
                            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-all border border-emerald-200"
                          >
                            <span className="material-symbols-outlined text-base">check</span>
                            Duyệt
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                          Đã xử lý
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-medium">
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

      {/* Confirmation Modal */}
      {showModal && selectedReq && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-[480px] p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Title */}
            <div className="flex items-center gap-3">
              <div className={`size-12 rounded-full flex items-center justify-center ${modalType === 'approve' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                <span className="material-symbols-outlined text-2xl">
                  {modalType === 'approve' ? 'verified' : 'cancel'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">
                  {modalType === 'approve' ? 'Xác nhận Duyệt Rút Tiền' : 'Từ Chối Yêu Cầu Rút Tiền'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Host: {selectedReq.hostName} • Số tiền: {formatCurrency(selectedReq.amount)}</p>
              </div>
            </div>

            {/* Account Details Copy-board */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col gap-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin chuyển khoản</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Ngân hàng:</span>
                <span className="font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200/40 text-xs">{selectedReq.bankName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-800">{selectedReq.bankAccount}</span>
                  <button
                    onClick={() => handleCopyAccount(selectedReq.bankAccount, selectedReq.id)}
                    className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedId === selectedReq.id ? 'done' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Error handling */}
            {actionError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2 border border-rose-150">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{actionError}</span>
              </div>
            )}

            {/* Note input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">
                Ghi chú phê duyệt {modalType === 'reject' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={modalType === 'approve' ? 'Ghi chú xác nhận chuyển khoản thành công...' : 'Ghi rõ lý do từ chối yêu cầu (ví dụ: Sai thông tin ngân hàng, không đủ số dư,...)'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm min-h-[100px] resize-none"
                disabled={actionLoading}
              />
            </div>

            {/* Modal Buttons */}
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
                className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 transition-all shadow-md ${
                  modalType === 'approve'
                    ? 'bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 shadow-emerald-500/10'
                    : 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 shadow-rose-500/10'
                }`}
              >
                {actionLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">
                      {modalType === 'approve' ? 'check' : 'close'}
                    </span>
                    <span>{modalType === 'approve' ? 'Duyệt & Hoàn tất' : 'Từ chối yêu cầu'}</span>
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
