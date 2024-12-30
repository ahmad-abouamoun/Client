import {Route, Router} from "react-router";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import AdminPage from "./AdminPage/AdminPage";
import DietPage from "./Diet/Diet";
import ProfilePage from "./ProfilePage/ProfilePage";
import Popup from "./Diet/Popup";
import TrainingPage from "./TrainingPage/TrainingPage";

function App() {
    return (
        <div>
            <TrainingPage />
        </div>
    );
}
export default App;
