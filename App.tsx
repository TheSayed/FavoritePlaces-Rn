import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer as NavContainer } from "@react-navigation/native";
import MainStackNavigation from "./src/navigation/MainStackNavigation";
import { useEffect, useState } from "react";
import { init } from "src/utils/database";
import AppLoading from "expo-app-loading";
export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setIsDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!isDbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </>
  );
}
