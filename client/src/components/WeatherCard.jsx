import {
  Thermometer,
  Droplets,
  Wind,
  Sun
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translateSolar } from "../data/translations";

export default function WeatherCard({ weather }) {
  const { t } = useLanguage();
  if (!weather) return null;

  return (
    <div className="panel">
      <div className="section-title">
        <Sun size={18} />
        {t("weatherReport")}
      </div>

      <div className="weather-main">
        <Thermometer size={28} />

        <div>
          <strong>{weather.temperature}°C</strong>
          <span>{t("feelsLike")} {weather.feelsLike}°C</span>
        </div>
      </div>

      <div className="weather-grid">
        <div>
          <Droplets size={16} />
          <span>{t("humidity")}</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div>
          <Wind size={16} />
          <span>{t("wind")}</span>
          <strong>{weather.wind} km/h</strong>
        </div>

        <div>
          <Sun size={16} />
          <span>{t("solar")}</span>
          <strong>{translateSolar(weather.solar, t)}</strong>
        </div>
      </div>
    </div>
  );
}
