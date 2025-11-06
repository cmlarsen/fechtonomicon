import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

interface TabIconProps {
  IconComponent: React.FC<SvgProps>;
  color: string;
  size?: number;
}

export const TabIcon: React.FC<TabIconProps> = ({ IconComponent, color, size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]} pointerEvents="box-none">
      <IconComponent width={size} height={size} fill={color} color={color} stroke={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
