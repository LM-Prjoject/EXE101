import { useAuth } from "../context/AuthContext";

export default function HostHeader({ title, children, profileOverride }) {
  const { currentUser, userProfile } = useAuth();
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

        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm"
            placeholder="Tìm kiếm..."
            type="text"
          />
        </div>
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
