import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AlertModal } from "../components/Alert";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const { name, email, password } = userData;
    // console.log("userData---------->", userData);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response.user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      const userData = {
        user: {
          name: response.user.displayName,
          email: response.user.email,
        },
        uid: response.user.uid,
      };

      return userData;
    } catch (error) {
      // console.log("error.message------>", error.message.split(": ")[1]);
      AlertModal({
        errorName: "register error",
        errorText: error.message.split(": ")[1],
      });
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    console.log("userData---------->", userData);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const userData = {
        user: {
          name: response.user.displayName,
          email: response.user.email,
        },
        uid: response.user.uid,
      };

      return userData;
    } catch (error) {
      AlertModal({
        errorName: "login error",
        errorText: error.message.split(": ")[1],
      });
      // console.log("login error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      AlertModal({
        errorName: "logout error",
        errorText: error.message.split(": ")[1],
      });
      // console.log("logout error ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const userProfileUpdate = () => async (dispatch, _) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const userData = {
        user: { name: user.displayName, email: user.email },
        uid: user.uid,
      };

      dispatch(logIn(userData));
    });
  } catch (error) {
    AlertModal({
      errorName: "update error",
      errorText: error.message.split(": ")[1],
    });
    // console.log("4: ", error.message);
    return rejectWithValue(error.message);
  }
};
