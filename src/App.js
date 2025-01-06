import {Routes, Route} from "react-router-dom";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import AdminPage from "./AdminPage/AdminPage";
import DietPage from "./Diet/Diet";
import ProfilePage from "./ProfilePage/ProfilePage";
import TrainingPage from "./TrainingPage/TrainingPage";
import CryptoJS from "crypto-js";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/trainingPage" element={<TrainingPage />} />
                <Route path="/dietPage" element={<DietPage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/adminPage" element={<AdminPage />} />
            </Routes>
        </div>
    );
}
export default App;
