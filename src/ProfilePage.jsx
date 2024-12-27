import React from "react";
import "./ProfilePage.css";
import image from "./Assets/dietBackground.jpg";
const ProfilePage = () => {
    return (
        <div className="profile-container">
            <div className="profile-overlay">
                <img src={image} alt="Profile Picture" className="profile-picture" />
                <div className="profile-info">
                    <h2>
                        Ahmad Abou Amoun <span className="edit-icon">✎</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
