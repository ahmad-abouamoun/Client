import "./Card.css";
import image1 from "../../Assets/dietBackground.jpg";
import React, {useState} from "react";
import {Bookmark} from "lucide-react";

function Card({card, handleShowPopup}) {
    const [toggle, setToggle] = useState(true);
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
                            setToggle(!toggle);
                            console.log(toggle);
                        }}
                    >
                        <Bookmark />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Card;
