import {useEffect, useState} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image1 from "../Assets/dietBackground.jpg";
import image2 from "../Assets/gymBackground.webp";
import image3 from "../Assets/mentalHealthBackground.jpeg";

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
                    <NavBar />
                    <BlackBox>
                        <h1>Welcome to Balance Beacon</h1>
                        <p>Book a meeting now with one of our specialists</p>
                        <button>Book Now</button>
                    </BlackBox>
                </div>
                <div className="sections">
                    <div className="section"></div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
