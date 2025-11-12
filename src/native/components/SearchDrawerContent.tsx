import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TermsList } from '../../components/terms/TermsList';
import { useTermsSearch } from '../../contexts/TermsSearchContext';
import { useFilteredCards } from '../../hooks/useFilteredCards';
import { colors } from '../../theme/tokens';
import type { Term } from '../../types/term';
import { DisciplineSelector } from './DisciplineSelector';

export const SearchDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { searchQuery } = useTermsSearch();
  const { filteredAndSortedCards } = useFilteredCards();
  const insets = useSafeAreaInsets();

  const handleCardPress = useCallback(
    (card: Term) => {
      Keyboard.dismiss();
      navigation.closeDrawer();
      // Navigate to the Terms screen with the selected card
      setTimeout(() => {
        navigation.navigate('Terms', { cardId: card.id });
      }, 100);
    },
    [navigation]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topSection}>
        <DisciplineSelector />
      </View>

      <View style={styles.listContainer}>
        <TermsList
          cards={filteredAndSortedCards}
          selectedCardId={undefined}
          onCardPress={handleCardPress}
          searchQuery={searchQuery}
          showSelected={false}
          scrollToSelected={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
  topSection: {},
  searchBarContainer: {},
  listContainer: {
    flex: 1,
  },
});
