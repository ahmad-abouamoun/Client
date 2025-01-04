import "./NavBar.css";
import image from "../../Assets/Logo.png";
import image1 from "../../Assets/Logo.png";
import {useNavigate} from "react-router";

const NavBar = ({showCalendar, setShowCalendar}) => {
    const navigate = useNavigate();
    return (
        <div className="centere">
            <nav className="navbar">
                <img
                    src={image}
                    alt=""
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <ul>
                    <li>
                        <span
                            onClick={() => {
                                navigate("/trainingPage");
                            }}
                        >
                            Training
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => {
                                navigate("/dietPage");
                            }}
                        >
                            Diet
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => {
                                navigate("/trainingPage");
                            }}
                        >
                            Mental Health
                        </span>
                    </li>
                    <li>
                        <span>Meetings</span>
                    </li>
                </ul>
                <div className="dropdown-container">
                    <img src={image1} alt="Diet Background" />
                    <ul className="dropdown">
                        <li
                            onClick={() => {
                                navigate("/ProfilePage");
                            }}
                        >
                            Profile Page
                        </li>
                        <li
                            onClick={() => {
                                setShowCalendar(!showCalendar);
                            }}
                        >
                            Book Meeting
                        </li>
                        <li>Log out</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
