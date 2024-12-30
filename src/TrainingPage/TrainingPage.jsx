import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image from "../Assets/TraningPageBackGround.jpg";
import image1 from "../Assets/foodBackground.jpg";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import React, {useEffect, useState} from "react";
import ProgramCard from "./Card/ProgramCard";
import PageNumber from "../Re-usableComponents/PageNumber/PageNumbers";
import ProgramPopup from "./ProgramPopup";

const TrainingPage = () => {
    const [programs, setPrograms] = useState([]);
    const [programNum, setProgramNum] = useState(1);

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
                    <h1>
                        "The pain you feel today will be the strength you feel tomorrow." <br />
                        Arnold Schwarzenegger
                    </h1>
                    <button>Book Now</button>
                </BlackBox>
            </div>
            <div className="recommended-section">
                <h2>No Diabetes</h2>
                <div className="cards-container">
                    {programChunk[programNum - 1]?.map((card) => (
                        <ProgramCard key={card._id} card={card} />
                    ))}
                </div>
                <PageNumber numItems={programChunk.length} setNumber={setProgramNum} />
            </div>
            <ProgramPopup setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};
export default TrainingPage;
