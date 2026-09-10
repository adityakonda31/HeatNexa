import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWards } from "../../services/api";
import {
  Building2,
  AlertTriangle,
  Users,
  Flame,
  ArrowRight,
  Bell,
  ClipboardList,
  FlaskConical,
  BarChart3,
  MapPin
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Dashboard() {
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    getWards().then(setWards);
  }, []);

  const highRisk = wards.filter((ward) => ward.risk >= 70).length;
  const population = wards.reduce((sum, ward) => sum + ward.population, 0);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("dashboard")}</h1>
          <span className="header-greeting" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <MapPin size={14} color="var(--orange)" /> Goa, Madgaon Municipal Corporation · Operations Center
          </span>
        </div>
        <span className="header-greeting">Officer on Duty: Admin</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ borderTop: "3px solid #666" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span>Total Monitored Wards</span>
            <Building2 size={20} color="#888" />
          </div>
          <strong>{wards.length}</strong>
          <small style={{ color: "#777", fontSize: "11px" }}>Covering Madgaon Urban</small>
        </div>

        <div className="stat-card" style={{ borderTop: "3px solid var(--red)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span>High Risk Wards</span>
            <AlertTriangle size={20} color="var(--red)" />
          </div>
          <strong className="stat-critical">{highRisk}</strong>
          <small style={{ color: "var(--red)", fontSize: "11px" }}>Ward 2 & Ward 3 Critical</small>
        </div>

        <div className="stat-card" style={{ borderTop: "3px solid var(--orange)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span>Population at Risk</span>
            <Users size={20} color="var(--orange)" />
          </div>
          <strong>{(population / 100000).toFixed(1)}L</strong>
          <small style={{ color: "#888", fontSize: "11px" }}>1.84L Total Citizens</small>
        </div>

        <div className="stat-card" style={{ borderTop: "3px solid var(--yellow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span>Active Alerts Dispatched</span>
            <Flame size={20} color="var(--yellow)" />
          </div>
          <strong style={{ color: "var(--yellow)" }}>5</strong>
          <small style={{ color: "#888", fontSize: "11px" }}>2 Heat Warnings · 3 Advisories</small>
        </div>
      </div>

      <div className="authority-dashboard-layout" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px", marginTop: "20px" }}>
        {/* Left Column: Ward Risk Overview */}
        <div className="panel" style={{ margin: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Ward Heat Risk Index</h2>
            <button
              className="outline-button"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              onClick={() => navigate("/authority/map")}
            >
              Open Interactive Map <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {wards.map((ward) => (
              <div
                className="ward-row"
                key={ward.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr 60px 90px",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 14px",
                  background: "#161616",
                  borderRadius: "10px",
                  border: "1px solid #292929"
                }}
              >
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>{ward.name}</strong>
                  <small style={{ color: "#777", fontSize: "11px" }}>Pop: {(ward.population / 1000).toFixed(0)}k</small>
                </div>

                <div className="ward-progress" style={{ height: "10px" }}>
                  <div style={{ width: `${ward.risk}%` }} />
                </div>

                <div style={{ textAlign: "right" }}>
                  <strong style={{ fontSize: "15px", color: ward.risk >= 70 ? "var(--red)" : ward.risk >= 50 ? "var(--orange)" : "var(--yellow)" }}>
                    {ward.risk}
                  </strong>
                  <span style={{ fontSize: "10px", color: "#666", display: "block" }}>/100</span>
                </div>

                <button
                  className="outline-button"
                  style={{ padding: "5px 10px", fontSize: "11px" }}
                  onClick={() => navigate("/authority/map")}
                >
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Commands & Active Alerts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Quick Operations Panel */}
          <div className="panel" style={{ margin: 0 }}>
            <div className="section-title" style={{ color: "#fff", marginBottom: "14px" }}>
              ⚡ Quick Emergency Actions
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                className="authority-action-card"
                onClick={() => navigate("/authority/alerts")}
              >
                <Bell size={18} color="var(--orange)" />
                <strong>Send Alert</strong>
                <small>SMS & Push</small>
              </button>

              <button
                className="authority-action-card"
                onClick={() => navigate("/authority/action-plan")}
              >
                <ClipboardList size={18} color="var(--red)" />
                <strong>Action Plan</strong>
                <small>Ward 3 Priority</small>
              </button>

              <button
                className="authority-action-card"
                onClick={() => navigate("/authority/simulator")}
              >
                <FlaskConical size={18} color="var(--yellow)" />
                <strong>What-If Model</strong>
                <small>Cooling Impact</small>
              </button>

              <button
                className="authority-action-card"
                onClick={() => navigate("/authority/prioritization")}
              >
                <BarChart3 size={18} color="var(--green)" />
                <strong>Prioritization</strong>
                <small>Rank All Wards</small>
              </button>
            </div>
          </div>

          {/* Real-time Alerts Feed */}
          <div className="panel" style={{ margin: 0 }}>
            <div className="section-title" style={{ color: "var(--red)", marginBottom: "10px" }}>
              🚨 Active Advisory Feed
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ padding: "10px 12px", background: "rgba(255, 30, 0, 0.08)", borderLeft: "3px solid #ff3b30", borderRadius: "6px" }}>
                <strong style={{ color: "#ff4538", fontSize: "13px" }}>Ward 3 — Extreme Heat Warning</strong>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#bbb" }}>Peak 42°C expected tomorrow. 9,700 outdoor workers vulnerable.</p>
              </div>

              <div style={{ padding: "10px 12px", background: "rgba(255, 122, 0, 0.08)", borderLeft: "3px solid var(--orange)", borderRadius: "6px" }}>
                <strong style={{ color: "var(--orange)", fontSize: "13px" }}>Hydration Advisory Dispatched</strong>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#bbb" }}>Madgaon Central: 2 water tankers scheduled for deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
