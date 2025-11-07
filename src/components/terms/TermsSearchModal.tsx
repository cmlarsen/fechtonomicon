import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTermsSearch } from '../../contexts/TermsSearchContext';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import { useFlashcardStore } from '../../store/flashcardStore';
import { borderRadius, colors, shadows, spacing } from '../../theme/tokens';
import type { Flashcard } from '../../types/flashcard';
import { IconButton } from '../buttons';
import { DisciplineSelector } from './DisciplineSelector';
import { TermsList } from './TermsList';
import { TermsSearchBar } from './TermsSearchBar';

interface TermsSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onCardSelect: (card: Flashcard) => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TermsSearchModal: React.FC<TermsSearchModalProps> = ({
  visible,
  onClose,
  onCardSelect,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const { searchQuery, setSearchQuery } = useTermsSearch();
  const { filteredAndSortedCards } = useFilteredCards();
  const currentCard = useFlashcardStore((state) => state.currentCard);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleCardPress = (card: Flashcard) => {
    onCardSelect(card);
    onClose();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY: slideAnim }],
                paddingBottom: insets.bottom + spacing.md,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.closeButtonContainer}>
                <IconButton icon="✕" onPress={onClose} size="small" variant="gold" />
              </View>

              <View style={styles.content}>
                <DisciplineSelector />

                <View style={styles.listContainer}>
                  <TermsList
                    cards={filteredAndSortedCards}
                    selectedCardId={currentCard?.id}
                    onCardPress={handleCardPress}
                    searchQuery={searchQuery}
                  />
                </View>

                <View style={styles.searchBarContainer}>
                  <TermsSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClearSearch={handleClearSearch}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(42, 24, 16, 0.6)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.parchment.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    maxHeight: SCREEN_HEIGHT * 0.85,
    ...shadows.parchment,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: colors.gold.main,
    position: 'relative',
    marginBottom: spacing.md,
    marginHorizontal: spacing.sm,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  listContainer: {
    flex: 1,
    minHeight: 200,
  },
  searchBarContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gold.main,
    backgroundColor: colors.parchment.primary,
  },
});
