import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image from "../Assets/training.jpg";
import image1 from "../Assets/foodBackground.jpg";

const TrainingPage = () => {
    return (
        <div>
            <NavBar>
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
            </NavBar>
        </div>
    );
};
export default TrainingPage;
