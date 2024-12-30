import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image from "../Assets/TraningPageBackGround.jpg";
import image1 from "../Assets/foodBackground.jpg";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import React, {useEffect, useState} from "react";

const TrainingPage = () => {
    const [programs, setPrograms] = useState();
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
                    <h1>"The pain you feel today will be the strength you feel tomorrow." Arnold Schwarzenegger</h1>
                    <button>Book Now</button>
                </BlackBox>
            </div>
        </div>
    );
};
export default TrainingPage;
