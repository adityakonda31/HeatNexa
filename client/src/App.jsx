import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";

import CitizenHome from "./pages/citizen/CitizenHome";
import Profile from "./pages/citizen/Profile";
import Location from "./pages/citizen/Location";
import Forecast from "./pages/citizen/Forecast";
import Precautions from "./pages/citizen/Precautions";
import Facilities from "./pages/citizen/Facilities";
import Animals from "./pages/citizen/Animals";
import Travel from "./pages/citizen/Travel";
import Assistant from "./pages/citizen/Assistant";
import Family from "./pages/citizen/Family";
import Notifications from "./pages/citizen/Notifications";

import Dashboard from "./pages/authority/Dashboard";
import HeatMap from "./pages/authority/HeatMap";
import Trends from "./pages/authority/Trends";
import Alerts from "./pages/authority/Alerts";
import ActionPlan from "./pages/authority/ActionPlan";
import Simulator from "./pages/authority/Simulator";
import Prioritization from "./pages/authority/Prioritization";
import Outcomes from "./pages/authority/Outcomes";

import BottomNav from "./components/BottomNav";
import AuthoritySidebar from "./components/AuthoritySidebar";

function CitizenLayout({ children }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

function AuthorityLayout({ children }) {
  return (
    <div className="authority-layout">
      <AuthoritySidebar />
      {children}
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isCitizen = location.pathname.startsWith("/citizen");
  const isAuthority = location.pathname.startsWith("/authority");

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* CITIZEN */}
      <Route path="/citizen" element={<CitizenLayout><CitizenHome /></CitizenLayout>} />
      <Route path="/citizen/profile" element={<CitizenLayout><Profile /></CitizenLayout>} />
      <Route path="/citizen/location" element={<CitizenLayout><Location /></CitizenLayout>} />
      <Route path="/citizen/forecast" element={<CitizenLayout><Forecast /></CitizenLayout>} />
      <Route path="/citizen/precautions" element={<CitizenLayout><Precautions /></CitizenLayout>} />
      <Route path="/citizen/facilities" element={<CitizenLayout><Facilities /></CitizenLayout>} />
      <Route path="/citizen/animals" element={<CitizenLayout><Animals /></CitizenLayout>} />
      <Route path="/citizen/travel" element={<CitizenLayout><Travel /></CitizenLayout>} />
      <Route path="/citizen/assistant" element={<CitizenLayout><Assistant /></CitizenLayout>} />
      <Route path="/citizen/family" element={<CitizenLayout><Family /></CitizenLayout>} />
      <Route path="/citizen/notifications" element={<CitizenLayout><Notifications /></CitizenLayout>} />

      {/* AUTHORITY */}
      <Route path="/authority" element={<AuthorityLayout><Dashboard /></AuthorityLayout>} />
      <Route path="/authority/map" element={<AuthorityLayout><HeatMap /></AuthorityLayout>} />
      <Route path="/authority/trends" element={<AuthorityLayout><Trends /></AuthorityLayout>} />
      <Route path="/authority/alerts" element={<AuthorityLayout><Alerts /></AuthorityLayout>} />
      <Route path="/authority/action-plan" element={<AuthorityLayout><ActionPlan /></AuthorityLayout>} />
      <Route path="/authority/simulator" element={<AuthorityLayout><Simulator /></AuthorityLayout>} />
      <Route path="/authority/prioritization" element={<AuthorityLayout><Prioritization /></AuthorityLayout>} />
      <Route path="/authority/outcomes" element={<AuthorityLayout><Outcomes /></AuthorityLayout>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return <AppContent />;
}

export default App;
