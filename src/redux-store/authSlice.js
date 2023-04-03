import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    tokenId: null,
    fullName: null,
    photoUrl: null,
    verified: false,
    api_key: "AIzaSyCTW5LuWc52S9DpPQ2hVQuk23_8jUrhY0A"
}

const authSlice = createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {
        login_handler(state, action) {
            state.isLoggedIn = true;
            state.tokenId = action.payload.idToken;
            state.fullName = action.payload.fullName;
            state.photoUrl = action.payload.picture;
        },
        logout_handler(state) {
            state.isLoggedIn = false;
            state.tokenId = null;
            state.fullName = null;
            state.photoUrl = null;
            state.verified = false;
        },
        verification(state, action) {
            if (action.payload) {
                state.verified = true;
            }
            else {
                state.verified = false;
            }
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;