import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get("https://mostxfull-unitask-pfe-projects-management.hf.space/bot/chat", {
        params: { prompt: message },
      });
      setChatHistory([...chatHistory, { role: "user", content: message }, { role: "bot", content: response.data }]);
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
        <div className="mb-4 h-80 overflow-y-auto p-4 border border-gray-300 rounded">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-gray-200"}`}>
              <strong>{msg.role === "user" ? "Vous:" : "Bot:"}</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Posez une question..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}