import { useEffect, useState } from "react";
import { getMyWorkshops, deleteWorkshop } from "../api";
import {
  getWorkshopId,
  getWorkshopStatus,
  WORKSHOP_STATUS,
} from "../utils/workshopStatus";

export default function useHostWorkshops(currentUser) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadWorkshops() {
      if (!currentUser) {
        if (!ignore) {
          setWorkshops([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const result = await getMyWorkshops(1, 12);

        if (!ignore) {
          setWorkshops(result?.data ?? []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Không thể tải dữ liệu workshop.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkshops();

    return () => {
      ignore = true;
    };
  }, [currentUser]);

  async function removeWorkshop(workshop) {
    const id = getWorkshopId(workshop);

    if (id == null) {
      throw new Error("Không tìm thấy ID workshop để xóa.");
    }

    await deleteWorkshop(id);

    if (getWorkshopStatus(workshop) === WORKSHOP_STATUS.DRAFT) {
      setWorkshops((prev) => prev.filter((w) => getWorkshopId(w) !== id));
      setError("");
      return;
    }

    setWorkshops((prev) =>
      prev.map((w) =>
        getWorkshopId(w) === id
          ? {
              ...w,
              status: "removed",
              Status: "removed",
            }
          : w,
      ),
    );
    setError("");
  }

  return {
    workshops,
    loading,
    error,
    setError,
    removeWorkshop,
  };
}
