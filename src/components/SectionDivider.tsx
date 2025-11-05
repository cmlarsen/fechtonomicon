import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';

interface SectionDividerProps {
  label?: string;
  ornament?: string; // Unicode character like ⚔ 🗡 ❧ ⚜
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ label, ornament = '⚔' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.ornament}>{ornament}</Text>
        <View style={styles.line} />
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gold.main,
    opacity: 0.3,
  },
  ornament: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.lg,
    color: colors.gold.main,
    opacity: 0.6,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.light,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
