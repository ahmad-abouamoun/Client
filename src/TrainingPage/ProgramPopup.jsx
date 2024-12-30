import React from "react";
import image1 from "../Assets/dietBackground.jpg";
import "./Popup.css";
function ProgramPopup({showPopup, setShowPopup}) {
    return (
        showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <button
                        className="close-popup"
                        onClick={() => {
                            console.log(showPopup.diseases.hypertension);
                            setShowPopup(false);
                        }}
                    >
                        &times;
                    </button>
                    <img src={image1} alt="Healthy Eating" className="popup-image" />
                    <div className="popup-content">
                        <h3>Name: {showPopup.name}</h3>
                        <p>
                            <strong>Healthy for:</strong>
                        </p>
                        <ul>
                            diabetes highCholesterol hypertension
                            <li>High Cholesterol Patients: {showPopup.diseases.highCholesterol ? "No" : "Yes"}</li>
                            <li>Hypertension Patients: {showPopup.diseases.hypertension ? "No" : "Yes"}</li>
                            <li>Diabetes Patients: {showPopup.diseases.diabetes ? "No" : "Yes"}</li>
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
export default ProgramPopup;
