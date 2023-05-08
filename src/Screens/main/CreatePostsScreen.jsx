import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import uuid from "react-native-uuid";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { selectUID } from "../../redux/authSelectors";
import { addPost } from "../../redux/postsOperations";

import { SimpleLineIcons, Feather, MaterialIcons } from "@expo/vector-icons";

import Button from "../../components/Button";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CreatePostsScreen = ({ navigation}) => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);
  const [post, setPost] = useState({
    image: null,
    title: "",
    comments: [],
    likesCount: 0,
    location: "",
    id: null,
  });
  const [cameraRef, setCameraRef] = useState(null);
  const [hasCameraPermission, setCameraHasPermission] =
    Camera.useCameraPermissions();
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [isFocused, setIsFocused] = useState({
    title: false,
    location: false,
  });

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    // console.log("Location status------>", status);
    setHasLocationPermission(true);
  };
  const getCameraPermisiion = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    // console.log("Camera status------>", status);
    await MediaLibrary.requestPermissionsAsync();
    setCameraHasPermission(status === granted);
  };

  useEffect(() => {
    (async () => {
      await getCameraPermisiion();
      await getLocationPermission();
    })();
  }, []);

  const takePhoto = async () => {
    if (post.image) return;
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      // console.log("image------->", uri);
      setPost((state) => ({
        ...state,
        image: uri,
      }));
    }
  };
  const getLocation = async () => {
    if (hasLocationPermission === false) {
      return <Text>No access to location</Text>;
    }
    const location = await Location.getCurrentPositionAsync({});
    // console.log("location------->", location);
    const coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    const locationRegion = await Location.reverseGeocodeAsync(coordinates);
    const region = locationRegion[0].region;
    const country = locationRegion[0].country;

    setPost((state) => ({
      ...state,
      location: { coordinates, region, country },
    }));
  };

  const addPhoto = () => {
    takePhoto();
    getLocation();
  };

  const editPhoto = () => {
    setPost((state) => ({ ...state, image: "", title: "", location: null }));
  };

  const onInputChange = (value) => {
    // console.log("inputValue------>", value)
    setPost((state) => ({ ...state, ...value }));
  };

  const handleSubmit = () => {
    if (!post.image || !post.title) {
      return;
    }
    const newPost = {
      ...post,
      id: uuid.v4(8),
    };
    console.log("newPost------->", post);
    dispatch(addPost({ uid, newPost }));

    handleClear();
    navigation.navigate("Posts");
  };

  const handleClear = () => {
    setPost({
      image: "",
      title: "",
      comments: [],
      likesCount: 0,
      location: null,
      id: null,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Posts")}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="#212121"
            strokeWidth={1}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Создать публикацию</Text>
      </View>
      <View style={styles.creenContainer}>
        {!post.image ? (
          <Camera ref={setCameraRef} style={styles.camera}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                onPress={() => addPhoto()}
                activeOpacity={0.8}
                style={styles.cameraIconWrapper}
              >
                <MaterialIcons
                  style={styles.cameraIcon}
                  name="camera-alt"
                  size={24}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={styles.imageWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cameraIconWrapper}
            >
              <MaterialIcons
                style={styles.cameraIcon}
                name="camera-alt"
                size={24}
                color={"#FFFFFF"}
              />
            </TouchableOpacity>
            <Image
              // source={require("../../images/my-post-1.jpeg")}
              source={{ uri: post.image }}
              style={styles.image}
            />
          </View>
        )}
        <Text
          style={styles.text}
          onPress={() => {
            editPhoto();
          }}
        >
          {post.image ? "Редактировать фото" : "Загрузите фото"}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={
              isFocused.title
                ? [styles.input, styles.inputFocused]
                : styles.input
            }
            placeholder="Название..."
            placeholderTextColor={"#BDBDBD"}
            value={post.title}
            onChangeText={(value) => onInputChange({ title: value })}
          />
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="Местность..."
            placeholderTextColor={"#BDBDBD"}
            value={
              post.location
                ? `${post.location.region}, ${post.location.country}`
                : ""
            }
          />
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            size={18}
            color="#BDBDBD"
          />
        </View>

        <TouchableOpacity activeOpacity={!post.image ? 1 : 0.8}>
          <Button
            styleForButton={[
              styles.publishBtn,
              !post.image || !post.title ? styles.disabledPublishBtn : null,
            ]}
            styleForText={[
              styles.publishBtnText,
              !post.image || !post.title ? styles.disabledPublishBtnText : null,
            ]}
            text={"Опубликовать"}
            onPress={handleSubmit}
          />
        </TouchableOpacity>

        <View style={styles.deleteBtnWrapper}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleClear}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  creenContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
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
  camera: {
    width: "100%",
    height: 230,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageWrapper: {
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
  imagePlaceholder: {
    fontSize: 18,
    color: "#BDBDBD",
  },
  cameraIconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF70",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  // cameraIcon:{},
  text: {
    marginTop: 8,
    fontFamily: "Roboto-regular-400",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  inputWrapper: {
    marginTop: 32,
  },
  input: {
    height: 50,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 0,
    fontFamily: "Roboto-regular-400",
  },
  locationIcon: {
    position: "absolute",
    bottom: 15,
  },
  locationInput: {
    paddingLeft: 24,
  },
  publishBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  publishBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-regular-400",
  },
  disabledPublishBtn: {
    backgroundColor: "#F6F6F6",
  },
  disabledPublishBtnText: {
    color: "#BDBDBD",
  },
  deleteBtnWrapper: {
    marginTop: 120,
    alignItems: "center",
  },
  deleteBtn: {
    width: 70,
    backgroundColor: "#F6F6F6",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
});
