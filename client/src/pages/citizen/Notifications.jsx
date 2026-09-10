import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const notifications = [
  {
    title: "Heat Alert",
    text: "High heat risk tomorrow in your area. Avoid outdoor activity 12 PM - 4 PM.",
    time: "10:24 AM",
    severity: "critical"
  },
  {
    title: "Safe Time Window",
    text: "6 AM – 9 AM is the recommended outdoor window for today.",
    time: "6:00 AM",
    severity: "info"
  },
  {
    title: "Family Alert",
    text: "Father's risk score is above 75. Consider checking in.",
    time: "Yesterday",
    severity: "warning"
  }
];

export default function Notifications() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><Bell size={20} /> {t("notifications")}</h2>

      {notifications.map((item, index) => (
        <div className={`notification-card ${item.severity}`} key={index}>
          <div className="notification-icon">
            {item.severity === "critical" ? "🔴" : item.severity === "warning" ? "🟠" : "🟢"}
          </div>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
            <small>{item.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
