import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Bell, Droplets, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const initialFamily = [
  { name: "Father", age: 64, occupation: "Retired", risk: 79, emoji: "👨‍🦳", condition: "Heart condition" },
  { name: "Mother", age: 58, occupation: "Indoor", risk: 68, emoji: "👩", condition: "None" },
  { name: "Child", age: 9, occupation: "Student", risk: 74, emoji: "👦", condition: "None" }
];

export default function Family() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [remindersSent, setRemindersSent] = useState({});

  function sendReminder(name) {
    setRemindersSent((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setRemindersSent((prev) => ({ ...prev, [name]: false }));
    }, 4000);
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2>👨‍👩‍👧‍👦 {t("family")}</h2>

      <p className="muted">
        Monitor shared family profiles with consent and send heat safety alerts.
      </p>

      {initialFamily.map((person) => (
        <div className="family-card" key={person.name} style={{ border: "1px solid #333", borderRadius: "14px", padding: "14px" }}>
          <div>
            <strong>{person.emoji} {person.name}</strong>
            <span style={{ color: "#aaa", fontSize: "12px" }}>Age {person.age} · {person.occupation}</span>
            {person.condition !== "None" && (
              <span style={{ color: "#ff7a00", fontSize: "11px" }}>⚠️ {person.condition}</span>
            )}
            <button
              type="button"
              className="outline-button"
              style={{ marginTop: "8px", padding: "6px 10px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
              onClick={() => sendReminder(person.name)}
            >
              {remindersSent[person.name] ? (
                <>
                  <Check size={12} color="var(--green)" /> {t("reminderSent")}
                </>
              ) : (
                <>
                  <Droplets size={12} /> {t("sendWaterReminder")}
                </>
              )}
            </button>
          </div>
          <div className={`family-risk ${person.risk >= 75 ? "risk-critical" : person.risk >= 60 ? "risk-high" : ""}`}>
            <span style={{ fontSize: "11px", color: "#888", display: "block" }}>{t("heatRisk").toUpperCase()}</span>
            {person.risk}/100
          </div>
        </div>
      ))}

      {initialFamily.filter(p => p.risk >= 75).map((person) => (
        <div className="recommendation-card" key={person.name + "-alert"} style={{ borderLeft: "4px solid #ff3b30" }}>
          <span><AlertTriangle size={16} /></span>
          <div>
            <strong>🔴 Priority Check: {person.name}</strong>
            <p>Extreme heat expected between 12 PM – 4 PM. Contact {person.name.toLowerCase()} to ensure indoor cooling.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
