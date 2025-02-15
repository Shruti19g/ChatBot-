import { useRef } from "react";

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse,}) => {
    const inputRef = useRef();
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if(!userMessage) return;
        inputRef.current.value = "";

    setChatHistory((history) =>  [...history, { role: "user", text: userMessage }]);
      
    setTimeout(() => setChatHistory((history) =>  [...history, { role: "model", text: "Thinking...." }]), 600);

    generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
 };

  return (
    <form onSubmit={handleFormSubmit} action="#" className="chat-form">
    <input type="text" ref={inputRef} placeholder="Message..." className="message-input" required />
    <button className="material-symbols-rounded">arrow_upward
    </button>
       </form>
  );
};

export default ChatForm;