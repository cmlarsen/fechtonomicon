import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, shadows } from '../../theme/tokens';

interface IconButtonProps {
  icon?: string;
  IconComponent?: React.ComponentType<{
    width: number;
    height: number;
    fill: string;
    color: string;
  }>;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'gold' | 'burgundy';
  style?: ViewStyle;
  iconRotation?: number;
  testID?: string;
}

const sizeConfig = {
  small: {
    size: 32,
    fontSize: fontSize.md,
    borderWidth: 1.5,
  },
  medium: {
    size: 40,
    fontSize: fontSize.lg,
    borderWidth: 2,
  },
  large: {
    size: 56,
    fontSize: fontSize.xl,
    borderWidth: 3,
  },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  IconComponent,
  onPress,
  disabled = false,
  size = 'medium',
  variant = 'gold',
  style,
  iconRotation,
  testID,
}) => {
  const sizeStyles = sizeConfig[size];
  const variantStyles = variant === 'burgundy' ? styles.burgundyVariant : styles.goldVariant;
  const textVariantStyles = variant === 'burgundy' ? styles.burgundyText : styles.goldText;
  const iconColor = variant === 'burgundy' ? colors.burgundy.dark : colors.gold.dark;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        {
          width: sizeStyles.size,
          height: sizeStyles.size,
          borderRadius: sizeStyles.size / 2,
          borderWidth: sizeStyles.borderWidth,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      {IconComponent ? (
        <View
          style={[
            styles.iconContainer,
            iconRotation ? { transform: [{ rotate: `${iconRotation}deg` }] } : undefined,
          ]}
        >
          <IconComponent
            width={sizeStyles.fontSize}
            height={sizeStyles.fontSize}
            fill={iconColor}
            color={iconColor}
          />
        </View>
      ) : (
        <Text
          style={[
            styles.text,
            textVariantStyles,
            {
              fontSize: sizeStyles.fontSize,
            },
          ]}
        >
          {icon}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
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
});
