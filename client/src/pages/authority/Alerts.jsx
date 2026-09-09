import { useState } from "react";

export default function Alerts() {
  const [sent, setSent] = useState(false);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Alert Management</h1>
      </div>

      <div className="alerts-grid">
        <div className="panel">
          <h3>Send Alert</h3>

          <label>Target Audience</label>
          <select>
            <option>Entire Ward</option>
            <option>Children</option>
            <option>Elderly</option>
            <option>Outdoor Workers</option>
            <option>General Population</option>
          </select>

          <label>Severity</label>
          <select>
            <option>Critical</option>
            <option>High</option>
            <option>Moderate</option>
          </select>

          <label>Message</label>
          <textarea
            rows="5"
            defaultValue="Extreme heat expected between 12 PM and 4 PM. Avoid prolonged outdoor exposure and take frequent cooling breaks."
          />

          <label>Channel</label>
          <div className="channel-options">
            <label><input type="checkbox" defaultChecked /> Push Notification</label>
            <label><input type="checkbox" defaultChecked /> SMS</label>
            <label><input type="checkbox" /> Email</label>
          </div>

          <button
            className="primary-button"
            onClick={() => setSent(true)}
          >
            {sent ? "Alert Sent ✓" : "Send Alert"}
          </button>
        </div>

        <div className="panel">
          <h3>Recent Alerts</h3>

          <div className="notification-card critical">
            <div className="notification-icon">🔴</div>
            <div>
              <strong>Heat Alert</strong>
              <p>Extreme heat expected tomorrow between 12 PM and 4 PM.</p>
              <small>Target: Outdoor Workers · 10:24 AM</small>
            </div>
          </div>

          <div className="notification-card warning">
            <div className="notification-icon">🟠</div>
            <div>
              <strong>Hydration Advisory</strong>
              <p>Increase water intake. High humidity expected throughout the day.</p>
              <small>Target: General Population · 8:00 AM</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
