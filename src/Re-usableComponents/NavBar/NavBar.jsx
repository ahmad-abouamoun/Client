import "./NavBar.css";
import image from "../../Assets/Logo.png";
import image1 from "../../Assets/Logo.png";

const NavBar = ({children}) => {
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
                        <li>Option 1</li>
                        <li>Option 2</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
