import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme/tokens';
import type { Flashcard } from '../../types/flashcard';
import { CardListItem } from './CardListItem';

interface TermsListProps {
  cards: Flashcard[];
  selectedCardId: string | undefined;
  onCardPress: (card: Flashcard) => void;
  searchQuery?: string;
  showSelected?: boolean;
  scrollToSelected?: boolean;
}

export const TermsList: React.FC<TermsListProps> = ({
  cards,
  selectedCardId,
  onCardPress,
  searchQuery = '',
  showSelected = true,
  scrollToSelected = true,
}) => {
  const listRef = useRef<FlatList<Flashcard>>(null);

  const renderCardItem = useCallback(
    ({ item: card }: { item: Flashcard }) => {
      const isSelected = showSelected && card.id === selectedCardId;
      return <CardListItem card={card} isSelected={isSelected} onPress={onCardPress} />;
    },
    [onCardPress, selectedCardId, showSelected]
  );

  const keyExtractor = useCallback((card: Flashcard) => card.id, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
          {searchQuery.trim() ? 'No cards match your search' : 'Loading cards...'}
        </Text>
      </View>
    );
  }, [searchQuery]);

  useEffect(() => {
    if (scrollToSelected && selectedCardId && cards.length > 0) {
      const selectedIndex = cards.findIndex((c) => c.id === selectedCardId);
      if (selectedIndex !== -1 && listRef.current) {
        listRef.current.scrollToIndex({
          index: selectedIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [selectedCardId, cards, scrollToSelected]);

  return (
    <FlatList
      ref={listRef}
      data={cards}
      renderItem={renderCardItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={styles.listContent}
      style={styles.listView}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      keyboardShouldPersistTaps="handled"
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          listRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
  },
});
