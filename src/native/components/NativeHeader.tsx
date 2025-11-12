import type { DrawerHeaderProps } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MagnifyingGlassIcon from '../../../assets/icons/np_magnifying-glass.svg';
import SwordsIcon from '../../../assets/icons/np_swords.svg';
import { IconButton } from '../../components/buttons';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

export const NativeHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    navigation.openDrawer();
  }, [navigation]);

  const handleQuiz = useCallback(() => {
    Keyboard.dismiss();
    navigation.getParent()?.navigate('Quiz');
  }, [navigation]);

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerLeft}>
        <IconButton
          IconComponent={MagnifyingGlassIcon}
          onPress={handleSearch}
          mode="circle"
          size="small"
        />
      </View>
      <Text style={styles.title}>Fechtonomicon</Text>
      <View style={styles.headerRight}>
        <IconButton IconComponent={SwordsIcon} onPress={handleQuiz} mode="circle" size="small" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.burgundy.dark,
    borderBottomWidth: 1,
    borderBottomColor: colors.iron.main,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: 80,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: 80,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: fontFamily.titleSemiBold,
    fontSize: fontSize.lg,
    // color: colors.parchment.primary,
    color: colors.gold.light,
    textAlign: 'center',
    flex: 1,
  },
});
