import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HostSidebar from "../../components/HostSidebar";
import HostHeader from "../../components/HostHeader";
import HostCreateWorkshopForm from "../../components/HostCreateWorkshopForm";
import useHostCreateWorkshopForm from "../../hooks/useHostCreateWorkshopForm";
import { getWorkshopById } from "../../api/workshop";

function getWorkshopId(workshop) {
  return (
    workshop?.id ?? workshop?.Id ?? workshop?.workshopId ?? workshop?.WorkshopId
  );
}

export default function HostCreateWorkshop() {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const stateWorkshop = routerLocation.state?.workshop || null;
  const workshopId = getWorkshopId(stateWorkshop);

  const [editingWorkshop, setEditingWorkshop] = useState(stateWorkshop);
  const [loadingWorkshop, setLoadingWorkshop] = useState(Boolean(workshopId));

  useEffect(() => {
    if (!workshopId) {
      setLoadingWorkshop(false);
      return;
    }

    let ignore = false;

    async function loadFullWorkshop() {
      setLoadingWorkshop(true);

      try {
        const data = await getWorkshopById(workshopId);

        if (!ignore) {
          setEditingWorkshop(data);
        }
      } catch (err) {
        console.error("Load full workshop failed:", err);

        if (!ignore) {
          setEditingWorkshop(stateWorkshop);
        }
      } finally {
        if (!ignore) {
          setLoadingWorkshop(false);
        }
      }
    }

    loadFullWorkshop();

    return () => {
      ignore = true;
    };
  }, [workshopId]);

  const form = useHostCreateWorkshopForm(editingWorkshop, () => {
    navigate("/host/workshops");
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex">
      <HostSidebar onNavigateRequest={(to) => navigate(to)} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <HostHeader title={editingWorkshop ? "Chỉnh sửa Workshop" : "Tạo Workshop Mới"} />
        <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 md:py-12 pb-24 overflow-y-auto">
          <div className="mb-10 animate-fade-in-up">
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">
              {editingWorkshop ? "Chỉnh sửa Workshop" : "Tạo Workshop Mới"}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">
              Chia sẻ tay nghề của bạn với Đà Nẵng. Cùng thiết lập không gian
              sáng tạo của bạn nào.
            </p>
          </div>

          {loadingWorkshop ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2c2a] p-6 text-sm font-semibold text-slate-500 dark:text-slate-300">
              Đang tải đầy đủ lịch workshop...
            </div>
          ) : (
            <HostCreateWorkshopForm
              form={form}
              editingWorkshop={editingWorkshop}
              onCancel={() => navigate("/host/workshops")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
