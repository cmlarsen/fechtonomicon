import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootTabParamList } from '../navigation/types';
import { colors, fontFamily, fontSize, shadows, spacing } from '../theme/tokens';
import { rgba } from '../utils/colorUtils';

interface WebTopNavProps {
  navigation: BottomTabNavigationProp<RootTabParamList>;
  currentRoute: keyof RootTabParamList | 'Settings';
  onSettings: () => void;
}

export const WebTopNav: React.FC<WebTopNavProps> = ({ navigation, currentRoute, onSettings }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Fechtonomicon</Text>
      <View style={styles.navTabs}>
        <Pressable
          style={[styles.navTab, currentRoute === 'Terms' && styles.navTabActive]}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text style={[styles.navTabText, currentRoute === 'Terms' && styles.navTabTextActive]}>
            Terms
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, currentRoute === 'Quiz' && styles.navTabActive]}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={[styles.navTabText, currentRoute === 'Quiz' && styles.navTabTextActive]}>
            Quiz
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, currentRoute === 'Settings' && styles.navTabActive]}
          onPress={onSettings}
        >
          <Text style={[styles.navTabText, currentRoute === 'Settings' && styles.navTabTextActive]}>
            Settings
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.gold.main,
    ...shadows.sm,
  },
  title: {
    fontSize: fontSize.xl,
    letterSpacing: 1.5,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
  },
  navTabs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  navTab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  navTabActive: {
    backgroundColor: rgba(colors.gold.main, 0.15),
  },
  navTabText: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: fontSize.md,
    color: colors.iron.main,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  navTabTextActive: {
    color: colors.gold.dark,
  },
});
