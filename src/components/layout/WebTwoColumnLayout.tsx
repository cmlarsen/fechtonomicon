import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/tokens';
import type { Term } from '../../types/term';
import { TermCard } from '../TermCard';
import { TermsList } from '../terms/TermsList';

interface WebTwoColumnLayoutProps {
  cards: Term[];
  currentCard: Term | undefined;
  selectedCardId: string | undefined;
  onCardPress: (card: Term) => void;
  onTermPress: (cardId: string) => void;
}

export const WebTwoColumnLayout: React.FC<WebTwoColumnLayoutProps> = ({
  cards,
  currentCard,
  selectedCardId,
  onCardPress,
  onTermPress,
}) => {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <TermsList
          cards={cards}
          selectedCardId={selectedCardId}
          onCardPress={onCardPress}
          showSelected={true}
          scrollToSelected={true}
        />
      </View>
      <View style={styles.rightColumn}>
        <TermCard card={currentCard} onTermPress={onTermPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '35%',
    minWidth: 300,
    maxWidth: 400,
    borderRightWidth: 2,
    borderRightColor: colors.gold.main,
    backgroundColor: colors.parchment.light,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
});
