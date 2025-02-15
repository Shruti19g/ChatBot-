import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState([false]);
  const chatBodyRef = useRef();

const generateBotResponse = async (history) => {

  const updateHistory = (text) => {
setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking..."), { role: "model", 
  text }]);
  };

history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: history }),
  };

  try{
    const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    updateHistory(apiResponseText);
  } catch (error) {
    console.log(error);
  }
   };

   useEffect(() => {
     chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behaviour: "smooth" });
   }, [chatHistory]);

return (
  <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
     <button onClick={() => setShowChatbot((prev) => !prev)} 
     id="chatbot-toggler">
    <span className="material-symbols-rounded">mode_comment</span>
    <span className="material-symbols-rounded">close</span>
  </button>

<div className="chatbot-popup">
  {/* AI_Chatbot Header*/}
  <div className="chat-header">
  <div className="header-info">
  <ChatbotIcon />

    <h2 className="logo-text">AI-Powered Chatbot</h2>
        </div>
  <button onClick={() => setShowChatbot((prev) => !prev)}
  className="material-symbols-rounded">keyboard_arrow_down</button>
</div>

 {/* AI_Chatbot Body*/}
 <div ref={chatBodyRef} className="chat-body">

 <div className="message bot-message">
 <ChatbotIcon />
  <p className="message-text">
  Hi <br/> May I help you?
    </p>
 </div>

 {chatHistory.map((chat, index) => (
    <ChatMessage key={index} chat={chat} />
 ))}
</div>

{/* AI_Chatbot Footer*/}
<div className="chat-footer">
  <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
    </div>
  </div>
</div>
); 
};

export default App;