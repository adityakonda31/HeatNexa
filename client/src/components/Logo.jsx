export default function Logo({ small = false }) {
  return (
    <div className={`logo ${small ? "logo-small" : ""}`}>
      <img src="/heatnexa-logo.png" alt="HeatNexa" />

      {!small && (
        <div className="logo-text">
          <strong>HeatNexa</strong>
          <span>Sense Heat. Save Lives.</span>
        </div>
      )}
    </div>
  );
}
