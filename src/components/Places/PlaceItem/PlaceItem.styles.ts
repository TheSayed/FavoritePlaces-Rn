import { StyleSheet } from "react-native";
import { Colors } from "src/constants/Colors";

export default StyleSheet.create({
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary50,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3, // shadow for Android
    shadowColor: Colors.gray700, // shadow for iOS
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.primary100,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: Colors.gray700,
  },
});
