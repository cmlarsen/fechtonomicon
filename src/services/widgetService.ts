import { NativeModules, Platform } from 'react-native';

import { DISCIPLINE_INFO, Term } from '../types/term';

interface WidgetBridge {
  updateWidgetData: (cardData: string) => Promise<void>;
  updateAllTerms?: (termsJson: string) => Promise<void>;
  reloadWidget: () => Promise<void>;
}

const WidgetBridge: WidgetBridge | null = Platform.OS === 'ios' ? NativeModules.WidgetBridge : null;

interface WidgetTerm {
  id: string;
  term: string;
  translation: string;
  description: string;
  discipline: string;
}

/**
 * Maps a card to the shape the iOS widget expects. The widget's `discipline`
 * field must carry the card's discipline (e.g. "German Longsword"), not its
 * weapon — previously this sent `card.weapon`, which is always "longsword".
 */
export const toWidgetTerm = (card: Term): WidgetTerm => ({
  id: card.id,
  term: card.originalTerm,
  translation: card.englishTerm,
  description: card.briefDescription || '',
  discipline: card.discipline ? (DISCIPLINE_INFO[card.discipline]?.name ?? '') : '',
});

export const widgetService = {
  async updateWidget(card: Term): Promise<void> {
    if (!WidgetBridge) {
      console.log('Widget bridge not available on this platform');
      return;
    }

    try {
      const widgetData = JSON.stringify(toWidgetTerm(card));

      await WidgetBridge.updateWidgetData(widgetData);
      await WidgetBridge.reloadWidget();
    } catch (error) {
      console.error('Failed to update widget:', error);
    }
  },

  isAvailable(): boolean {
    return WidgetBridge !== null;
  },

  async updateAllTerms(cards: Term[]): Promise<void> {
    if (!WidgetBridge) return;

    try {
      // Simplify data to reduce size
      const simplifiedCards = cards.map(toWidgetTerm);

      const jsonString = JSON.stringify(simplifiedCards);

      // Check if the bridge supports this method (it might not be updated yet on native side)
      if (WidgetBridge.updateAllTerms) {
        await WidgetBridge.updateAllTerms(jsonString);
        await WidgetBridge.reloadWidget();
      } else {
        console.warn('WidgetBridge.updateAllTerms is not defined');
      }
    } catch (error) {
      console.error('Failed to update all terms for widget:', error);
    }
  },
};
