import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

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
      console.log("register error", error.message);
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
      console.log("login error", error.message);
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
      console.log("logout error ", error.message);
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
    console.log("4: ", error.message);
    return rejectWithValue(error.message);
  }
};
