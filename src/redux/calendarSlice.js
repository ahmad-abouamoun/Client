import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    calendar: false,
};
const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {},
});
export default calendarSlice.reducer;
