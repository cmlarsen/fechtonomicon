# Fechtonomicon

A React Native app for learning HEMA (Historical European Martial Arts) vocabulary through interactive flashcards, with iOS widget support.

## Features

- 📱 **Interactive Flashcards**: Swipe through cards to learn HEMA terminology
- ⚔️ **Multiple Disciplines**: Currently featuring Meyer Longsword, with support for more disciplines
- 🎨 **Medieval Aesthetic**: Cosy, trendy medieval-themed UI
- 📊 **Progress Tracking**: Automatically tracks which cards you've viewed
- 🔧 **Customizable**: Select which disciplines to study
- 📲 **iOS Widget**: Display a random flashcard on your home screen (updates hourly)
- 🌐 **Web Support**: Run the app in any modern web browser with localStorage persistence
- 🔗 **Shareable URLs**: Deep link to specific cards via URL parameters
- 💾 **Offline Storage**: All data stored locally (MMKV on mobile, localStorage on web)
- 🧪 **Test-Driven**: Built with TDD practices

## Tech Stack

- **React Native** (via Expo)
- **React Native Web** - Web platform support
- **TypeScript**
- **Zustand** - State management
- **MMKV** - Fast local storage (mobile)
- **localStorage** - Web persistence
- **React Navigation** - Navigation with deep linking
- **React Native Gesture Handler** - Smooth swipe animations
- **Jest & Testing Library** - Unit and integration tests
- **Swift** - Native iOS widget

## Getting Started

### Prerequisites

- Node.js 20+ (managed via nvm recommended)
- Yarn
- **For iOS development**: Xcode 14+, macOS, CocoaPods
- **For web**: Any modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fechtonomicon
```

2. Install dependencies:
```bash
yarn install
```

3. Install iOS pods:
```bash
cd ios && pod install && cd ..
```

4. Start the development server:
```bash
yarn start
```

5. Run on your preferred platform:
```bash
# iOS
yarn ios

# Web
yarn web
```

### Web Version

The web version provides the full flashcard experience in your browser:

- **Mobile-centered layout**: The app displays in a mobile-sized viewport on desktop
- **localStorage persistence**: Your progress is saved between browser sessions
- **Shareable card URLs**: Share specific cards via URLs like `http://localhost:8081/card/card-id`
- **Responsive**: Works on desktop and mobile browsers

To run the web version:
```bash
yarn web
```

The app will open in your default browser at `http://localhost:8081`.

### Setting Up the iOS Widget

The iOS widget requires manual setup in Xcode. See [WIDGET_SETUP.md](./WIDGET_SETUP.md) for detailed instructions.

## Project Structure

```
fechtonomicon/
├── assets/
│   ├── data/
│   │   └── flashcards.json          # Flashcard content
│   └── images/
├── ios/
│   ├── FlashcardWidget/              # iOS widget extension
│   │   ├── FlashcardWidget.swift
│   │   └── Info.plist
│   ├── WidgetBridge.swift            # Native module bridge
│   ├── WidgetBridge.m
│   └── hemaflashcardsapp-Bridging-Header.h
├── src/
│   ├── components/
│   │   ├── Flashcard.tsx             # Card display component
│   │   └── FlashcardSwiper.tsx       # Swipeable card container
│   ├── navigation/
│   │   └── AppNavigator.tsx          # Navigation setup
│   ├── screens/
│   │   ├── CardScreen.tsx            # Main card viewing screen
│   │   └── DisciplineSelectionScreen.tsx
│   ├── services/
│   │   ├── storage.ts                # MMKV wrapper
│   │   └── widgetService.ts          # Widget communication
│   ├── store/
│   │   └── flashcardStore.ts         # Zustand state management
│   ├── theme/
│   │   ├── tokens.ts                 # Design tokens
│   │   └── styles.ts                 # Global styles
│   ├── types/
│   │   └── flashcard.ts              # TypeScript types
│   └── utils/
│       └── cardSelector.ts           # Random card selection logic
├── __tests__/                        # Test files
├── App.tsx                           # App entry point
└── package.json
```

## Development

### Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once (CI mode)
yarn test:ci
```

### Adding New Flashcards

Edit `assets/data/flashcards.json`:

```json
{
  "id": "unique-id",
  "title": "Card Title",
  "description": "Detailed description of the concept",
  "discipline": "meyer-longsword",
  "relatedCards": ["other-card-id"],
  "externalLinks": [
    {
      "url": "https://example.com",
      "label": "Learn More"
    }
  ]
}
```

### Adding New Disciplines

1. Update the `Discipline` type in `src/types/flashcard.ts`
2. Add the discipline to `DISCIPLINES` array in `src/screens/DisciplineSelectionScreen.tsx`
3. Add flashcards with the new discipline to `assets/data/flashcards.json`

## Architecture

### State Management

The app uses Zustand for global state management with MMKV for persistence:

- Current card being displayed
- Viewed card history
- Selected disciplines
- All available flashcards

### Card Selection Algorithm

Cards are selected randomly from the pool of cards matching selected disciplines. The algorithm:
1. Filters cards by selected disciplines
2. Prioritizes unviewed cards
3. Resets the viewed list when all cards have been seen

### Widget Communication

The iOS widget communicates with the React Native app via:
1. Shared UserDefaults (App Groups)
2. Native module bridge (WidgetBridge)
3. WidgetKit timeline updates

## Future Enhancements

- [ ] Android support
- [x] Web support
- [ ] Quiz system
- [ ] Additional disciplines (Rapier, Sword & Buckler, etc.)
- [ ] Image support for flashcards
- [ ] Spaced repetition system
- [ ] Progress statistics
- [ ] Custom flashcard creation
- [ ] Share button for easy URL copying
- [ ] PWA support for installable web app

## Contributing

Contributions are welcome! Please ensure:
- All tests pass before submitting PR
- New features include tests
- Code follows existing style and patterns
- Medieval aesthetic is maintained 🏰⚔️

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Flashcard content based on Joachim Meyer's teachings
- [Wiktenauer](https://wiktenauer.com) for HEMA source materials
