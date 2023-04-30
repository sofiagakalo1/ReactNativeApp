import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import MapScreen from "./MapScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const Home = () => {
  // const {
  //   params: { login, email },
  // } = useRoute();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
