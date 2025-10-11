import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Place } from "../../../types/placeType";

type Props = {
  place: Place;
  onSelect: () => void;
};

const PlaceItem = ({ place, onSelect }: Props) => {
  const { imageUri, location, address, title } = place;
  return (
    <TouchableOpacity onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{location}</Text>
        <Text>{address}</Text>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
