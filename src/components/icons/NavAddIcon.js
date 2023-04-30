import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NavAddIcon = ({ name, size, focused }) => {
  const backgroundColor = focused ? '#FF6C00' : 'transparent';
  const iconColor = focused ? 'white' : '#212121';

  return (
    <View
      style={{
        backgroundColor,
        width: size + 45,
        height: size + 16,
        borderRadius: (size + 10) / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AntDesign name={name} size={size} color={iconColor} />
    </View>
  );
};

export default NavAddIcon;