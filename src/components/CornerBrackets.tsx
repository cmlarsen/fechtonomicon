import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

export const CornerBrackets: React.FC = () => {
  return (
    <>
      {/* Top Left */}
      <View style={[styles.corner, styles.topLeft]}>
        <View style={[styles.horizontalLine, styles.topLine]} />
        <View style={[styles.verticalLine, styles.leftLine]} />
      </View>

      {/* Top Right */}
      <View style={[styles.corner, styles.topRight]}>
        <View style={[styles.horizontalLine, styles.topLine]} />
        <View style={[styles.verticalLine, styles.rightLine]} />
      </View>

      {/* Bottom Left */}
      <View style={[styles.corner, styles.bottomLeft]}>
        <View style={[styles.horizontalLine, styles.bottomLine]} />
        <View style={[styles.verticalLine, styles.leftLine]} />
      </View>

      {/* Bottom Right */}
      <View style={[styles.corner, styles.bottomRight]}>
        <View style={[styles.horizontalLine, styles.bottomLine]} />
        <View style={[styles.verticalLine, styles.rightLine]} />
      </View>
    </>
  );
};

const BRACKET_SIZE = 20;
const BRACKET_THICKNESS = 2;

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
  },
  topLeft: {
    top: spacing.md,
    left: spacing.md,
  },
  topRight: {
    top: spacing.md,
    right: spacing.md,
  },
  bottomLeft: {
    bottom: spacing.md,
    left: spacing.md,
  },
  bottomRight: {
    bottom: spacing.md,
    right: spacing.md,
  },
  horizontalLine: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_THICKNESS,
    backgroundColor: colors.gold.main,
  },
  verticalLine: {
    position: 'absolute',
    width: BRACKET_THICKNESS,
    height: BRACKET_SIZE,
    backgroundColor: colors.gold.main,
  },
  topLine: {
    top: 0,
  },
  bottomLine: {
    bottom: 0,
  },
  leftLine: {
    left: 0,
  },
  rightLine: {
    right: 0,
  },
});
