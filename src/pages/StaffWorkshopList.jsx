import React, { useEffect, useState } from 'react';
import { fetchAllWorkshops } from '../api/workshop';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function getWorkshopList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.workshops)) return data.workshops;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

function getWorkshopTotal(data) {
  if (data?.total !== undefined) return data.total;
  if (data?.totalCount !== undefined) return data.totalCount;
  if (data?.count !== undefined) return data.count;
  if (Array.isArray(data)) return data.length;
  if (Array.isArray(data?.data)) return data.data.length;
  return 0;
}

export default function StaffWorkshopList() {
  const { currentUser, authToken } = useAuth();
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState(''); // Empty string means "All"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Status list for tabs
  const statuses = [
    { label: 'Tất cả', value: '' },
    { label: 'Chờ duyệt', value: 'pending' },
    { label: 'Đang hoạt động', value: 'active' },
    { label: 'Bản nháp', value: 'draft' },
    { label: 'Từ chối', value: 'rejected' },
    { label: 'Hoàn thành', value: 'completed' },
  ];

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAllWorkshops(status, page, pageSize);
        setWorkshops(getWorkshopList(data));
        setTotal(getWorkshopTotal(data));
      } catch (err) {
        setError(err.message || 'Lỗi khi tải danh sách workshop');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser, authToken, page, pageSize, status, navigate]);

  // Handle status tab change: reset page to 1
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  const totalPages = Math.ceil(total / pageSize);

  const getStatusBadgeStyle = (statusVal) => {
    const val = statusVal?.toLowerCase() || '';
    switch (val) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getStatusText = (statusVal) => {
    const val = statusVal?.toLowerCase() || '';
    switch (val) {
      case 'active':
        return 'Hoạt động';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'draft':
        return 'Bản nháp';
      case 'completed':
        return 'Hoàn thành';
      default:
        return statusVal || 'Không rõ';
    }
  };

  return (
    <div className="w-full mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Quản lý Workshops</h1>
          <p className="text-sm text-slate-500 font-medium">Duyệt và kiểm soát các workshop trên toàn bộ hệ thống</p>
        </div>
        <div className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-lg font-bold text-sm">
          Tổng cộng: {total}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 mb-6 gap-2">
        {statuses.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleStatusChange(tab.value)}
            className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 -mb-px ${
              status === tab.value
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 border border-rose-200 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-600 font-medium">Đang tải dữ liệu...</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-[#151822] shadow-sm">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Workshop</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Phân loại</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Địa điểm</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Giá vé</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workshops.map((w, index) => {
                const priceVal = w.price ?? w.priceLower ?? w.priceUpper;
                return (
                  <tr key={w.id || index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {w.id}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100 flex items-center justify-center">
                          {w.thumbnailLink ? (
                            <img src={w.thumbnailLink} alt={w.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-slate-400">image</span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-800 line-clamp-1 max-w-xs" title={w.title}>
                          {w.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {w.category || 'Workshop'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {w.location || 'Đà Nẵng'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {priceVal != null ? `${Number(priceVal).toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(w.status)}`}>
                        {getStatusText(w.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button
                        onClick={() => navigate(`/find-companion/${w.id}`, { state: { workshop: w } })}
                        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        Xem chi tiết
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {workshops.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                    Không tìm thấy workshop nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-slate-500 font-medium">
          Trang <span className="font-semibold text-slate-700">{page}</span> / <span className="font-semibold text-slate-700">{totalPages || 1}</span> (Tổng cộng: {total})
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            Trang trước
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages || totalPages === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shadow-sm"
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
