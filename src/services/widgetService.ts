import { NativeModules, Platform } from 'react-native';

import { Flashcard } from '../types/flashcard';

interface WidgetBridge {
  updateWidgetData: (cardData: string) => Promise<void>;
  reloadWidget: () => Promise<void>;
}

const WidgetBridge: WidgetBridge | null = Platform.OS === 'ios'
  ? NativeModules.WidgetBridge
  : null;

export const widgetService = {
  async updateWidget(card: Flashcard): Promise<void> {
    if (!WidgetBridge) {
      console.log('Widget bridge not available on this platform');
      return;
    }

    try {
      const widgetData = JSON.stringify({
        id: card.id,
        title: `${card.originalTerm} (${card.englishTerm})`,
        description: card.description,
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
};
