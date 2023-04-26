import { Text, TouchableOpacity } from "react-native";

const Button = ({ styleForButton, styleForText, text, onPress }) => {
  return (
    <TouchableOpacity
      style={styleForButton}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styleForText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
