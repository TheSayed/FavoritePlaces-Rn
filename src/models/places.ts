
import { Location } from "src/components/Places/LocationPicker/types";

export type PlaceType = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;

  constructor(title: string, imageUri: string, location: Location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address || "";
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toString() + Math.random().toString();
  }
}
