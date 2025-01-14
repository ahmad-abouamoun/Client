import React, {useEffect, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {format, parse, startOfWeek, getDay, addMinutes, setHours, setMinutes, addHours} from "date-fns";
import {enUS} from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookingPage.css";
import {useDispatch} from "react-redux";
import {handleCalendar} from "../redux/calendarSlice";

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {"en-US": enUS},
});

const BookingPage = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();

    const [events, setEvents] = useState([]);
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
        nutritionist: "101",
        therapist: "102",
        coach: "103",
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

    const handleMeetingTypeChange = (e) => {
        const selectedType = e.target.value;
        const assignedRoom = Experts[selectedType] || "";

        setNewEvent({
            ...newEvent,
            type: selectedType,
            room: assignedRoom,
        });
    };

    const handleEventSubmit = async () => {
        if (newEvent.start && newEvent.end && newEvent.type && newEvent.room) {
            const meetingData = {
                token,
                title: newEvent.title,
                startDate: newEvent.start,
                endDate: newEvent.end,
                expert: newEvent.type,
                room: newEvent.room,
            };
            try {
                const response = await fetch("http://localhost:8080/meetings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(meetingData),
                });
                const data = await response.json();
                if (data.status !== "failed") {
                    setEvents([
                        ...events,
                        {
                            ...newEvent,
                            title: `${newEvent.type} (${newEvent.room})`,
                        },
                    ]);
                }
                setNewEvent({title: "Meeting", start: "", end: "", type: "", room: ""});
                setShowModal(false);
            } catch (error) {
                alert(error);
            }
        } else {
            alert("Please fill out all fields.");
        }
    };

    const handleSlotSelect = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setNewEvent({title: "Meeting", start: "", end: "", type: "", room: ""});
        setShowModal(true);
    };

    return (
        <div className="calendar">
            <button
                onClick={() => {
                    dispatch(handleCalendar(false));
                }}
                className="close-calendar"
            >
                &times;
            </button>
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

                    <label className="modal-label">
                        Choose Expert you want to meet:
                        <select value={newEvent.type} onChange={handleMeetingTypeChange} className="modal-select">
                            <option value="">-- Select Type --</option>
                            {meetingOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />

                    <p className="modal-text">
                        Assigned Room: <strong>{newEvent.room || "No room assigned yet"}</strong>
                    </p>
                    <br />
                    <button className="modal-button cancel" onClick={() => setShowModal(false)}>
                        Cancel
                    </button>
                    <button className="modal-button add" onClick={handleEventSubmit}>
                        Add Meeting
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
