import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AddPlacesNavigationProp, AddPlacesRouteProp, Location } from "./types";
import { getAddress } from "src/utils/location";

export const useLocationPickerHook = ({
  onLocationTaken,
}: {
  onLocationTaken: (location: Location) => void;
}) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<Location>();
  const navigation = useNavigation<AddPlacesNavigationProp>();
  const route = useRoute<AddPlacesRouteProp>();
  const isFocused = useIsFocused();

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
    const coords = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };

    const address = await getAddress(coords.lat, coords.lng);
    const completeLocation: Location = { ...coords, address };

    setPickedLocation(completeLocation);
    onLocationTaken(completeLocation);
  };

  const pickMapHandler = (): void => {
    navigation.navigate("Map");
  };

  useEffect(() => {
    async function handleLocation() {
      if (route.params && isFocused) {
        const mapSelection = {
          lat: route.params.pickedLat,
          lng: route.params.pickedLng,
        };
        const address = await getAddress(mapSelection.lat, mapSelection.lng);
        const locationData: Location = { ...mapSelection, address };

        setPickedLocation(locationData);
        onLocationTaken(locationData);
      }
    }
    handleLocation();
  }, [route, isFocused]);

  return {
    pickedLocation,
    pickMapHandler,
    getLocationHandler,
  };
};
