import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        notify: ""
    },
    reducers: {
        login(state, action) {
            state.isLogin = action.payload;
        },
        getNotified(state, action) {
            state.notify = action.payload;
        }
    }
})

export const { login, getNotified } = authSlice.actions;
export default authSlice.reducer;