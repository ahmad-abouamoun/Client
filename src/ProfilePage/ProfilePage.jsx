import React, {useState} from "react";
import "./ProfilePage.css";
import image from "../Assets/dietBackground.jpg";
const ProfilePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="profile-container">
            <div className="profile-overlay">
                <img src={image} alt="Profile Picture" className="profile-picture" />
                <div className="profile-info">
                    <h2>
                        Ahmad Abou Amoun{" "}
                        <span
                            className="edit-icon"
                            onClick={() => {
                                setShowPopup(true);
                                console.log(showPopup);
                            }}
                        >
                            ✎
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
