import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
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
        <Logo />

        <p className="login-tagline">From Prediction to Protection — Together.</p>

        {!mode && (
          <>
            <button
              className="primary-button"
              onClick={() => login("citizen")}
            >
              Citizen Login
            </button>

            <button
              className="outline-button full"
              onClick={() => setMode("authority")}
            >
              Municipal Authority Login
            </button>

            <div className="demo-hint">
              <small>SIH Demonstration Prototype</small>
            </div>
          </>
        )}

        {mode === "authority" && (
          <>
            <div className="form-group">
              <label>Email / Username</label>
              <input
                type="email"
                placeholder="admin@heatnexa.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
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
              Login
            </button>

            <button
              className="outline-button full"
              onClick={() => setMode(null)}
            >
              ← Back
            </button>

            <div className="demo-hint">
              <small>Demo: admin@heatnexa.demo / any password</small>
            </div>
          </>
        )}

        <div className="login-footer">
          <small>Your Safety. Our Priority.</small>
        </div>
      </div>
    </div>
  );
}
