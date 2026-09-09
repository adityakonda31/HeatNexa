import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  MessageCircle,
  Bell,
  User
} from "lucide-react";

const navItems = [
  { path: "/citizen", icon: Home, label: "Home" },
  { path: "/citizen/facilities", icon: Map, label: "Map" },
  { path: "/citizen/assistant", icon: MessageCircle, label: "Assistant" },
  { path: "/citizen/notifications", icon: Bell, label: "Alerts" },
  { path: "/citizen/profile", icon: User, label: "Profile" }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

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
