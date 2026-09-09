import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Send } from "lucide-react";

function getAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("outside") || q.includes("bahar") || q.includes("go out")) {
    return "Today's safest outdoor window is approximately 6 AM to 9 AM. Avoid prolonged outdoor activity between 12 PM and 4 PM when heat risk is highest.";
  }

  if (q.includes("risk") || q.includes("score")) {
    return "Your current Heat Risk Score is 82/100, classified as Very High. This is based on current weather conditions and your personal profile.";
  }

  if (q.includes("hospital") || q.includes("doctor")) {
    return "The nearest listed hospital is City Hospital, approximately 1.4 km away. Contact: 0832-2700000.";
  }

  if (q.includes("cooling") || q.includes("cool")) {
    return "The nearest listed cooling centre is Madgaon Cooling Centre, approximately 650 metres away. Capacity: 200, Available: 72.";
  }

  if (q.includes("water") || q.includes("hydra") || q.includes("pani")) {
    return "During extreme heat, drink 2-3 litres of water daily. Carry water when outdoors. Avoid sugary and caffeinated drinks as they can increase dehydration.";
  }

  if (q.includes("dog") || q.includes("pet") || q.includes("animal")) {
    return "Keep pets in shade, provide fresh water, avoid hot pavements, and skip midday walks. Check the Animal Safety section for more details.";
  }

  if (q.includes("tomorrow") || q.includes("forecast")) {
    return "Tomorrow's predicted heat risk is 87/100 (Extreme). Peak risk expected between 1 PM – 4 PM. Plan outdoor activities before 10 AM.";
  }

  return "Based on current HeatNexa data, stay hydrated, reduce prolonged heat exposure, and check your personalized risk before going outdoors. Ask me about risk, safe times, hospitals, cooling centres, or precautions!";
}

export default function Assistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm the HeatNexa Assistant 🔥\n\nAsk me about heat risk, safe times, precautions, nearby facilities, or anything heat-related."
    }
  ]);

  function sendMessage() {
    if (!input.trim()) return;

    const question = input;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: getAnswer(question) }
    ]);
    setInput("");
  }

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  }

  return (
    <div className="mobile-page">
      <button className="back-button" onClick={() => navigate("/citizen")}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>AI Assistant</h2>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <button onClick={startVoice}>
          <Mic size={18} />
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask HeatNexa..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
