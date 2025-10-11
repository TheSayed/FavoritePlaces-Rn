export type MainStackParamList = {
  AllPlaces: undefined;
  AddPlaces:
    | {
        pickedLat: number;
        pickedLng: number;
      }
    | undefined;
  Map: undefined;
};
