import Constants from "expo-constants";

export const getMapPreview = (lat: number, lng: number): string => {
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${apiKey}`;

  console.log("Map URL:", imagePreviewUrl);

  return imagePreviewUrl;
};
