import React, {useEffect, useMemo, useState} from "react";
import image1 from "../Assets/foodBackground.jpg";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import "./Diet.css";
import PageNumber from "../Re-usableComponents/PageNumber/PageNumbers";
import FoodCard from "./Card/FoodCard";
import FoodPopup from "./FoodPopup";
import CreateFood from "./CreateFood/CreateFood";
import {useSelector} from "react-redux";
import BookingPage from "../BookingPage/BookingPage";
import Footer from "../Re-usableComponents/Footer/Footer";

const DietPage = () => {
    const user = useSelector((state) => state.users.user);
    const showCalendar = useSelector((state) => state.calendar.calendar);

    const [foods, setFoods] = useState([]);
    const [reccomendedNum, setReccomendedNum] = useState(1);

    const [noDiaPageNum, setnoDiaPageNum] = useState(1);

    const [noColPageNum, setNoColPageNum] = useState(1);
    const [noHyPageNum, setNoHyPageNum] = useState(1);
    const [showPopup, setShowPopup] = useState();
    const [showForm, setShowForm] = useState(false);
    const handleShowPopup = (data) => {
        setShowPopup(data);
    };
    useEffect(() => {
        const getFood = async () => {
            const response = await fetch("http://localhost:8000/food", {
                method: "GET",
            });
            const data = await response.json();
            setFoods(data);
        };
        getFood();
    }, []);
    const NoDiabetes = useMemo(() => foods.filter((food) => food.diseases.diabetes === false), [foods]);
    const NoCholesterol = useMemo(() => foods.filter((food) => food.diseases.highCholesterol === false), [foods]);
    const NoHypertension = useMemo(() => foods.filter((food) => food.diseases.hypertension === false), [foods]);
    const Reccomended = useMemo(
        () =>
            foods
            .filter((food) => !(user.diseases.diabetes && food.diseases.diabetes))
            .filter((food) => !(user.diseases.highCholesterol && food.diseases.highCholesterol))
            .filter((food) => !(user.diseases.hypertension && food.diseases.hypertension)),

        [foods]
    );

    function Chuncks(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i += 4) {
            res.push(arr.slice(i, i + 4));
        }
        return res;
    }
    let noDiaChunks, noColChunks, noHyChunks, reccomended;
    noDiaChunks = Chuncks(NoDiabetes);
    noColChunks = Chuncks(NoCholesterol);
    noHyChunks = Chuncks(NoHypertension);
    reccomended = Chuncks(Reccomended);

    return (
        <div>
            <div className="backGround" style={{backgroundImage: ` url(${image1})`}}>
                <NavBar />
                {showCalendar && (
                    <div className=" calendar-popup ">
                        <BookingPage />
                    </div>
                )}
                <BlackBox>
                    <h1>"Let food be thy medicine and medicine be thy food." - Hippocrates</h1>
                </BlackBox>
            </div>
            <div className="section-title">
                <span>Food Section</span>
                {user.type === "nutritionist" && (
                    <button
                        onClick={() => {
                            setShowForm(true);
                            console.log(Reccomended);
                        }}
                    >
                        Add Food
                    </button>
                )}
            </div>
            <div className="recommended-section">
                <h2>Food Reccomendations</h2>
                <div className="cards-container">
                    {reccomended[reccomendedNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={reccomended.length} setNumber={setReccomendedNum} />
            </div>
            <div className="recommended-section">
                <h2>Does not affect Diabetes</h2>
                <div className="cards-container">
                    {noDiaChunks[noDiaPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noDiaChunks.length} setNumber={setnoDiaPageNum} />
            </div>
            <div className="recommended-section">
                <h2>Does not affect HighCholesterol</h2>
                <div className="cards-container">
                    {noColChunks[noColPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noColChunks.length} setNumber={setNoColPageNum} />
            </div>
            <div className="recommended-section">
                <h2>Does not affect Hypertension</h2>
                <div className="cards-container">
                    {noHyChunks[noHyPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noHyChunks.length} setNumber={setNoHyPageNum} />
            </div>
            <FoodPopup setShowPopup={setShowPopup} showPopup={showPopup} />
            <CreateFood show={showForm} handleClick={setShowForm} />
            <Footer />
        </div>
    );
};

export default DietPage;
