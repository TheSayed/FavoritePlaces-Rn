import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { PlaceType } from "src/models/places";
import styles from "./PlaceItem.styles";

type Props = {
  place: PlaceType;
  onSelect: () => void;
};

const PlaceItem = ({ place, onSelect }: Props) => {
  const { imageUri, location, title } = place;
  const { address } = location;

  return (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
