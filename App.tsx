import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer as NavContainer } from "@react-navigation/native";
import MainStackNavigation from "./src/navigation/MainStackNavigation";
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
