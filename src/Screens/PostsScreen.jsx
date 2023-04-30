import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Tabs = createBottomTabNavigator();

const userPosts = [
  {
    id: "1",
    photo: "https://placekitten.com/g/639/480",
    title: "My cat",
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: "19",
    likes: "322",
  },
  {
    id: "2",
    photo: "https://placekitten.com/g/640/480",
    title: "My cat 2",
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: "8",
    likes: "32",
  },
  {
    id: "3",
    photo: "https://placekitten.com/g/641/480",
    title: "My cat 3",
    location: "Kyiv, Ukraine",
    comments: "10",
    likes: "32",
  },
  {
    id: "4",
    photo: "https://placekitten.com/g/649/480",
    title: "My cat 3",
    location: "Kyiv, Ukraine",
    comments: "33",
    likes: "71",
  },
];

const PostsScreen = () => {
//   const {
//     params: { login, email },
//   } = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публикации</Text>
        <TouchableOpacity style={styles.logOutBtn} activeOpacity={0.8}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <View>
          <Image
            source={require("../images/User.jpg")}
            style={styles.userPhoto}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.loginName}>lalala</Text>
          <Text style={styles.loginEmail}>blalalal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: 88,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomColor: "#eee",
  },
  headerText: {
    position: "absolute",
    marginHorizontal: 140,
    top: 55,
    marginBottom: 11,
    fontFamily: "Roboto-medium-500",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 500,
    letterSpacing: -0.41,
    color: "#212121",
  },
  logOutBtn: {
    position: "absolute",
    top: 55,
    right: 16,
    width: 24,
    height: 24,
  },
  userContainer: {
    // backgroundColor: "red",
    width: screenWidth,
    marginTop: 88,
    height: 124,
    flexDirection: "row",
    alignContent: "center",
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 8,
    marginTop: 32,
  },
  userInfoContainer: {
    justifyContent: "center",
  },
  loginName: {
    fontFamily: "Roboto-bold-700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  loginEmail: {
    fontFamily: "Roboto-regular-400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  userPosts: {
    paddingLeft: 26,
    paddingRight: 26,
    marginBottom: 32,
  },
  postsPhoto: {
    width: 340,
    height: 230,
    borderRadius: 8,
  },
  postsTitle: {
    // fontFamily: "Roboto-Medium",
    marginTop: 8,
    marginBottom: 12,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    paddingRight: 8,
  },
  feedback: { flexDirection: "row", gap: 8, marginRight: 10 },
  comments: { flexDirection: "row-reverse", alignItems: "center", gap: 4 },
  commentsCount: {
    // fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  location: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: {
    // fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;