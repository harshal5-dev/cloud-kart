import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.getItem("themeMode") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      localStorage.setItem("themeMode", action.payload.themeMode);
      state.themeMode = action.payload.themeMode;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
