import React from "react";
import "./BlackBox.css";
import {useData} from "../../context/SocketProvider";
import {useDispatch, useSelector} from "react-redux";
import {handleCalendar} from "../../redux/calendarSlice";

const BlackBox = ({children}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="blackBox">
                {children}
                <button
                    onClick={() => {
                        dispatch(handleCalendar(true));
                    }}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};
export default BlackBox;
