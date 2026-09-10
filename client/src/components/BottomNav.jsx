import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  MessageCircle,
  Bell,
  User
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/citizen", icon: Home, label: t("home") },
    { path: "/citizen/facilities", icon: Map, label: t("facilities") },
    { path: "/citizen/assistant", icon: MessageCircle, label: t("assistant") },
    { path: "/citizen/notifications", icon: Bell, label: t("notifications") },
    { path: "/citizen/profile", icon: User, label: t("profile") }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={location.pathname === item.path ? "active" : ""}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
