import React, {useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {format, parse, startOfWeek, getDay, addMinutes, setHours, setMinutes} from "date-fns";
import {enUS} from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookingPage.css";

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {"en-US": enUS},
});

const BookingPage = () => {
    const [events, setEvents] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newEvent, setNewEvent] = useState({
        title: "Meeting",
        start: "",
        end: "",
        type: "",
        room: "",
    });

    const Experts = {
        nutritionist: "Room 101",
        therapist: "Room 102",
        coach: "Room 103",
    };

    const meetingOptions = Object.keys(Experts);

    const handleSlotSelect = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setNewEvent({title: "Meeting", start: "", end: "", type: "", room: ""});
        setShowModal(true);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
                selectable
                onSelectSlot={handleSlotSelect}
                min={new Date(2024, 0, 1, 8, 0)}
                max={new Date(2024, 0, 1, 18, 0)}
                step={30}
            />

            {showModal && (
                <div className="modal">
                    <h2 className="modal-header">Add Event</h2>
                    <p className="modal-text">Selected Date: {format(selectedDate, "MMMM d, yyyy")}</p>

                    <br />

                    <p className="modal-text">
                        Assigned Room: <strong>{newEvent.room || "No room assigned yet"}</strong>
                    </p>
                    <br />

                    <button className="modal-button add">Add Meeting</button>
                    <button className="modal-button cancel" onClick={() => setShowModal(false)}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
