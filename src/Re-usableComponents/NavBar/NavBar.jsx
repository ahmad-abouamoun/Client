import "./NavBar.css";
import image from "../../Assets/Logo.png";
import image1 from "../../Assets/Logo.png";
import {useNavigate} from "react-router";

const NavBar = ({children}) => {
    const navigate = useNavigate();
    return (
        <div className="centere">
            <nav className="navbar">
                <img src={image} alt="" />
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
                <div className="dropdown-container">
                    <img src={image1} alt="Diet Background" />
                    <ul className="dropdown">
                        <li>Profile Page</li>
                        <li>Book Meeting</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
