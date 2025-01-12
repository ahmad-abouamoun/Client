import {useState} from "react";

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
    return <div></div>;
};
export default MentalHealth;
