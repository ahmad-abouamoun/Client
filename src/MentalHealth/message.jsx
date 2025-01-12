import React from "react";
import "./mentalHealth.css";
const Message = ({sender, text}) => {
    return (
        <div className={`message ${sender === "ChatBot" ? "message-bot" : "message-user"}`}>
            <div className="message-content">{text}</div>
        </div>
    );
};

export default Message;
