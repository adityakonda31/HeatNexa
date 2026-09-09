import {
  Thermometer,
  Droplets,
  Wind,
  Sun
} from "lucide-react";

export default function WeatherCard({ weather }) {
  if (!weather) return null;
  return (
    <div className="panel">
      <div className="section-title">
        <Sun size={18} />
        Weather Report
      </div>

      <div className="weather-main">
        <Thermometer size={28} />

        <div>
          <strong>{weather.temperature}°C</strong>
          <span>Feels like {weather.feelsLike}°C</span>
        </div>
      </div>

      <div className="weather-grid">
        <div>
          <Droplets size={16} />
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div>
          <Wind size={16} />
          <span>Wind</span>
          <strong>{weather.wind} km/h</strong>
        </div>

        <div>
          <Sun size={16} />
          <span>Solar</span>
          <strong>{weather.solar}</strong>
        </div>
      </div>
    </div>
  );
}
