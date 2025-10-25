import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import * as Location from "expo-location";
import IconButton from "src/components/UI/IconButton/IconButton";
import { MainStackParamList } from "src/navigation/MainStackParams";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

type MapNavigationProp = NativeStackNavigationProp<MainStackParamList, "Map">;
type MapRouteProp = RouteProp<MainStackParamList, "Map">;

const Map: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<MapNavigationProp>();
  const route = useRoute<MapRouteProp>();
  const lat = route.params?.lat;
  const lng = route.params?.lng;

  // ✅ Get user location when component mounts
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Location permission is required to use the map."
          );
          setIsLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const { latitude, longitude } = userLocation.coords;

        setRegion({
          latitude: lat ? lat : latitude,
          longitude: lng ? lng : longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Optional: place a marker at user’s location initially
        setSelectedLocation({ latitude, longitude });
      } catch (error) {
        Alert.alert("Error", "Failed to fetch location.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const selectLocationHandler = (event: MapPressEvent) => {
    if (route.params?.lat || route.params?.lng) {
      return;
    }
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked",
        "Tap on the map to choose a location first."
      );
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (route.params?.lat || route.params?.lng) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ paddingStart: 8 }}>
          <IconButton
            icon="save"
            size={24}
            color={tintColor || "red"}
            onPress={saveLocationHandler}
          />
        </View>
      ),
    });
  }, [navigation, saveLocationHandler]);

  if (isLoading || !region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
