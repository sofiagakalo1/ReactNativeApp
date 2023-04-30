import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../src/Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/Home";
import CreatePostsScreen from './Screens/CreatePostsScreen';
import MapScreen from './Screens/MapScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PostsScreen from './Screens/PostsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const MainStack = createStackNavigator(); // вказує на групу навігаторів

const routes = ()=> {
    return (
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen name="Login" component={LoginScreen} options={{
              headerShown: false,
            }}/>
          <MainStack.Screen name="Home" component={Home} options={{
              headerShown: false,
            }}/>
        </MainStack.Navigator>
    );
  }
export default routes;