import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const user = {
  id: "00034242",
  email: "email@example.com",
  nickname: "Natali Romanova",
  photo: require("../images/User.jpg"),
};

const userPosts = [
  {
    id: "1",
    photo: require("../images/my-post-1.jpeg"),
    title: "Лес",
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: "32",
    likes: "32",
  },
  {
    id: "2",
    photo: require("../images/my-post-2.jpeg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: "88",
    likes: "32",
  },
  {
    id: "3",
    photo: require("../images/my-post-3.jpeg"),
    title: "Старый домик в Венеции",
    location: "Italy",
    comments: "98",
    likes: "32",
  },
];

const PostsScreen = () => {
  const { email, nickname, photo } = user;
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Image source={item.photo} style={styles.postImage} />
        <View style={styles.postInfoContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postInfo}>
            <View style={styles.postComments}>
              <Text style={styles.postCommentsCount}>{item.comments}</Text>
              <SimpleLineIcons
                style={{
                  transform: [{ rotateY: "180deg" }],
                }}
                name="bubble"
                size={18}
                color="#BDBDBD"
              />
            </View>
            <View style={styles.postLocation}>
              <Text style={styles.postLocationText}>{item.location}</Text>
              <SimpleLineIcons name="location-pin" size={18} color="#BDBDBD" />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публикации</Text>
        <TouchableOpacity style={styles.logOutBtn} activeOpacity={0.8}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <View>
          <Image source={photo} style={styles.userPhoto} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.loginName}>{nickname}</Text>
          <Text style={styles.loginEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.postList}
        contentContainerStyle={styles.postListContent}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#E5E5E5",
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
  postListContent: {
    // backgroundColor: "red",
    width: screenWidth,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    marginBottom: 34,
    // paddingHorizontal: 16,
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postInfoContainer: {
    marginTop: 8,
  },
  postsTitle: {
    fontFamily: "Roboto-medium-500",
    fontSize:16,
    lineHeight:18.75,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    marginTop:11,
  },
  postComments: {
    flexDirection: "row-reverse",
    alignItems: "center",
    // gap: 5,
  },
  postCommentsCount: {
    fontFamily: "Roboto-regular-400",
    color: "#BDBDBD",
    marginLeft:5,
    fontSize:16,
    lineHeight:18.75,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 4,
  },
  postLocationText: {
    fontFamily: "Roboto-regular-400",
    textDecorationLine: "underline",
    marginRight:5,
    fontSize:16,
    lineHeight:18.75,
  },
});

export default PostsScreen;
