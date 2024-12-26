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
                    <div className="training-content">
                        <h2>Training</h2>
                        <p>
                            A sound mind in a sound body. Use our trainings and 3D model so that you get the best
                            results. Our programs are tailored to your needs to ensure steady progress.
                        </p>
                        <a href="#" className="start-link-training">
                            Start Now →
                        </a>
                    </div>
                </div>

                <div className="training-section">
                    <div className="training-content">
                        <h2>Diet</h2>
                        <p>
                            You are what you eat.Use our program to help you decide what is healthy and beneficial to
                            you
                        </p>
                        <a href="#" className="start-link-diet">
                            Start Now →
                        </a>
                    </div>
                    <img src={dietImage} alt="Training 2" className="training-image" />
                </div>
            </div>
        </div>
    );
};
export default HomePage;
