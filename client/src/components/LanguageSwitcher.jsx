import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();

  const options = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" }
  ];

  return (
    <div className={`lang-switcher-container ${compact ? "lang-compact" : ""}`}>
      <Globe size={14} className="lang-icon" />
      <div className="lang-buttons">
        {options.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`lang-btn ${lang === opt.code ? "lang-btn-active" : ""}`}
            onClick={() => setLang(opt.code)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
