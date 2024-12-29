import React, {useState} from "react";
import "./ProfilePage.css";
import image from "../Assets/dietBackground.jpg";
import image1 from "../Assets/dietBackground.jpg";
import useForm from "../hooks/useForm";
const ProfilePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const {form, updateForm} = useForm({
        name: "",
        diabetes: false,
        highCholesterol: false,
        hypertension: false,
    });
    return (
        <div className="profile-container">
            <div className="profile-overlay">
                <img src={image} alt="Profile Picture" className="profile-picture" />
                <div className="profile-info">
                    <h2>
                        Ahmad Abou Amoun
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
            {showPopup && (
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
                        <div className="popup-content">
                            <h3>Name: </h3>
                            <input type="text" placeholder="Name" onChange={updateForm} />
                            <div>
                                <h3>Do you have Diabetes:</h3>
                                <label>
                                    <input onChange={updateForm} name="diabetes" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input onChange={updateForm} name="diabetes" type="radio" value={false} />
                                    No
                                </label>
                            </div>
                            <div>
                                <h3>Do you have High Cholesterol:</h3>

                                <label>
                                    <input onChange={updateForm} name="highCholesterol" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input onChange={updateForm} name="highCholesterol" type="radio" value={false} />
                                    No
                                </label>
                            </div>
                            <div>
                                <h3>Do you have Hypertension:</h3>

                                <label>
                                    <input onChange={updateForm} name="hypertension" type="radio" value={true} />
                                    Yes
                                </label>
                                <label>
                                    <input onChange={updateForm} name="hypertension" type="radio" value={false} />
                                    No
                                </label>
                            </div>
                            <button onClick={() => setShowPopup(false)}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
