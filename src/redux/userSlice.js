import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
};
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        addFood: (state, action) => {
            state.user = {...state.user, favFoods: [...state.user.favFoods, action.payload]};
        },
        removeFood: (state, action) => {
            state.user = {...state.user, favFoods: state.user.favFoods.filter((food) => food !== action.payload)};
        },
        addProgram: (state, action) => {
            state.user = {...state.user, favPrograms: [...state.user.favPrograms, action.payload]};
        },
        removeProgram: (state, action) => {
            state.user = {
                ...state.user,
                favPrograms: state.user.favPrograms.filter((program) => program !== action.payload),
            };
        },
        Logout: (state, action) => {},
    },
});

export const {setUser, Logout, addFood, removeFood, removeProgram, addProgram} = userSlice.actions;
export default userSlice.reducer;
