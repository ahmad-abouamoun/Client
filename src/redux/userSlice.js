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
        addFood: (state, action) => {
            state.user = {...state.user, favFoods: [...state.user.favFoods, action.payload]};
            console.log(state.user);
        },
        removeFood: (state, action) => {
            state.user = {...state.user, favFoods: state.user.favFoods.filter((food) => food !== action.payload)};
            console.log(state.user);
        },
        Logout: (state, action) => {},
    },
});

export const {setUser, Logout, addFood, removeFood} = userSlice.actions;
export default userSlice.reducer;
