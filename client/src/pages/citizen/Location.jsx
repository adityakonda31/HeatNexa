import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

export default function Location() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    state: "Goa",
    city: "Madgaon",
    ward: "Ward 3"
  });

  function save() {
    localStorage.setItem("heatnexa-location", JSON.stringify(location));
    alert("Location saved!");
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2><MapPin size={20} /> Select Your Location</h2>

      <p className="muted">
        Choose your location to receive localized heat-risk information.
      </p>

      <div className="form-group">
        <label>State</label>
        <select
          value={location.state}
          onChange={(e) => setLocation({ ...location, state: e.target.value })}
        >
          <option>Goa</option>
          <option>Maharashtra</option>
          <option>Delhi</option>
        </select>
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
        >
          <option>Madgaon</option>
          <option>Panaji</option>
        </select>
      </div>

      <div className="form-group">
        <label>Ward</label>
        <select
          value={location.ward}
          onChange={(e) => setLocation({ ...location, ward: e.target.value })}
        >
          <option>Ward 1</option>
          <option>Ward 2</option>
          <option>Ward 3</option>
          <option>Ward 4</option>
          <option>Ward 5</option>
        </select>
      </div>

      <button className="primary-button" onClick={save}>
        Use Current Location
      </button>
    </div>
  );
}
