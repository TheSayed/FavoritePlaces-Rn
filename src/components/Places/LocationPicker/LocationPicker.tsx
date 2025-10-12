import { View, Text, Image } from "react-native";
import React from "react";
import OutlinedButton from "src/components/UI/OutlinedButton/OutlinedButton";
import { getMapPreview } from "src/utils/location";
import { useLocationPickerHook } from "./useLocationPickerHook";
import { styles } from "./LocationPicker.styles";
import { LocationPickerProps } from "./types";

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationTaken }) => {
  const { pickedLocation, pickMapHandler, getLocationHandler } =
    useLocationPickerHook({ onLocationTaken });

  let imagePreview = (
    <Text style={styles.noLocationText}>No location picked yet.</Text>
  );

  if (pickedLocation) {
    const mapPreviewUrl = getMapPreview(
      pickedLocation?.lat,
      pickedLocation?.lng
    );
    imagePreview = (
      <Image
        style={styles.mapImage}
        source={{
          uri: mapPreviewUrl,
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={pickMapHandler}>
          Pick on Map
        </OutlinedButton>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;
