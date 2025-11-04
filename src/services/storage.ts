import { STORAGE_KEYS, Discipline } from '../types/flashcard';

let mmkvInstance: any = null;
let isMMKVAvailable = false;

// Lazy initialization - only create MMKV when first accessed
function getMMKV(): any {
  if (!mmkvInstance) {
    try {
      // Dynamically require MMKV to handle cases where native module might not be ready
      const { MMKV } = require('react-native-mmkv');

      if (!MMKV) {
        throw new Error('MMKV constructor not available');
      }

      mmkvInstance = new MMKV();
      isMMKVAvailable = true;
      console.log('✅ MMKV initialized successfully');
    } catch (error) {
      console.warn('⚠️ MMKV not available, using in-memory fallback:', error);
      isMMKVAvailable = false;

      // Create an in-memory fallback storage
      const memoryStorage: Record<string, string> = {};

      mmkvInstance = {
        set: (key: string, value: string) => {
          memoryStorage[key] = value;
        },
        getString: (key: string) => memoryStorage[key],
        delete: (key: string) => {
          delete memoryStorage[key];
        },
        clearAll: () => {
          Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
        },
      };
    }
  }
  return mmkvInstance;
}

export const storage = {
  getViewedCards(): string[] {
    try {
      const data = getMMKV().getString(STORAGE_KEYS.VIEWED_CARDS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting viewed cards:', error);
      return [];
    }
  },

  setViewedCards(cardIds: string[]): void {
    try {
      getMMKV().set(STORAGE_KEYS.VIEWED_CARDS, JSON.stringify(cardIds));
    } catch (error) {
      console.error('Error setting viewed cards:', error);
    }
  },

  addViewedCard(cardId: string): void {
    try {
      const viewedCards = this.getViewedCards();
      if (!viewedCards.includes(cardId)) {
        viewedCards.push(cardId);
        this.setViewedCards(viewedCards);
      }
    } catch (error) {
      console.error('Error adding viewed card:', error);
    }
  },

  resetViewedCards(): void {
    try {
      getMMKV().delete(STORAGE_KEYS.VIEWED_CARDS);
    } catch (error) {
      console.error('Error resetting viewed cards:', error);
    }
  },

  getSelectedDisciplines(): Discipline[] {
    try {
      const data = getMMKV().getString(STORAGE_KEYS.SELECTED_DISCIPLINES);
      return data ? JSON.parse(data) : ['meyer-longsword'];
    } catch (error) {
      console.error('Error getting selected disciplines:', error);
      return ['meyer-longsword'];
    }
  },

  setSelectedDisciplines(disciplines: Discipline[]): void {
    try {
      getMMKV().set(STORAGE_KEYS.SELECTED_DISCIPLINES, JSON.stringify(disciplines));
    } catch (error) {
      console.error('Error setting selected disciplines:', error);
    }
  },

  getLastCardShown(): string | null {
    try {
      return getMMKV().getString(STORAGE_KEYS.LAST_CARD_SHOWN) || null;
    } catch (error) {
      console.error('Error getting last card shown:', error);
      return null;
    }
  },

  setLastCardShown(cardId: string): void {
    try {
      getMMKV().set(STORAGE_KEYS.LAST_CARD_SHOWN, cardId);
    } catch (error) {
      console.error('Error setting last card shown:', error);
    }
  },

  clearAll(): void {
    try {
      getMMKV().clearAll();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },
};
