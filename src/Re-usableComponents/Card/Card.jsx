import "./Card.css";
import image1 from "../../Assets/dietBackground.jpg";
import React, {useState} from "react";
import {Bookmark} from "lucide-react";

function Card({card, handleShowPopup}) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const addFavFood = async () => {};
    const removeFavFood = async () => {
        console.log("in the remove fav food ");
    };
    return (
        <div>
            <div className={`card`}>
                <img className="card-image" src={image1} alt="Healthy Eating" />
                <div className="card-content">
                    <h2 className="card-title">{card.name}</h2>
                    <p className="card-description">{card.description}</p>
                </div>
                <div className="card-actions">
                    <button className="learn-more" onClick={() => handleShowPopup(card)}>
                        Learn More
                    </button>
                    <div
                        onClick={() => {
                            setIsBookmarked(!isBookmarked);
                            isBookmarked ? removeFavFood() : addFavFood();
                        }}
                    >
                        <Bookmark fill={isBookmarked ? "#ff6f61" : "none"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Card;
