import {useState} from "react";
import Message from "./message";
import "./mentalHealth.css";
import NavBar from "../Re-usableComponents/NavBar/NavBar";

const MentalHealth = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = async () => {
        if (inputValue.trim()) {
            setMessages((prevMessages) => [...prevMessages, {sender: "User", text: inputValue}]);
            const response = await fetch("http://localhost:8080/api/therapist", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({userMessage: inputValue}),
            });
            const responseDate = await response.json();
            setInputValue("");
            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, {sender: "ChatBot", text: `${responseDate}`}]);
            }, 1000);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    return (
        <div className="backGroundimage">
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
