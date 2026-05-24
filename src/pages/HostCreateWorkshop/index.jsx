import { useLocation, useNavigate } from "react-router-dom";
import HostSidebar from "../../components/HostSidebar";
import HostCreateWorkshopForm from "../../components/HostCreateWorkshopForm";
import useHostCreateWorkshopForm from "../../hooks/useHostCreateWorkshopForm";

export default function HostCreateWorkshop() {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const editingWorkshop = routerLocation.state?.workshop || null;

  const form = useHostCreateWorkshopForm(editingWorkshop, () => {
    navigate("/host/workshops");
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex">
      <HostSidebar onNavigateRequest={(to) => navigate(to)} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 md:py-12 pb-24">
          <div className="mb-10 animate-fade-in-up">
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">
              {editingWorkshop ? "Chỉnh sửa Workshop" : "Tạo Workshop Mới"}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">
              Chia sẻ tay nghề của bạn với Đà Nẵng. Cùng thiết lập không gian
              sáng tạo của bạn nào.
            </p>
          </div>

          <HostCreateWorkshopForm
            form={form}
            editingWorkshop={editingWorkshop}
            onCancel={() => navigate("/host/workshops")}
          />
        </main>
      </div>
    </div>
  );
}
