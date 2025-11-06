import React, { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fontFamily, spacing } from '../theme/tokens';
import type { Flashcard } from '../types/flashcard';
import { CorrectionModal } from './CorrectionModal';

interface LinkedTextProps {
  text: string;
  allCards: Flashcard[];
  onTermPress: (cardId: string) => void;
  style?: any;
  card?: Flashcard;
  fieldName?: string;
  disableEdit?: boolean;
}

export const LinkedText: React.FC<LinkedTextProps> = ({
  text,
  allCards,
  onTermPress,
  style,
  card,
  fieldName,
  disableEdit = false,
}) => {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionData, setCorrectionData] = useState<{
    fieldName: string;
    fieldValue: string;
  } | null>(null);

  const handleEdit = () => {
    if (!card || !fieldName || disableEdit) return;
    setCorrectionData({ fieldName, fieldValue: text });
    setShowCorrectionModal(true);
  };

  const handleCloseCorrectionModal = () => {
    setShowCorrectionModal(false);
    setCorrectionData(null);
  };
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
    let match: RegExpExecArray | null = null;

    match = regex.exec(text);
    while (match !== null) {
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

      match = regex.exec(text);
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
    <>
      <Text style={style}>
        {parseText.map((part, index) => {
          if (part.isLink && part.cardId) {
            const cardId = part.cardId;
            return (
              <Text key={index} onPress={() => onTermPress(cardId)} style={styles.link}>
                {part.text}
              </Text>
            );
          }
          return <Text key={index}>{part.text}</Text>;
        })}
        {!disableEdit && card && fieldName && (
          <Text onPress={handleEdit} style={styles.editIcon}>
            {' ✏️'}
          </Text>
        )}
      </Text>
      {card && correctionData && (
        <CorrectionModal
          visible={showCorrectionModal}
          card={card}
          fieldName={correctionData.fieldName}
          fieldValue={correctionData.fieldValue}
          onClose={handleCloseCorrectionModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.gold.dark,
    textDecorationLine: 'underline',
    fontFamily: fontFamily.bodySemiBold,
  },
  editIcon: {
    fontSize: 10,
    opacity: 1,
    paddingLeft: spacing.xs,
    color: colors.gold.dark,
  },
});
