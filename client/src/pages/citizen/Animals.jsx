import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const animals = {
  Dog: {
    emoji: "🐕",
    risk: "High Risk",
    happens: ["Panting and weakness", "Risk of heat stroke", "Dehydration"],
    actions: ["Provide clean drinking water", "Keep the animal in shade", "Avoid hot pavement", "Avoid midday walks"]
  },
  Cat: {
    emoji: "🐈",
    risk: "High Risk",
    happens: ["Heavy breathing", "Lethargy", "Dehydration"],
    actions: ["Provide fresh water", "Keep indoors during peak heat", "Provide ventilation and shade"]
  },
  Cow: {
    emoji: "🐄",
    risk: "Very High",
    happens: ["Reduced activity", "Dehydration", "Heat stress", "Reduced milk production"],
    actions: ["Provide shade structures", "Ensure water availability", "Avoid prolonged direct sun", "Provide cooling sprays"]
  },
  Goat: {
    emoji: "🐐",
    risk: "High Risk",
    happens: ["Panting", "Reduced feeding", "Dehydration"],
    actions: ["Provide shade", "Ensure clean water access", "Avoid herding during peak heat"]
  }
};

export default function Animals() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Dog");
  const animal = animals[selected];

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Animal Safety</h2>

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

      <div className="animal-card">
        <div className="animal-heading">
          <span className="animal-icon">{animal.emoji}</span>
          <span className="risk-badge very-high">{animal.risk}</span>
        </div>

        <h3>What happens?</h3>
        {animal.happens.map((item) => (
          <p key={item}>• {item}</p>
        ))}

        <h3>What to do?</h3>
        {animal.actions.map((item) => (
          <p key={item}>✓ {item}</p>
        ))}
      </div>
    </div>
  );
}
