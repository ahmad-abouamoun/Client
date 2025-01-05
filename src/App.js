import {Routes, Route} from "react-router-dom";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import AdminPage from "./AdminPage/AdminPage";
import DietPage from "./Diet/Diet";
import ProfilePage from "./ProfilePage/ProfilePage";
import TrainingPage from "./TrainingPage/TrainingPage";
import CryptoJS from "crypto-js";
import BookingPage from "./BookingPage/BookingPage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:8080/users/getUser", {
                        headers: {
                            token,
                            "Content-Type": "application/json",
                        },
                        method: "GET",
                    });
                    const responseDate = await response.json();
                    console.log(responseDate);
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                console.log("error");
            }
        };
        getUser();
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/trainingPage" element={<TrainingPage />} />
                <Route path="/dietPage" element={<DietPage />} />
                <Route path="/BookingPage" element={<BookingPage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/adminPage" element={<AdminPage />} />
            </Routes>
        </div>
    );
}
export default App;
