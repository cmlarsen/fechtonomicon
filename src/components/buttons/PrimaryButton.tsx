import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
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

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  size = 'medium',
  style,
  testID,
}) => {
  const sizeStyles = sizeConfig[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
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
    backgroundColor: colors.gold.main,
    borderRadius: borderRadius.lg,
    borderWidth: 3,
    borderColor: colors.gold.dark,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.parchment,
  },
  text: {
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textAlign: 'center',
  },
});
