import {useState} from "react";
import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image1 from "../Assets/dietBackground.jpg";
import image2 from "../Assets/gymBackground.webp";

import "./HomePage.css";
const HomePage = () => {
    const [image, setImage] = useState("");
    console.log(image1);
    return (
        <div>
            <div>
                <div className="backGround" style={{backgroundImage: `url(${image2})`}}>
                    <NavBar />
                    <div className="blackBox">
                        <h1>Welcome to Balance Beacon</h1>
                        <p>Book a meeting now with one of our specialists</p>
                        <button>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
