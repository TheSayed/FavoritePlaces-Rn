import { PlaceType } from "src/models/places";

export type MainStackParamList = {
  AllPlaces:
    | {
        place?: PlaceType;
      }
    | undefined;
  AddPlaces:
    | {
        pickedLat: number;
        pickedLng: number;
        place?: PlaceType;
      }
    | undefined;
  Map: {
    lat: number;
    lng: number;
  };
  PlaceDetails: {
    placeId: string | number;
  };
};
