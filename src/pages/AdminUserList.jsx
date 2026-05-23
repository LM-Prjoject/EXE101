import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api/user';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminUserList() {
  const { currentUser, authToken } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      navigate('/');
      return;
    }
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAllUsers(page, pageSize);
        setUsers(data?.data || []);
        setTotal(data?.total || 0);
      } catch (e) {
        setError(e.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser, authToken, page, pageSize, navigate]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Quản lý người dùng</h1>
          <p className="text-sm text-slate-500">Xem và quản lý danh sách tài khoản người dùng trên hệ thống</p>
        </div>
        <div className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-lg font-semibold text-sm">
          Tổng cộng: {total}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
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
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tên hiển thị</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Vai trò</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                let roleBadgeColor = "bg-slate-100 text-slate-700";
                if (u.role === 'admin' || u.role === 'staff') {
                  roleBadgeColor = "bg-blue-50 text-blue-700 border border-blue-100";
                } else if (u.role === 'host') {
                  roleBadgeColor = "bg-emerald-50 text-emerald-700 border border-emerald-100";
                }
                
                return (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{u.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${roleBadgeColor}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-slate-500">
          Trang <span className="font-medium text-slate-700">{page}</span> / <span className="font-medium text-slate-700">{totalPages || 1}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            Trang trước
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages || totalPages === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors"
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
