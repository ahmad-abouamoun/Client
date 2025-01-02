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
    return (
        <div>
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
                selectable
                min={new Date(2024, 0, 1, 8, 0)}
                max={new Date(2024, 0, 1, 18, 0)}
                step={30}
            />
        </div>
    );
};

export default BookingPage;
