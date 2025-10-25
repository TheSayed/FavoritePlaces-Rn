import { Location } from "src/components/Places/LocationPicker/types";

export type PlaceType = {
  id: string;
  title: string;
  imageUri: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
};

export class Place {
  title: string;
  imageUri: string;
  location: { address: string; lat: number; lng: number };
  id: string;

  constructor(title: string, imageUri: string, location: Location, id: string) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = {
      address: location.address || "",
      lat: location.lat,
      lng: location.lng,
    };
    this.id = id;
  }
}
