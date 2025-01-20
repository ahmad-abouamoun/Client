import "./ProgramCard.css";
import React, {useEffect, useState} from "react";
import {Bookmark} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {addProgram, removeProgram} from "../../redux/userSlice";

function ProgramCard({card, handleShowPopup}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (user.favPrograms?.includes(card._id)) {
            setIsBookmarked(true);
        }
    }, [user.favPrograms, card._id]);

    const addFavProgram = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/favProgram`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    programId: card._id,
                }),
            });

            const responseData = await response.json();
            dispatch(addProgram(card._id));
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    const removeFavProgram = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/favProgram`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    programId: card._id,
                }),
            });

            const responseData = await response.json();
            dispatch(removeProgram(card._id));
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div>
            <div className={`card`}>
                <div className="bookmark">
                    <div
                        onClick={() => {
                            setIsBookmarked(!isBookmarked);
                            isBookmarked ? removeFavProgram() : addFavProgram();
                        }}
                    >
                        <Bookmark stroke="#ff6f61" fill={isBookmarked ? "#ff6f61" : "none"} />
                    </div>
                    <img
                        className="card-image"
                        src={`http://localhost:8000/programsImages/${card.filename}`}
                        alt="Healthy Eating"
                    />
                </div>
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
export default ProgramCard;
