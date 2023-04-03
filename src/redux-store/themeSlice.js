import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: true
}

const themeSlice = createSlice({
    name: "Theme",
    initialState: initialState,
    reducers: {
        changeTheme(state) {
            state.mode = !state.mode;
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;