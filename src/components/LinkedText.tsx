import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fontFamily } from '../theme/tokens';
import type { Flashcard } from '../types/flashcard';

interface LinkedTextProps {
  text: string;
  allCards: Flashcard[];
  onTermPress: (cardId: string) => void;
  style?: any;
}

export const LinkedText: React.FC<LinkedTextProps> = ({ text, allCards, onTermPress, style }) => {
  const termMap = useMemo(() => {
    const map = new Map<string, string>();

    allCards.forEach((card) => {
      if (card.originalTerm) {
        map.set(card.originalTerm.toLowerCase(), card.id);
      }
      if (card.englishTerm) {
        map.set(card.englishTerm.toLowerCase(), card.id);
      }
    });

    return map;
  }, [allCards]);

  const parseText = useMemo(() => {
    const parts: Array<{ text: string; isLink: boolean; cardId?: string }> = [];

    if (!text || termMap.size === 0) {
      return [{ text: text || '', isLink: false }];
    }

    const termKeys = Array.from(termMap.keys())
      .sort((a, b) => b.length - a.length)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    if (termKeys.length === 0) {
      return [{ text, isLink: false }];
    }

    const regex = new RegExp(`\\b(${termKeys.join('|')})\\b`, 'gi');

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchedTerm = match[0].toLowerCase();
      const cardId = termMap.get(matchedTerm);

      if (cardId) {
        if (match.index > lastIndex) {
          parts.push({
            text: text.substring(lastIndex, match.index),
            isLink: false,
          });
        }

        parts.push({
          text: match[0],
          isLink: true,
          cardId,
        });

        lastIndex = match.index + match[0].length;
      }
    }

    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isLink: false,
      });
    }

    if (parts.length === 0) {
      return [{ text, isLink: false }];
    }

    return parts;
  }, [text, termMap]);

  return (
    <Text style={style}>
      {parseText.map((part, index) => {
        if (part.isLink && part.cardId) {
          return (
            <Text key={index} onPress={() => onTermPress(part.cardId!)} style={styles.link}>
              {part.text}
            </Text>
          );
        }
        return <Text key={index}>{part.text}</Text>;
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.gold.dark,
    textDecorationLine: 'underline',
    fontFamily: fontFamily.bodySemiBold,
  },
});
