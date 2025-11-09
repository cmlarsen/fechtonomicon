import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SwordArrowIcon from '../../assets/icons/np_sword_arrow.svg';
import { spacing } from '../theme/tokens';
import { IconButton } from './buttons';

interface PagerButtonProps {
  onPress: () => void;
  disabled: boolean;
  direction: 'left' | 'right';
}

const PagerButton = memo<PagerButtonProps>(({ onPress, disabled, direction }) => {
  const rotation = direction === 'left' ? -90 : 90;

  return (
    <IconButton
      IconComponent={SwordArrowIcon}
      iconRotation={rotation}
      onPress={onPress}
      disabled={disabled}
      size="medium"
      variant="burgundy"
    />
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
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {onPrev && <PagerButton onPress={onPrev} disabled={!canGoPrev} direction="left" />}
        {onNext && <PagerButton onPress={onNext} disabled={!canGoNext} direction="right" />}
      </View>
    );
  }
);

Pager.displayName = 'Pager';

const styles = StyleSheet.create({
  container: {
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
});
