import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hospital, Snowflake } from "lucide-react";
import { getFacilities } from "../../services/api";

export default function Facilities() {
  const navigate = useNavigate();
  const [data, setData] = useState({ hospitals: [], coolingCentres: [] });
  const [tab, setTab] = useState("hospitals");

  useEffect(() => {
    getFacilities().then(setData);
  }, []);

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Nearby Facilities</h2>

      <div className="tabs">
        <button
          className={tab === "hospitals" ? "active-tab" : ""}
          onClick={() => setTab("hospitals")}
        >
          <Hospital size={14} /> Hospitals
        </button>
        <button
          className={tab === "cooling" ? "active-tab" : ""}
          onClick={() => setTab("cooling")}
        >
          <Snowflake size={14} /> Cooling Centres
        </button>
      </div>

      {tab === "hospitals" && data.hospitals.map((h) => (
        <div className="facility-card" key={h.id}>
          <div>
            <strong>🏥 {h.name}</strong>
            <span>{h.distance}</span>
            <span>📞 {h.phone}</span>
          </div>
          <button className="outline-button">Get Directions</button>
        </div>
      ))}

      {tab === "cooling" && data.coolingCentres.map((c) => (
        <div className="facility-card" key={c.id}>
          <div>
            <strong>🧊 {c.name}</strong>
            <span>{c.distance}</span>
            <span>Capacity {c.capacity} · Available {c.available}</span>
          </div>
          <button className="outline-button">Get Directions</button>
        </div>
      ))}
    </div>
  );
}
