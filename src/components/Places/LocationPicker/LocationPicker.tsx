import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import OutlinedButton from "src/components/UI/OutlinedButton/OutlinedButton";
import { Colors } from "src/constants/Colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getMapPreview } from "src/utils/location";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "src/navigation/MainStackParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Location {
  lat: number;
  lng: number;
}

type AddPlacesNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "AddPlaces"
>;

const LocationPicker: React.FC = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<Location | undefined>();
  const navigation = useNavigation<AddPlacesNavigationProp>();

  const verifyPermissions = async (): Promise<boolean> => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async (): Promise<void> => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickMapHandler = (): void => {
    navigation.navigate("Map");
  };

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

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  noLocationText: {
    color: Colors.primary200,
    textAlign: "center",
    marginVertical: 8,
  },
});
