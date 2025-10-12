import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "src/navigation/MainStackParams";

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export type AddPlacesNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "AddPlaces"
>;

export type AddPlacesRouteProp = RouteProp<MainStackParamList, "AddPlaces">;

export type LocationPickerProps = {
  onLocationTaken: (location: Location) => void;
};
