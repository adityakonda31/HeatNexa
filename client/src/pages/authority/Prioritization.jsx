import { useEffect, useState } from "react";
import { getWards } from "../../services/api";

export default function Prioritization() {
  const [wards, setWards] = useState([]);

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
        <h1>Ward Risk Prioritization</h1>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Ward</th>
              <th>Risk</th>
              <th>Vulnerability</th>
              <th>Population</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {wards.map((ward, index) => {
              const priority = (ward.risk + ward.vulnerability) / 2;

              return (
                <tr key={ward.id}>
                  <td>#{index + 1}</td>
                  <td>{ward.name}</td>
                  <td>{ward.risk}</td>
                  <td>{ward.vulnerability}</td>
                  <td>{ward.population.toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        priority >= 80 ? "critical" :
                        priority >= 60 ? "high" : "moderate"
                      }
                    >
                      {priority >= 80 ? "🔴 CRITICAL" :
                       priority >= 60 ? "🟠 HIGH" :
                       priority >= 40 ? "🟡 MODERATE" : "🟢 LOW"}
                    </span>
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
