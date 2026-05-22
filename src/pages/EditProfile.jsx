import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { changeName, changePhone, changeAvatar } from '../api/user';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { currentUser, authToken, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (name) await changeName(name, authToken);
      if (phone) await changePhone(phone, authToken);
      if (avatar) await changeAvatar(avatar, authToken);
      setSuccess('Cập nhật hồ sơ thành công!');
      // Optionally refresh user info
      navigate('/user-profile');
    } catch (err) {
      setError(err.message || 'Lỗi khi cập nhật hồ sơ');
      if (err.message?.includes('401')) {
        // token may be expired
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F2E9] dark:bg-[#0f1115] flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#151822] p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#c3996c] mb-6">Chỉnh sửa hồ sơ</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-[#2B2B2B] dark:text-slate-100 mb-1">Tên hiển thị</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100"
            placeholder="Nhập tên mới"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#2B2B2B] dark:text-slate-100 mb-1">Số điện thoại</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-[#fbc4ae]/30 rounded bg-[#fffaf5] dark:bg-slate-800 text-[#2B2B2B] dark:text-slate-100"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#2B2B2B] dark:text-slate-100 mb-1">Ảnh đại diện</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#f08a78] hover:bg-[#ee7a66] text-white font-bold rounded disabled:opacity-50"
        >
          {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
}
