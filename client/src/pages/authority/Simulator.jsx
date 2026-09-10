import { useState, useEffect } from "react";
import { simulateIntervention } from "../../services/api";
import { FlaskConical, ArrowDown, Snowflake, Droplets, Stethoscope } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Simulator() {
  const [coolingCentres, setCoolingCentres] = useState(2);
  const [waterTankers, setWaterTankers] = useState(2);
  const [medicalTeams, setMedicalTeams] = useState(1);
  const [result, setResult] = useState(null);
  const { t } = useLanguage();

  async function runSimulation(c = coolingCentres, w = waterTankers, m = medicalTeams) {
    const data = await simulateIntervention({
      wardPopulation: 48000,
      coolingCentres: c,
      waterTankers: w,
      medicalTeams: m
    });
    setResult(data);
  }

  useEffect(() => {
    runSimulation(coolingCentres, waterTankers, medicalTeams);
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("simulator")}</h1>
          <span className="header-greeting">Predictive Impact Modelling for Resource Allocation · Ward 3</span>
        </div>
      </div>

      <div className="simulator-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
        <div className="panel" style={{ margin: 0 }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FlaskConical size={18} color="var(--yellow)" /> Intervention Resource Knobs
          </h3>

          <p className="muted" style={{ marginBottom: "20px" }}>
            Baseline: Ward 3 Exposed Population: <strong>48,000</strong> · Current Risk: <strong>84 (CRITICAL)</strong>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Cooling Centres */}
            <div style={{ background: "#161616", padding: "14px", borderRadius: "10px", border: "1px solid #282828" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                    <Snowflake size={16} color="#00b4d8" /> Cooling Centres Opened
                  </strong>
                  <small style={{ color: "#777" }}>Each centre shelters ~200-300 citizens/hr</small>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = Math.max(0, coolingCentres - 1);
                      setCoolingCentres(val);
                      runSimulation(val, waterTankers, medicalTeams);
                    }}
                  >
                    -
                  </button>
                  <strong style={{ fontSize: "18px", minWidth: "24px", textAlign: "center" }}>{coolingCentres}</strong>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = coolingCentres + 1;
                      setCoolingCentres(val);
                      runSimulation(val, waterTankers, medicalTeams);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Water Tankers */}
            <div style={{ background: "#161616", padding: "14px", borderRadius: "10px", border: "1px solid #282828" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                    <Droplets size={16} color="var(--orange)" /> Mobile Water Tankers Deployed
                  </strong>
                  <small style={{ color: "#777" }}>Free chilled water distribution points</small>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = Math.max(0, waterTankers - 1);
                      setWaterTankers(val);
                      runSimulation(coolingCentres, val, medicalTeams);
                    }}
                  >
                    -
                  </button>
                  <strong style={{ fontSize: "18px", minWidth: "24px", textAlign: "center" }}>{waterTankers}</strong>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = waterTankers + 1;
                      setWaterTankers(val);
                      runSimulation(coolingCentres, val, medicalTeams);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Medical Teams */}
            <div style={{ background: "#161616", padding: "14px", borderRadius: "10px", border: "1px solid #282828" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
                    <Stethoscope size={16} color="var(--red)" /> Emergency Medical Triage Units
                  </strong>
                  <small style={{ color: "#777" }}>On-site heat exhaustion diagnosis & ORS</small>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = Math.max(0, medicalTeams - 1);
                      setMedicalTeams(val);
                      runSimulation(coolingCentres, waterTankers, val);
                    }}
                  >
                    -
                  </button>
                  <strong style={{ fontSize: "18px", minWidth: "24px", textAlign: "center" }}>{medicalTeams}</strong>
                  <button
                    type="button"
                    className="icon-button"
                    style={{ width: "32px", height: "32px", borderRadius: "8px" }}
                    onClick={() => {
                      const val = medicalTeams + 1;
                      setMedicalTeams(val);
                      runSimulation(coolingCentres, waterTankers, val);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className="primary-button"
            style={{ marginTop: "20px" }}
            onClick={() => runSimulation(coolingCentres, waterTankers, medicalTeams)}
          >
            Re-calculate Modelled Impact
          </button>
        </div>

        {result && (
          <div className="panel" style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginBottom: "12px" }}>Predicted Vulnerability Reduction</h3>

              <div
                className="impact-number"
                style={{
                  fontSize: "56px",
                  fontWeight: "900",
                  color: "#43e66f",
                  margin: "12px 0 6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <ArrowDown size={44} />
                {result.reduction}%
              </div>

              <p style={{ color: "#43e66f", fontWeight: "700", fontSize: "15px", margin: "0 0 16px" }}>
                Estimated Population Heat Stress Reduction
              </p>

              <div
                className="impact-comparison"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 40px 1fr",
                  alignItems: "center",
                  background: "#161616",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #282828",
                  textAlign: "center"
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", color: "#888", display: "block" }}>UNPROTECTED</span>
                  <strong style={{ fontSize: "22px", color: "var(--red)" }}>{result.before.toLocaleString()}</strong>
                </div>

                <span style={{ fontSize: "22px", color: "#888" }}>→</span>

                <div>
                  <span style={{ fontSize: "11px", color: "#888", display: "block" }}>AFTER MEASURES</span>
                  <strong style={{ fontSize: "22px", color: "#43e66f" }}>{result.after.toLocaleString()}</strong>
                </div>
              </div>

              <div style={{ marginTop: "16px", padding: "10px 12px", background: "rgba(67, 230, 111, 0.08)", borderRadius: "8px", border: "1px solid rgba(67, 230, 111, 0.25)", fontSize: "12px", color: "#ddd" }}>
                ✨ <strong>Net Protective Gain:</strong> An estimated <strong>{(result.before - result.after).toLocaleString()}</strong> citizens protected from dangerous physiological heat strain.
              </div>
            </div>

            <small className="muted" style={{ display: "block", marginTop: "20px", textAlign: "center" }}>
              Based on empirical NDMA Heat Action Plan mitigation coefficients.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
