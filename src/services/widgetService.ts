import { NativeModules, Platform } from 'react-native';

import { Term } from '../types/term';

interface WidgetBridge {
  updateWidgetData: (cardData: string) => Promise<void>;
  updateAllTerms?: (termsJson: string) => Promise<void>;
  reloadWidget: () => Promise<void>;
}

const WidgetBridge: WidgetBridge | null = Platform.OS === 'ios' ? NativeModules.WidgetBridge : null;

export const widgetService = {
  async updateWidget(card: Term): Promise<void> {
    if (!WidgetBridge) {
      console.log('Widget bridge not available on this platform');
      return;
    }

    try {
      const widgetData = JSON.stringify({
        id: card.id,
        term: card.originalTerm,
        translation: card.englishTerm,
        description: card.briefDescription || '',
        discipline: card.weapon,
      });

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
      const simplifiedCards = cards.map(card => ({
        id: card.id,
        term: card.originalTerm,
        translation: card.englishTerm,
        description: card.briefDescription || '',
        discipline: card.weapon,
      }));

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
