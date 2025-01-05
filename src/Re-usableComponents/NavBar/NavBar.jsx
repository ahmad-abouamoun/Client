import "./NavBar.css";
import image from "../../Assets/Logo.png";
import image1 from "../../Assets/Logo.png";
import {useNavigate} from "react-router";
import {useData} from "../../context/DataContext";

const NavBar = ({showCalendar, setShowCalendar}) => {
    const navigate = useNavigate();
    const {loggedIn} = useData();

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
                                if (loggedIn) {
                                    navigate("/trainingPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
                            }}
                        >
                            Training
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => {
                                if (loggedIn) {
                                    navigate("/dietPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
                            }}
                        >
                            Diet
                        </span>
                    </li>
                    <li>
                        <span
                            onClick={() => {
                                if (loggedIn) {
                                    navigate("/trainingPage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
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
                                if (loggedIn) {
                                    navigate("/ProfilePage");
                                } else {
                                    alert("Please Login first to access all our services");
                                }
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
