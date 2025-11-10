import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';

export const CustomTabBar: React.FC<BottomTabBarProps> = (_props) => {
  // Web uses top navigation, so no tab bar is needed
  return null;
};
