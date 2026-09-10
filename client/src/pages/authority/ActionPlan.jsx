import { useState } from "react";
import { CheckCircle2, ShieldAlert, Send, Building, Droplet, UserCheck, Stethoscope } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ActionPlan() {
  const [approved, setApproved] = useState(false);
  const { t } = useLanguage();

  const [actions, setActions] = useState([
    { label: "Open 2 Additional Municipal Cooling Centres (Madgaon Community Hall)", checked: true, impact: "Reduces peak thermal stress for 400 citizens/hr" },
    { label: "Deploy 3 Potable Water Tankers to Labour Intensive Construction Hubs", checked: true, impact: "Ensures hydration for 2,500+ workers" },
    { label: "Broadcast Priority Heat Warnings to Registered Outdoor Workers", checked: true, impact: "Reaches 9,700 registered workers via SMS" },
    { label: "Notify Hospicio Hospital & District Clinics for ORS & Heat Stroke Prep", checked: true, impact: "Pre-allocates 50 cooling beds & IV fluids" },
    { label: "Mandate Work Hour Rescheduling (Pause outdoor labour 12 PM – 4 PM)", checked: true, impact: "Enforces municipal labour safety circular" },
    { label: "Deploy Rapid Mobile Medical Triage Team to Ward 3 Market Area", checked: false, impact: "Provides on-site vitals checking and hydration" }
  ]);

  function toggleAction(index) {
    const updated = [...actions];
    updated[index].checked = !updated[index].checked;
    setActions(updated);
  }

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("actionPlan")}</h1>
          <span className="header-greeting">Emergency Heat Action Plan Formulation · Ward 3 Response</span>
        </div>
      </div>

      <div className="action-plan-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
        <div className="panel" style={{ margin: 0 }}>
          <div className="action-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ margin: 0 }}>Ward 3 — High Heat Crisis Response</h2>
              <small style={{ color: "#aaa" }}>Population: 48,000 · Outdoor Labour: 9,700</small>
            </div>
            <span className="risk-badge extreme">CRITICAL (84/100)</span>
          </div>

          <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--orange)" }}>
            Recommended Interventions (NDMA Heat Action Protocol)
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {actions.map((action, i) => (
              <label
                className="checkbox-row"
                key={action.label}
                onClick={(e) => {
                  e.preventDefault();
                  toggleAction(i);
                }}
                style={{
                  border: action.checked ? "1px solid var(--orange)" : "1px solid #333",
                  background: action.checked ? "rgba(255, 122, 0, 0.06)" : "#161616",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={action.checked}
                  onChange={() => {}}
                  style={{ marginTop: "3px" }}
                />
                <div>
                  <strong style={{ fontSize: "13.5px", color: "#fff", display: "block" }}>{action.label}</strong>
                  <span style={{ fontSize: "11.5px", color: "#888" }}>{action.impact}</span>
                </div>
              </label>
            ))}
          </div>

          <button
            className="primary-button"
            style={{ marginTop: "20px", background: approved ? "linear-gradient(90deg, #27ae60, #2ecc71)" : undefined }}
            onClick={() => setApproved(true)}
          >
            {approved ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <CheckCircle2 size={18} /> Action Plan Approved & Municipal Orders Dispatched
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <ShieldAlert size={18} /> Approve & Dispatch Ward 3 Action Plan
              </span>
            )}
          </button>

          {approved && (
            <div style={{ marginTop: "14px", padding: "12px", background: "rgba(67, 230, 111, 0.1)", border: "1px solid #43e66f", borderRadius: "8px", color: "#43e66f", fontSize: "12.5px", textAlign: "center" }}>
              ✓ Directives issued to Municipal Health Officers, PWD Water Works, and Labour Inspectors.
            </div>
          )}
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <h3 style={{ marginBottom: "14px" }}>Operational Logistics</h3>

          <div className="form-group">
            <label>Emergency Cooling Centres to Open</label>
            <input type="number" defaultValue="2" min="1" max="10" />
            <small style={{ color: "#777" }}>Madgaon Sports Complex & Community Hall</small>
          </div>

          <div className="form-group">
            <label>Water Tankers to Route</label>
            <input type="number" defaultValue="3" min="1" max="15" />
            <small style={{ color: "#777" }}>Assigned to Market Road & Industrial Estate</small>
          </div>

          <div className="form-group">
            <label>Priority Broadcast Recipient Group</label>
            <select>
              <option>Ward 3 Outdoor Labour & Construction Sites</option>
              <option>Schools, Anganwadis & Daycares</option>
              <option>Senior Citizen Care Centers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dispatch Channels</label>
            <div className="channel-options">
              <label><input type="checkbox" defaultChecked /> SMS Emergency Gateway</label>
              <label><input type="checkbox" defaultChecked /> HeatNexa Citizen App Push</label>
              <label><input type="checkbox" defaultChecked /> WhatsApp Municipal Broadcast</label>
            </div>
          </div>

          <button
            className="outline-button full"
            style={{ marginTop: "18px", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            onClick={() => alert("Direct dispatch alert sent to field teams!")}
          >
            <Send size={16} /> Send Logistics Alert to Field Teams
          </button>
        </div>
      </div>
    </div>
  );
}
