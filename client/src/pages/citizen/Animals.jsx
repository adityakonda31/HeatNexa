import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, HeartPulse, Droplets } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const animals = {
  Dog: {
    emoji: "🐕",
    risk: "High Risk",
    level: "high",
    happens: [
      "Heavy panting, dry or pale gums",
      "Extreme lethargy and weakness",
      "Risk of heat stroke & organ stress",
      "Burned paw pads from hot tarmac"
    ],
    actions: [
      "Keep fresh clean drinking water available 24/7",
      "Provide shaded, well-ventilated resting areas",
      "Avoid walks on hot pavement (test surface with hand)",
      "Schedule walks early morning (before 9 AM) or late evening",
      "Never leave pets unattended inside parked vehicles"
    ]
  },
  Cat: {
    emoji: "🐈",
    risk: "High Risk",
    level: "high",
    happens: [
      "Open-mouth breathing and drooling",
      "Seeking cool tile floors or dark hiding spots",
      "Dehydration, vomiting or dizziness",
      "Reduced grooming and loss of appetite"
    ],
    actions: [
      "Place multiple water bowls around the house",
      "Keep indoors in cool rooms during peak heat (11 AM–4 PM)",
      "Ensure airflow with fans or open cross-ventilation",
      "Dampen a clean towel with cool water for them to rest on"
    ]
  },
  Cow: {
    emoji: "🐄",
    risk: "Very High",
    level: "very-high",
    happens: [
      "Severe heat stress and rapid respiratory rate",
      "Drop in daily milk yield by 15% to 25%",
      "Reduced rumination and feed intake",
      "Risk of heat exhaustion in open pastures"
    ],
    actions: [
      "Construct thatched or high-roof shade structures in barns",
      "Ensure continuous access to cool drinking water (60-80 L/day)",
      "Install water misting or sprinkler systems during peak afternoon",
      "Shift grazing hours to early morning (6–9 AM) and late evening",
      "Supplement electrolytes and mineral mixtures in diet"
    ]
  },
  Goat: {
    emoji: "🐐",
    risk: "High Risk",
    level: "high",
    happens: [
      "Panting with tongue extended",
      "Reluctance to move or graze",
      "High body temperature and dehydration",
      "Reduced immunity to secondary infections"
    ],
    actions: [
      "Provide covered shed protection with good cross-ventilation",
      "Ensure constant clean water troughs in shade",
      "Avoid herding or trekking during midday (12 PM–4 PM)",
      "Provide green fodder during cooler morning hours"
    ]
  }
};

export default function Animals() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selected, setSelected] = useState("Dog");
  const animal = animals[selected];

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2>🐾 {t("animals")}</h2>

      <div className="animal-tabs">
        {Object.keys(animals).map((name) => (
          <button
            className={selected === name ? "active-tab" : ""}
            onClick={() => setSelected(name)}
            key={name}
          >
            {animals[name].emoji} {name}
          </button>
        ))}
      </div>

      <div className="animal-card" style={{ border: "1px solid #444", borderRadius: "16px", padding: "18px" }}>
        <div className="animal-heading">
          <span className="animal-icon" style={{ fontSize: "48px" }}>{animal.emoji}</span>
          <span className={`risk-badge ${animal.level}`}>{animal.risk}</span>
        </div>

        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "#ff5252", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <AlertTriangle size={16} /> {t("whatHappens")}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {animal.happens.map((item) => (
              <div
                key={item}
                style={{
                  background: "rgba(255, 60, 0, 0.08)",
                  borderLeft: "3px solid #ff4433",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#eee"
                }}
              >
                • {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#43e66f", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <CheckCircle2 size={16} /> {t("whatToDo")}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {animal.actions.map((item) => (
              <div
                key={item}
                style={{
                  background: "rgba(67, 230, 111, 0.08)",
                  borderLeft: "3px solid #43e66f",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#eee"
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "16px", padding: "10px 12px", background: "rgba(255, 122, 0, 0.1)", borderRadius: "8px", border: "1px solid rgba(255, 122, 0, 0.25)", fontSize: "12px", color: "#ffc400" }}>
          💡 <strong>Tip:</strong> Keep extra water bowls in shade for stray animals and birds during peak heat.
        </div>
      </div>
    </div>
  );
}
