import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  shadows,
  spacing,
} from "../theme/tokens";

import { CornerBrackets } from "./CornerBrackets";
import type { Flashcard as FlashcardType } from "../types/flashcard";
import React from "react";
import { SectionDivider } from "./SectionDivider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FlashcardProps {
  card: FlashcardType;
  onRelatedCardPress?: (cardId: string) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  onRelatedCardPress,
}) => {
  const handleCitationPress = (citation: any) => {
    // Future: handle citation navigation
    console.log("Citation pressed:", citation);
  };

  // Extract simple term from related card IDs for display
  const getTermFromId = (id: string) => {
    const parts = id.split(".");
    return parts[parts.length - 1].replace(/_/g, " ");
  };

  return (
    <View style={styles.container} testID="flashcard-container">
      <CornerBrackets />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.originalTerm}>{card.originalTerm}</Text>
            <Text style={styles.englishTerm}>{card.englishTerm}</Text>
          </View>
        </View>

        <SectionDivider label="DESCRIPTION" ornament="❦" />
        <Text style={styles.description}>{card.description}</Text>
        {card.application && (
          <>
            <SectionDivider label="APPLICATION" ornament="⚔" />
            <Text style={styles.description}>{card.application}</Text>
          </>
        )}
        {card.related && card.related.length > 0 && (
          <>
            <SectionDivider label="RELATED CONCEPTS" ornament="⚜" />
            <View style={styles.chipContainer}>
              {card.related.map((relatedId) => (
                <TouchableOpacity
                  key={relatedId}
                  style={styles.chip}
                  onPress={() => onRelatedCardPress?.(relatedId)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.chipText}>
                    {getTermFromId(relatedId)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {/* Inline pill badges with separator */}
        <SectionDivider label="TAGS" ornament="⚜" />
        <View style={styles.badgeContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.badgeText}>{card.category}</Text>
          </View>
          <View style={styles.weaponBadge}>
            <Text style={styles.badgeText}>{card.weapon}</Text>
          </View>
        </View>
        {/*
        {card.source_primary && (
          <>
            <SectionDivider label="SOURCE" ornament="📜" />
            <Text style={styles.sourceText}>
              {card.source_primary.work} - {card.source_primary.section}
            </Text>
            <Text style={styles.sourceDetail}>
              {card.source_primary.folio_or_marker}
            </Text>
          </>
        )} */}
        {/* {card.citations && card.citations.length > 0 && (
          <>
            <SectionDivider label="CITATIONS" ornament="✒" />
            {card.citations.map((citation) => (
              <TouchableOpacity
                key={`${citation.type}-${
                  citation.ref || citation.locator || Math.random()
                }`}
                style={styles.citationItem}
                onPress={() => handleCitationPress(citation)}
                activeOpacity={0.85}
              >
                <Text style={styles.citationType}>{citation.type}</Text>
                {citation.locator && (
                  <Text style={styles.citationLocator}>{citation.locator}</Text>
                )}
                {citation.note && (
                  <Text style={styles.citationNote}>{citation.note}</Text>
                )}
              </TouchableOpacity>
            ))}
          </>
        )} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.parchment.primary,
    borderRadius: borderRadius.lg,
    ...shadows.parchment,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl * 2.5, // Extra padding at bottom for FAB
  },
  header: {
    marginBottom: spacing.md,
  },
  titleContainer: {
    // marginBottom: spacing.md,
  },
  originalTerm: {
    fontSize: fontSize.xxxl,
    lineHeight: fontSize.xxxl * 1.2,
    fontFamily: fontFamily.title,
    color: colors.iron.dark,
    marginBottom: spacing.xs,
    // Embossed text effect
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  englishTerm: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bodyMediumItalic,
    color: colors.iron.main,
    // Subtle emboss
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0.5,
  },
  separatorLine: {
    height: 1,
    backgroundColor: colors.gold.main,
    opacity: 0.2,
    marginVertical: spacing.sm,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
    justifyContent: "center",
  },
  categoryBadge: {
    backgroundColor: colors.parchment.light,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.gold.main,
  },
  weaponBadge: {
    backgroundColor: colors.parchment.light,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.gold.dark,
  },
  badgeText: {
    color: colors.iron.main,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    lineHeight: fontSize.md * 1.4, // Reduced from 1.8 to 1.4
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    backgroundColor: colors.gold.light,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gold.dark,
    // Embossed button effect
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  chipText: {
    color: colors.iron.dark,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodySemiBold,
    textTransform: "capitalize",
  },
  sourceText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.dark,
    marginBottom: spacing.xs,
  },
  sourceDetail: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyItalic,
    color: colors.iron.main,
  },
  citationItem: {
    backgroundColor: colors.parchment.dark,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold.main,
    // Subtle embossed card effect
    ...shadows.inset,
  },
  citationType: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodyBold,
    color: colors.iron.dark,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  citationLocator: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodyMedium,
    color: colors.iron.main,
    marginBottom: spacing.xs,
  },
  citationNote: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    opacity: 0.85,
  },
});
