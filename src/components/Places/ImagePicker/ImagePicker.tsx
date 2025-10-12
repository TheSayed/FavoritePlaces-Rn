import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "src/constants/Colors";
import OutlinedButton from "src/components/UI/OutlinedButton/OutlinedButton";

type ImagePickerProps = {
  onImagePicked: (uri: string) => void;
};

const ImagePicker = ({ onImagePicked }: ImagePickerProps) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    return true;
  };

  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.assets && image.assets.length > 0) {
      const uri = image.assets[0].uri;
      setPickedImage(uri);
      onImagePicked(uri);
    } else {
      setPickedImage(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <Text style={styles.noImageTaken}>No image taken yet.</Text>
        )}
      </View>

      <OutlinedButton
        icon="camera"
        onPress={takeImageHandler}
        containerStyle={styles.buttonContainer}
      >
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  noImageTaken: {
    color: Colors.primary800,
    textAlign: "center",
    marginVertical: 8,
  },
  buttonContainer: {
    width: "100%",
  },
});
