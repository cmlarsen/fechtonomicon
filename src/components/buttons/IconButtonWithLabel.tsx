import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, shadows } from '../../theme/tokens';

interface IconButtonWithLabelProps {
  icon: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'gold' | 'burgundy';
  style?: ViewStyle;
  testID?: string;
}

const sizeConfig = {
  small: {
    iconSize: 32,
    fontSize: fontSize.xs,
    labelFontSize: fontSize.xs,
    borderWidth: 1.5,
  },
  medium: {
    iconSize: 40,
    fontSize: fontSize.lg,
    labelFontSize: fontSize.xs,
    borderWidth: 2,
  },
  large: {
    iconSize: 56,
    fontSize: fontSize.xl,
    labelFontSize: fontSize.sm,
    borderWidth: 3,
  },
};

export const IconButtonWithLabel: React.FC<IconButtonWithLabelProps> = ({
  icon,
  label,
  onPress,
  disabled = false,
  size = 'medium',
  variant = 'gold',
  style,
  testID,
}) => {
  const sizeStyles = sizeConfig[size];
  const variantStyles = variant === 'burgundy' ? styles.burgundyVariant : styles.goldVariant;
  const textVariantStyles = variant === 'burgundy' ? styles.burgundyText : styles.goldText;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      <TouchableOpacity
        style={[
          styles.button,
          variantStyles,
          {
            width: sizeStyles.iconSize,
            height: sizeStyles.iconSize,
            borderRadius: sizeStyles.iconSize / 2,
            borderWidth: sizeStyles.borderWidth,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.iconText,
            textVariantStyles,
            {
              fontSize: sizeStyles.fontSize,
            },
          ]}
        >
          {icon}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.label,
          textVariantStyles,
          {
            fontSize: sizeStyles.labelFontSize,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldVariant: {
    borderColor: colors.gold.main,
    ...shadows.parchment,
  },
  burgundyVariant: {
    borderColor: colors.burgundy.main,
    shadowColor: colors.burgundy.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconText: {
    fontFamily: fontFamily.bodyBold,
    textAlign: 'center',
  },
  goldText: {
    color: colors.gold.dark,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  burgundyText: {
    color: colors.burgundy.dark,
  },
  label: {
    fontFamily: fontFamily.body,
    textAlign: 'center',
    marginTop: 4,
  },
});
