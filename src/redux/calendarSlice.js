import {createSlice} from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";

const initialState = {
    calendar: false,
};
const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        handleCalendar: (state, action) => {
            state.calendar = action.payload;
        },
    },
});
export const {handleCalendar} = calendarSlice.actions;

export default calendarSlice.reducer;
