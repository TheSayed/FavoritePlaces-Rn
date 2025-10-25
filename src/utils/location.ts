import axios from "axios";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
export const getMapPreview = (lat: number, lng: number): string => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${apiKey}`;

  return imagePreviewUrl;
};

export const getAddress = async (lat: number, lng: number): Promise<string> => {
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }

    const address = response.data.results[0].formatted_address;
    return address;
  } catch (err: any) {
    console.error("Error fetching address:", err.message);
    throw err;
  }
};
