import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hospital, Snowflake, Navigation, MapPin, Phone } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { getFacilities } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

export default function Facilities() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [data, setData] = useState({ hospitals: [], coolingCentres: [] });
  const [tab, setTab] = useState("hospitals");

  useEffect(() => {
    getFacilities().then(setData);
  }, []);

  function openDirections(item) {
    const lat = item.latitude || 15.276;
    const lng = item.longitude || 73.965;
    const name = encodeURIComponent(item.name);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${name}`;
    window.open(url, "_blank");
  }

  const currentItems = tab === "hospitals" ? data.hospitals : data.coolingCentres;

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2>{t("facilities")}</h2>

      {/* Mini in-app Map showing nearby facilities */}
      <div style={{ height: "220px", borderRadius: "14px", overflow: "hidden", border: "1px solid #333", marginBottom: "16px" }}>
        <MapContainer
          center={[15.276, 73.962]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.hospitals.map((h) => (
            <CircleMarker
              key={`h-${h.id}`}
              center={[h.latitude, h.longitude]}
              radius={10}
              pathOptions={{ color: "#ff2222", fillColor: "#ff4444", fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>🏥 {h.name}</strong><br />
                {h.distance} · {h.phone}
              </Popup>
            </CircleMarker>
          ))}
          {data.coolingCentres.map((c) => (
            <CircleMarker
              key={`c-${c.id}`}
              center={[c.latitude, c.longitude]}
              radius={10}
              pathOptions={{ color: "#00b4d8", fillColor: "#48cae4", fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>🧊 {c.name}</strong><br />
                {c.distance} · Available: {c.available}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="tabs">
        <button
          className={tab === "hospitals" ? "active-tab" : ""}
          onClick={() => setTab("hospitals")}
        >
          <Hospital size={14} /> {t("hospitals")}
        </button>
        <button
          className={tab === "cooling" ? "active-tab" : ""}
          onClick={() => setTab("cooling")}
        >
          <Snowflake size={14} /> {t("coolingCentres")}
        </button>
      </div>

      {tab === "hospitals" && data.hospitals.map((h) => (
        <div className="facility-card" key={h.id}>
          <div>
            <strong>🏥 {h.name}</strong>
            <span>📍 {h.distance}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Phone size={12} />
              <a href={`tel:${h.phone}`} style={{ color: "var(--orange)" }}>{h.phone}</a>
            </span>
          </div>
          <button
            className="outline-button"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => openDirections(h)}
          >
            <Navigation size={14} />
            {t("getDirections")}
          </button>
        </div>
      ))}

      {tab === "cooling" && data.coolingCentres.map((c) => (
        <div className="facility-card" key={c.id}>
          <div>
            <strong>🧊 {c.name}</strong>
            <span>📍 {c.distance}</span>
            <span>Capacity {c.capacity} · Available {c.available}</span>
          </div>
          <button
            className="outline-button"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => openDirections(c)}
          >
            <Navigation size={14} />
            {t("getDirections")}
          </button>
        </div>
      ))}
    </div>
  );
}
