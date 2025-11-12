import AsyncStorage from '@react-native-async-storage/async-storage';
import { Discipline, STORAGE_KEYS } from '../types/term';

export const storage = {
  async getViewedCards(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.VIEWED_CARDS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting viewed cards:', error);
      return [];
    }
  },

  async setViewedCards(cardIds: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.VIEWED_CARDS, JSON.stringify(cardIds));
    } catch (error) {
      console.error('Error setting viewed cards:', error);
    }
  },

  async addViewedCard(cardId: string): Promise<void> {
    try {
      const viewedCards = await this.getViewedCards();
      if (!viewedCards.includes(cardId)) {
        viewedCards.push(cardId);
        await this.setViewedCards(viewedCards);
      }
    } catch (error) {
      console.error('Error adding viewed card:', error);
    }
  },

  async resetViewedCards(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.VIEWED_CARDS);
    } catch (error) {
      console.error('Error resetting viewed cards:', error);
    }
  },

  async getSelectedDisciplines(): Promise<Discipline[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_DISCIPLINES);
      return data ? JSON.parse(data) : ['italian-longsword', 'german-longsword'];
    } catch (error) {
      console.error('Error getting selected disciplines:', error);
      return ['italian-longsword', 'german-longsword'];
    }
  },

  async setSelectedDisciplines(disciplines: Discipline[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_DISCIPLINES, JSON.stringify(disciplines));
    } catch (error) {
      console.error('Error setting selected disciplines:', error);
    }
  },

  async getLastCardShown(): Promise<string | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_CARD_SHOWN);
      return data || null;
    } catch (error) {
      console.error('Error getting last card shown:', error);
      return null;
    }
  },

  async setLastCardShown(cardId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_CARD_SHOWN, cardId);
    } catch (error) {
      console.error('Error setting last card shown:', error);
    }
  },

  async getUserId(): Promise<string | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      return data || null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },

  async setUserId(userId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },
};
