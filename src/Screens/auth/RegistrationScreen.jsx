import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";

import { registerUser } from "../../redux/authOperations";

import Button from "../../components/Button";
import AddAvatarPhotoButtonIcon from "../../components/icons/AddAvatarPhotoButtonIcon";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setIsLoading(true);
    try {
      await dispatch(registerUser(state));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    setState(initialState);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const handleInputFocus = (inputKeyName) => {
    setIsFocused({
      [inputKeyName]: true,
    });
    setIsShowKeyboard(true);
  };

  const handleInputBlur = (inputKeyName) => {
    setIsFocused({
      [inputKeyName]: false,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/registrationbg.jpg")}
          style={styles.image}
        >
          <View>
            <Spinner visible={isLoading} />
            <KeyboardAvoidingView behavior={"padding"}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -90 : 0,
                }}
              >
                <View style={styles.header}>
                  <View style={styles.photoBox}>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                      <AddAvatarPhotoButtonIcon />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.headerText}>Registration</Text>
                </View>
                <View>
                  <TextInput
                    style={
                      isFocused.name
                        ? [styles.input, styles.inputFocused]
                        : styles.input
                    }
                    placeholder="Name"
                    placeholderTextColor="#BDBDBD"
                    value={state.name}
                    onFocus={() => handleInputFocus("login")}
                    onBlur={() => handleInputBlur("login")}
                    onChangeText={(value) => {
                      setState((prevState) => ({ ...prevState, name: value }));
                    }}
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={
                      isFocused.email
                        ? [styles.input, styles.inputFocused]
                        : styles.input
                    }
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    value={state.email}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                    onChangeText={(value) => {
                      setState((prevState) => ({ ...prevState, email: value }));
                    }}
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={
                      isFocused.password
                        ? [styles.input, styles.inputFocused]
                        : styles.input
                    }
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    value={state.password}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    secureTextEntry={isShowPassword ? false : true}
                  />
                  <Button
                    style={styles.showPasswordButton}
                    styleForButton={styles.showPasswordBtn}
                    styleForText={styles.showPasswordBtnText}
                    text={isShowPassword ? "Hide" : "Show"}
                    onPress={() => setIsShowPassword(!isShowPassword)}
                  />
                </View>
                <View>
                  <Button
                    styleForButton={styles.registerBtn}
                    styleForText={styles.registerBtnText}
                    text={"Sign up"}
                    onPress={handleSubmit}
                  />
                  <Button
                    styleForButton={styles.linkBtn}
                    styleForText={styles.linkBtnText}
                    text={"Already have an account? Sign in!"}
                    onPress={() => navigation.navigate("Login")}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    alignItems: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 40,
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
  addBtn: {
    position: "absolute",
    bottom: 12,
    right: -12,
    height: 25,
    width: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
  },

  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 16,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 16,
  },
  showPasswordBtnText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-regular-400",
  },
  registerBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  registerBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-regular-400",
  },
  linkBtn: {
    marginTop: 16,
    marginBottom: 78,
    justifyContent: "center",
    alignItems: "center",
  },
  linkBtnText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-regular-400",
  },
});

export default RegistrationScreen;
