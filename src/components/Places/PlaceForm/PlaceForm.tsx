import { Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "src/constants/Colors";
import ImagePicker from "../ImagePicker/ImagePicker";
import LocationPicker from "../LocationPicker/LocationPicker";
import MainButton from "src/components/UI/MainButton/MainButton";
import { Location } from "../LocationPicker/types";
import { Place } from "src/models/places";

interface PlaceFormProps {
  onCreatePlace: (place: Place) => void;
}
const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [imageTaken, setImageTaken] = useState<string>();
  const [locationPicked, setLocationPicked] = useState<Location>();
  const handleChangeTitle = (text: string) => {
    setEnteredTitle(text);
  };
  const handleImageTaken = useCallback((image: string) => {
    setImageTaken(image);
  }, []);

  const handleLocationPicked = useCallback((location: Location) => {
    setLocationPicked(location);
  }, []);
  const saveFormInfo = () => {
    if (!enteredTitle || !imageTaken || !locationPicked) {
      // You can add validation or alert here
      return;
    }

    const placeData = new Place(enteredTitle, imageTaken, locationPicked);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Title"
        onChangeText={handleChangeTitle}
        value={enteredTitle}
        style={styles.input}
      />
      <ImagePicker onImagePicked={handleImageTaken} />
      <LocationPicker onLocationTaken={handleLocationPicked} />
      <MainButton onPress={saveFormInfo}>
        <Text>Add Place</Text>
      </MainButton>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
  },
});
