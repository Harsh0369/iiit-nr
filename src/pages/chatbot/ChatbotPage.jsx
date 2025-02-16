import { useState, useEffect } from "react";
import loader from "../../../public/loader-1.gif";
import { FaPaperPlane, FaMicrophone, FaChevronDown } from "react-icons/fa";
import { Listbox } from "@headlessui/react";
import axios from "axios";

export default function ChatbotPage() {
  const languages = [
    { id: 1, name: "English", code: "en-US" },
    { id: 2, name: "Hindi", code: "hi-IN" },
    { id: 3, name: "Telugu", code: "te-IN" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [chatSessions, setChatSessions] = useState([]); // Store previous chats
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const speakMessage = (text, languageCode) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    window.speechSynthesis.speak(utterance);
  };

  async function fetchMessages(text, lang) {
    try {
      const response = await axios.post(
        "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/chatbot/chat",
        {
          message: { text: text },
          language: { name: lang.name },
        }
      );
      return response.data.message.response;
    } catch (error) {
      console.error("Error fetching message:", error);
      return "Error communicating with chatbot.";
    }
  }

  async function sendMessage() {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);
      const response = await fetchMessages(userMessage.text, selectedLanguage);
      const aiMessage = { text: response, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
      speakMessage(aiMessage.text, selectedLanguage.code);
    }
  }

  const startListening = (language = "en-US") => {
    const recognitionInstance = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognitionInstance.lang = language;
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const stopListening = async () => {
    if (recognition) {
      recognition.stop();
      console.log("Recording stopped.");
      sendMessage();
    } else {
      sendMessage();
    }
  };

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  // Function to start a new chat
  const startNewChat = () => {
    if (messages.length > 0) {
      // Save the current chat session before resetting
      setChatSessions((prevSessions) => [
        {
          id: prevSessions.length + 1,
          messages: messages,
          title: messages[0]?.text || "Untitled Chat",
        },
        ...prevSessions,
      ]);
    }
    setMessages([]); // Clear current chat
  };

  return (
    <div className="flex h-screen bg-white text-black max-w-screen">
      {/* Sidebar */}
      <div className="relative w-1/4 bg-gray-100 p-4 border-r border-gray-300 mt-16">
        <h2 className="text-xl font-semibold mb-4 mt-2 bg-blue-500 p-2 rounded-lg text-white">Chat History</h2>
        <ul className="space-y-2">
          {chatSessions.map((session, index) => (
            <li
              key={index}
              className="p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              onClick={() => setMessages(session.messages)} // Load previous chat
            >
              {session.title}
            </li>
          ))}
        </ul>
        <div className="w-full bottom-1 absolute -ml-4 p-4">
          <button
            className="bg-blue-500 p-2 w-full rounded-lg hover:bg-blue-400 transition-transform transform hover:scale-105 text-white"
            onClick={startNewChat}
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col justify-end p-2 mt-16">
        <div className="w-full space-y-4 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && <img src={loader} alt="" className="h-7" />}
        </div>

        {/* Input Section */}
        <div className="w-full flex items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-1">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-500"
            placeholder="Type your query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
            <div className="relative ml-3">
              <Listbox.Button className="flex items-center text-gray-600 hover:text-black focus:outline-none">
                <span className="mr-2">{selectedLanguage.name}</span>
                <FaChevronDown size={12} />
              </Listbox.Button>
              <Listbox.Options className="absolute bottom-full mb-2 w-32 bg-gray-200 border border-gray-300 rounded-lg shadow-lg focus:outline-none">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    value={language}
                    className={({ active }) =>
                      `p-2 cursor-pointer ${
                        active ? "bg-gray-300 text-black" : "text-gray-600"
                      }`
                    }
                  >
                    {language.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <button
            onClick={() => startListening(selectedLanguage.code)}
            className="ml-3 text-gray-600 hover:text-black"
          >
            <FaMicrophone size={18} />
          </button>
          <button
            onClick={stopListening}
            className="ml-3 text-gray-600 hover:text-black"
          >
            <FaPaperPlane size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
