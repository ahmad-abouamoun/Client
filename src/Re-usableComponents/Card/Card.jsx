import "./Card.css";
import image1 from "../../Assets/dietBackground.jpg";
import React, {useState} from "react";

function Card({title, description}) {
    const [showPopup, setShowPopup] = useState(false);

    const handleLearnMore = () => {
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <div className={`card`}>
                <img className="card-image" src={image1} alt="Healthy Eating" />
                <div className="card-content">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-description">{description}</p>
                </div>
                <div className="card-actions">
                    <button className="learn-more" onClick={handleLearnMore}>
                        Learn More
                    </button>
                    <button className="bookmark">Bookmark</button>
                </div>
            </div>
        </div>
    );
}
export default Card;
