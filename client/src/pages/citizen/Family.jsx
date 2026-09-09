import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const family = [
  { name: "Father", age: 64, occupation: "Retired", risk: 79, emoji: "👨‍🦳" },
  { name: "Mother", age: 58, occupation: "Indoor", risk: 68, emoji: "👩" },
  { name: "Child", age: 9, occupation: "Student", risk: 74, emoji: "👦" }
];

export default function Family() {
  const navigate = useNavigate();

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Family Safety</h2>

      <p className="muted">
        Monitor shared family profiles with consent.
      </p>

      {family.map((person) => (
        <div className="family-card" key={person.name}>
          <div>
            <strong>{person.emoji} {person.name}</strong>
            <span>Age {person.age}</span>
            <span>{person.occupation}</span>
          </div>
          <div className={`family-risk ${person.risk >= 75 ? "risk-critical" : person.risk >= 60 ? "risk-high" : ""}`}>
            {person.risk}/100
          </div>
        </div>
      ))}

      {family.filter(p => p.risk >= 75).map((person) => (
        <div className="recommendation-card" key={person.name + "-alert"}>
          <span><AlertTriangle size={16} /></span>
          <div>
            <strong>🔴 Alert: {person.name}</strong>
            <p>Extreme heat expected 12 PM – 4 PM. Check on {person.name.toLowerCase()} before noon.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
