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
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

export default function AuthoritySidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const sidebarItems = [
    { path: "/authority", icon: LayoutDashboard, label: t("dashboard") },
    { path: "/authority/map", icon: Map, label: t("heatMap") },
    { path: "/authority/trends", icon: TrendingUp, label: t("trends") },
    { path: "/authority/alerts", icon: Bell, label: t("alerts") },
    { path: "/authority/action-plan", icon: ClipboardList, label: t("actionPlan") },
    { path: "/authority/simulator", icon: FlaskConical, label: t("simulator") },
    { path: "/authority/prioritization", icon: BarChart3, label: t("wardAnalytics") },
    { path: "/authority/outcomes", icon: Activity, label: t("outcomes") }
  ];

  return (
    <aside className="authority-sidebar">
      <div className="sidebar-logo">
        <Logo small />
        <strong className="sidebar-brand">HeatNexa</strong>
      </div>

      <div style={{ padding: "0 16px 12px" }}>
        <LanguageSwitcher compact />
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
        <span>{t("logout")}</span>
      </button>
    </aside>
  );
}
