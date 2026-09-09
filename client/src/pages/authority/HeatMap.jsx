import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import { getWards } from "../../services/api";

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

  useEffect(() => {
    getWards().then(setWards);
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Heat Risk Map</h1>
        <span className="header-greeting">Good Morning, Admin</span>
      </div>

      <div className="filter-row">
        <select><option>Goa</option></select>
        <select><option>Madgaon</option></select>
        <select>
          <option>All Wards</option>
          {wards.map(w => <option key={w.id}>{w.name}</option>)}
        </select>
      </div>

      <div className="map-and-details">
        <div className="map-container">
          <MapContainer
            center={[15.278, 73.960]}
            zoom={14}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {wards.map((ward) => (
              <CircleMarker
                key={ward.id}
                center={[ward.latitude, ward.longitude]}
                radius={25}
                pathOptions={{
                  color: getColor(ward.risk),
                  fillColor: getColor(ward.risk),
                  fillOpacity: 0.65
                }}
                eventHandlers={{
                  click: () => setSelected(ward)
                }}
              >
                <Popup>
                  <strong>{ward.name}</strong><br />
                  Risk: {ward.risk}<br />
                  Population: {ward.population.toLocaleString()}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {selected && (
          <div className="panel ward-details">
            <h3>{selected.name} — Details</h3>
            <div className="ward-detail-row">
              <span>Risk Level</span>
              <span className={selected.risk >= 70 ? "critical" : "high"}>{getLevel(selected.risk)}</span>
            </div>
            <div className="ward-detail-row">
              <span>Heat Risk Score</span>
              <strong>{selected.risk}</strong>
            </div>
            <div className="ward-detail-row">
              <span>Population</span>
              <strong>{selected.population.toLocaleString()}</strong>
            </div>
            <h4>Demographics</h4>
            <div className="ward-detail-row">
              <span>👶 Children</span>
              <strong>{selected.children.toLocaleString()}</strong>
            </div>
            <div className="ward-detail-row">
              <span>👴 Elderly</span>
              <strong>{selected.elderly.toLocaleString()}</strong>
            </div>
            <div className="ward-detail-row">
              <span>🔧 Outdoor Workers</span>
              <strong>{selected.outdoorWorkers.toLocaleString()}</strong>
            </div>
            <div className="ward-detail-row">
              <span>🏢 Indoor Workers</span>
              <strong>{selected.indoorWorkers.toLocaleString()}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="map-legend">
        <span><span className="legend-dot" style={{background: "#39d353"}}></span> Low</span>
        <span><span className="legend-dot" style={{background: "#ffc400"}}></span> Moderate</span>
        <span><span className="legend-dot" style={{background: "#ff6d00"}}></span> High</span>
        <span><span className="legend-dot" style={{background: "#ff1744"}}></span> Very High</span>
        <span><span className="legend-dot" style={{background: "#9c0027"}}></span> Extreme</span>
      </div>
    </div>
  );
}
