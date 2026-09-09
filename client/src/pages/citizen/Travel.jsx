import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation } from "lucide-react";

export default function Travel() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState(null);

  function calculateRoutes() {
    setResult({
      routeA: {
        name: "Route A",
        distance: "4.2 km",
        time: "38 min",
        trees: "High",
        heatExposure: "Low",
        heatRisk: 42
      },
      routeB: {
        name: "Route B",
        distance: "3.5 km",
        time: "31 min",
        trees: "Low",
        heatExposure: "Very High",
        heatRisk: 78
      }
    });
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2><Navigation size={20} /> Smart Travel</h2>

      <div className="form-group">
        <label>From</label>
        <input
          placeholder="Calangate Hosteleer"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>To</label>
        <input
          placeholder="Calangate"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Mode</label>
        <select>
          <option>Walking</option>
          <option>Bike</option>
          <option>Car</option>
          <option>Public Transport</option>
        </select>
      </div>

      <div className="form-group">
        <label>Travel Time</label>
        <input type="time" defaultValue="14:00" />
      </div>

      <button className="primary-button" onClick={calculateRoutes}>
        Compare Routes
      </button>

      {result && (
        <div className="route-comparison">
          <div className="route-card recommended">
            <span>⭐ RECOMMENDED</span>
            <h3>Route A</h3>
            <p>{result.routeA.distance} · {result.routeA.time}</p>
            <p>🌳 Tree Cover: {result.routeA.trees}</p>
            <p>☀️ Heat Exposure: {result.routeA.heatExposure}</p>
            <strong>🔥 Heat Risk: {result.routeA.heatRisk}</strong>
          </div>

          <div className="route-card">
            <h3>Route B</h3>
            <p>{result.routeB.distance} · {result.routeB.time}</p>
            <p>🌳 Tree Cover: {result.routeB.trees}</p>
            <p>☀️ Heat Exposure: {result.routeB.heatExposure}</p>
            <strong>🔥 Heat Risk: {result.routeB.heatRisk}</strong>
          </div>

          <p className="muted" style={{ marginTop: 10, fontSize: 11 }}>
            Demo GIS Dataset — route analysis is illustrative.
          </p>
        </div>
      )}
    </div>
  );
}
