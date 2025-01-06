import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        calendar: calendarReducer,
    },
});
