import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Travel() {
  const navigate = useNavigate();
  const { t } = useLanguage();
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

  function openMapNavigation(route) {
    const origin = encodeURIComponent(from || "Calangate Hosteleer");
    const destination = encodeURIComponent(to || "Calangate");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    window.open(url, "_blank");
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><Navigation size={20} /> {t("travel")}</h2>

      <div className="form-group">
        <label>{t("location")}: From</label>
        <input
          placeholder="Calangate Hosteleer"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>{t("location")}: To</label>
        <input
          placeholder="Calangate"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>{t("mode")}</label>
        <select>
          <option>{t("walking")}</option>
          <option>{t("bike")}</option>
          <option>{t("car")}</option>
          <option>{t("publicTransport")}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t("travelTime")}</label>
        <input type="time" defaultValue="14:00" />
      </div>

      <button className="primary-button" onClick={calculateRoutes}>
        {t("compareRoutes")}
      </button>

      {result && (
        <div className="route-comparison">
          <div className="route-card recommended">
            <span style={{ color: "var(--green)", fontWeight: "800", fontSize: "11px" }}>
              ⭐ {t("recommended")}
            </span>
            <h3>Route A</h3>
            <p>{result.routeA.distance} · {result.routeA.time}</p>
            <p>🌳 {t("treeCover")}: {t(result.routeA.trees.toLowerCase()) || result.routeA.trees}</p>
            <p>☀️ {t("heatExposure")}: {t(result.routeA.heatExposure.toLowerCase().replace(" ", "")) || result.routeA.heatExposure}</p>
            <strong>🔥 {t("heatRisk")}: {result.routeA.heatRisk}</strong>

            <button
              className="primary-button"
              style={{ marginTop: "12px", padding: "10px 14px", fontSize: "13px" }}
              onClick={() => openMapNavigation(result.routeA)}
            >
              <Navigation size={14} />
              {t("startNavigation")}
            </button>
          </div>

          <div className="route-card">
            <h3>Route B</h3>
            <p>{result.routeB.distance} · {result.routeB.time}</p>
            <p>🌳 {t("treeCover")}: {t(result.routeB.trees.toLowerCase()) || result.routeB.trees}</p>
            <p>☀️ {t("heatExposure")}: {t(result.routeB.heatExposure.toLowerCase().replace(" ", "")) || result.routeB.heatExposure}</p>
            <strong>🔥 {t("heatRisk")}: {result.routeB.heatRisk}</strong>

            <button
              className="outline-button full"
              style={{ marginTop: "12px" }}
              onClick={() => openMapNavigation(result.routeB)}
            >
              <Navigation size={14} />
              {t("startNavigation")}
            </button>
          </div>

          <p className="muted" style={{ marginTop: 10, fontSize: 11 }}>
            Demo GIS Dataset — route analysis is illustrative.
          </p>
        </div>
      )}
    </div>
  );
}
