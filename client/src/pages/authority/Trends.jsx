import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getAuthorityForecast } from "../../services/api";

export default function Trends() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAuthorityForecast().then(setData);
  }, []);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Trends & 7-Day Prediction</h1>
        <span className="header-greeting">Good Morning, Admin</span>
      </div>

      <div className="trends-grid">
        <div className="panel">
          <h3>Heat Risk Trend — Ward 3</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ff3b30"
                strokeWidth={4}
                dot={{ fill: "#ff3b30", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>7-Day Forecast</h3>
          {data.map((d, i) => (
            <div className="trend-day-row" key={i}>
              <span>{d.day}</span>
              <div className="ward-progress">
                <div style={{ width: `${d.score}%` }} />
              </div>
              <strong className={d.score >= 80 ? "critical" : d.score >= 60 ? "high" : "moderate"}>
                {d.score}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="prediction-banner">
        <span>Predicted Peak Risk</span>
        <strong>Tomorrow · 1 PM – 4 PM</strong>
      </div>

      <div className="prediction-banner" style={{ borderColor: "#1a6b2a" }}>
        <span>Safe Window</span>
        <strong style={{ color: "#43e66f" }}>6 AM – 9 AM</strong>
      </div>
    </div>
  );
}
