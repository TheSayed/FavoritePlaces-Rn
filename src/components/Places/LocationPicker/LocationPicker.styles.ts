import { StyleSheet } from "react-native";
import { Colors } from "src/constants/Colors";

export const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  noLocationText: {
    color: Colors.primary200,
    textAlign: "center",
    marginVertical: 8,
  },
});
