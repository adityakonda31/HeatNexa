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
  MessageCircle
} from "lucide-react";

import RiskCard from "../../components/RiskCard";
import WeatherCard from "../../components/WeatherCard";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { getWeather, calculateRisk } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { translateReason } from "../../data/translations";

export default function CitizenHome() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const quickAccess = [
    { icon: User, label: t("profile"), path: "/citizen/profile" },
    { icon: MapPinned, label: t("location"), path: "/citizen/location" },
    { icon: Calendar, label: t("forecast"), path: "/citizen/forecast" },
    { icon: Shield, label: t("precautions"), path: "/citizen/precautions" },
    { icon: Building2, label: t("facilities"), path: "/citizen/facilities" },
    { icon: PawPrint, label: t("animals"), path: "/citizen/animals" },
    { icon: Route, label: t("travel"), path: "/citizen/travel" },
    { icon: Users, label: t("family"), path: "/citizen/family" },
    { icon: MessageCircle, label: t("assistant"), path: "/citizen/assistant" }
  ];

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
    return <div className="loading">{t("loading")}</div>;
  }

  return (
    <div className="mobile-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <LanguageSwitcher compact />
        <button
          className="icon-button"
          onClick={() => navigate("/citizen/notifications")}
          title={t("notifications")}
        >
          <Bell size={18} />
        </button>
      </div>

      <header className="mobile-header">
        <div>
          <small>
            <MapPin size={12} />
            {t("locationName")}
          </small>
          <h2>{t("goodEvening")}</h2>
        </div>
      </header>

      <RiskCard score={risk.score} level={risk.level} />

      <WeatherCard weather={weather} />

      <div className="panel">
        <div className="section-title">{t("whyRiskHigh")}</div>

        <ul className="reason-list">
          {(risk.reasons || [
            "🌡 High temperature",
            "💧 High humidity",
            "☀️ Strong solar exposure",
            "💨 Low wind speed"
          ]).map((r, i) => (
            <li key={i}>{translateReason(r, t)}</li>
          ))}
        </ul>

        <button
          className="primary-button"
          onClick={() => navigate("/citizen/precautions")}
        >
          {t("whatShouldYouDo")}
        </button>
      </div>

      <div className="panel">
        <div className="section-title">{t("quickAccess")}</div>
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
