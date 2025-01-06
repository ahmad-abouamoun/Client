import "./Card.css";
import React, {useEffect, useState} from "react";
import {Bookmark} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {addFood, removeFood} from "../../redux/userSlice";

function FoodCard({card, handleShowPopup}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (user.favFoods?.includes(card._id)) {
            setIsBookmarked(true);
        }
    }, [user.favFoods, card._id]);

    const token = sessionStorage.getItem("token");
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
            dispatch(addFood(card._id));
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
            dispatch(removeFood(card._id));
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div>
            <div className="card">
                <div className="bookmark">
                    <div
                        onClick={() => {
                            setIsBookmarked(!isBookmarked);
                            isBookmarked ? removeFavFood() : addFavFood();
                        }}
                    >
                        <Bookmark stroke="#ff6f61" fill={isBookmarked ? "#ff6f61" : "none"} />
                    </div>
                </div>
                <img
                    className="card-image"
                    src={`http://localhost:8080/foodImages/${card.filename}`}
                    alt="Healthy Eating"
                />
                <div className="card-content">
                    <h2 className="card-title">{card.name}</h2>
                    <p className="card-description">{card.description}</p>
                </div>
                <div className="card-actions">
                    <button className="learn-more" onClick={() => handleShowPopup(card)}>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
export default FoodCard;
