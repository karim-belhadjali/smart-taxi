import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state, action) => {
      state.travelTimeInfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfo } =
  navigationSlice.actions;

export const selectOrigin = (state) => state.navigation.origin;
export const selectDestination = (state) => state.navigation.destination;
export const selectTravelTimeInfo = (state) => state.navigation.travelTimeInfo;

export default navigationSlice.reducer;
