import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';

export const TermsListHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.appTitle}>Fechtonomicon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.xs,
    backgroundColor: colors.parchment.dark,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 171, 106, 0.3)',
    textAlign: 'center',
  },
  appTitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
});
