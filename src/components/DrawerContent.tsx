import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDrawerContext } from '../contexts/DrawerContext';
import { colors, fontFamily, fontSize, spacing } from '../theme/tokens';
import type { Flashcard } from '../types/flashcard';

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { cards, onCardPress } = useDrawerContext();

  // Sort cards alphabetically by originalTerm
  const sortedCards = [...cards].sort((a, b) => a.originalTerm.localeCompare(b.originalTerm));

  const handleCardPress = (card: Flashcard) => {
    // Find the original index in the unsorted cards array
    const originalIndex = cards.findIndex((c) => c.id === card.id);
    onCardPress(card.id, originalIndex);
  };

  const handleSettingsPress = () => {
    navigation.navigate('DisciplineSelection');
  };

  return (
    <View style={styles.container}>
      {/* Header with App Title */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Fechtonomicon</Text>
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
          sortedCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.cardItem}
              onPress={() => handleCardPress(card)}
              activeOpacity={0.85}
            >
              <Text style={styles.originalTerm}>{card.originalTerm}</Text>
              <Text style={styles.englishTerm}>({card.englishTerm})</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Settings pinned at bottom */}
      <View style={styles.settingsSection}>
        <View style={styles.separatorLine} />
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleSettingsPress}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
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
  settingsSection: {
    backgroundColor: colors.parchment.primary,
    borderTopWidth: 1,
    borderTopColor: 'rgba(201, 171, 106, 0.3)',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.parchment.primary,
  },
  settingsIcon: {
    fontSize: fontSize.md,
    color: colors.gold.main,
    marginRight: spacing.sm,
  },
  settingsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  cardItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 171, 106, 0.3)', // colors.gold.main with 30% opacity
    backgroundColor: colors.parchment.primary,
  },
  originalTerm: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  englishTerm: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
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
