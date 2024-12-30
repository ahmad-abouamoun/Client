import React, {useEffect, useMemo, useState} from "react";
import image1 from "../Assets/foodBackground.jpg";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import "./Diet.css";
import PageNumber from "../Re-usableComponents/PageNumber/PageNumbers";
import FoodCard from "./Card/FoodCard";
import FoodPopup from "./FoodPopup";

const DietPage = () => {
    const [foods, setFoods] = useState([]);
    const [noDiaPageNum, setnoDiaPageNum] = useState(1);
    const [noColPageNum, setNoColPageNum] = useState(1);
    const [noHyPageNum, setNoHyPageNum] = useState(1);
    const [showPopup, setShowPopup] = useState();
    const handleShowPopup = (data) => {
        setShowPopup(data);
    };
    useEffect(() => {
        const getFood = async () => {
            const response = await fetch("http://localhost:8080/food", {
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

    function Chuncks(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i += 4) {
            res.push(arr.slice(i, i + 4));
        }
        return res;
    }
    let noDiaChunks, noColChunks, noHyChunks;
    noDiaChunks = Chuncks(NoDiabetes);
    noColChunks = Chuncks(NoCholesterol);
    noHyChunks = Chuncks(NoHypertension);

    return (
        <div>
            <div className="backGround" style={{backgroundImage: ` url(${image1})`}}>
                <NavBar>
                    <ul>
                        <li>
                            <span>Training</span>
                        </li>
                        <li>
                            <span>Diet</span>
                        </li>
                        <li>
                            <span>Mental Health</span>
                        </li>
                        <li>
                            <span>Meetings</span>
                        </li>
                    </ul>
                    <img src={image1} alt="Diet Background" />
                </NavBar>

                <BlackBox>
                    <h1>"Let food be thy medicine and medicine be thy food." - Hippocrates</h1>
                    <button>Book Now</button>
                </BlackBox>
            </div>
            <div className="recommended-section">
                <h2>No Diabetes</h2>
                <div className="cards-container">
                    {noDiaChunks[noDiaPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noDiaChunks.length} setNumber={setnoDiaPageNum} />
            </div>
            <div className="recommended-section">
                <h2>No Cholesterol</h2>
                <div className="cards-container">
                    {noColChunks[noColPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noColChunks.length} setNumber={setNoColPageNum} />
            </div>
            <div className="recommended-section">
                <h2>No Hypertension</h2>
                <div className="cards-container">
                    {noHyChunks[noHyPageNum - 1]?.map((card) => (
                        <FoodCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={noHyChunks.length} setNumber={setNoHyPageNum} />
            </div>
            <FoodPopup setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default DietPage;
