import NavBar from "../Re-usableComponents/NavBar/NavBar";
import image from "../Assets/TraningPageBackGround.jpg";
import image1 from "../Assets/foodBackground.jpg";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";

const TrainingPage = () => {
    return (
        <div>
            <div className="backGround" style={{backgroundImage: ` url(${image})`}}>
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

                <BlackBox>
                    <h1>"The pain you feel today will be the strength you feel tomorrow." Arnold Schwarzenegger</h1>
                    <button>Book Now</button>
                </BlackBox>
            </div>
        </div>
    );
};
export default TrainingPage;
