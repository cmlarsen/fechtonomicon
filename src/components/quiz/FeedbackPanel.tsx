import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../buttons';
import { animation, borderRadius, colors, fontFamily, fontSize, shadows, spacing } from '../../theme/tokens';

interface FeedbackPanelProps {
  visible: boolean;
  isCorrect: boolean;
  onContinue: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ visible, isCorrect, onContinue }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: animation.normal,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(300);
      opacityAnim.setValue(0);
    }
  }, [visible, slideAnim, opacityAnim]);

  if (!visible) return null;

  return (
    <>
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.statusText, isCorrect ? styles.correctText : styles.incorrectText]}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </Text>
          {isCorrect ? (
            <PrimaryButton
              title="Continue"
              onPress={onContinue}
              size="large"
              style={styles.continueButton}
            />
          ) : (
            <SecondaryButton
              title="Continue"
              onPress={onContinue}
              size="large"
              variant="burgundy"
              style={styles.continueButton}
            />
          )}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.parchment.light,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.gold.dark,
    ...shadows.parchment,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
    alignItems: 'center',
  },
  statusText: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    textAlign: 'center',
  },
  correctText: {
    color: colors.green.main,
  },
  incorrectText: {
    color: colors.iron.dark,
  },
  continueButton: {
    width: '100%',
  },
});
