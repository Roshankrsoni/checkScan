# CheckScan

CheckScan is a production-ready mobile application built with **Expo React Native** and **TypeScript**. It utilizes the **Google Gemini Vision API** to securely scan bank checks, identifying and verifying Magnetic Ink Character Recognition (MICR) lines for high-accuracy financial data extraction.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Bank-Grade OCR**: Uses Google Gemini 1.5 Flash (Vision) to extract check data.
- **MICR Verification**: Explicitly reads the MICR line as a source of truth for Routing, Account, and Check numbers.
- **Secure Processing**: No data is stored on-device; images are processed in memory and sent via secure API.
- **iOS-First Design**: strictly follows Apple's Human Interface Guidelines with haptic feedback, native list styling, and smooth animations.
- **Camera UX**:
  - Auto-resetting capture state.
  - Landscape/Portrait responsive controls.
  - Professional overlay guide.
- **Strict JSON Output**: The AI model is constrained to return a strict, type-safe JSON schema.

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Camera**: `expo-camera`
- **Image Processing**: `expo-image-manipulator`
- **AI/ML**: Google Gemini API (REST)
- **Utilities**: `expo-haptics`, `expo-clipboard`, `expo-screen-orientation`

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/client) app on your physical device OR an iOS/Android Simulator.
- A valid **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/)).

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd checkScan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in the root directory.
   - Add your API Key:
     ```env
     EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
     ```

## Running the App

Start the development server:

```bash
npx expo start
```

- **Scan QR Code**: Use the Expo Go app on Android or Camera app on iOS.
- ** simulators**: Press `i` for iOS Simulator or `a` for Android Emulator.

> **Note**: Camera features require a physical device or a simulator with camera testing capabilities. iOS Simulators effectively show a black screen but will simulate the UI flow.

## Project Structure

```
checkScan/
├── app/                 # Expo Router screens
│   ├── index.tsx        # Home Screen
│   ├── scan.tsx         # Camera & Capture
│   └── results.tsx      # Analysis Results
├── components/          # Reusable UI components
│   ├── CameraOverlay.tsx
│   └── ResultCard.tsx
├── services/            # Logic & API
│   ├── gemini.ts        # AI Extraction Service
│   └── imageUtils.ts    # Image Preprocessing
├── constants/           # Config & Colors
└── types.ts             # TypeScript Interfaces
```

## Troubleshooting

- **API Error (404)**: Ensure your API Key has access to the `gemini-flash-latest` model.
- **Camera Permission**: If denied, go to device settings and enable Camera access for Expo/CheckScan.
- **Dependencies**: If you encounter peer dependency warnings, use `npm install --legacy-peer-deps`.

## License

This project is open-source and available under the [MIT License](LICENSE).
