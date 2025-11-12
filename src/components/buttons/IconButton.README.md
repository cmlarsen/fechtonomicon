# IconButton Component

A professional, flexible icon button component supporting three distinct modes with multiple size and color variants.

## Features

✅ **Three Modes**: Icon-only, Circle background, and Labeled
✅ **Three Sizes**: Small, Medium, Large
✅ **Three Color Variants**: Gold, Iron, Burgundy
✅ **Type-Safe**: TypeScript discriminated unions for compile-time safety
✅ **Accessible**: Full accessibility support with ARIA roles and labels
✅ **Flexible**: Supports both text icons and SVG components
✅ **Touch-Optimized**: Proper hit slop for better mobile experience

## API Overview

```typescript
interface IconButtonProps {
  // Core props
  icon?: string;                    // Text icon (e.g., "✕", "←")
  IconComponent?: React.Component;  // SVG component
  onPress: () => void;              // Press handler

  // Configuration
  mode?: 'icon' | 'circle' | 'labeled';  // Display mode (default: 'icon')
  size?: 'small' | 'medium' | 'large';   // Size variant (default: 'medium')
  variant?: 'gold' | 'iron' | 'burgundy'; // Color theme (default: 'gold')

  // Optional enhancements
  label?: string;              // Required for 'labeled' mode
  iconRotation?: number;       // Rotation in degrees
  disabled?: boolean;          // Disabled state

  // Styling & Testing
  style?: ViewStyle;           // Custom container styles
  testID?: string;             // Test identifier

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
}
```

## Mode Descriptions

### Icon Mode (Default)
- **Use Case**: Minimal UI elements like close buttons, navigation icons
- **Appearance**: Icon only, no background or border
- **Touch Target**: Enhanced with 12px hit slop on all sides
- **Best For**: Toolbars, headers, inline actions

### Circle Mode
- **Use Case**: Prominent actions, floating buttons
- **Appearance**: Icon centered in circular background with border and shadow
- **Touch Target**: Entire circle is tappable
- **Best For**: Primary actions, FABs, prominent controls

### Labeled Mode
- **Use Case**: Actions that need clarification
- **Appearance**: Icon on top, text label below
- **Touch Target**: Entire component is tappable
- **Best For**: Tab bars, toolbars, feature discovery

## Size Specifications

| Mode | Small | Medium | Large |
|------|-------|--------|-------|
| **Icon** | 16px icon | 20px icon | 24px icon |
| **Circle** | 32px ⊙ | 40px ⊙ | 56px ⊙ |
| **Labeled** | 20px + 12px text | 24px + 16px text | 28px + 18px text |

## Color Variants

| Variant | Primary Color | Use Case |
|---------|--------------|----------|
| **Gold** | `#C9AB6A` | Primary actions, default |
| **Iron** | `#5C5B58` | Secondary actions, subtle elements |
| **Burgundy** | `#722F37` | Accent actions, highlights |

## Usage Examples

### Basic Icon Button
```tsx
<IconButton
  icon="✕"
  onPress={() => console.log('Close')}
/>
```

### Circle Button with SVG
```tsx
import SearchIcon from '../../assets/icons/np_magnifying-glass.svg';

<IconButton
  mode="circle"
  IconComponent={SearchIcon}
  onPress={() => console.log('Search')}
  variant="gold"
  size="large"
/>
```

### Labeled Button
```tsx
<IconButton
  mode="labeled"
  icon="⚔"
  label="Terms"
  onPress={() => console.log('Navigate')}
  variant="iron"
  size="medium"
/>
```

### Rotated Icon
```tsx
import ArrowIcon from '../../assets/icons/np_sword_arrow.svg';

<IconButton
  IconComponent={ArrowIcon}
  iconRotation={90}
  onPress={() => console.log('Next')}
  variant="burgundy"
/>
```

### With Accessibility
```tsx
<IconButton
  icon="✕"
  onPress={handleClose}
  accessibilityLabel="Close dialog"
  accessibilityHint="Closes the current dialog and returns to previous screen"
/>
```

## Design Philosophy

The component follows the project's **cozy medieval manuscript** aesthetic with **delightful modern UX**:

- **Colors**: Drawn from `theme/tokens.ts` (parchment, gold, iron, burgundy)
- **Typography**: CormorantGaramond for consistency
- **Shadows**: Subtle manuscript-inspired shadows for depth
- **Touch**: Generous hit areas for excellent mobile UX
- **Accessibility**: First-class support for screen readers

## Type Safety

The component uses TypeScript discriminated unions to enforce correct prop usage:

```tsx
// ✅ Valid: labeled mode with label
<IconButton mode="labeled" label="Search" icon="🔍" onPress={() => {}} />

// ❌ Compile Error: labeled mode requires label
<IconButton mode="labeled" icon="🔍" onPress={() => {}} />

// ❌ Compile Error: circle mode cannot have label
<IconButton mode="circle" label="Search" icon="🔍" onPress={() => {}} />
```

## Backward Compatibility

The component maintains full backward compatibility with existing code:
- Default `mode='icon'` works with all existing usages
- All previous props are supported
- No breaking changes to existing functionality

## Files

- **IconButton.tsx**: Main component implementation
- **IconButton.examples.md**: Comprehensive usage examples
- **IconButton.README.md**: This documentation file
- **index.ts**: Exports with types

## Testing

The component is used throughout the app:
- Native header navigation buttons
- Quiz exit buttons
- Pager navigation
- Modal close buttons
- And more...

All existing usage patterns have been verified for compatibility.
