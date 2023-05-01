import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreatePostsScreen from "./CreatePostsScreen";
import MapScreen from "./MapScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import NavProfileIcon from "../components/icons/NavProfileIcon";
import NavPostsIcon from "../components/icons/NavPostsIcon";
import NavAddIcon from "../components/icons/NavAddIcon";

const Home = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return null; // return null to hide the icon
          },
        }}
      >
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <NavPostsIcon name="appstore-o" size={24} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <NavAddIcon name="plus" size={24} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <NavProfileIcon name="user" size={24} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
