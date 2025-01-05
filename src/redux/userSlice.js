import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
};
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        Logout: (state, action) => {},
    },
});

export const {setUser, Logout} = userSlice.actions;
export default userSlice.reducer;
