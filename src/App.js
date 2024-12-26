import {Route, Router} from "react-router";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import AdminPage from "./AdminPage/AdminPage";
import DietPage from "./Diet/Diet";

function App() {
    return (
        <div>
            <DietPage />
        </div>
    );
}

export default App;
