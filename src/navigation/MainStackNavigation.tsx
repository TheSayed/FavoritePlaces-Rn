import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "../screens/AllPlaces/AllPlaces";
import AddPlaces from "../screens/AddPlaces/AddPlaces";
import IconButton from "../components/UI/IconButton/IconButton";
import { Colors } from "src/constants/Colors";
import Map from "src/screens/Map/Map";
import { MainStackParamList } from "./MainStackParams";

const Stack = createNativeStackNavigator<MainStackParamList>();
const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor ?? "#000"}
              onPress={() => navigation.navigate("AddPlaces")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlaces"
        component={AddPlaces}
        options={{
          title: "Add a New Place",
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "MAP",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
