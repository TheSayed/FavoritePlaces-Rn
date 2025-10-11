import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Place } from "../../../types/placeType";
import PlaceItem from "../PlaceItem/PlaceItem";
import { Colors } from "src/constants/Colors";

const PlacesList = ({ places }: { places: Place[] }) => {
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
