import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { Colors } from "src/constants/Colors";

interface FormButtonProps {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

const MainButton: React.FC<FormButtonProps> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary800, // primary blue
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
