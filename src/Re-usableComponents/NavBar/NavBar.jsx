import "./NavBar.css";
import image from "../../Assets/Logo.png";
const NavBar = () => {
    return (
        <div className="centere">
            <nav className="navbar">
                <img src={image} alt="" />

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
            </nav>
        </div>
    );
};
export default NavBar;
