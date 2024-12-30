import "./Card.css";
import image1 from "../../Assets/dietBackground.jpg";
import React, {useState} from "react";
import {Bookmark} from "lucide-react";

function FoodCard({card, handleShowPopup}) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const token = localStorage.getItem("token");
    const addFavFood = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/favFood`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    FoodId: card._id,
                }),
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    const removeFavFood = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/favFood`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    FoodId: card._id,
                }),
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
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
export default FoodCard;
