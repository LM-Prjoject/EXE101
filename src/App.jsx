import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import FloatingNav from './components/FloatingNav';
import StaffLayout from './components/StaffLayout';
import AdminUserList from './pages/AdminUserList';
import StaffWorkshopList from './pages/StaffWorkshopList';
import StaffSystemConfig from './pages/WebsiteManagement';
import StaffHostApprovals from './pages/StaffHostApprovals';

// ── Pages ─────────────────────────────────────────────────────────────────
import LoginPage from './pages/LoginPage';
import RegisterAccount from './pages/RegisterAccount';

// User flow
import HomeWithBanner from './pages/HomeWithBanner';
import AdvancedSearch from './pages/AdvancedSearch';
import FindCompanion from './pages/FindCompanion';
import PaymentAndConfirmation from './pages/PaymentAndConfirmation';
import ConfirmSuccess from './pages/ConfirmSuccess';
import UserProfile from './pages/UserProfile';
import MySchedule from './pages/MySchedule';
import CommunityMomentsFeed from './pages/CommunityMomentsFeed';

// Host flow
import HostDashboard from './pages/HostDashboard';
import HostMyWorkshops from './pages/HostMyWorkshops';
import HostCreateWorkshop from './pages/HostCreateWorkshop';
import HostScheduleManagement from './pages/HostScheduleManagement';
import HostManageParticipants from './pages/HostManageParticipants';
import HostIncomeOverview from './pages/HostIncomeOverview';
import HostInstructorProfile from './pages/HostInstructorProfile';
import HostVerification from './pages/HostVerification';
import HostVerifyStep2 from './pages/HostVerifyStep2';

function RootRedirect() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'host') return <Navigate to="/home" replace />;
  if (currentUser.role === 'staff' || currentUser.role === 'admin') return <Navigate to="/staff" replace />;
  return <Navigate to="/home" replace />;
}

function RequireQueryParams({ required, children }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const missingParams = required.filter(param => !searchParams.has(param));

  if (missingParams.length > 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ paddingBottom: "var(--floating-nav-h, 0px)" }}>
          <Routes>
          {/* Default: redirect based on auth */}
          <Route path="/" element={<RootRedirect />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password/confirm" element={<RequireQueryParams required={["email", "otp"]}> <LoginPage /> </RequireQueryParams>} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/register/confirm" element={<RequireQueryParams required={["email", "otp"]}> <RegisterAccount /> </RequireQueryParams>} />

          {/* ── User flow ── */}
          <Route path="/home" element={<HomeWithBanner />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/find-companion/:workshopId" element={<FindCompanion />} />
          <Route path="/find-companion" element={<FindCompanion />} />
          <Route path="/payment" element={<PaymentAndConfirmation />} />
          <Route path="/confirm-success" element={<ConfirmSuccess />} />
          <Route path="/payment/error" element={<ConfirmSuccess />} />
          <Route path="/payment/cancel" element={<ConfirmSuccess />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-schedule" element={<MySchedule />} />
          <Route path="/community" element={<CommunityMomentsFeed />} />

          {/* ── Host flow ── */}
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/workshops" element={<HostMyWorkshops />} />
          <Route path="/host/create-workshop" element={<HostCreateWorkshop />} />
          <Route path="/host/schedule" element={<HostScheduleManagement />} />
          <Route path="/host/participants" element={<HostManageParticipants />} />
          <Route path="/host/income" element={<HostIncomeOverview />} />
          <Route path="/host/profile" element={<HostInstructorProfile />} />
          <Route path="/host/verification" element={<HostVerification />} />
          <Route path="/host/verify-step2" element={<HostVerifyStep2 />} />

          {/* ── Staff flow ── */}
          <Route element={<StaffLayout />}>
            <Route path="/staff/users" element={<AdminUserList />} />
            <Route path="/staff" element={<Navigate to="/staff/users" replace />} />
            <Route path="/staff/hosts" element={<StaffHostApprovals />} />
            <Route path="/staff/workshops" element={<StaffWorkshopList />} />
            <Route path="/staff/bookings" element={<div className="p-6 text-slate-800"><h1 className="text-2xl font-bold mb-4 text-[#3b82f6]">Quản lý Đặt chỗ</h1><p>Tính năng đang phát triển...</p></div>} />
            <Route path="/staff/settings" element={<StaffSystemConfig />} />
          </Route>



          {/* Catch-all */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
        </div>

        {/* Bottom nav — auto-hides on login/register */}
        <FloatingNav />
      </BrowserRouter>
    </AuthProvider>
  );
}
