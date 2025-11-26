# iOS Widget Setup Instructions

This app includes two iOS widgets: "Term & Definition" and "Guess the Definition".

## Prerequisites

- Xcode 14.0 or later
- iOS 14.0 or later target device/simulator

## Steps to Configure Widgets

### 1. Open the Project in Xcode

```bash
open ios/fechtonomicon.xcworkspace
```

### 2. Add Widget Extension Target (If not already present)

1. In Xcode, select the project in the Navigator
2. Click the "+" button at the bottom of the Targets list
3. Select "Widget Extension"
4. Name it "FlashcardWidget"
5. Set the Product Bundle Identifier to: `com.yetanothersidequest.fechtonomicon.FlashcardWidget`
6. Uncheck "Include Configuration Intent"
7. Click "Finish"
8. When asked "Activate FlashcardWidget scheme?", click "Activate"

### 3. Verify Files & Target Membership (CRITICAL)

**A. Widget Files (Target: FlashcardWidgetExtension)**
Ensure these files are in the `FlashcardWidget` folder and have **ONLY "FlashcardWidgetExtension"** checked in the File Inspector:
- `FlashcardWidget.swift`
- `GuessWidget.swift`
- `FlashcardWidgetBundle.swift`

**B. Bridge Files (Target: fechtonomicon)**
Ensure these files are in the `fechtonomicon` folder and have **ONLY "fechtonomicon"** checked in the File Inspector:
- `WidgetHelper.swift` (Handles WidgetKit reloading)
- `WidgetBridge.m` (Handles React Native communication)

**C. Bridging Header**
- `fechtonomicon-Bridging-Header.h` should be in `fechtonomicon` folder.
- In Build Settings for **fechtonomicon** target: `Objective-C Bridging Header` -> `fechtonomicon/fechtonomicon-Bridging-Header.h`
- In Build Settings for **FlashcardWidgetExtension** target: `Objective-C Bridging Header` -> **EMPTY** (Delete if present)

### 4. Configure App Groups (CRITICAL)

#### For Main App Target:

1. Select the main app target (fechtonomicon)
2. Go to "Signing & Capabilities"
3. Click "+ Capability"
4. Add "App Groups"
5. Click "+" and add: `group.com.yetanothersidequest.fechtonomicon.shared`

#### For Widget Target:

1. Select the FlashcardWidget target
2. Go to "Signing & Capabilities"
3. Click "+ Capability"
4. Add "App Groups"
5. Click "+" and add: `group.com.yetanothersidequest.fechtonomicon.shared` (MUST match main app)

### 5. Build and Run

```bash
# From the project root
yarn ios
```

## Testing the Widgets

1. Run the app on a device or simulator
2. Long press on the home screen
3. Tap the "+" button
4. Search for "Fechtonomicon"
5. You should see TWO widget options:
   - **Term & Definition**: Shows the full card.
   - **Guess the Definition**: Shows only the term.
6. Add both to test.
7. Open the app and view a card to update the widget data.
