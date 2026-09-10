import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Send, Volume2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const answerDict = {
  en: {
    greeting: "Hi! I'm the HeatNexa Assistant 🔥\n\nAsk me about heat risk, safe times, precautions, nearby facilities, or anything heat-related.",
    safeTime: "Today's safest outdoor window is approximately 6 AM to 9 AM. Avoid prolonged outdoor activity between 12 PM and 4 PM when heat risk is highest.",
    risk: "Your current Heat Risk Score is 82/100, classified as Very High. This is based on current weather conditions and your personal profile.",
    hospital: "The nearest listed hospital is City Hospital, approximately 1.4 km away. Contact: 0832-2700000.",
    cooling: "The nearest listed cooling centre is Madgaon Cooling Centre, approximately 650 metres away. Capacity: 200, Available: 72.",
    water: "During extreme heat, drink 2-3 litres of water daily. Carry water when outdoors. Avoid sugary and caffeinated drinks as they can increase dehydration.",
    animal: "Keep pets in shade, provide fresh water, avoid hot pavements, and skip midday walks. Check the Animal Safety section for more details.",
    forecast: "Tomorrow's predicted heat risk is 87/100 (Extreme). Peak risk expected between 1 PM – 4 PM. Plan outdoor activities before 10 AM.",
    default: "Based on current HeatNexa data, stay hydrated, reduce prolonged heat exposure, and check your personalized risk before going outdoors. Ask me about risk, safe times, hospitals, cooling centres, or precautions!"
  },
  hi: {
    greeting: "नमस्ते! मैं HeatNexa AI सहायक हूँ 🔥\n\nगर्मी जोखिम, सुरक्षित समय, सावधानियाँ, अस्पताल या कूलिंग सेंटर के बारे में मुझसे पूछें।",
    safeTime: "आज बाहर जाने का सबसे सुरक्षित समय सुबह 6 बजे से 9 बजे तक है। दोपहर 12 बजे से 4 बजे के बीच कड़ी धूप से बचें।",
    risk: "आपका वर्तमान हीट रिस्क स्कोर 82/100 है, जो 'बहुत अधिक' (Very High) श्रेणी में आता है।",
    hospital: "निकटतम अस्पताल 'सिटी हॉस्पिटल' है, जो 1.4 किमी दूर है। फ़ोन: 0832-2700000।",
    cooling: "निकटतम कूलिंग सेंटर 'मडगांव कूलिंग सेंटर' है (650 मीटर दूर)। उपलब्ध क्षमता: 72।",
    water: "अत्यधिक गर्मी में रोज़ाना 2 से 3 लीटर पानी पिएं। बाहर जाते समय पानी साथ रखें और कैफीन युक्त पेय से बचें।",
    animal: "पालतू जानवरों को छाया में रखें, ताज़ा पानी दें, दोपहर में गर्म सड़कों पर न टहलाएं।",
    forecast: "कल का अनुमानित हीट रिस्क 87/100 (अत्यधिक) है। दोपहर 1 से 4 बजे तक विशेष सतर्कता बरतें।",
    default: "HeatNexa के अनुसार, पर्याप्त पानी पिएं, धूप से बचें और बाहर जाने से पहले अपना जोखिम अवश्य जांचें।"
  },
  mr: {
    greeting: "नमस्कार! मी HeatNexa AI सहाय्यक आहे 🔥\n\nउष्णता धोका, सुरक्षित वेळ, खबरदारी, रुग्णालय किंवा कूलिंग सेंटरबद्दल विचारा.",
    safeTime: "आज बाहेर पडण्यासाठी सर्वात सुरक्षित वेळ सकाळी 6 ते 9 वाजेपर्यंत आहे. दुपारी 12 ते 4 दरम्यान तीव्र उन्हात जाणे टाळा.",
    risk: "तुमचा सध्याचा उष्णता धोका स्कोर 82/100 आहे, जो 'खूप जास्त' (Very High) पातळीवर आहे.",
    hospital: "जवळचे रुग्णालय 'सिटी हॉस्पिटल' आहे (1.4 किमी अंतरावर). संपर्क: 0832-2700000.",
    cooling: "जवळचे कूलिंग सेंटर 'मडगाव कूलिंग सेंटर' आहे (650 मीटर अंतरावर). उपलब्ध जागा: 72.",
    water: "तीव्र उष्णतेमध्ये दररोज किमान 2 ते 3 लिटर पाणी प्या. बाहेर पडताना पाण्याची बाटली सोबत ठेवा.",
    animal: "पाळीव प्राण्यांना सावलीत ठेवा, ताजे पाणी द्या आणि दुपारच्या वेळी गरम रस्त्यांवर चालवू नका.",
    forecast: "उद्याचा अंदाजित उष्णता धोका 87/100 (अत्यंत तीव्र) आहे. दुपारच्या वेळेत विशेष काळजी घ्या.",
    default: "HeatNexa नुसार, भरपूर पाणी प्या, तीव्र उष्णतेपासून स्वतःचा बचाव करा आणि बाहेर पडण्यापूर्वी धोका तपासा."
  }
};

function getAnswerByLang(question, currentLang) {
  const q = question.toLowerCase();
  const dict = answerDict[currentLang] || answerDict.en;

  if (q.includes("outside") || q.includes("bahar") || q.includes("बाहर") || q.includes("बाहेर") || q.includes("go out") || q.includes("safe time") || q.includes("time")) {
    return dict.safeTime;
  }
  if (q.includes("risk") || q.includes("score") || q.includes("धोका") || q.includes("जोखिम")) {
    return dict.risk;
  }
  if (q.includes("hospital") || q.includes("doctor") || q.includes("अस्पताल") || q.includes("रुग्णालय")) {
    return dict.hospital;
  }
  if (q.includes("cooling") || q.includes("cool") || q.includes("कूलिंग")) {
    return dict.cooling;
  }
  if (q.includes("water") || q.includes("hydra") || q.includes("pani") || q.includes("पानी")) {
    return dict.water;
  }
  if (q.includes("dog") || q.includes("pet") || q.includes("animal") || q.includes("जानवर") || q.includes("प्राणी")) {
    return dict.animal;
  }
  if (q.includes("tomorrow") || q.includes("forecast") || q.includes("kal") || q.includes("कल") || q.includes("उद्या")) {
    return dict.forecast;
  }

  return dict.default;
}

export default function Assistant() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: answerDict[lang]?.greeting || answerDict.en.greeting
    }
  ]);

  function speakText(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === "hi") {
      utterance.lang = "hi-IN";
    } else if (lang === "mr") {
      utterance.lang = "mr-IN";
    } else {
      utterance.lang = "en-IN";
    }
    window.speechSynthesis.speak(utterance);
  }

  function sendMessage(customText) {
    const question = customText || input;
    if (!question.trim()) return;

    const reply = getAnswerByLang(question, lang);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: reply }
    ]);
    setInput("");
    speakText(reply);
  }

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    if (lang === "hi") {
      recognition.lang = "hi-IN";
    } else if (lang === "mr") {
      recognition.lang = "mr-IN";
    } else {
      recognition.lang = "en-IN";
    }

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  return (
    <div className="mobile-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <button className="back-button" onClick={() => navigate("/citizen")}>
          <ArrowLeft size={18} /> {t("back")}
        </button>
        <LanguageSwitcher compact />
      </div>

      <h2>{t("assistant")}</h2>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
          >
            <div style={{ whiteSpace: "pre-line" }}>{message.text}</div>
            {message.role === "assistant" && (
              <button
                type="button"
                className="speak-btn"
                onClick={() => speakText(message.text)}
                title="Speak / बोला"
              >
                <Volume2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <button
          type="button"
          onClick={startVoice}
          className={isListening ? "mic-active" : ""}
          title={isListening ? t("listening") : t("voiceSearch")}
        >
          <Mic size={18} />
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? t("listening") : t("askAssistant")}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button type="button" onClick={() => sendMessage()}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
