import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "src/constants/Colors";

type OutlinedButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  onPress: () => void;
  containerStyle?: object;
};
const OutlinedButton = ({
  icon,
  children,
  onPress,
  containerStyle,
}: OutlinedButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyle ?? null]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <Ionicons name={icon} size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
    color: Colors.primary500,
  },
  text: {
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: "bold",
  },
});
