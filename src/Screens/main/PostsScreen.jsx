import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUID } from "../../redux/authSelectors";
import { logOutUser } from "../../redux/authOperations";
import { selectPosts } from "../../redux/postsSelector";
import { fetchAllPosts } from "../../redux/postsOperations";
import { setCurrentPostId } from "../../redux/postsSlice";

import { SimpleLineIcons, Feather } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const uid = useSelector(selectUID);
  const { posts } = useSelector(selectPosts);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(fetchAllPosts(uid));
  }, [uid]);

  if (!user) return;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Publications</Text>
        <TouchableOpacity
          style={styles.logOutBtn}
          activeOpacity={0.8}
          onPress={() => dispatch(logOutUser())}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <View>
          <Image
            source={require("../../images/User.jpg")}
            style={styles.userPhoto}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.loginName}>{user.name}</Text>
          <Text style={styles.loginEmail}>{user.email}</Text>
        </View>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.postListContent}>
          {posts.length ? (
            posts.map((post) => {
              return (
                <TouchableOpacity key={post.id} activeOpacity={1}>
                  <View style={styles.postContainer}>
                    <Image
                      source={{ uri: `${post.image}` }}
                      style={styles.postImage}
                    />
                    <View style={styles.postInfoContainer}>
                      <Text style={styles.postTitle}>{post.title}</Text>
                      <View style={styles.postInfo}>
                        <View style={styles.postComments}>
                          <Text style={styles.postCommentsCount}>
                            {post.comments.length}
                          </Text>
                          <SimpleLineIcons
                            style={{
                              transform: [{ rotateY: "180deg" }],
                            }}
                            name="bubble"
                            size={18}
                            color="#BDBDBD"
                            onPress={() => {
                              dispatch(setCurrentPostId(post.id));
                              navigation.navigate("Comments");
                            }}
                          />
                        </View>
                        {post.location ? (
                          <View style={styles.postLocation}>
                            <Text style={styles.postLocationText}>
                              {post.location.country}
                            </Text>
                            <SimpleLineIcons
                              name="location-pin"
                              size={18}
                              color="#BDBDBD"
                              onPress={() => {
                                navigation.navigate("Map", {
                                  coordinates: post.location.coordinates,
                                  region: post.location.region,
                                });
                              }}
                            />
                          </View>
                        ) : (
                          <View></View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>no posts</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
// const renderItem = ({ item }) => {
//   return (
//     <View style={styles.postContainer}>
//       <Image source={item.photo} style={styles.postImage} />
//       <View style={styles.postInfoContainer}>
//         <Text style={styles.postTitle}>{item.title}</Text>
//         <View style={styles.postInfo}>
//           <View style={styles.postComments}>
//             <Text style={styles.postCommentsCount}>{item.comments}</Text>
//             <SimpleLineIcons
//               onPress={() => navigation.navigate("Comments", item)}
//               style={{
//                 transform: [{ rotateY: "180deg" }],
//               }}
//               name="bubble"
//               size={18}
//               color="#BDBDBD"
//             />
//           </View>
//           <View style={styles.postLocation}>
//             <Text style={styles.postLocationText}>{item.location}</Text>
//             <SimpleLineIcons
//               name="location-pin"
//               size={18}
//               color="#BDBDBD"
//               onPress={() => navigation.navigate("Map", item)}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
{
  /* <FlatList
    data={Object.values(myPost)}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    style={styles.postList}
    contentContainerStyle={styles.postListContent}
  /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: screenWidth,
    height: 88,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  headerText: {
    position: "absolute",
    top: 55,
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
    width: screenWidth,
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
    width: screenWidth,
    marginBottom: 32,
    justifyContent: "center",
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
    lineHeight: 18.75,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    marginTop: 11,
  },
  postComments: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  postCommentsCount: {
    fontFamily: "Roboto-regular-400",
    color: "#BDBDBD",
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 18.75,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationText: {
    fontFamily: "Roboto-regular-400",
    textDecorationLine: "underline",
    marginRight: 5,
    fontSize: 16,
    lineHeight: 18.75,
  },
});

export default PostsScreen;
