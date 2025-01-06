import "./NavBar.css";
import image from "../../Assets/Logo.png";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useData} from "../../context/DataContext";
import {handleCalendar} from "../../redux/calendarSlice";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("token");
    const user = useSelector((state) => state.users.user);
    return (
        <div className="centere">
            <nav className="navbar">
                <img
                    src={image}
                    alt=""
                    onClick={() => {
                        dispatch(handleCalendar(false));
                        navigate("/");
                    }}
                />
                <ul>
                    <li>
                        <span
                            onClick={() => {
                                if (token) {
                                    dispatch(handleCalendar(false));

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
                                if (token) {
                                    dispatch(handleCalendar(false));

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
                                if (token) {
                                    dispatch(handleCalendar(false));
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
                {token ? (
                    <div className="dropdown-container">
                        <img src={`http://localhost:8080/userImages/${user.filename}`} alt="Diet Background" />
                        <ul className="dropdown">
                            <li
                                onClick={() => {
                                    if (token) {
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
                                    dispatch(handleCalendar(true));
                                }}
                            >
                                Book Meeting
                            </li>
                            <li>Log out</li>
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            dispatch(handleCalendar(false));

                            navigate("/login");
                        }}
                    >
                        Log in
                    </button>
                )}
            </nav>
        </div>
    );
};
export default NavBar;
