import { getToken } from "../utils/token";
import { SESSION_EXPIRED_EVENT } from "./client";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE || "https://exe.kakgonbri.party"
).replace(/\/$/, "");

export async function apiGet(path) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
    throw new Error("Bạn không có quyền truy cập trang này.");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Không thể tải dữ liệu. Mã lỗi: ${res.status}`);
  }

  return res.json();
}