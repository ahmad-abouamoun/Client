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
import BookingPage from "../BookingPage/BookingPage";
import {useNavigate} from "react-router";
const HomePage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [image, setImage] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
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
                    <NavBar showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
                    {showCalendar && token && (
                        <div className=" calendar-popup ">
                            <BookingPage showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
                        </div>
                    )}
                    <BlackBox>
                        <h1>Welcome to Balance Beacon</h1>
                        <p>Book a meeting now with one of our specialists</p>
                        <button
                            onClick={() => {
                                setShowCalendar(!showCalendar);
                            }}
                        >
                            Book Now
                        </button>
                    </BlackBox>
                </div>
                <div className="section">
                    <img src={trainingImage} alt="Training 1" className="image" />
                    <div className="content">
                        <h2>Training</h2>
                        <p>
                            A sound mind in a sound body. Use our trainings and 3D model so that you get the best
                            results. Our programs are tailored to your needs to ensure steady progress.
                        </p>
                        <span
                            className="start-link-training"
                            onClick={() => {
                                if (token) {
                                    navigate("/trainingPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
                            }}
                        >
                            Start Now →
                        </span>
                    </div>
                </div>

                <div className="section">
                    <div className="content">
                        <h2>Diet</h2>
                        <p>
                            You are what you eat.Use our program to help you decide what is healthy and beneficial to
                            you
                        </p>
                        <span
                            className="start-link-diet"
                            onClick={() => {
                                if (token) {
                                    navigate("/dietPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
                            }}
                        >
                            Start Now →
                        </span>
                    </div>
                    <img src={dietImage} alt="Training 2" className="image" />
                </div>

                <div className="section">
                    <img src={mentalImage} alt="Training 3" className="image" />
                    <div className="content">
                        <h2>Mental Health</h2>
                        <p>
                            Mental health is not a destination, but a process. It's about how you drive, not where
                            you're going. Use our Ai to help you overcome your issues
                        </p>
                        <span
                            className="start-link-mental"
                            onClick={() => {
                                if (token) {
                                    navigate("/trainingPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
                            }}
                        >
                            Start Now →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
