import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HostHeader({ title, children, profileOverride }) {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const profile = profileOverride || userProfile || currentUser;

  const displayName =
    profile?.name ||
    currentUser?.name ||
    currentUser?.email?.split("@")[0] ||
    "host";

  const avatarUrl =
    profile?.avatarLink ||
    profile?.avatarUrl ||
    currentUser?.avatarLink ||
    currentUser?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6f8b6f&color=fff`;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <button
          onClick={() => navigate("/home")}
          className="hidden sm:flex items-center justify-center gap-2 rounded-xl h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-lg shadow-primary/30 mr-2"
        >
          <span>Chế độ người dùng</span>
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div
          className="size-10 rounded-full overflow-hidden border-2 border-primary bg-center bg-cover shrink-0"
          style={{
            backgroundImage: `url("${avatarUrl}")`,
          }}
        />
      </div>
    </header>
  );
}
