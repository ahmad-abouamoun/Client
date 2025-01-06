import React from "react";
import "./BlackBox.css";
import {useData} from "../../context/DataContext";

const BlackBox = ({children}) => {
    const {showCalendar, setShowCalendar} = useData();

    return (
        <div>
            <div className="blackBox">
                {children}
                <button
                    onClick={() => {
                        setShowCalendar(!showCalendar);
                    }}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};
export default BlackBox;
