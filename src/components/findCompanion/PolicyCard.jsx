import { BRAND, cardStyle } from "../../constants/findCompanionTheme";

export default function PolicyCard() {
  return (
    <div className="p-5 rounded-2xl shadow-sm border" style={cardStyle}>
      <div className="flex items-start gap-3 mb-3">
        <span
          className="material-symbols-outlined"
          style={{ color: BRAND.primary }}
        >
          verified_user
        </span>

        <div>
          <h4 className="text-sm font-black" style={{ color: "#0f172a" }}>
            Chính sách hủy bỏ
          </h4>

          <p className="text-xs mt-1" style={{ color: "#64748b" }}>
            Hủy miễn phí tối đa 24 giờ trước khi buổi workshop bắt đầu.
          </p>
        </div>
      </div>
    </div>
  );
}
