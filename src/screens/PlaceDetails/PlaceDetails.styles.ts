import { StyleSheet } from "react-native";
import { Colors } from "src/constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    minHeight: 300,
    borderRadius: 20,
    borderColor: Colors.primary200,
    borderWidth: 1,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.primary100,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: Colors.primary700,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 12,
    textAlign: "center",
  },
  locationContainer: {
    backgroundColor: Colors.primary50,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary200,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: Colors.gray700,
    lineHeight: 20,
  },
  loadingText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: Colors.primary800,
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: Colors.accent500,
  },
  btn: {
    width: "100%",
  },
});
