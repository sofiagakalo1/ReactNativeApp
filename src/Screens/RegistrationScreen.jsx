import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const RegistrationScreen = () => {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/registrationbg.jpg")}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <Text style={styles.headerText}>Регистрация</Text>
            <View style={{ marginTop: 33 }}>
              <TextInput style={styles.input} placeholder="Логин" onFocus={()=>setIsShowKeyboard(true)}/>
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                onFocus={()=>setIsShowKeyboard(true)}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                onFocus={()=>setIsShowKeyboard(true)}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btn_text}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  form: {
    flex: 0.5,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    // borderStyle:solid,
    borderColor: "#E8E8E8",
    textAlign: "left",
    color: "#BDBDBD",
  },
  headerText: {
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default RegistrationScreen;
