import NavBar from "../Re-usableComponents/NavBar/NavBar";
import "./HomePage.css";
const HomePage = () => {
    return (
        <div>
            <div className="backGround">
                <NavBar />
                <div className="blackBox">
                    <h1>Welcome to Balance Beacon</h1>
                    <p>Book a meeting now with one of our specialists</p>
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
