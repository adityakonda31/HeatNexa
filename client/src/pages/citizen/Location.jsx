import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Location() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [location, setLocation] = useState({
    state: "Goa",
    city: "Madgaon",
    ward: "Ward 3"
  });

  function save() {
    localStorage.setItem("heatnexa-location", JSON.stringify(location));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><MapPin size={20} /> {t("location")}</h2>

      <p className="muted">
        Choose your location to receive localized heat-risk information.
      </p>

      <div className="form-group">
        <label>State</label>
        <select
          value={location.state}
          onChange={(e) => setLocation({ ...location, state: e.target.value })}
        >
          <option>Goa</option>
          <option>Maharashtra</option>
          <option>Delhi</option>
        </select>
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
        >
          <option>Madgaon</option>
          <option>Panaji</option>
        </select>
      </div>

      <div className="form-group">
        <label>Ward</label>
        <select
          value={location.ward}
          onChange={(e) => setLocation({ ...location, ward: e.target.value })}
        >
          <option>Ward 1</option>
          <option>Ward 2</option>
          <option>Ward 3</option>
          <option>Ward 4</option>
          <option>Ward 5</option>
        </select>
      </div>

      <button className="primary-button" onClick={save}>
        {t("useCurrentLocation")}
      </button>

      {saved && (
        <div style={{ marginTop: "12px", padding: "10px 14px", background: "rgba(67, 230, 111, 0.12)", border: "1px solid #43e66f", borderRadius: "8px", color: "#43e66f", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <CheckCircle size={16} /> Location saved: {location.city}, {location.ward}
        </div>
      )}
    </div>
  );
}
