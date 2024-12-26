import image1 from "../Assets/foodBackground.jpg";
import BlackBox from "../Re-usableComponents/BlackBox/BlackBox";
import NavBar from "../Re-usableComponents/NavBar/NavBar";

const DietPage = () => {
    return (
        <div>
            <div className="backGround" style={{backgroundImage: `url(${image1})`}}>
                <NavBar>
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
                    <img src={image1} alt="" />
                </NavBar>
            </div>
        </div>
    );
};
export default DietPage;
