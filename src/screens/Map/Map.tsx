import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import IconButton from "src/components/UI/IconButton/IconButton";
import { MainStackParamList } from "src/navigation/MainStackParams";

interface Location {
  latitude: number;
  longitude: number;
}

type MapNavigationProp = NativeStackNavigationProp<MainStackParamList, "Map">;

const Map: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const navigation = useNavigation<MapNavigationProp>();

  const region: Region = {
    latitude: 30.0084,
    longitude: 31.0132,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked",
        "You need to press on the map in order to pick a location"
      );
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor || "red"}
          onPress={saveLocationHandler}
        />
      ),
    });
  }, [navigation, saveLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
