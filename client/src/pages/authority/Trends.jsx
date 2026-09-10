import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { getAuthorityForecast } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { TrendingUp, Clock, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Trends() {
  const [data, setData] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    getAuthorityForecast().then(setData);
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <div>
          <h1>{t("trends")} & 7-Day Forecast</h1>
          <span className="header-greeting">Predictive Heat Wave Evolution · Ward 3 Focus</span>
        </div>
      </div>

      <div className="trends-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "20px" }}>
        <div className="panel" style={{ margin: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={18} color="var(--red)" /> Heat Risk Evolution (7-Day Projection)
            </h3>
            <span style={{ fontSize: "12px", color: "#888" }}>Model Confidence: 94%</span>
          </div>

          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#1a1a1a", border: "1px solid #444", borderRadius: 8 }}
                formatter={(val) => [`${val}/100`, "Risk Score"]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ff3b30"
                strokeWidth={4}
                dot={{ fill: "#ff3b30", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <h3 style={{ marginBottom: "16px" }}>Daily Breakdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {data.map((d, i) => (
              <div
                className="trend-day-row"
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 50px 50px",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "#161616",
                  borderRadius: "8px",
                  border: "1px solid #282828"
                }}
              >
                <span style={{ fontWeight: "600", fontSize: "13px" }}>{d.day}</span>
                <div className="ward-progress" style={{ height: "8px" }}>
                  <div style={{ width: `${d.score}%` }} />
                </div>
                <strong style={{ fontSize: "13px", color: d.score >= 80 ? "#ff3030" : d.score >= 60 ? "var(--orange)" : "var(--yellow)" }}>
                  {d.score}
                </strong>
                <span style={{ fontSize: "12px", color: "#888" }}>{d.temp}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        <div className="prediction-banner" style={{ margin: 0, display: "flex", alignItems: "center", gap: "16px" }}>
          <AlertTriangle size={36} color="var(--orange)" style={{ flexShrink: 0 }} />
          <div>
            <span>Predicted Peak Risk Exposure</span>
            <strong>Tomorrow · 1:00 PM – 4:00 PM (Score: 87/100)</strong>
            <small style={{ color: "#aaa", display: "block", marginTop: "4px" }}>
              Advisories to be issued before 10:00 AM to all outdoor labour contractors.
            </small>
          </div>
        </div>

        <div className="prediction-banner" style={{ margin: 0, borderColor: "#1a6b2a", display: "flex", alignItems: "center", gap: "16px" }}>
          <ShieldCheck size={36} color="var(--green)" style={{ flexShrink: 0 }} />
          <div>
            <span>Municipal Safe Operating Window</span>
            <strong style={{ color: "#43e66f" }}>Early Morning: 6:00 AM – 9:30 AM</strong>
            <small style={{ color: "#aaa", display: "block", marginTop: "4px" }}>
              Recommended window for construction work, market deliveries, and garbage collection.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
