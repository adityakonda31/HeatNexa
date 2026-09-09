import { useEffect, useState } from "react";
import { getWards } from "../../services/api";

export default function Dashboard() {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    getWards().then(setWards);
  }, []);

  const highRisk = wards.filter((ward) => ward.risk >= 70).length;
  const population = wards.reduce((sum, ward) => sum + ward.population, 0);

  return (
    <div className="authority-content">
      <div className="authority-header">
        <h1>Municipal Dashboard</h1>
        <span className="header-greeting">Good Morning, Admin</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Wards</span>
          <strong>{wards.length}</strong>
        </div>

        <div className="stat-card">
          <span>High Risk Wards</span>
          <strong className="stat-critical">{highRisk}</strong>
        </div>

        <div className="stat-card">
          <span>Population at Risk</span>
          <strong>{(population / 100000).toFixed(1)}L</strong>
        </div>

        <div className="stat-card">
          <span>Active Alerts</span>
          <strong>5</strong>
        </div>
      </div>

      <div className="panel">
        <h2>Ward Risk Overview</h2>

        {wards.map((ward) => (
          <div className="ward-row" key={ward.id}>
            <span>{ward.name}</span>

            <div className="ward-progress">
              <div style={{ width: `${ward.risk}%` }} />
            </div>

            <strong>{ward.risk}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
