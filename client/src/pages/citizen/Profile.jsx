import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { calculateRisk } from "../../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const saved = localStorage.getItem("heatnexa-profile");
  const initial = saved
    ? JSON.parse(saved)
    : {
        age: 32,
        gender: "Female",
        occupation: "Outdoor Worker",
        pregnancy: false,
        conditions: []
      };

  const [profile, setProfile] = useState(initial);
  const [result, setResult] = useState(null);

  function update(key, value) {
    setProfile({ ...profile, [key]: value });
  }

  async function saveProfile() {
    const result = await calculateRisk(profile);
    setResult(result);
    localStorage.setItem("heatnexa-profile", JSON.stringify(profile));
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Personal Profile</h2>

      <p className="muted">
        Your profile helps us give you personalized recommendations.
      </p>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={profile.age}
          onChange={(e) => update("age", Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="gender-tabs">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              className={profile.gender === g ? "active-tab" : ""}
              onClick={() => update("gender", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Occupation</label>
        <select
          value={profile.occupation}
          onChange={(e) => update("occupation", e.target.value)}
        >
          <option>Indoor Worker</option>
          <option>Outdoor Worker</option>
          <option>Student</option>
          <option>Retired</option>
        </select>
      </div>

      <div className="form-group">
        <label>Pregnancy</label>
        <div className="gender-tabs">
          <button
            className={!profile.pregnancy ? "active-tab" : ""}
            onClick={() => update("pregnancy", false)}
          >
            No
          </button>
          <button
            className={profile.pregnancy ? "active-tab" : ""}
            onClick={() => update("pregnancy", true)}
          >
            Yes
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Health Conditions</label>
        {["Heart condition", "Diabetes", "Respiratory condition", "Kidney condition", "None"].map((c) => (
          <label className="checkbox-row" key={c}>
            <input
              type="checkbox"
              checked={profile.conditions?.includes(c)}
              onChange={(e) => {
                if (c === "None") {
                  update("conditions", e.target.checked ? ["None"] : []);
                } else {
                  const filtered = (profile.conditions || []).filter(
                    (x) => x !== "None" && x !== c
                  );
                  if (e.target.checked) filtered.push(c);
                  update("conditions", filtered);
                }
              }}
            />
            {c}
          </label>
        ))}
      </div>

      <button className="primary-button" onClick={saveProfile}>
        Save & Calculate Risk
      </button>

      {result && (
        <div className="result-box">
          <strong>Your personalized risk: {result.score}/100</strong>
          <p className={result.score >= 70 ? "critical" : result.score >= 50 ? "high" : "moderate"}>
            {result.level}
          </p>
        </div>
      )}
    </div>
  );
}
