import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSwitchOn: false,
};

const switchSlice = createSlice({
  name: "switch",
  initialState,
  reducers: {
    toggleSwitch: (state) => {
      state.isSwitchOn = !state.isSwitchOn;
    },
  },
});

export const { toggleSwitch } = switchSlice.actions;
export const switchReducer = switchSlice.reducer;
