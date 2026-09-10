import { useState } from "react";
import { Send, CheckCircle, Bell, MessageSquare, Radio, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Alerts() {
  const [sent, setSent] = useState(false);
  const [target, setTarget] = useState("Outdoor Workers");
  const [severity, setSeverity] = useState("Critical");
  const { t } = useLanguage();

  function handleSend() {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("alerts")}</h1>
          <span className="header-greeting">Emergency Citizen Warning & Mass Broadcast Dispatch</span>
        </div>
      </div>

      <div className="alerts-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
        <div className="panel" style={{ margin: 0 }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Send size={18} color="var(--orange)" /> Broadcast Multi-Channel Alert
          </h3>

          <div className="form-group">
            <label>Target Audience</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              <option>Outdoor Workers (High Priority)</option>
              <option>Children & Schools</option>
              <option>Elderly & Care Homes</option>
              <option>Entire Ward 3 Population</option>
              <option>General Public (All Wards)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Warning Severity</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option>Critical (Red Alert — Immediate Danger)</option>
              <option>High (Orange Advisory — Elevated Stress)</option>
              <option>Moderate (Yellow Watch — Precautionary)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message Content</label>
            <textarea
              rows="4"
              defaultValue="Extreme heat expected tomorrow between 12 PM and 4 PM. Outdoor work is advised to pause. Visit nearby Madgaon Cooling Centres for emergency shelter."
            />
          </div>

          <div className="form-group">
            <label>Broadcast Channels</label>
            <div className="channel-options" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", background: "#161616", padding: "8px 10px", borderRadius: "6px" }}>
                <input type="checkbox" defaultChecked /> Push Notification (App)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", background: "#161616", padding: "8px 10px", borderRadius: "6px" }}>
                <input type="checkbox" defaultChecked /> SMS Emergency Cell
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", background: "#161616", padding: "8px 10px", borderRadius: "6px" }}>
                <input type="checkbox" defaultChecked /> WhatsApp Broadcast
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", background: "#161616", padding: "8px 10px", borderRadius: "6px" }}>
                <input type="checkbox" /> Public PA Loudspeakers
              </label>
            </div>
          </div>

          <button
            className="primary-button"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px" }}
            onClick={handleSend}
          >
            {sent ? (
              <>
                <CheckCircle size={18} /> Alert Dispatched Successfully (12,400 Recipients)
              </>
            ) : (
              <>
                <Send size={18} /> Send Broadcast Alert
              </>
            )}
          </button>
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <h3 style={{ marginBottom: "16px" }}>Recent Broadcast History</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="notification-card critical" style={{ margin: 0 }}>
              <div className="notification-icon">🔴</div>
              <div>
                <strong>Heat Alert — Outdoor Workers</strong>
                <p>Extreme heat expected tomorrow between 12 PM and 4 PM. Mandatory hydration breaks advised.</p>
                <small style={{ color: "#aaa" }}>Ward 3 · 10:24 AM · 9,700 SMS & Push delivered</small>
              </div>
            </div>

            <div className="notification-card warning" style={{ margin: 0 }}>
              <div className="notification-icon">🟠</div>
              <div>
                <strong>Hydration & Cooling Advisory</strong>
                <p>Increase water intake. 2 mobile water stations deployed near Madgaon Market.</p>
                <small style={{ color: "#aaa" }}>General Population · 8:00 AM · 28,000 citizens reached</small>
              </div>
            </div>

            <div className="notification-card" style={{ margin: 0, border: "1px solid #333", background: "#161616" }}>
              <div className="notification-icon">🟡</div>
              <div>
                <strong>School Timing Reschedule Notice</strong>
                <p>Afternoon outdoor sports and physical activities cancelled for all schools in Ward 2 & 3.</p>
                <small style={{ color: "#aaa" }}>Yesterday 4:30 PM · 32 Institutions notified</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
