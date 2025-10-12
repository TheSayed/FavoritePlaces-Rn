import React, { useEffect, useState } from "react";
import PlacesList from "src/components/Places/PlacesList/PlacesList";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { MainStackParamList } from "src/navigation/MainStackParams";
import { PlaceType } from "src/models/places";

export type AllPlacesRouteProp = RouteProp<MainStackParamList, "AllPlaces">;

const AllPlaces = () => {
  const route = useRoute<AllPlacesRouteProp>();
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    const place = route.params?.place;
    if (isFocused && place) {
      setLoadedPlaces((currPlaces) => [...currPlaces, place]);
    }
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
