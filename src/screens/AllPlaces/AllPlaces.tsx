import React, { useEffect, useState } from "react";
import PlacesList from "src/components/Places/PlacesList/PlacesList";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { MainStackParamList } from "src/navigation/MainStackParams";
import { PlaceType } from "src/models/places";
import { getPlaces } from "src/utils/database";

export type AllPlacesRouteProp = RouteProp<MainStackParamList, "AllPlaces">;

const AllPlaces = () => {
  const route = useRoute<AllPlacesRouteProp>();
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await getPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
