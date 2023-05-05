import "react-native-gesture-handler";
import React from 'react';
import { useState } from 'react';

import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

import { auth } from './src/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

// import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// import { Text } from "react-native";
import { store } from "./src/redux/store";

import routes from "./src/routes";

export default function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, user => setUser(user));

  const [fontsLoaded] = useFonts({
    "Roboto-regular-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-medium-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-bold-700": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const routing = routes(user);
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
