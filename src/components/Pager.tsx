import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SwordArrowIcon from '../../assets/icons/np_sword_arrow.svg';
import { colors, spacing } from '../theme/tokens';

interface PagerButtonProps {
  onPress: () => void;
  disabled: boolean;
  direction: 'left' | 'right';
}

const PagerButton = memo<PagerButtonProps>(({ onPress, disabled, direction }) => {
  const isLeft = direction === 'left';
  const positionStyle = isLeft ? styles.floatingButtonLeft : styles.floatingButtonRight;
  const rotationStyle = isLeft ? styles.arrowLeft : styles.arrowRight;

  return (
    <TouchableOpacity
      style={[
        styles.arrowButton,
        styles.burgundyVariant,
        disabled && styles.disabledButton,
        positionStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.arrowIconContainer, rotationStyle]}>
        <SwordArrowIcon
          width={24}
          height={24}
          fill={colors.burgundy.dark}
          color={colors.burgundy.dark}
        />
      </View>
    </TouchableOpacity>
  );
});

PagerButton.displayName = 'PagerButton';

interface PagerProps {
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

export const Pager = memo<PagerProps>(
  ({ onPrev, onNext, canGoPrev = false, canGoNext = false }) => {
    const insets = useSafeAreaInsets();

    if (!onPrev && !onNext) {
      return null;
    }

    return (
      <View style={[styles.floatingButtons, { paddingBottom: insets.bottom }]}>
        {onPrev && <PagerButton onPress={onPrev} disabled={!canGoPrev} direction="left" />}
        {onNext && <PagerButton onPress={onNext} disabled={!canGoNext} direction="right" />}
      </View>
    );
  }
);

Pager.displayName = 'Pager';

const styles = StyleSheet.create({
  floatingButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    pointerEvents: 'box-none',
  },
  floatingButtonLeft: {
    pointerEvents: 'auto',
  },
  floatingButtonRight: {
    pointerEvents: 'auto',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.parchment.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  burgundyVariant: {
    borderColor: colors.burgundy.main,
    shadowColor: colors.burgundy.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  arrowIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    transform: [{ rotate: '-90deg' }],
  },
  arrowRight: {
    transform: [{ rotate: '90deg' }],
  },
});
