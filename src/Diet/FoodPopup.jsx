import React from "react";
import image1 from "../Assets/dietBackground.jpg";
import "./Popup.css";
function FoodPopup({showPopup, setShowPopup}) {
    return (
        showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <button
                        className="close-popup"
                        onClick={() => {
                            setShowPopup();
                        }}
                    >
                        &times;
                    </button>
                    <img
                        src={`http://localhost:8080/foodImages/${showPopup.filename}`}
                        alt="Healthy Eating"
                        className="popup-image"
                    />
                    <div className="popup-content">
                        <h3>Name: {showPopup.name}</h3>
                        <p>
                            <strong>Healthy for:</strong>
                        </p>
                        <ul>
                            <li>High Cholesterol Patients: {showPopup.diseases.highCholesterol ? "❌" : "✅"}</li>
                            <li>Hypertension Patients: {showPopup.diseases.hypertension ? "❌" : "✅"}</li>
                            <li>Diabetes Patients: {showPopup.diseases.diabetes ? "❌" : "✅"}</li>
                        </ul>
                        <p>
                            <strong>Description:</strong>
                            <br />
                            {showPopup.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
}
export default FoodPopup;
