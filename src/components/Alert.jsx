import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

export const AlertModal = ({ errorName, errorText }) => {
  //   console.log("Alert modal---->", errorName);
  //   console.log("errorName---->", errorName);
  //   console.log("errorText---->", errorText);

  const createTwoButtonAlert = () =>
    Alert.alert(
      errorName,
      errorText,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>{createTwoButtonAlert()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
});
