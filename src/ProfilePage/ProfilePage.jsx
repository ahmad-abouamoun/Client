import React, {useEffect, useState} from "react";
import "./ProfilePage.css";
import emptyState from "../Assets/emptyState.jpg";
import useForm from "../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/userSlice";
import FoodCard from "../Diet/Card/FoodCard";
import PageNumber from "../Re-usableComponents/PageNumber/PageNumbers";
import ProgramCard from "../TrainingPage/Card/ProgramCard";
import FoodPopup from "../Diet/FoodPopup";
import ProgramPopup from "../TrainingPage/PopUp/ProgramPopup";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import BookingPage from "../BookingPage/BookingPage";
import Footer from "../Re-usableComponents/Footer/Footer";

const ProfilePage = () => {
    const token = sessionStorage.getItem("token");
    const showCalendar = useSelector((state) => state.calendar.calendar);
    const user = useSelector((state) => state.users.user);

    const [favFood, setFavFood] = useState([]);
    const [favProgram, setFavProgram] = useState([]);
    const [favFoodNum, setFavFoodNum] = useState(1);
    const [favProgramNum, setFavProgramNum] = useState(1);

    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [showProgramPopup, setShowProgramPopup] = useState(false);
    const [showFoodPopup, setShowFoodPopup] = useState(false);

    const {form, updateForm} = useForm({
        name: "",
        diabetes: false,
        highCholesterol: false,
        hypertension: false,
    });
    const handleShowPopup = (data) => {
        setShowPopup(data);
    };
    const updateUser = async () => {
        setShowPopup(false);

        const diseases = {
            diabetes: form.diabetes,
            highCholesterol: form.highCholesterol,
            hypertension: form.hypertension,
        };
        try {
            const response = await fetch(`http://localhost:8000/users`, {
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
            const response = await fetch("http://localhost:8000/users/favProgram", {
                method: "GET",
                headers: {token},
            });
            const data = await response.json();
            setFavProgram(data);
        };
        getFavProgram();
    }, []);
    useEffect(() => {
        const getFavProgram = async () => {
            const response = await fetch("http://localhost:8000/users/favFood", {
                method: "GET",
                headers: {token},
            });
            const data = await response.json();
            setFavFood(data);
        };
        getFavProgram();
    }, []);

    function Chuncks(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i += 4) {
            res.push(arr.slice(i, i + 4));
        }
        return res;
    }
    let favFoodChunks, favProgramChunks;
    favFoodChunks = Chuncks(favFood);
    favProgramChunks = Chuncks(favProgram);
    return (
        <div>
            <div className="profile-container">
                <NavBar />

                <div className="profile-overlay">
                    <img src={`http://localhost:8000/userImages/${user.filename}`} alt="" className="profile-picture" />
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
            </div>
            <div className="recommended-section">
                <h2>Favorited Food</h2>
                <div className="cards-container">
                    {favFood.length > 0 ? (
                        favFoodChunks[favFoodNum - 1]?.map((card) => (
                            <FoodCard handleShowPopup={setShowFoodPopup} key={card._id} card={card} />
                        ))
                    ) : (
                        <img src={emptyState} alt="No Favorite Food" className="empty-state-image" />
                    )}
                </div>
                <PageNumber numItems={favFoodChunks.length} setNumber={setFavFoodNum} />
            </div>
            <FoodPopup setShowPopup={setShowFoodPopup} showPopup={showFoodPopup} />

            <div className="recommended-section">
                <h2>Favorited Program</h2>
                <div className="cards-container">
                    {favProgram.length > 0 ? (
                        favProgramChunks[favProgramNum - 1]?.map((card) => (
                            <ProgramCard handleShowPopup={setShowProgramPopup} key={card._id} card={card} />
                        ))
                    ) : (
                        <img src={emptyState} alt="No Favorite Program" className="empty-state-image" />
                    )}
                </div>
                <PageNumber numItems={favProgramChunks.length} setNumber={setFavProgramNum} />
            </div>
            <ProgramPopup setShowPopup={setShowProgramPopup} showPopup={showProgramPopup} />
            <Footer />
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
                            <h3>Name </h3>
                            <input type="text" placeholder="Name" name="name" onChange={updateForm} />
                            <div>
                                <h3>Do you have Diabetes</h3>
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
                                <h3>Do you have High Cholesterol</h3>

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
                                <h3>Do you have Hypertension</h3>

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
