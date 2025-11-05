import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading cards...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gold.main} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  text: {
    marginTop: spacing.lg,
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    textAlign: 'center',
  },
});
