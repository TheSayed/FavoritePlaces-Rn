import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { fetchPlaceDetails } from "src/utils/database";
import { PlaceType } from "src/models/places";
import { MainStackParamList } from "src/navigation/MainStackParams";
import styles from "./PlaceDetails.styles";
import OutlinedButton from "src/components/UI/OutlinedButton/OutlinedButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PlaceDetailsRouteProp = RouteProp<MainStackParamList, "PlaceDetails">;
type PlaceDetailsNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "PlaceDetails"
>;

const PlaceDetails = () => {
  const route = useRoute<PlaceDetailsRouteProp>();
  const { placeId } = route.params;
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<PlaceDetailsNavigationProp>();
  const onShowMap = () => {
    if (place) {
      navigation.navigate("Map", {
        lat: place?.location.lat,
        lng: place?.location.lng,
      });
    }
  };
  useEffect(() => {
    const loadPlace = async () => {
      try {
        setLoading(true);
        const fetchedPlace = await fetchPlaceDetails(String(placeId));
        if (fetchedPlace) {
          setPlace(fetchedPlace);
        }
      } catch (error) {
        console.error("Failed to load place:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [placeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Place not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.address}>{place.location.address}</Text>
        </View>
      </View>
      <OutlinedButton
        icon="map"
        onPress={onShowMap}
        containerStyle={styles.btn}
      >
        View on Map
      </OutlinedButton>
    </ScrollView>
  );
};

export default PlaceDetails;
