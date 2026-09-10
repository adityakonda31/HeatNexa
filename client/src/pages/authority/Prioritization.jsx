import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWards } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { BarChart3, ArrowRight, ShieldAlert } from "lucide-react";

export default function Prioritization() {
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    getWards().then((data) => {
      const sorted = [...data].sort(
        (a, b) => (b.risk + b.vulnerability) - (a.risk + a.vulnerability)
      );
      setWards(sorted);
    });
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("wardAnalytics")} & Prioritization Matrix</h1>
          <span className="header-greeting">Algorithmic Resource Allocation Ranking based on Risk & Vulnerability Index</span>
        </div>
      </div>

      <div className="table-card" style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#161616" }}>
              <th style={{ padding: "16px 20px" }}>Rank</th>
              <th style={{ padding: "16px 20px" }}>Ward Identification</th>
              <th style={{ padding: "16px 20px" }}>Composite Heat Risk</th>
              <th style={{ padding: "16px 20px" }}>Vulnerability Index</th>
              <th style={{ padding: "16px 20px" }}>Population Exposed</th>
              <th style={{ padding: "16px 20px" }}>Intervention Priority</th>
              <th style={{ padding: "16px 20px", textAlign: "right" }}>Operation</th>
            </tr>
          </thead>

          <tbody>
            {wards.map((ward, index) => {
              const priority = (ward.risk + ward.vulnerability) / 2;

              return (
                <tr
                  key={ward.id}
                  style={{
                    background: index === 0 ? "rgba(255, 34, 34, 0.05)" : undefined,
                    borderBottom: "1px solid #222"
                  }}
                >
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontWeight: "800", color: index === 0 ? "var(--red)" : index === 1 ? "var(--orange)" : "#888" }}>
                      #{index + 1}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <strong style={{ fontSize: "14px" }}>{ward.name}</strong>
                    <small style={{ color: "#777", display: "block" }}>Goa, Madgaon</small>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="ward-progress" style={{ width: "90px", height: "8px" }}>
                        <div style={{ width: `${ward.risk}%` }} />
                      </div>
                      <strong style={{ color: ward.risk >= 70 ? "var(--red)" : "var(--orange)", fontSize: "14px" }}>
                        {ward.risk}/100
                      </strong>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontWeight: "600", color: "#ddd" }}>{ward.vulnerability}/100</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span>{ward.population.toLocaleString()} citizens</span>
                    <small style={{ color: "#777", display: "block" }}>{ward.outdoorWorkers.toLocaleString()} outdoor labour</small>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      className={`risk-badge ${priority >= 75 ? "extreme" : priority >= 60 ? "very-high" : priority >= 45 ? "high" : "moderate"}`}
                    >
                      {priority >= 75 ? "🔴 CRITICAL #1" :
                       priority >= 60 ? "🟠 HIGH #2" :
                       priority >= 45 ? "🟡 ELEVATED" : "🟢 MODERATE"}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <button
                      className="outline-button"
                      style={{ fontSize: "11px", padding: "6px 12px" }}
                      onClick={() => navigate("/authority/action-plan")}
                    >
                      Deploy Plan →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
