import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { calculateRisk } from "../../services/api";

export default function Precautions() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [profileInfo, setProfileInfo] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("heatnexa-profile");
    const profile = saved
      ? JSON.parse(saved)
      : { age: 32, occupation: "Outdoor Worker", pregnancy: false, conditions: [] };

    setProfileInfo(`${profile.occupation} • Age ${profile.age}${profile.conditions?.length ? " • " + profile.conditions.join(", ") : ""}`);

    calculateRisk(profile).then((data) => {
      setRecommendations(data.recommendations);
    });
  }, []);

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2><ShieldAlert size={20} /> Your Precautions</h2>

      <p className="muted">Personalized for you: {profileInfo}</p>

      {recommendations.map((item, index) => (
        <div className="recommendation-card" key={index}>
          <span>⚠</span>
          <p>{item}</p>
        </div>
      ))}

      <button
        className="outline-button full"
        onClick={() => navigate("/citizen/profile")}
        style={{ marginTop: 20 }}
      >
        View More Tips
      </button>
    </div>
  );
}
