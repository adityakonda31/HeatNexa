import { useState } from "react";
import { simulateIntervention } from "../../services/api";

export default function Simulator() {
  const [coolingCentres, setCoolingCentres] = useState(2);
  const [waterTankers, setWaterTankers] = useState(1);
  const [medicalTeams, setMedicalTeams] = useState(1);
  const [result, setResult] = useState(null);

  async function simulate() {
    const data = await simulateIntervention({
      wardPopulation: 48000,
      coolingCentres,
      waterTankers,
      medicalTeams
    });
    setResult(data);
  }

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>What-If Simulator</h1>
      </div>

      <div className="simulator-grid">
        <div className="panel">
          <h3>Ward 3 — Intervention</h3>

          <p className="muted">Current: Population exposed 48,000 · Risk CRITICAL</p>

          <label>Cooling Centres to Open</label>
          <input
            type="number"
            min="0"
            value={coolingCentres}
            onChange={(e) => setCoolingCentres(Number(e.target.value))}
          />

          <label>Water Tankers to Deploy</label>
          <input
            type="number"
            min="0"
            value={waterTankers}
            onChange={(e) => setWaterTankers(Number(e.target.value))}
          />

          <label>Medical Teams to Deploy</label>
          <input
            type="number"
            min="0"
            value={medicalTeams}
            onChange={(e) => setMedicalTeams(Number(e.target.value))}
          />

          <button className="primary-button" onClick={simulate}>
            Simulate Impact
          </button>
        </div>

        {result && (
          <div className="panel">
            <h3>Estimated Impact</h3>

            <div className="impact-number">
              ↓ {result.reduction}%
            </div>

            <p>Estimated Exposure Reduction</p>

            <div className="impact-comparison">
              <div>
                <span>BEFORE</span>
                <strong>{result.before.toLocaleString()}</strong>
              </div>
              <span className="impact-arrow">→</span>
              <div>
                <span>AFTER</span>
                <strong style={{ color: "#43e66f" }}>{result.after.toLocaleString()}</strong>
              </div>
            </div>

            <small className="muted" style={{ display: "block", marginTop: 15 }}>
              Modelled estimate for demonstration purposes.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
