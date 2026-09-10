import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { Shield, Building2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);

  function login(role) {
    localStorage.setItem("heatnexa-role", role);
    if (role === "citizen") {
      navigate("/citizen");
    } else {
      navigate("/authority");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
          <LanguageSwitcher compact />
        </div>

        <Logo />

        <div style={{ marginTop: "24px" }}>
          {!mode && (
            <>
              <button
                className="primary-button"
                onClick={() => login("citizen")}
              >
                <Shield size={18} />
                {t("citizenLogin")}
              </button>

              <button
                className="authority-login-button"
                onClick={() => setMode("authority")}
              >
                <Building2 size={18} />
                {t("authorityLogin")}
              </button>
            </>
          )}

          {mode === "authority" && (
            <>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Email / Username</label>
                <input
                  type="email"
                  placeholder="admin@heatnexa.demo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="primary-button"
                onClick={() => login("authority")}
              >
                {t("login")}
              </button>

              <button
                className="outline-button full"
                onClick={() => setMode(null)}
              >
                ← {t("back")}
              </button>

              <div className="demo-hint" style={{ marginTop: "12px" }}>
                <small>Demo: admin@heatnexa.demo / any password</small>
              </div>
            </>
          )}
        </div>

        <div className="login-footer">
          <small>Your Safety. Our Priority.</small>
        </div>
      </div>
    </div>
  );
}
