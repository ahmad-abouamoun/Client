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

    const generateTimeOptions = () => {
        const times = [];
        let currentTime = new Date();
        currentTime.setHours(8, 0, 0, 0);

        while (currentTime.getHours() < 18) {
            times.push(format(new Date(currentTime), "HH:mm"));
            currentTime = addMinutes(currentTime, 30);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const handleStartTimeChange = (e) => {
        const selectedTime = e.target.value;
        const [hours, minutes] = selectedTime.split(":");

        const startDate = setHours(setMinutes(selectedDate, Number(minutes)), Number(hours));
        const endDate = addMinutes(startDate, 30);

        setNewEvent({
            ...newEvent,
            start: startDate,
            end: endDate,
        });
    };

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

                    <label className="modal-label">
                        Select time to start:
                        <select
                            value={newEvent.start ? format(newEvent.start, "HH:mm") : ""}
                            onChange={handleStartTimeChange}
                            className="modal-select"
                        >
                            <option value="">-- Select Time --</option>
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />

                    <label className="modal-label">
                        Time to end will be:
                        <input
                            type="text"
                            value={newEvent.end ? format(newEvent.end, "HH:mm") : ""}
                            disabled
                            className="modal-input"
                        />
                    </label>
                    <br />

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
