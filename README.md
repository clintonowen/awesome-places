# Awesome Places

Awesome Places is a sample iOS/Android application built with React Native following Maximilian Schwarzmüller's Udemy course, [React Native - The Practical Guide](https://www.udemy.com/react-native-the-practical-guide/).

## Technology Stack
* React, React Native
* Redux, React-Redux
* React Native Navigation, React Native Vector Icons
* JavaScript

## Main Project Structure

```
awesome-places/
├── android/ (Android build files)
├── ios/ (iOS build files)
├── node_modules/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── UI/ (basic styled UI elements)
│   ├── navigation/
│   │   └── Navigation.js (main nav-loading functions)
│   ├── screens/ (app screens for navigation)
│   └── store/ (Redux files)
│       ├── actions/
│       ├── reducers/
│       └── store.js (Store creator)
├── index.js (Project root)
├── package.json (NPM dependencies)
└── README.md
```

## Ignored Files
Note that the following files are too large to commit and/or contain sensitive information (e.g. API keys) and are therefore not included in this public repo. They will need to be added locally if cloning this project.
* android/app/src/main/AndroidManifest.xml
* ios/rnclipracticalguide/AppDelegate.m
* ios/GoogleMapsCore.framework/GoogleMapsCore
* ios/GoogleMapsBase.framework/GoogleMapsBase
* ios/GoogleMaps.framework/GoogleMaps
