import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { storage } from "../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";
import {
  setDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const post = { ...doc.data(), id: doc.id };

        posts.push(post);
      });

    //   console.log(posts);
      return posts;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ uid, newPost }, { rejectWithValue }) => {
    try {
      const response = await fetch(newPost.image);
      const image = await response.blob();
      await uploadBytes(
        ref(storage, "postsImages/" + image._data.blobId),
        image
      );
      const imageURL = await getDownloadURL(
        ref(storage, "postsImages/" + image._data.blobId)
      );

      const post = {
        ...newPost,
        image: imageURL,
        userId: uid,
      };

      setDoc(doc(db, "posts", post.id), post);

      return post;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ currentPostId, comment }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, "posts", currentPostId), {
        comments: arrayUnion({ ...comment }),
      });

      return { currentPostId, comment };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const addLike = createAsyncThunk(
  "posts/addLike",
  async ({ id }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, "posts", id), {
        likesCount: increment(1),
      });

      return id;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const setCurrentPostId = createAction("posts/setCurrentPostId", (id) => ({
  payload: { id },
}));

export { fetchAllPosts, addPost, addComment, addLike };
