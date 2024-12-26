import {useEffect, useState} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image1 from "../Assets/dietBackground.jpg";
import image2 from "../Assets/gymBackground.webp";
import image3 from "../Assets/mentalHealthBackground.jpeg";
import trainingImage from "../Assets/training.jpg";
import dietImage from "../Assets/foodImage.jpg";
import mentalImage from "../Assets/mental.jpg";

import "./HomePage.css";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
const HomePage = () => {
    const [image, setImage] = useState("");
    const images = [image1, image2, image3];
    useEffect(() => {
        const interval = setInterval(() => {
            setImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <div>
            <div>
                <div className="backGround" style={{backgroundImage: `url(${images[image]})`}}>
                    <NavBar>
                        <ul>
                            <li>
                                <span>Trainning</span>
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
                        <button>Login</button>
                    </NavBar>
                    <BlackBox>
                        <h1>Welcome to Balance Beacon</h1>
                        <p>Book a meeting now with one of our specialists</p>
                        <button>Book Now</button>
                    </BlackBox>
                </div>
                <div className="training-section">
                    <img src={trainingImage} alt="Training 1" className="training-image" />
                    <div className="training-content"></div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
