import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image from "../Assets/TraningPageBackGround.jpg";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import React, {useEffect, useState} from "react";
import ProgramCard from "./Card/ProgramCard";
import PageNumber from "../Re-usableComponents/PageNumber/PageNumbers";
import ProgramPopup from "./PopUp/ProgramPopup";
import "./TrainingPage.css";
import CreateProgram from "./createProgram/createProgram.jsx";
import {useSelector} from "react-redux";
import BookingPage from "../BookingPage/BookingPage";
import Model from "./Model.jsx";
import Footer from "../Re-usableComponents/Footer/Footer.jsx";
const TrainingPage = () => {
    const user = useSelector((state) => state.users.user);
    const showCalendar = useSelector((state) => state.calendar.calendar);

    const [programs, setPrograms] = useState([]);
    const [programNum, setProgramNum] = useState(1);
    const [showPopup, setShowPopup] = useState();
    const [createProgram, setCreateProgram] = useState(false);
    const handleShowPopup = (data) => {
        setShowPopup(data);
    };
    useEffect(() => {
        const getPrograms = async () => {
            const response = await fetch("http://localhost:8080/programs", {
                method: "GET",
            });
            const data = await response.json();
            setPrograms(data);
        };
        getPrograms();
    }, []);
    function Chuncks(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i += 4) {
            res.push(arr.slice(i, i + 4));
        }
        return res;
    }
    let programChunk = Chuncks(programs);

    return (
        <div>
            <div className="backGround" style={{backgroundImage: ` url(${image})`}}>
                <NavBar />
                {showCalendar && (
                    <div className=" calendar-popup ">
                        <BookingPage />
                    </div>
                )}
                <BlackBox>
                    <h1>
                        "The pain you feel today will be the strength you feel tomorrow." <br />
                        Arnold Schwarzenegger
                    </h1>
                </BlackBox>
            </div>
            <div className="section-title">
                <span>Trainings Section</span>
                {user.type === "coach" && (
                    <button
                        onClick={() => {
                            setCreateProgram(!createProgram);
                        }}
                    >
                        Add a Program
                    </button>
                )}
            </div>
            <div className="recommended-section">
                <h2>Exercises Suggestions</h2>
                <div className="cards-container">
                    {programChunk[programNum - 1]?.map((card) => (
                        <ProgramCard handleShowPopup={handleShowPopup} key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={programChunk.length} setNumber={setProgramNum} />
                <div className="addBtn"></div>
            </div>
            <CreateProgram show={createProgram} handleClick={setCreateProgram} />
            <ProgramPopup setShowPopup={setShowPopup} showPopup={showPopup} />
            <Model></Model>
            <Footer />
        </div>
    );
};
export default TrainingPage;
