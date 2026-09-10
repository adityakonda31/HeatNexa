import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { calculateRisk } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { translateLevel } from "../../data/translations";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
  const [savedSuccess, setSavedSuccess] = useState(false);

  function update(key, value) {
    setProfile({ ...profile, [key]: value });
  }

  async function saveProfile() {
    const res = await calculateRisk(profile);
    setResult(res);
    localStorage.setItem("heatnexa-profile", JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <h2><User size={20} /> {t("profile")}</h2>

      <p className="muted">
        {t("profileHelp")}
      </p>

      <div className="form-group">
        <label>{t("age")}</label>
        <input
          type="number"
          value={profile.age}
          onChange={(e) => update("age", Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>{t("gender")}</label>
        <div className="gender-tabs">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              type="button"
              className={profile.gender === g ? "active-tab" : ""}
              onClick={() => update("gender", g)}
            >
              {t(g.toLowerCase()) || g}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>{t("occupation")}</label>
        <select
          value={profile.occupation}
          onChange={(e) => update("occupation", e.target.value)}
        >
          <option value="Indoor Worker">{t("indoorWorker")}</option>
          <option value="Outdoor Worker">{t("outdoorWorker")}</option>
          <option value="Student">{t("student")}</option>
          <option value="Retired">{t("retired")}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t("pregnancy")}</label>
        <div className="gender-tabs">
          <button
            type="button"
            className={!profile.pregnancy ? "active-tab" : ""}
            onClick={() => update("pregnancy", false)}
          >
            {t("no")}
          </button>
          <button
            type="button"
            className={profile.pregnancy ? "active-tab" : ""}
            onClick={() => update("pregnancy", true)}
          >
            {t("yes")}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>{t("healthConditions")}</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Heart condition", "Diabetes", "Respiratory condition", "Kidney condition", "None"].map((c) => {
            const isChecked = profile.conditions?.includes(c);
            return (
              <label
                className="checkbox-row"
                key={c}
                style={{
                  border: isChecked ? "1px solid var(--orange)" : "1px solid #333",
                  background: isChecked ? "rgba(255, 122, 0, 0.08)" : "#151515",
                  transition: "all 0.2s"
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
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
            );
          })}
        </div>
      </div>

      <button className="primary-button" onClick={saveProfile}>
        {t("saveProfile")}
      </button>

      {savedSuccess && (
        <div style={{ marginTop: "12px", padding: "10px 14px", background: "rgba(67, 230, 111, 0.12)", border: "1px solid #43e66f", borderRadius: "8px", color: "#43e66f", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <CheckCircle size={16} /> {t("profileSaved")}
        </div>
      )}

      {result && (
        <div className="result-box" style={{ marginTop: "16px" }}>
          <strong>{t("personalizedRisk")} {result.score}/100</strong>
          <p className={result.score >= 70 ? "critical" : result.score >= 50 ? "high" : "moderate"}>
            {translateLevel(result.level, t)}
          </p>
        </div>
      )}
    </div>
  );
}
