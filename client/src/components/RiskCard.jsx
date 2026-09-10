import RiskBadge from "./RiskBadge";
import { useLanguage } from "../context/LanguageContext";
import { translateLevel } from "../data/translations";

export default function RiskCard({ score, level }) {
  const { t } = useLanguage();
  const displayLevel = translateLevel(level, t);

  return (
    <div className="risk-card">
      <div className="risk-header">
        <span>{t("yourHeatRisk")}</span>
        <RiskBadge level={level} label={displayLevel} />
      </div>

      <div className="risk-circle">
        <strong>{score}</strong>
        <span>/100</span>
      </div>

      <p className="risk-title">{displayLevel}</p>

      <div className="risk-bar">
        <div style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
