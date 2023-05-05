import "react-native-gesture-handler";
import { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase/config";
// import { onAuthStateChanged } from "firebase/auth";
// import { selectStateChanged } from "./redux/auth/authSelectors";
// import { logIn, checkUser } from "./redux/auth/authOperations";

import RegistrationScreen from "../src/Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/main/Home";

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();

const MainStack = createStackNavigator(); // вказує на групу навігаторів

const routes = (isAuthUser) => {
  console.log("isAuthUser------->", isAuthUser);
  // const dispatch = useDispatch();
  // const stateChange = useSelector(selectStateChanged);
  // const routing = useRoute(stateChange);

  //   useEffect(() => {
  //     dispatch(checkUser());
  // }, []);
  if (!isAuthUser) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};
export default routes;
