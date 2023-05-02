import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const user = {
  id: "00034242",
  email: "email@example.com",
  nickname: "Natali Romanova",
  photo: require("../../images/user-2.jpeg"),
};

const userPosts = [
  {
    id: "1",
    photo: require("../../images/my-post-1.jpeg"),
    title: "Лес",
    location: "Ukraine",
    comments: "32",
    likes: "50",
  },
  {
    id: "2",
    photo: require("../../images/my-post-2.jpeg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: "88",
    likes: "32",
  },
  {
    id: "3",
    photo: require("../../images/my-post-3.jpeg"),
    title: "Старый домик в Венеции",
    location: "Italy",
    comments: "98",
    likes: "32",
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { email, nickname, photo } = user;
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Image source={item.photo} style={styles.postImage} />
        <View style={styles.postInfoContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postInfo}>
            <View style={styles.postInfo}>
              <View style={styles.postComments}>
                <Text
                  style={styles.postCommentsCount}
                  onPress={() => navigation.navigate("Comments")}
                >
                  {item.comments}
                </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Feather
                    name="message-circle"
                    size={18}
                    color="#FF6C00"
                    fill="#FFFFFF"
                    style={{
                      transform: [{ rotate: "270deg" }],
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.postLikes}>
                <Text style={styles.postLikesCount}>{item.likes}</Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Feather name="thumbs-up" size={18} color="#FF6C00" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.postLocation}>
              <Text
                style={styles.postLocationText}
                onPress={() => navigation.navigate("Map")}
              >
                {item.location}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Map")}
              >
                <Feather name="map-pin" size={18} color="#FF6C00" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../images/registrationbg.jpg")}
        style={styles.image}
      >
        <View>
          <View style={styles.profileBlock}>
            <View style={styles.header}>
              <View style={styles.photoBox}>
                <Image source={photo} style={styles.userPhoto} />
                <TouchableOpacity
                  style={styles.PhotoBtn}
                  activeOpacity={0.8}
                  onPress={() => console.log("add photo")}
                >
                  <SimpleLineIcons name="close" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.logOutBtn} activeOpacity={0.8}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{nickname}</Text>
            </View>
          </View>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <FlatList
              data={userPosts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.postList}
              contentContainerStyle={styles.postListContent}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profileBlock: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 150,
  },
  header: {
    alignItems: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 30,
    lineHeight: 35.16,
    letterSpacing: "1%",
    color: "#212121",
    fontFamily: "Roboto-medium-500",
  },
  photoBox: {
    position: "absolute",
    top: -152,
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userPhoto: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  PhotoBtn: {
    position: "absolute",
    bottom: 12,
    right: -12,
    height: 25,
    width: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
  },
  logOutBtn: {
    position: "absolute",
    top: -70,
    right: 16,
    width: 24,
    height: 24,
  },
  postListContent: {
    backgroundColor: "#ffffff",
    width: screenWidth,
    marginBottom: 32,
    alignItems: "center",
  },
  postContainer: {
    marginBottom: 34,
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
    fontSize: 16,
    lineHeight: 19,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
    alignItems: "flex-end",
  },
  postComments: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  postCommentsCount: {
    fontFamily: "Roboto-regular-400",
    color: "#212121",
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 19,
  },
  postLikes: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginRight: 24,
  },
  postLikesCount: {
    fontFamily: "Roboto-regular-400",
    color: "#212121",
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 19,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  postLocationText: {
    fontFamily: "Roboto-regular-400",
    textDecorationLine: "underline",
    marginRight: 5,
    fontSize: 16,
    lineHeight: 19,
  },
});

export default ProfileScreen;
