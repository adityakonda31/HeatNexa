import RiskBadge from "./RiskBadge";

export default function RiskCard({ score, level }) {
  return (
    <div className="risk-card">
      <div className="risk-header">
        <span>YOUR HEAT RISK</span>
        <RiskBadge level={level} />
      </div>

      <div className="risk-circle">
        <strong>{score}</strong>
        <span>/100</span>
      </div>

      <p className="risk-title">{level}</p>

      <div className="risk-bar">
        <div style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
