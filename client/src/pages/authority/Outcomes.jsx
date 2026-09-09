export default function Outcomes() {
  const metrics = [
    ["Alerts Sent", "12,400"],
    ["People Reached", "10,850"],
    ["Cooling Centres Opened", "3"],
    ["Water Stations Deployed", "5"],
    ["Workers Protected", "4,200"],
    ["Est. Exposure Reduction", "↓ 21%"]
  ];

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Outcomes</h1>
      </div>

      <div className="stats-grid">
        {metrics.map(([name, value]) => (
          <div className="stat-card" key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>Prediction → Action → Outcome</h2>

        <div className="outcome-flow">
          <div>🔍 Risk Predicted</div>
          <span>→</span>
          <div>🎯 Intervention</div>
          <span>→</span>
          <div>📊 Outcome</div>
          <span>→</span>
          <div>🔄 Feedback</div>
        </div>

        <p className="muted" style={{ textAlign: "center", marginTop: 20 }}>
          Outcome data feeds back into the intelligence core to improve future predictions.
        </p>
      </div>
    </div>
  );
}
