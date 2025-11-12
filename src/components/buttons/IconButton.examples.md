# IconButton Component Examples

The `IconButton` component supports three distinct modes with multiple size and color variants.

## Modes

### 1. Icon Mode (Default)
Icon only with hitslop for better touch targets. No background or border.

```tsx
import { IconButton } from './buttons/IconButton';
import SearchIcon from '../../assets/icons/np_magnifying-glass.svg';

// With SVG Component
<IconButton
  IconComponent={SearchIcon}
  onPress={() => console.log('Search')}
  variant="gold"
  size="medium"
/>

// With text icon
<IconButton
  icon="✕"
  onPress={() => console.log('Close')}
  variant="iron"
  size="small"
/>
```

### 2. Circle Mode
Icon centered in a circular background with border and shadow.

```tsx
<IconButton
  mode="circle"
  IconComponent={SearchIcon}
  onPress={() => console.log('Search')}
  variant="gold"
  size="large"
/>

<IconButton
  mode="circle"
  icon="←"
  onPress={() => console.log('Back')}
  variant="burgundy"
  size="medium"
/>
```

### 3. Labeled Mode
Icon with a text label below it.

```tsx
<IconButton
  mode="labeled"
  IconComponent={SearchIcon}
  label="Search"
  onPress={() => console.log('Search')}
  variant="gold"
  size="medium"
/>

<IconButton
  mode="labeled"
  icon="⚔"
  label="Terms"
  onPress={() => console.log('Terms')}
  variant="iron"
  size="large"
/>
```

## Sizes

Each mode supports three sizes:

- **Small**: Compact size for dense layouts
- **Medium**: Default size for most use cases
- **Large**: Prominent size for primary actions

```tsx
{/* Small */}
<IconButton size="small" icon="✕" onPress={() => {}} />

{/* Medium (default) */}
<IconButton size="medium" icon="✕" onPress={() => {}} />

{/* Large */}
<IconButton size="large" icon="✕" onPress={() => {}} />
```

## Color Variants

Three color themes matching the medieval manuscript aesthetic:

- **Gold**: Antique gold accents (default)
- **Iron**: Gray tones for subtle elements
- **Burgundy**: Rich burgundy for highlights

```tsx
{/* Gold (default) */}
<IconButton variant="gold" icon="⚔" onPress={() => {}} />

{/* Iron */}
<IconButton variant="iron" icon="⚔" onPress={() => {}} />

{/* Burgundy */}
<IconButton variant="burgundy" icon="⚔" onPress={() => {}} />
```

## Additional Features

### Icon Rotation
Rotate icons for directional indicators:

```tsx
<IconButton
  IconComponent={ArrowIcon}
  iconRotation={180}
  onPress={() => console.log('Down')}
/>
```

### Disabled State
Visually indicates non-interactive state:

```tsx
<IconButton
  icon="✕"
  onPress={() => {}}
  disabled={true}
/>
```

### Accessibility
Full accessibility support:

```tsx
<IconButton
  icon="✕"
  onPress={() => {}}
  accessibilityLabel="Close dialog"
  accessibilityHint="Closes the current dialog and returns to previous screen"
/>
```

### Custom Styling
Override container styles when needed:

```tsx
<IconButton
  icon="✕"
  onPress={() => {}}
  style={{ marginLeft: 16 }}
/>
```

## Size Specifications

### Icon Mode
- Small: 16px icon, 12px hitslop
- Medium: 20px icon, 12px hitslop
- Large: 24px icon, 12px hitslop

### Circle Mode
- Small: 32px container, 16px icon, 1.5px border
- Medium: 40px container, 20px icon, 2px border
- Large: 56px container, 24px icon, 2.5px border

### Labeled Mode
- Small: 20px icon, 12px label
- Medium: 24px icon, 16px label
- Large: 28px icon, 18px label

## Type Safety

The component uses TypeScript discriminated unions to ensure type safety:

- `mode="icon"`: label prop is not allowed
- `mode="circle"`: label prop is not allowed
- `mode="labeled"`: label prop is required

```tsx
// ✅ Valid
<IconButton mode="labeled" label="Search" icon="🔍" onPress={() => {}} />

// ❌ TypeScript error: label is required for labeled mode
<IconButton mode="labeled" icon="🔍" onPress={() => {}} />

// ❌ TypeScript error: label is not allowed for circle mode
<IconButton mode="circle" label="Search" icon="🔍" onPress={() => {}} />
```

## Best Practices

1. **Use icon mode** for minimal UI elements (close buttons, navigation)
2. **Use circle mode** for floating action buttons or prominent single actions
3. **Use labeled mode** for tab bars, toolbars, or when icons need clarification
4. **Choose variants** based on hierarchy: gold for primary, iron for secondary, burgundy for accent
5. **Always provide** `accessibilityLabel` for icon-only buttons
6. **Use hitslop** advantage in icon mode for better mobile touch targets
