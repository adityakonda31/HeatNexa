export default function RiskBadge({ level }) {
  return (
    <span
      className={`risk-badge ${level
        ?.toLowerCase()
        .replace(" ", "-")}`}
    >
      {level}
    </span>
  );
}
