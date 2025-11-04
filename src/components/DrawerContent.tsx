import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDrawerContext } from '../contexts/DrawerContext';
import { Flashcard } from '../types/flashcard';
import { colors, spacing, fontSize, fontFamily, fontWeight, borderRadius, shadows } from '../theme/tokens';

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { cards, onCardPress } = useDrawerContext();

  // Sort cards alphabetically by originalTerm
  const sortedCards = [...cards].sort((a, b) =>
    a.originalTerm.localeCompare(b.originalTerm)
  );

  const handleCardPress = (card: Flashcard, index: number) => {
    // Find the original index in the unsorted cards array
    const originalIndex = cards.findIndex(c => c.id === card.id);
    onCardPress(card.id, originalIndex);
  };

  const handleSettingsPress = () => {
    navigation.navigate('DisciplineSelection');
  };

  return (
    <View style={styles.container}>
      {/* Header with App Title and decorative flourish */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>HEMA{'\n'}Flash Cards</Text>
        <Text style={styles.flourish}>⚔ ❦ ⚔</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Ornamental separator */}
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
      </View>

      {/* Alphabetized Card List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sortedCards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Loading cards...</Text>
          </View>
        ) : (
          sortedCards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={styles.cardItem}
              onPress={() => handleCardPress(card, index)}
              activeOpacity={0.85}
            >
              <Text style={styles.originalTerm}>{card.originalTerm}</Text>
              <Text style={styles.englishTerm}>({card.englishTerm})</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment.primary,
  },
  header: {
    paddingTop: spacing.xxl + 20,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.parchment.dark,
    borderRightWidth: 4,
    borderRightColor: colors.gold.main,
  },
  appTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    marginBottom: spacing.xs,
    lineHeight: fontSize.xxl * 1.2,
    // Embossed title
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  flourish: {
    fontSize: fontSize.lg,
    color: colors.gold.main,
    textAlign: 'center',
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  separator: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  separatorLine: {
    height: 2,
    backgroundColor: colors.gold.main,
    opacity: 0.3,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold.dark,
    // Embossed button
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: fontSize.md,
    color: colors.gold.dark,
    marginRight: spacing.xs,
  },
  settingsText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  cardItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold.main,
    borderBottomStyle: 'solid',
    opacity: 0.2,
    backgroundColor: colors.parchment.primary,
  },
  originalTerm: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    marginBottom: spacing.xs / 2,
  },
  englishTerm: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyItalic,
    color: colors.iron.main,
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
