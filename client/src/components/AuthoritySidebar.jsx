import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Bell,
  ClipboardList,
  FlaskConical,
  BarChart3,
  Activity,
  LogOut
} from "lucide-react";
import Logo from "./Logo";

const sidebarItems = [
  { path: "/authority", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/authority/map", icon: Map, label: "Heat Risk Map" },
  { path: "/authority/trends", icon: TrendingUp, label: "Trends" },
  { path: "/authority/alerts", icon: Bell, label: "Alerts" },
  { path: "/authority/action-plan", icon: ClipboardList, label: "Action Plan" },
  { path: "/authority/simulator", icon: FlaskConical, label: "What-If Simulator" },
  { path: "/authority/prioritization", icon: BarChart3, label: "Ward Analytics" },
  { path: "/authority/outcomes", icon: Activity, label: "Outcomes" }
];

export default function AuthoritySidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="authority-sidebar">
      <div className="sidebar-logo">
        <Logo small />
        <strong className="sidebar-brand">HeatNexa</strong>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <button
            key={item.path}
            className={location.pathname === item.path ? "sidebar-active" : ""}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        className="sidebar-logout"
        onClick={() => {
          localStorage.removeItem("heatnexa-role");
          navigate("/");
        }}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
