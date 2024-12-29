import React from "react";
import image1 from "../Assets/dietBackground.jpg";
import "./Popup.css";
function Popup({showPopup, setShowPopup}) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-popup">&times;</button>
                <img src={image1} alt="Healthy Eating" className="popup-image" />
                <div className="popup-content">
                    <h3>Name: Strawberry</h3>
                    <p>
                        <strong>Healthy for:</strong>
                    </p>
                    <ul>
                        <li>High Cholesterol Patients: No</li>
                        <li>Hypertension Patients: No</li>
                        <li>Diabetes Patients: No</li>
                        <li>CKD Patients: No</li>
                    </ul>
                    <p>
                        <strong>Description:</strong>
                        <br />
                        Strawberries are rich in vitamin C, antioxidants, and fiber, while being low in sugar and
                        calories, making them great for heart health and balanced diets.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Popup;
