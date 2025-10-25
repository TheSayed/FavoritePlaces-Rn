# Favorite Places App 📍

A React Native mobile application that allows users to capture, store, and manage their favorite locations with photos and detailed geographic information.

## 📱 Features

- 📸 Capture photos directly from camera or select from gallery
- 🗺️ Pick locations from interactive Google Maps
- 📍 Get current user location automatically
- 🏙️ Display city and address names through reverse geocoding
- 💾 Store places with title, image, and location data
- 📋 View all saved places in an organized list
- 🔍 Detailed place view with map preview and coordinates
- 🗑️ Delete places functionality

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe code
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **Redux Toolkit** - State management
- **Expo Location** - GPS and location services
- **Expo Image Picker** - Camera and gallery access
- **Google Maps SDK** - Interactive maps
- **SQLite** - Local database storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

For iOS:

- macOS with Xcode installed
- iOS Simulator (optional)

For Android:

- Android Studio with Android SDK
- Android Emulator (optional)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheSayed/FavoritePlaces-Rn
cd favorite-places
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Google Maps API Key

#### For Android:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Maps SDK for Android** and **Geocoding API**
4. Create API credentials (API Key)
5. Create a file `android/app/src/main/AndroidManifest.xml` and add:

```xml
<application>
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
</application>
```

#### For iOS:

1. Enable **Maps SDK for iOS** in Google Cloud Console
2. Create API credentials (API Key)
3. Add to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 5. Update App Configuration

Update your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "name": "Favorite Places",
    "slug": "favorite-places",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow Favorite Places to use your location."
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Favorite Places to access your photos.",
          "cameraPermission": "Allow Favorite Places to access your camera."
        }
      ]
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.favoriteplaces",
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      "package": "com.yourcompany.favoriteplaces",
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

## 🏃 Running the App

### Development Mode

Start the Expo development server:

```bash
npx expo start
# or
npm start
# or
yarn start
```

### Run on iOS Simulator

```bash
npx expo start --ios
# or press 'i' in the terminal after running expo start
```

### Run on Android Emulator

```bash
npx expo start --android
# or press 'a' in the terminal after running expo start
```

### Run on Physical Device

1. Install **Expo Go** app from App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

## 📁 Project Structure

```
favorite-places/
├── src/
│   ├── components/
│   │   ├── Places/
│   │   │   ├── PlaceForm/
│   │   │   ├── PlaceItem/
│   │   │   └── PlacesList/
│   │   ├── LocationPicker/
│   │   ├── ImagePicker/
│   │   └── UI/
│   ├── screens/
│   │   ├── AllPlaces/
│   │   ├── AddPlaces/
│   │   ├── PlaceDetails/
│   │   └── Map/
│   ├── navigation/
│   │   ├── MainStackNavigation.tsx
│   │   └── MainStackParams.ts
│   ├── store/
│   │   └── cartSlice.ts
│   ├── models/
│   │   └── places.ts
│   ├── utils/
│   │   ├── database.ts
│   │   ├── location.ts
│   │   └── scaling.ts
│   └── constants/
│       └── Colors.ts
├── assets/
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0",
    "expo": "~49.0.0",
    "expo-location": "~16.1.0",
    "expo-image-picker": "~14.3.2",
    "expo-sqlite": "~11.3.3",
    "react-native-maps": "1.7.1",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "@reduxjs/toolkit": "^1.9.5",
    "react-redux": "^8.1.1",
    "typescript": "^5.1.3"
  }
}
```

## 🗄️ Database Setup

The app uses SQLite for local data storage. The database is automatically initialized on first launch.

### Database Schema

```sql
CREATE TABLE places (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  imageUri TEXT NOT NULL,
  address TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL
);
```

### Reset Database (Development)

If you need to reset the database during development:

1. Uninstall the app from your device/emulator
2. Reinstall by running `npx expo start`

Or programmatically by calling the `resetDatabase()` function in `utils/database.ts`.

## 🔑 Permissions

The app requires the following permissions:

### iOS

- Location (Always and When In Use)
- Camera
- Photo Library

### Android

- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- CAMERA
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

Permissions are requested at runtime when needed.

## 🐛 Troubleshooting

### Common Issues

#### 1. Google Maps Not Showing

**Problem:** Map shows blank or "Google Maps Platform rejected your request"

**Solution:**

- Verify your Google Maps API key is correct
- Enable required APIs in Google Cloud Console:
  - Maps SDK for Android
  - Maps SDK for iOS
  - Geocoding API
- Check billing is enabled on your Google Cloud project

#### 2. Camera/Gallery Not Working

**Problem:** Permission denied or crashes when opening camera

**Solution:**

- Ensure permissions are declared in `app.json`
- Check device settings allow camera/photo access
- Reinstall the app after changing permissions

#### 3. Location Not Working

**Problem:** Can't get current location

**Solution:**

- Enable location services on your device
- Grant location permission to the app
- Ensure GPS/Wi-Fi is enabled

#### 4. Database Errors

**Problem:** "table places has no column named imageUri"

**Solution:**

- Uninstall and reinstall the app
- Or change database name in `utils/database.ts` from `places.db` to `places_v2.db`

#### 5. TypeScript Errors

**Problem:** Type errors in navigation or components

**Solution:**

- Run `npm install` to ensure all dependencies are installed
- Check `MainStackParamList` type definitions match navigation structure

## 📱 Building for Production

### Build for iOS

```bash
eas build --platform ios
```

### Build for Android

```bash
eas build --platform android
```

### Prerequisites for EAS Build

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login to Expo:

```bash
eas login
```

3. Configure EAS:

```bash
eas build:configure
```

## 📝 Environment Variables

Create a `.env` file:

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 👤 Author

Your Name

- GitHub: [@TheSayed](https://github.com/TheSayed)
- LinkedIn: [Ahmed Kotp](https://linkedin.com/in/ahmedkotp)

## 🙏 Acknowledgments

- React Native Community
- Expo Team
- Google Maps Platform
- All contributors and supporters

## 📞 Support

For support, email your.email@example.com or create an issue in the repository.

---

Made with ❤️ by [Ahmed Kotp]
