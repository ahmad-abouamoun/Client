import React, {useState} from "react";
import image1 from "../../Assets/dietBackground.jpg";
import "./Popup.css";
function ProgramPopup({showPopup, setShowPopup}) {
    const [show, setShow] = useState(true);
    const CreateProgram = async () => {
        const response = await fetch("http://localhost:8080/programs", {
            method: "POST",
            body: "",
        });
        const data = await response.json();
        console.log(data);
    };
    const handleSubmit = (value) => {
        // setName(value);
    };
    return (
        showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <button
                        className="close-popup"
                        onClick={() => {
                            setShowPopup(false);
                        }}
                    >
                        &times;
                    </button>
                    <img src={image1} alt="Healthy Eating" className="popup-image" />
                    <div className="popup-content">
                        <h3>Name: {showPopup.name}</h3>
                        <p>
                            {showPopup.training.map((training) => (
                                <p>{training}</p>
                            ))}
                        </p>
                        <p>
                            {showPopup.link.map((link) => (
                                <p>{link}</p>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
}
export default ProgramPopup;
