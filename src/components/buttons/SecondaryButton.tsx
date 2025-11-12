import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'parchment' | 'burgundy';
  style?: ViewStyle;
  testID?: string;
}

const sizeConfig = {
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.sm,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.md,
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    fontSize: fontSize.lg,
  },
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  size = 'medium',
  variant = 'parchment',
  style,
  testID,
}) => {
  const sizeStyles = sizeConfig[size];
  const variantStyles = variant === 'burgundy' ? styles.burgundyVariant : styles.parchmentVariant;
  const textVariantStyles = variant === 'burgundy' ? styles.burgundyText : styles.parchmentText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
    >
      <Text
        style={[
          styles.text,
          textVariantStyles,
          {
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  parchmentVariant: {
    backgroundColor: colors.parchment.primary,
    borderColor: colors.burgundy.main,
  },
  burgundyVariant: {
    backgroundColor: colors.iron.dark,
    borderColor: colors.iron.dark,
    ...shadows.md,
  },
  text: {
    fontFamily: fontFamily.titleSemiBold,
    textAlign: 'center',
  },
  parchmentText: {
    color: colors.burgundy.dark,
  },
  burgundyText: {
    color: colors.text.inverse,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
