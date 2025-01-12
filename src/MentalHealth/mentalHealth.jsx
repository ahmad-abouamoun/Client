import {useState} from "react";
import Message from "./message";
import "./mentalHealth.css";
import NavBar from "../Re-usableComponents/NavBar/NavBar";

const MentalHealth = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = () => {
        if (inputValue.trim()) {
            setMessages((prevMessages) => [...prevMessages, {sender: "User", text: inputValue}]);
            setInputValue("");
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {sender: "ChatBot", text: "This is a response from the AI."},
                ]);
            }, 1000);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    return (
        <div className="image">
            <NavBar />
            <div className="chat-container">
                <div className="chat-box">
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <Message key={index} sender={message.sender} text={message.text} />
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything!"
                            className="chat-input"
                        />
                        <button onClick={sendMessage} className="btn send-btn">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MentalHealth;
