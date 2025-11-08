# iOS Widget Setup Instructions

This app includes an iOS widget that displays a random flashcard. Due to Expo/React Native limitations, the widget extension must be added manually in Xcode.

## Prerequisites

- Xcode 14.0 or later
- iOS 14.0 or later target device/simulator

## Steps to Add Widget Extension

### 1. Open the Project in Xcode

```bash
open ios/fechtonomicon.xcworkspace
```

### 2. Add Widget Extension Target

1. In Xcode, select the project in the Navigator
2. Click the "+" button at the bottom of the Targets list
3. Select "Widget Extension"
4. Name it "FlashcardWidget"
5. Set the Product Bundle Identifier to: `com.yetanothersidequest.fechtonomicon.FlashcardWidget`
6. Uncheck "Include Configuration Intent"
7. Click "Finish"
8. When asked "Activate FlashcardWidget scheme?", click "Activate"

### 3. Replace Widget Files

1. Delete the generated `FlashcardWidget.swift` file from the FlashcardWidget folder
2. Add the existing `ios/FlashcardWidget/FlashcardWidget.swift` file to the FlashcardWidget target
3. Replace the `Info.plist` in the FlashcardWidget folder with `ios/FlashcardWidget/Info.plist`

### 4. Configure App Groups

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
5. Click "+" and add: `group.com.yetanothersidequest.fechtonomicon.shared` (same as main app)

### 5. Configure Bridging Header

1. Select the main app target (fechtonomicon)
2. Go to Build Settings
3. Search for "Objective-C Bridging Header"
4. Set the value to: `fechtonomicon/fechtonomicon-Bridging-Header.h`

### 6. Add Swift Files to Build

1. Select the main app target
2. Go to "Build Phases"
3. Expand "Compile Sources"
4. Click "+" and add `WidgetBridge.swift`

### 7. Build and Run

```bash
# From the project root
yarn ios
```

Or use Xcode's Run button.

## Testing the Widget

1. Run the app on a device or simulator (iOS 14+)
2. Long press on the home screen
3. Tap the "+" button in the top corner
4. Search for "HEMA Flashcard"
5. Add the widget to your home screen
6. Open the app and swipe through cards
7. The widget should update to show the current card
8. The widget will automatically refresh every hour

## Troubleshooting

### Widget Not Appearing

- Ensure both targets have the same App Group configured
- Check that the widget target is included in the build scheme
- Clean build folder (Cmd+Shift+K) and rebuild

### Widget Not Updating

- Check that WidgetBridge.swift is compiled in the main target
- Verify the App Group name matches in both targets and in the code
- Check the console for any errors from the WidgetBridge module

### Build Errors

- Ensure all Swift files have the correct target membership
- Check that the bridging header path is correct
- Verify that WidgetKit framework is linked in the widget target
