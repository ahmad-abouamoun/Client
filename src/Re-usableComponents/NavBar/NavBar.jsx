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
                <img src={image1} alt="Diet Background" />
            </nav>
        </div>
    );
};
export default NavBar;
