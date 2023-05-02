import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MapScreen = ({ route }) => {
  const navigation = useNavigation();
  const { coordinates, title } = route.params;

  // const coordinates = {
  //   latitude: 50.450001,
  //   longitude: 30.523333,
  // };
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Kyiv</Text>
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
        </View>

        <Marker coordinate={coordinates} title="Kyiv" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  goBackBtn: {
    position: "absolute",
    top: 55,
    left: 16,
    width: 24,
    height: 24,
  },
});

export default MapScreen;
