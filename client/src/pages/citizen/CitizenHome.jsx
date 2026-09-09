import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  MapPin,
  User,
  MapPinned,
  Calendar,
  Shield,
  Building2,
  PawPrint,
  Route,
  Users,
  MessageCircle,
  LogOut
} from "lucide-react";

import RiskCard from "../../components/RiskCard";
import WeatherCard from "../../components/WeatherCard";
import { getWeather, calculateRisk } from "../../services/api";

const quickAccess = [
  { icon: User, label: "Profile", path: "/citizen/profile" },
  { icon: MapPinned, label: "Location", path: "/citizen/location" },
  { icon: Calendar, label: "Forecast", path: "/citizen/forecast" },
  { icon: Shield, label: "Precautions", path: "/citizen/precautions" },
  { icon: Building2, label: "Facilities", path: "/citizen/facilities" },
  { icon: PawPrint, label: "Animals", path: "/citizen/animals" },
  { icon: Route, label: "Travel", path: "/citizen/travel" },
  { icon: Users, label: "Family", path: "/citizen/family" },
  { icon: MessageCircle, label: "Assistant", path: "/citizen/assistant" }
];

export default function CitizenHome() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const w = await getWeather();
        setWeather(w);

        const saved = localStorage.getItem("heatnexa-profile");
        const profile = saved
          ? JSON.parse(saved)
          : {
              age: 32,
              gender: "Female",
              occupation: "Outdoor Worker",
              pregnancy: false,
              conditions: []
            };

        const r = await calculateRisk(profile);
        setRisk(r);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!weather || !risk) {
    return <div className="loading">Loading HeatNexa...</div>;
  }

  return (
    <div className="mobile-page">
      <header className="mobile-header">
        <div>
          <small>
            <MapPin size={12} />
            Goa, Madgaon
          </small>
          <h2>Good evening 👋</h2>
        </div>

        <button
          className="icon-button"
          onClick={() => navigate("/citizen/notifications")}
        >
          <Bell size={18} />
        </button>
      </header>

      <RiskCard score={risk.score} level={risk.level} />

      <WeatherCard weather={weather} />

      <div className="panel">
        <div className="section-title">Why is the risk high?</div>

        <ul className="reason-list">
          {(risk.reasons || [
            "🌡 High temperature",
            "💧 High humidity",
            "☀️ Strong solar exposure",
            "💨 Low wind speed"
          ]).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        <button
          className="primary-button"
          onClick={() => navigate("/citizen/precautions")}
        >
          What should you do?
        </button>
      </div>

      <div className="panel">
        <div className="section-title">Quick Access</div>
        <div className="quick-grid">
          {quickAccess.map((item) => (
            <button
              key={item.path}
              className="quick-item"
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
