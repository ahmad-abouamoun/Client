import "./NavBar.css";
import image from "../../Assets/Logo.png";
const NavBar = ({children}) => {
    return (
        <div className="centere">
            <nav className="navbar">
                <img src={image} alt="" />
                {children}
            </nav>
        </div>
    );
};
export default NavBar;
