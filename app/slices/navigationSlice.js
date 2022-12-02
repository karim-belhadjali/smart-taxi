import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
  currentLocation: "Waiting..",
  currentUser: null,
  driverLocation: null,
  userInfo: null,
  version: null,
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
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setDriverLocation: (state, action) => {
      state.driverLocation = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setVersion: (state, action) => {
      state.version = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInfo,
  setCurrentLocation,
  setCurrentUser,
  setDriverLocation,
  setUserInfo,
  setVersion,
} = navigationSlice.actions;

export const selectOrigin = (state) => state.navigation.origin;
export const selectDestination = (state) => state.navigation.destination;
export const selectTravelTimeInfo = (state) => state.navigation.travelTimeInfo;
export const selectCurrentUser = (state) => state.navigation.currentUser;
export const selectUserInfo = (state) => state.navigation.userInfo;
export const selectDriverLocation = (state) => state.navigation.driverLocation;
export const selectVersion = (state) => state.navigation.version;
export const selectCurrentLocation = (state) =>
  state.navigation.currentLocation;

export default navigationSlice.reducer;
