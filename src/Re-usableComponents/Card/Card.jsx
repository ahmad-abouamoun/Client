import "./Card.css";
import image1 from "../../Assets/dietBackground.jpg";
import React, {useState} from "react";

function Card({card, handleShowPopup}) {
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
                    <button className="bookmark">Bookmark</button>
                </div>
            </div>
        </div>
    );
}
export default Card;
