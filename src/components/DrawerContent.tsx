import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  spacing,
} from "../theme/tokens";

import { DisciplineBadge } from "./DisciplineBadge";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import type { Flashcard } from "../types/flashcard";
import { useDrawerContext } from "../contexts/DrawerContext";

interface CardListItemProps {
  card: Flashcard;
  onPress: (card: Flashcard) => void;
}

const CardListItem = memo<CardListItemProps>(({ card, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(card);
  }, [card, onPress]);

  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.originalTerm}>{card.originalTerm}</Text>
          <Text style={styles.englishTerm}>({card.englishTerm})</Text>
        </View>
        {card.discipline && (
          <DisciplineBadge discipline={card.discipline} size="small" />
        )}
      </View>
    </TouchableOpacity>
  );
});

CardListItem.displayName = "CardListItem";

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const { cards, onCardPress } = useDrawerContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort cards
  const filteredAndSortedCards = useMemo(() => {
    if (cards.length === 0) return [];

    let filtered = cards;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = cards.filter((card) => {
        return (
          card.originalTerm.toLowerCase().startsWith(query) ||
          card.englishTerm.toLowerCase().startsWith(query)
        );
      });
    }

    return [...filtered].sort((a, b) =>
      a.originalTerm.localeCompare(b.originalTerm)
    );
  }, [cards, searchQuery]);

  const handleCardPress = useCallback(
    (card: Flashcard) => {
      // Find the original index in the unsorted cards array
      const originalIndex = cards.findIndex((c) => c.id === card.id);
      onCardPress(card.id, originalIndex);
    },
    [cards, onCardPress]
  );

  const handleSettingsPress = useCallback(() => {
    navigation.navigate("DisciplineSelection");
  }, [navigation]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const renderCardItem = useCallback(
    ({ item: card }: { item: Flashcard }) => {
      return <CardListItem card={card} onPress={handleCardPress} />;
    },
    [handleCardPress]
  );

  const keyExtractor = useCallback((card: Flashcard) => card.id, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
          {searchQuery.trim()
            ? "No cards match your search"
            : "Loading cards..."}
        </Text>
      </View>
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header with App Title */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Fechtonomicon</Text>
        <View style={styles.settingsSection}>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={handleSettingsPress}
            activeOpacity={0.85}
          >
            <Text style={styles.settingsText}>Select Disciplines</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSearch}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Alphabetized Card List */}
      <FlatList
        data={filteredAndSortedCards}
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
      />
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
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  flourish: {
    fontSize: fontSize.lg,
    color: colors.gold.main,
    textAlign: "center",
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.parchment.primary,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(201, 171, 106, 0.3)",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.parchment.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  clearButtonText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontFamily: fontFamily.bodySemiBold,
  },
  settingsSection: {
    // backgroundColor: colors.parchment.primary,
    // borderTopWidth: 1,
    // borderTopColor: "rgba(201, 171, 106, 0.3)",
  },
  settingsItem: {
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.burgundy.main,
    borderRadius: borderRadius.md,
    alignSelf: "flex-start",
  },
  settingsIcon: {
    fontSize: fontSize.md,
    color: colors.gold.main,
    marginRight: spacing.sm,
  },
  settingsText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyBold,
    color: colors.parchment.primary,
  },
  scrollView: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  cardItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(201, 171, 106, 0.3)", // colors.gold.main with 30% opacity
    backgroundColor: colors.parchment.primary,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTextContainer: {
    flex: 1,
    marginRight: spacing.sm,
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
    alignItems: "center",
  },
  emptyText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodyItalic,
    color: colors.text.secondary,
  },
});
