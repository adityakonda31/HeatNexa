import { useState } from "react";

export default function ActionPlan() {
  const [approved, setApproved] = useState(false);

  const actions = [
    { label: "Open Cooling Centre", checked: true },
    { label: "Deploy Water Tanker", checked: true },
    { label: "Alert Outdoor Workers", checked: true },
    { label: "Notify Hospitals", checked: true },
    { label: "Shift Outdoor Work Hours", checked: true },
    { label: "Deploy Medical Team", checked: false }
  ];

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Action Plan</h1>
      </div>

      <div className="action-plan-grid">
        <div className="panel">
          <div className="action-header">
            <h2>Ward 3</h2>
            <span className="critical">CRITICAL</span>
          </div>

          <h3>Recommended Actions</h3>

          {actions.map((action) => (
            <label className="checkbox-row" key={action.label}>
              <input type="checkbox" defaultChecked={action.checked} />
              {action.label}
            </label>
          ))}

          <button
            className="primary-button"
            onClick={() => setApproved(true)}
          >
            {approved ? "Plan Approved ✓" : "Approve Plan"}
          </button>

          {approved && (
            <p style={{ color: "#43e66f", marginTop: 10, textAlign: "center" }}>
              ✓ Action plan approved and dispatched.
            </p>
          )}
        </div>

        <div className="panel">
          <h3>Send Alert</h3>

          <div className="form-group">
            <label>Open Cooling Centres</label>
            <input type="number" defaultValue="2" />
          </div>

          <div className="form-group">
            <label>Target Audience</label>
            <select>
              <option>Entire Ward</option>
              <option>Children</option>
              <option>Outdoor Workers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Channel</label>
            <div className="channel-options">
              <label><input type="checkbox" defaultChecked /> Push Notification</label>
              <label><input type="checkbox" /> SMS</label>
              <label><input type="checkbox" /> Email</label>
            </div>
          </div>

          <button className="outline-button full">Send Alert</button>
        </div>
      </div>
    </div>
  );
}
