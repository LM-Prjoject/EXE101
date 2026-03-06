import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import FloatingNav from './components/FloatingNav';

// ── Pages ─────────────────────────────────────────────────────────────────
import LoginPage from './pages/LoginPage';
import RegisterAccount from './pages/RegisterAccount';

// User flow
import HomeWithBanner from './pages/HomeWithBanner';
import AdvancedSearch from './pages/AdvancedSearch';
import FindCompanion from './pages/FindCompanion';
import SelectSessionTime from './pages/SelectSessionTime';
import EnterParticipantInfo from './pages/EnterParticipantInfo';
import PaymentAndConfirmation from './pages/PaymentAndConfirmation';
import ConfirmSuccess from './pages/ConfirmSuccess';
import UserProfile from './pages/UserProfile';
import MySchedule from './pages/MySchedule';
import CommunityMomentsFeed from './pages/CommunityMomentsFeed';
import WorkshopChat from './pages/WorkshopChat';

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ paddingBottom: "var(--floating-nav-h, 0px)" }}>
          <Routes>
          {/* Default: redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterAccount />} />

          {/* ── User flow ── */}
          <Route path="/home" element={<HomeWithBanner />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/find-companion" element={<FindCompanion />} />
          <Route path="/select-session" element={<SelectSessionTime />} />
          <Route path="/participant-info" element={<EnterParticipantInfo />} />
          <Route path="/payment" element={<PaymentAndConfirmation />} />
          <Route path="/confirm-success" element={<ConfirmSuccess />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-schedule" element={<MySchedule />} />
          <Route path="/community" element={<CommunityMomentsFeed />} />
          <Route path="/workshop-chat" element={<WorkshopChat />} />

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

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </div>

        {/* Bottom nav — auto-hides on login/register */}
        <FloatingNav />
      </BrowserRouter>
    </AuthProvider>
  );
}
