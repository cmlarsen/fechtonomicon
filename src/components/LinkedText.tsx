import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, type TextStyle } from 'react-native';
import { colors, fontFamily, spacing } from '../theme/tokens';
import type { Term } from '../types/term';
import { CorrectionModal } from './modals';

interface LinkedTextProps {
  text: string;
  allCards: Term[];
  onTermPress: (cardId: string) => void;
  style?: TextStyle;
  card?: Term;
  fieldName?: string;
  disableEdit?: boolean;
  ignoreWords?: string[];
}

export const LinkedText: React.FC<LinkedTextProps> = ({
  text,
  allCards,
  onTermPress,
  style,
  card,
  fieldName,
  disableEdit = false,
  ignoreWords = [],
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
    const ignoreSet = new Set(ignoreWords.map((word) => word.toLowerCase()));

    allCards.forEach((card) => {
      if (card.originalTerm && !ignoreSet.has(card.originalTerm.toLowerCase())) {
        map.set(card.originalTerm.toLowerCase(), card.id);
      }
    });

    return map;
  }, [allCards, ignoreWords]);

  const parseText = useMemo(() => {
    type TextPart = { text: string; isLink: boolean; cardId?: string; key: string };
    const parts: TextPart[] = [];

    if (!text || termMap.size === 0) {
      return [{ text: text || '', isLink: false, key: `text-${text || ''}` }];
    }

    const buildRegex = (map: Map<string, string>): RegExp | null => {
      const termKeys = Array.from(map.keys())
        .sort((a, b) => b.length - a.length)
        .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

      if (termKeys.length === 0) {
        return null;
      }

      return new RegExp(`\\b(${termKeys.join('|')})\\b`, 'gi');
    };

    const addTextPart = (textPart: string, index: number): void => {
      if (textPart.length > 0) {
        parts.push({
          text: textPart,
          isLink: false,
          key: `text-${index}-${textPart.substring(0, 20)}`,
        });
      }
    };

    const addLinkPart = (matchedText: string, cardId: string, index: number): void => {
      parts.push({
        text: matchedText,
        isLink: true,
        cardId,
        key: `link-${cardId}-${index}`,
      });
    };

    const processMatches = (regex: RegExp, inputText: string): void => {
      let lastIndex = 0;
      let match: RegExpExecArray | null = null;

      match = regex.exec(inputText);
      while (match !== null) {
        const matchedTerm = match[0].toLowerCase();
        const cardId = termMap.get(matchedTerm);

        if (cardId) {
          if (match.index > lastIndex) {
            addTextPart(inputText.substring(lastIndex, match.index), lastIndex);
          }

          addLinkPart(match[0], cardId, match.index);
          lastIndex = match.index + match[0].length;
        }

        match = regex.exec(inputText);
      }

      if (lastIndex < inputText.length) {
        addTextPart(inputText.substring(lastIndex), lastIndex);
      }
    };

    const regex = buildRegex(termMap);
    if (!regex) {
      return [{ text, isLink: false, key: `text-${text}` }];
    }

    processMatches(regex, text);

    if (parts.length === 0) {
      return [{ text, isLink: false, key: `text-${text}` }];
    }

    return parts;
  }, [text, termMap]);

  return (
    <>
      <Text selectable selectionColor={colors.gold.dark} style={style}>
        {parseText.map((part) => {
          if (part.isLink && part.cardId) {
            const cardId = part.cardId;
            return (
              <Text
                key={part.key}
                selectable
                onPress={() => onTermPress(cardId)}
                style={styles.link}
              >
                {part.text}
              </Text>
            );
          }
          return (
            <Text key={part.key} selectable>
              {part.text}
            </Text>
          );
        })}
        {!disableEdit && card && fieldName && (
          <Text
            selectable
            selectionColor={colors.gold.dark}
            onPress={handleEdit}
            style={styles.editIcon}
          >
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
