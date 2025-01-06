import React, {useEffect, useState} from "react";
import "./ProfilePage.css";
import image from "../Assets/dietBackground.jpg";
import useForm from "../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/userSlice";
const ProfilePage = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [showPopup, setShowPopup] = useState(false);
    const {form, updateForm} = useForm({
        name: "",
        diabetes: false,
        highCholesterol: false,
        hypertension: false,
    });
    const updateUser = async () => {
        setShowPopup(false);

        const diseases = {
            diabetes: form.diabetes,
            highCholesterol: form.highCholesterol,
            hypertension: form.hypertension,
        };
        try {
            const response = await fetch(`http://localhost:8080/users`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    name: form.name,
                    diseases,
                }),
            });

            const responseData = await response.json();
            dispatch(setUser(responseData));
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        const getFavProgram = async () => {
            const response = await fetch("http://localhost:8080/users/favProgram", {
                method: "GET",
                headers: {token},
            });
            const data = await response.json();
            console.log("========program============");

            console.log(data);
        };
        getFavProgram();
    }, []);
    useEffect(() => {
        const getFavProgram = async () => {
            const response = await fetch("http://localhost:8080/users/favFood", {
                method: "GET",
                headers: {token},
            });
            const data = await response.json();
            console.log("========food============");

            console.log(data);
        };
        getFavProgram();
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-overlay">
                <img src={`http://localhost:8080/userImages/${user.filename}`} alt="" className="profile-picture" />
                <div className="profile-info">
                    <h2>
                        {user.name}
                        <span
                            className="edit-icon"
                            onClick={() => {
                                setShowPopup(true);
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
                            <input type="text" placeholder="Name" name="name" onChange={updateForm} />
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
                            <button onClick={() => updateUser()}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
