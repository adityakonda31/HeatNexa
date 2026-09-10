export default function RiskBadge({ level, label }) {
  return (
    <span
      className={`risk-badge ${level
        ?.toLowerCase()
        .replace(" ", "-")}`}
    >
      {label || level}
    </span>
  );
}
