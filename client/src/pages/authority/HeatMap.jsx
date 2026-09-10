import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";
import { getWards } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { Layers, AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";

function getColor(score) {
  if (score >= 85) return "#ff1744";
  if (score >= 70) return "#ff6d00";
  if (score >= 50) return "#ffc400";
  if (score >= 30) return "#43e66f";
  return "#39d353";
}

function getLevel(score) {
  if (score >= 85) return "Extreme";
  if (score >= 70) return "Very High";
  if (score >= 50) return "High";
  if (score >= 30) return "Moderate";
  return "Low";
}

export default function HeatMap() {
  const [wards, setWards] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    getWards().then((data) => {
      setWards(data);
      // Select Ward 3 by default as the primary focus
      const ward3 = data.find((w) => w.id === 3) || data[0];
      setSelected(ward3);
    });
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("heatMap")}</h1>
          <span className="header-greeting">Geospatial Heat Vulnerability & Risk Index</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <select className="auth-select" defaultValue="Goa"><option>Goa</option></select>
          <select className="auth-select" defaultValue="Madgaon"><option>Madgaon</option></select>
          <select
            className="auth-select"
            value={selected?.id || ""}
            onChange={(e) => {
              const w = wards.find((item) => item.id === Number(e.target.value));
              if (w) setSelected(w);
            }}
          >
            {wards.map((w) => (
              <option key={w.id} value={w.id}>{w.name} ({getLevel(w.risk)})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="map-and-details" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px", marginTop: "16px" }}>
        <div className="map-container" style={{ height: "620px", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", position: "relative" }}>
          <MapContainer
            center={[15.275, 73.960]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {wards.map((ward) => (
              <CircleMarker
                key={ward.id}
                center={[ward.latitude, ward.longitude]}
                radius={30}
                pathOptions={{
                  color: getColor(ward.risk),
                  fillColor: getColor(ward.risk),
                  fillOpacity: selected?.id === ward.id ? 0.85 : 0.6
                }}
                eventHandlers={{
                  click: () => setSelected(ward)
                }}
              >
                <Popup>
                  <strong>{ward.name}</strong><br />
                  Heat Risk: {ward.risk}/100<br />
                  Population: {ward.population.toLocaleString()}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {selected && (
          <div className="panel ward-details" style={{ margin: 0, height: "620px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{selected.name} Overview</h3>
                <span className={`risk-badge ${getLevel(selected.risk).toLowerCase().replace(" ", "-")}`}>
                  {getLevel(selected.risk)}
                </span>
              </div>

              <div className="ward-detail-row">
                <span>Heat Risk Score</span>
                <strong style={{ color: getColor(selected.risk), fontSize: "16px" }}>{selected.risk}/100</strong>
              </div>
              <div className="ward-detail-row">
                <span>Vulnerability Score</span>
                <strong>{selected.vulnerability}/100</strong>
              </div>
              <div className="ward-detail-row">
                <span>Total Population</span>
                <strong>{selected.population.toLocaleString()}</strong>
              </div>

              <h4 style={{ marginTop: "18px", marginBottom: "10px", color: "var(--orange)" }}>
                Vulnerable Populations
              </h4>
              <div className="ward-detail-row">
                <span>👶 Children (&lt;12 yrs)</span>
                <strong>{selected.children.toLocaleString()}</strong>
              </div>
              <div className="ward-detail-row">
                <span>👴 Elderly (&gt;60 yrs)</span>
                <strong>{selected.elderly.toLocaleString()}</strong>
              </div>
              <div className="ward-detail-row">
                <span>🔧 Outdoor Workers</span>
                <strong style={{ color: "var(--red)" }}>{selected.outdoorWorkers.toLocaleString()}</strong>
              </div>
              <div className="ward-detail-row">
                <span>🏢 Indoor Workers</span>
                <strong>{selected.indoorWorkers.toLocaleString()}</strong>
              </div>
            </div>

            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                className="primary-button"
                style={{ padding: "11px", fontSize: "13px" }}
                onClick={() => navigate("/authority/action-plan")}
              >
                <ShieldAlert size={16} /> Deploy Intervention Plan
              </button>

              <button
                className="outline-button full"
                style={{ padding: "10px", fontSize: "13px" }}
                onClick={() => navigate("/authority/simulator")}
              >
                Run What-If Simulation
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="map-legend" style={{ marginTop: "16px", padding: "12px 18px", background: "#121212", borderRadius: "10px", border: "1px solid #222" }}>
        <strong style={{ marginRight: "12px", color: "#ccc", fontSize: "12px" }}>Risk Scale:</strong>
        <span><span className="legend-dot" style={{ background: "#39d353" }}></span> Low (&lt;30)</span>
        <span><span className="legend-dot" style={{ background: "#ffc400" }}></span> Moderate (30-49)</span>
        <span><span className="legend-dot" style={{ background: "#ff6d00" }}></span> High (50-69)</span>
        <span><span className="legend-dot" style={{ background: "#ff1744" }}></span> Very High (70-84)</span>
        <span><span className="legend-dot" style={{ background: "#9c0027" }}></span> Extreme (85+)</span>
      </div>
    </div>
  );
}
