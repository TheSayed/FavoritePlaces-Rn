import { View, Text } from "react-native";
import React from "react";
import PlaceForm from "src/components/Places/PlaceForm/PlaceForm";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "src/navigation/MainStackParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaceType } from "src/models/places";

type AddPlacesNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "AddPlaces"
>;
const AddPlaces = () => {
  const navigation = useNavigation<AddPlacesNavigationProp>();
  const handleCreatePlace = (place: PlaceType) => {
    navigation.navigate("AllPlaces", place ? { place } : undefined);
  };
  return (
    <View style={{ flex: 1 }}>
      <PlaceForm onCreatePlace={handleCreatePlace} />
    </View>
  );
};

export default AddPlaces;
