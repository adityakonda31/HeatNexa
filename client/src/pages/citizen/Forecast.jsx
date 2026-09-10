import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ShieldCheck, AlertOctagon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { getForecast } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

export default function Forecast() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [data, setData] = useState([]);

  useEffect(() => {
    getForecast().then(setData);
  }, []);

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><Calendar size={20} /> {t("forecast")}</h2>

      <div className="forecast-days">
        {data.map((d, i) => (
          <div
            className={`forecast-day ${d.score >= 80 ? "day-critical" : d.score >= 60 ? "day-high" : "day-moderate"}`}
            key={i}
          >
            <span>{d.day}</span>
            <strong>{d.score}</strong>
            <small style={{ color: "#aaa", fontSize: "10px" }}>{d.temp}°C</small>
          </div>
        ))}
      </div>

      <div className="panel chart-panel">
        <div className="section-title">{t("heatRiskTrend")}</div>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={data}>
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#ff3b30"
              strokeWidth={3}
              dot={{ fill: "#ff3b30", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="safe-time">
        <div className="safe-good">
          <small style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <ShieldCheck size={14} /> {t("bestTime")}
          </small>
          <strong>6 AM – 9 AM</strong>
        </div>

        <div className="safe-bad">
          <small style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <AlertOctagon size={14} /> {t("avoid")}
          </small>
          <strong>12 PM – 4 PM</strong>
        </div>
      </div>
    </div>
  );
}
