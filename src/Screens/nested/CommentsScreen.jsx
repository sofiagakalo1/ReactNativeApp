import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";

import uuid from "react-native-uuid";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUID } from "../../redux/authSelectors";
import { selectPosts, selectCurrentPostId } from "../../redux/postsSelector";
import { addComment } from "../../redux/postsOperations";

import { Feather, AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CommentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  const uid = useSelector(selectUID);
  const { posts } = useSelector(selectPosts);
  const currentPostId = useSelector(selectCurrentPostId);
  const currentPost = posts.find((post) => post.id === currentPostId);

  const [commentText, setCommentText] = useState("");

  const publishComment = () => {
    if (!commentText) {
      alert("Write something ^_^");
      return;
    }

    const newComment = {
      id: uuid.v4(8),
      author: name,
      addedOn: Date.now(),
      commentText,
    };

    Keyboard.dismiss();
    dispatch(addComment({ uid, currentPostId, comment: newComment }));
    setCommentText("");
  };

  if (!currentPost) return;

  const areComments = Boolean(currentPost.comments.length);

  const renderItem = ({ item }) => {
    const currentUser = name;

    const isCurrentUser = () => {
      if (currentUser === item.name) {
        return true;
      }
      return false;
    };

    return (
      <View
        style={
          isCurrentUser()
            ? styles.commentContainer
            : styles.commentContainerRight
        }
      >
        <View>
          <Image
            style={
              isCurrentUser() ? styles.commentAvatar : styles.commentAvatarRight
            }
            source={{ uri: item.avatar }}
          />
        </View>
        <View style={styles.commentTextContainer}>
          <Text style={styles.commentAuthor}>{item.author}</Text>
          <Text style={styles.commentText}>{item.commentText}</Text>
          <Text
            style={
              isCurrentUser() ? styles.commentCurrentDate : styles.commentDate
            }
          >
            {item.date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Profile")}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="#212121"
            strokeWidth={1}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Comments</Text>
      </View>
      <View style={styles.screenContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${currentPost.image}` }}
            style={styles.image}
          />
        </View>

        <View style={styles.commentsWrapper}>
          {areComments ? (
            <ScrollView>
              <View>
                <FlatList
                  data={currentPost.comments}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  style={styles.commentsList}
                  contentContainerStyle={styles.commentsListContent}
                />
              </View>
            </ScrollView>
          ) : (
            <Text style={{ alignSelf: "center" }}>No comments yet^^</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            onChangeText={(value) => setCommentText(value)}
            placeholderTextColor="#BDBDBD"
            value={commentText}
          />
          <TouchableOpacity style={styles.button} onPress={publishComment}>
            <AntDesign name="arrowup" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenContainer: {
    paddingHorizontal: 16,
    height: windowHeight,
    alignContent: "center",
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
    letterSpacing: -0.41,
    color: "#212121",
  },
  goBackBtn: {
    position: "absolute",
    top: 55,
    left: 16,
    width: 24,
    height: 24,
  },
  imageWrapper: {
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    height: 230,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#BDBDBD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  commentsWrapper: {},
  //   commentsList: {},
  commentsListContent: {
    height: 450,
  },
  commentContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  commentContainerRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingLeft: 16,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 25,
    marginLeft: 16,
  },
  commentAvatarRight: {
    width: 28,
    height: 28,
    borderRadius: 25,
    marginRight: 16,
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 16,
  },
  commentAuthor: {
    fontWeight: "bold",
    fontFamily: "Roboto-regular-400",
  },
  commentText: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "Roboto-regular-400",
    fontSize: 14,
  },
  commentDate: {
    color: "#BDBDBD",
    textAlign: "right",
    fontSize: 10,
    fontFamily: "Roboto-regular-400",
  },
  commentCurrentDate: {
    color: "#BDBDBD",
    textAlign: "left",
    fontSize: 10,
    fontFamily: "Roboto-regular-400",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    position: "relative",
    bottom: 0,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 150,
    padding: 10,
    backgroundColor: "#F7F7F7",
  },
  button: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF6C00",
    padding: 12,
    borderRadius: 50,
  },
});

export default CommentsScreen;
