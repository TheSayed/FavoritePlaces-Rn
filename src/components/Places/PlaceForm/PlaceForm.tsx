import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "src/constants/Colors";
import ImagePicker from "../ImagePicker/ImagePicker";
import LocationPicker from "../LocationPicker/LocationPicker";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const handleChangeTitle = (text: string) => {
    setEnteredTitle(text);
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
      <ImagePicker />
      <LocationPicker />
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
