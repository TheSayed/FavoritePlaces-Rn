require("dotenv").config();

module.exports = {
  expo: {
    name: "favoritePlace",
    slug: "favoritePlace",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      buildNumber: "1.0.0",
      supportsTablet: true,
    },
    android: {
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-sqlite",
      [
        "expo-image-picker",
        {
          cameraPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
};
