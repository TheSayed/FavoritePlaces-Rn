import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import { Colors } from "src/constants/Colors";
import { PlaceType } from "src/models/places";

const PlacesList = ({ places }: { places: PlaceType[] }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet. Start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => (item.id ? String(item.id) : "")}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
