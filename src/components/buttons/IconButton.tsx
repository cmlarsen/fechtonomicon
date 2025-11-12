import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';

/**
 * IconButton component supporting three modes:
 * - 'icon': Icon only with hitslop, no background
 * - 'circle': Icon centered in a circular background
 * - 'labeled': Icon with a text label below
 */

type IconButtonSize = 'small' | 'medium' | 'large';
type IconButtonVariant = 'gold' | 'iron' | 'burgundy';

interface BaseIconButtonProps {
  /** Function icon (e.g., "✕", "←") */
  icon?: string;
  /** SVG Component for custom icons */
  IconComponent?: React.ComponentType<{
    width: number;
    height: number;
    fill: string;
    color: string;
  }>;
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Button size */
  size?: IconButtonSize;
  /** Color theme variant */
  variant?: IconButtonVariant;
  /** Custom container style */
  style?: ViewStyle;
  /** Rotation angle for icon (in degrees) */
  iconRotation?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
}

interface IconModeProps extends BaseIconButtonProps {
  mode?: 'icon';
  label?: never;
}

interface CircleModeProps extends BaseIconButtonProps {
  mode: 'circle';
  label?: never;
}

interface LabeledModeProps extends BaseIconButtonProps {
  mode: 'labeled';
  /** Text label displayed below icon */
  label: string;
}

export type IconButtonProps = IconModeProps | CircleModeProps | LabeledModeProps;

// Size configurations for each mode
const iconModeSizes = {
  small: {
    iconSize: 16,
    hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
  },
  medium: {
    iconSize: 20,
    hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
  },
  large: {
    iconSize: 24,
    hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
  },
};

const circleModeSizes = {
  small: {
    containerSize: 32,
    iconSize: 16,
    borderWidth: 1.5,
  },
  medium: {
    containerSize: 40,
    iconSize: 20,
    borderWidth: 2,
  },
  large: {
    containerSize: 56,
    iconSize: 24,
    borderWidth: 2.5,
  },
};

const labeledModeSizes = {
  small: {
    iconSize: 20,
    labelFontSize: fontSize.xs,
    spacing: spacing.xs,
  },
  medium: {
    iconSize: 24,
    labelFontSize: fontSize.sm,
    spacing: spacing.sm,
  },
  large: {
    iconSize: 28,
    labelFontSize: fontSize.md,
    spacing: spacing.sm,
  },
};

// Variant color configurations
const variantColors = {
  gold: {
    primary: colors.gold.main,
    dark: colors.gold.dark,
    light: colors.gold.light,
    background: colors.parchment.light,
  },
  iron: {
    primary: colors.iron.main,
    dark: colors.iron.dark,
    light: colors.iron.light,
    background: colors.parchment.light,
  },
  burgundy: {
    primary: colors.burgundy.main,
    dark: colors.burgundy.dark,
    light: colors.burgundy.light,
    background: colors.parchment.light,
  },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  IconComponent,
  onPress,
  disabled = false,
  size = 'medium',
  variant = 'gold',
  mode = 'icon',
  style,
  iconRotation,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
  const label = 'label' in props ? props.label : undefined;
  const colorScheme = variantColors[variant];

  // Render icon content
  const renderIcon = (iconSize: number, iconColor: string) => {
    const iconContent = IconComponent ? (
      <IconComponent width={iconSize} height={iconSize} fill={iconColor} color={iconColor} />
    ) : (
      <Text style={[styles.iconText, { fontSize: iconSize, color: iconColor }]}>{icon}</Text>
    );

    if (iconRotation) {
      return <View style={{ transform: [{ rotate: `${iconRotation}deg` }] }}>{iconContent}</View>;
    }

    return iconContent;
  };

  // Icon-only mode: transparent background, hitslop for accessibility
  if (mode === 'icon') {
    const sizeConfig = iconModeSizes[size];
    return (
      <TouchableOpacity
        style={[styles.iconMode, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.6}
        hitSlop={sizeConfig.hitSlop}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
      >
        <View style={[styles.iconWrapper, disabled && styles.disabled]}>
          {renderIcon(sizeConfig.iconSize, colorScheme.dark)}
        </View>
      </TouchableOpacity>
    );
  }

  // Circle mode: circular background with border and shadow
  if (mode === 'circle') {
    const sizeConfig = circleModeSizes[size];
    return (
      <TouchableOpacity
        style={[
          styles.circleMode,
          {
            width: sizeConfig.containerSize,
            height: sizeConfig.containerSize,
            borderRadius: sizeConfig.containerSize / 2,
            borderWidth: sizeConfig.borderWidth,
            borderColor: colorScheme.primary,
            backgroundColor: colorScheme.background,
          },
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
      >
        {renderIcon(sizeConfig.iconSize, colorScheme.dark)}
      </TouchableOpacity>
    );
  }

  // Labeled mode: icon with text label below
  const sizeConfig = labeledModeSizes[size];
  return (
    <TouchableOpacity
      style={[styles.labeledMode, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
    >
      <View style={[styles.labeledContent, disabled && styles.disabled]}>
        <View style={[styles.labeledIconContainer, { marginBottom: sizeConfig.spacing }]}>
          {renderIcon(sizeConfig.iconSize, colorScheme.dark)}
        </View>
        {label && (
          <Text
            style={[
              styles.labelText,
              {
                fontSize: sizeConfig.labelFontSize,
                color: colorScheme.dark,
              },
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Icon-only mode styles
  iconMode: {
    alignSelf: 'flex-start',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Circle mode styles
  circleMode: {
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },

  // Labeled mode styles
  labeledMode: {
    alignSelf: 'flex-start',
  },
  labeledContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labeledIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: fontFamily.bodySemiBold,
    textAlign: 'center',
    maxWidth: 80,
  },

  // Icon text (for string icons like "✕")
  iconText: {
    fontFamily: fontFamily.bodyBold,
    textAlign: 'center',
  },

  // Disabled state
  disabled: {
    opacity: 0.4,
  },
});
