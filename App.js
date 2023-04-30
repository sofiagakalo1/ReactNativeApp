import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

// import { StatusBar } from 'expo-status-bar';
import { Button } from "react-native";

import RegistrationScreen from "./src/Screens/auth/RegistrationScreen";
import LoginScreen from "./src/Screens/auth/LoginScreen";
import Home from "./src/Screens/Home";

import routes from "./src/routes";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
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
  return <NavigationContainer>{routes()}</NavigationContainer>;
}
