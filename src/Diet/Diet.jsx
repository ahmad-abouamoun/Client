import React, {useEffect, useState} from "react";
import image1 from "../Assets/foodBackground.jpg";
import Card from "../Re-usableComponents/Card/Card";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import "./Diet.css";

const DietPage = () => {
    const [foods, setFoods] = useState();
    useEffect(() => {
        const getFood = async () => {
            const response = await fetch("http://localhost:8080/food", {
                method: "GET",
            });
            const data = await response.json();
            console.log(data);
        };
        getFood();
    }, []);
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
        </div>
    );
};

export default DietPage;
