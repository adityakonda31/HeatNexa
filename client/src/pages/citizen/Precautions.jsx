import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Droplets, Sun, Clock } from "lucide-react";
import { calculateRisk } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { translateRecommendation } from "../../data/translations";

export default function Precautions() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState([]);
  const [profileInfo, setProfileInfo] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("heatnexa-profile");
    const profile = saved
      ? JSON.parse(saved)
      : { age: 32, occupation: "Outdoor Worker", pregnancy: false, conditions: [] };

    setProfileInfo(`${profile.occupation} • Age ${profile.age}${profile.conditions?.length ? " • " + profile.conditions.join(", ") : ""}`);

    calculateRisk(profile).then((data) => {
      setRecommendations(data.recommendations || []);
    });
  }, []);

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><ShieldAlert size={20} /> {t("precautions")}</h2>

      <p className="muted">{t("personalizedForProfile")}: <strong>{profileInfo}</strong></p>

      {recommendations.map((item, index) => (
        <div className="recommendation-card" key={index} style={{ borderLeft: "3px solid var(--orange)" }}>
          <span style={{ color: "var(--orange)", fontSize: "16px" }}>⚡</span>
          <p>{translateRecommendation(item, t)}</p>
        </div>
      ))}

      <button
        className="primary-button"
        onClick={() => navigate("/citizen/profile")}
        style={{ marginTop: 20 }}
      >
        {t("updateProfileTips")}
      </button>
    </div>
  );
}
