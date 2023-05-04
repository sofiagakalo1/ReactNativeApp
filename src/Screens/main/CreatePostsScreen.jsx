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
} from "react-native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import { useNavigation } from "@react-navigation/native";
import {
  SimpleLineIcons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import Button from "../../components/Button";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CreatePostsScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(``);
  const [coordinates, setCoordinates] = useState({});
  const [isFocused, setIsFocused] = useState({
    title: false,
    location: false,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (image) return;
    const image = await cameraRef.current.takePictureAsync();
    setImage(image.uri);
    await MediaLibrary.createAssetAsync(image.uri);
  };
  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const myCoordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const locationName = await Location.reverseGeocodeAsync(myCoordinates);
    const region = locationName?.[0]?.region ?? "";
    const country = locationName?.[0]?.country ?? "";

    setLocation(`${region}, ${country}`);
    setCoordinates(myCoordinates);
  };

  const addPhoto = () => {
    takePhoto();
    getLocation();
  };

  const editPhoto = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (!image || !title) {
      return;
    }
    console.log(coordinates);
    console.log(location);
    console.log("submit");

    const newPost = {
      id: `${Date.now()}`,
      image,
      title,
      comments: [],
      likesCount: 0,
      location,
      coordinates,
    };

    console.log(newPost);
    handleClear();
    navigation.navigate("Posts", { newPost });
  };

  const handleClear = () => {
    setImage(null);
    setTitle("");
    setLocation(``);
    setCoordinates({});
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
        {!image ? (
          <Camera ref={setCameraRef} style={styles.camera}>
            <View
              style={styles.imageWrapper}
            >
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
              source={{ uri: image }}
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
          {image ? "Редактировать фото" : "Загрузите фото"}
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
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="Местность..."
            placeholderTextColor={"#BDBDBD"}
            value={location}
            onChangeText={setLocation}
          />
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            size={18}
            color="#BDBDBD"
          />
        </View>

        <TouchableOpacity activeOpacity={!image ? 1 : 0.8}>
          <Button
            styleForButton={[
              styles.publishBtn,
              !image || !title ? styles.disabledPublishBtn : null,
            ]}
            styleForText={[
              styles.publishBtnText,
              !image || !title ? styles.disabledPublishBtnText : null,
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
    fontWeight: 500,
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

export default CreatePostsScreen;
