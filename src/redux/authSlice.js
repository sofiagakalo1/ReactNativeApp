import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logInUser, logOutUser } from './authOperations';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: "", email: "" },
    uid: "",
    // stateChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.uid = payload.uid;
        state.stateChange = true;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.uid = payload.uid;
        state.stateChange = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        console.log("logOut");
        state.user = { name: "", email: "" };
        state.uid = "";
        state.stateChange = false;
      });
  },
});

export const authReducer = authSlice.reducer;
