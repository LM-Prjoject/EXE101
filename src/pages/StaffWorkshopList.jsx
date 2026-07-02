import React, { useEffect, useState } from "react";
import { fetchAllWorkshops, updateWorkshopApproval } from "../api/workshop";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

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
  if (Array.isArray(data?.items)) return data.items.length;
  return 0;
}

export default function StaffWorkshopList() {
  const { currentUser, authToken } = useAuth();
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState([]);
  const [total, setTotal] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    workshopId: null,
    approved: null,
  });

  const statuses = [
    { label: "Tất cả", value: "" },
    { label: "Chờ duyệt", value: "pending", count: pendingCount },
    { label: "Đang hoạt động", value: "verified" },
    { label: "Từ chối", value: "removed" },
    { label: "Hoàn thành", value: "ended" },
  ];

  const loadWorkshops = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchAllWorkshops(status, page, pageSize);
      const list = getWorkshopList(data);
      const visibleList =
        status === ""
          ? list.filter((workshop) => String(workshop.status || "").toLowerCase() !== "draft")
          : list;

      setWorkshops(visibleList);
      setTotal(status === "" ? visibleList.length : getWorkshopTotal(data));
    } catch (err) {
      setError(err.message || "Lỗi khi tải danh sách workshop");
    } finally {
      setLoading(false);
    }
  };

  const loadPendingCount = async () => {
    try {
      const data = await fetchAllWorkshops("pending", 1, 1);
      setPendingCount(getWorkshopTotal(data));
    } catch {
      setPendingCount(0);
    }
  };

  useEffect(() => {
    if (
      !currentUser ||
      (currentUser.role !== "admin" && currentUser.role !== "staff")
    ) {
      navigate("/");
      return;
    }

    loadWorkshops();
    loadPendingCount();
  }, [currentUser, authToken, page, pageSize, status, navigate]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleApproval = (workshopId, approved) => {
    setConfirmModal({
      open: true,
      workshopId,
      approved,
    });
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal({
      open: false,
      workshopId: null,
      approved: null,
    });
  };

  const handleConfirmApproval = async () => {
    const { workshopId, approved } = confirmModal;
    const actionText = approved ? "duyệt" : "từ chối";

    if (!workshopId) return;

    try {
      setLoading(true);
      setError("");

      await updateWorkshopApproval(workshopId, approved, authToken);

      handleCloseConfirmModal();

      await loadWorkshops();
      await loadPendingCount();
    } catch (err) {
      setError(err.message || `Lỗi khi ${actionText} workshop`);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  const getStatusBadgeStyle = (statusVal) => {
    const val = statusVal?.toLowerCase() || "";

    switch (val) {
      case "active":
      case "verified":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "rejected":
      case "removed":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "completed":
      case "ended":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getStatusText = (statusVal) => {
    const val = statusVal?.toLowerCase() || "";

    switch (val) {
      case "active":
      case "verified":
        return "Hoạt động";
      case "pending":
        return "Chờ duyệt";
      case "rejected":
      case "removed":
        return "Từ chối";
      case "completed":
      case "ended":
        return "Hoàn thành";
      default:
        return statusVal || "Không rõ";
    }
  };

  return (
    <div className="w-full mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Quản lý Workshops
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Duyệt và kiểm soát các workshop trên toàn bộ hệ thống
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-lg font-bold text-sm">
          Tổng cộng: {total}
        </div>
      </div>

      <div className="flex flex-wrap border-b border-slate-200 mb-6 gap-2">
        {statuses.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleStatusChange(tab.value)}
            className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 -mb-px inline-flex items-center ${
              status === tab.value
                ? "border-blue-600 text-blue-600 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>{tab.label}</span>

            {tab.value === "pending" && tab.count > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-xs font-bold">
                {tab.count}
              </span>
            )}
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
          <span className="ml-3 text-slate-600 font-medium">
            Đang tải dữ liệu...
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:bg-[#151822] shadow-sm">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Workshop
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Phân loại
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Địa điểm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Giá vé
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {workshops.map((w, index) => {
                const priceVal = w.price ?? w.priceLower ?? w.priceUpper;
                const workshopStatus = (w.status || "").toLowerCase();

                return (
                  <tr
                    key={w.id || index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {(page - 1) * pageSize + index + 1}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100 flex items-center justify-center">
                          {w.thumbnailLink ? (
                            <img
                              src={w.thumbnailLink}
                              alt={w.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-slate-400">
                              image
                            </span>
                          )}
                        </div>

                        <div
                          className="font-semibold text-slate-800 line-clamp-1 max-w-xs"
                          title={w.title}
                        >
                          {w.title}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {w.category || "Workshop"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {w.location || "Đà Nẵng"}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {priceVal != null
                        ? `${Number(priceVal).toLocaleString("vi-VN")}₫`
                        : "Liên hệ"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(
                          w.status,
                        )}`}
                      >
                        {getStatusText(w.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/find-companion/${w.id}`, {
                              state: { workshop: w },
                            })
                          }
                          className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          Xem
                        </button>

                        {workshopStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleApproval(w.id, true)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                            >
                              Chấp nhận
                            </button>

                            <button
                              onClick={() => handleApproval(w.id, false)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {workshops.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-400 font-medium"
                  >
                    Không tìm thấy workshop nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-slate-500 font-medium">
          Trang <span className="font-semibold text-slate-700">{page}</span> /{" "}
          <span className="font-semibold text-slate-700">
            {totalPages || 1}
          </span>{" "}
          (Tổng cộng: {total})
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

        <ConfirmModal
          open={confirmModal.open}
          title="Xác nhận duyệt workshop"
          message={`Bạn có chắc muốn ${
            confirmModal.approved ? "chấp nhận" : "từ chối"
          } workshop này không?`}
          confirmText={confirmModal.approved ? "Chấp nhận" : "Từ chối"}
          cancelText="Hủy"
          variant={confirmModal.approved ? "success" : "danger"}
          loading={loading}
          onConfirm={handleConfirmApproval}
          onCancel={handleCloseConfirmModal}
        />
      </div>
    </div>
  );
}
