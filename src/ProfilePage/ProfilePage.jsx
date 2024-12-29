import React, {useState} from "react";
import "./ProfilePage.css";
import image from "../Assets/dietBackground.jpg";
import useForm from "../hooks/useForm";
const ProfilePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");
    const {form, updateForm} = useForm({
        name: "",
        diabetes: false,
        highCholesterol: false,
        hypertension: false,
    });
    const updateUser = async () => {
        const diseases = {
            diabetes: form.diabetes,
            highCholesterol: form.highCholesterol,
            hypertension: form.hypertension,
        };
        try {
            const response = await fetch(`http://localhost:8080/users/${token}`, {
                method: "PATCH",
                body: {
                    name: form.name,
                    diseases,
                },
            });

            const responseData = await response.json();
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };
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
