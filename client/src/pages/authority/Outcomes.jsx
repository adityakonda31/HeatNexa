import { Send, Users, Snowflake, Droplets, ShieldCheck, TrendingDown, ArrowRight, RefreshCw, BarChart2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Outcomes() {
  const { t } = useLanguage();

  const metrics = [
    { title: "Alerts Dispatched", value: "12,400", sub: "Via SMS & Push Gateway", icon: Send, color: "var(--orange)" },
    { title: "Citizens Reached", value: "10,850", sub: "92% confirmed read rate", icon: Users, color: "var(--yellow)" },
    { title: "Cooling Centres Activated", value: "3", sub: "Madgaon Ward 2 & 3", icon: Snowflake, color: "#00b4d8" },
    { title: "Mobile Water Stations", value: "5", sub: "Distributed 14,000 L chilled water", icon: Droplets, color: "var(--orange)" },
    { title: "Outdoor Workers Protected", value: "4,200", sub: "Shifted off peak hours", icon: ShieldCheck, color: "var(--green)" },
    { title: "Est. Thermal Exposure Drop", value: "↓ 21%", sub: "NDMA modelled protective index", icon: TrendingDown, color: "#43e66f" }
  ];

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("outcomes")} & Impact Verification</h1>
          <span className="header-greeting">Post-Intervention Efficacy & Feedback Loop Metrics</span>
        </div>
      </div>

      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {metrics.map((m) => (
          <div className="stat-card" key={m.title} style={{ borderTop: `3px solid ${m.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "12.5px" }}>{m.title}</span>
              <m.icon size={20} color={m.color} />
            </div>
            <strong style={{ color: m.color, fontSize: "30px", marginTop: "4px", display: "block" }}>{m.value}</strong>
            <small style={{ color: "#777", fontSize: "11.5px" }}>{m.sub}</small>
          </div>
        ))}
      </div>

      <div className="panel" style={{ marginTop: "24px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>The HeatNexa Closed-Loop Architecture</h2>
        <p className="muted" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 24px" }}>
          Every citizen action and municipal intervention generates real-time telemetry that trains and refines the local micro-climate risk model.
        </p>

        <div className="outcome-flow" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ background: "#161616", border: "1px solid #333", borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>🛰️</div>
            <strong style={{ color: "var(--orange)", display: "block", fontSize: "13px" }}>1. Risk Predicted</strong>
            <small style={{ color: "#888", fontSize: "11px" }}>Satellite, Weather & Profiling</small>
          </div>

          <span style={{ color: "var(--orange)", fontSize: "20px" }}>→</span>

          <div style={{ background: "#161616", border: "1px solid #333", borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>🎯</div>
            <strong style={{ color: "var(--yellow)", display: "block", fontSize: "13px" }}>2. Targeted Action</strong>
            <small style={{ color: "#888", fontSize: "11px" }}>Alerts, Cooling & Water</small>
          </div>

          <span style={{ color: "var(--orange)", fontSize: "20px" }}>→</span>

          <div style={{ background: "#161616", border: "1px solid #333", borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>🛡️</div>
            <strong style={{ color: "var(--green)", display: "block", fontSize: "13px" }}>3. Human Protection</strong>
            <small style={{ color: "#888", fontSize: "11px" }}>Vulnerability Lowered</small>
          </div>

          <span style={{ color: "var(--orange)", fontSize: "20px" }}>→</span>

          <div style={{ background: "#161616", border: "1px solid #333", borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>🔄</div>
            <strong style={{ color: "#00b4d8", display: "block", fontSize: "13px" }}>4. Feedback Loop</strong>
            <small style={{ color: "#888", fontSize: "11px" }}>Continuous ML Calibration</small>
          </div>
        </div>
      </div>
    </div>
  );
}
