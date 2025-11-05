import { Platform } from 'react-native';
import { Discipline, STORAGE_KEYS } from '../types/flashcard';

let mmkvInstance: any = null;
let _isMMKVAvailable = false;

// Lazy initialization - only create storage when first accessed
function getMMKV(): any {
  if (!mmkvInstance) {
    // Use localStorage on web platform
    if (Platform.OS === 'web') {
      console.log('✅ Using localStorage for web platform');
      mmkvInstance = {
        set: (key: string, value: string) => {
          try {
            localStorage.setItem(key, value);
          } catch (error) {
            console.error('localStorage.setItem error:', error);
          }
        },
        getString: (key: string) => {
          try {
            return localStorage.getItem(key) || undefined;
          } catch (error) {
            console.error('localStorage.getItem error:', error);
            return undefined;
          }
        },
        delete: (key: string) => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error('localStorage.removeItem error:', error);
          }
        },
        clearAll: () => {
          try {
            localStorage.clear();
          } catch (error) {
            console.error('localStorage.clear error:', error);
          }
        },
      };
      _isMMKVAvailable = true;
      return mmkvInstance;
    }

    // Use MMKV for native platforms
    try {
      // Dynamically require MMKV to handle cases where native module might not be ready
      const { MMKV } = require('react-native-mmkv');

      if (!MMKV) {
        throw new Error('MMKV constructor not available');
      }

      mmkvInstance = new MMKV();
      _isMMKVAvailable = true;
      console.log('✅ MMKV initialized successfully');
    } catch (error) {
      console.warn('⚠️ MMKV not available, using in-memory fallback:', error);
      _isMMKVAvailable = false;

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
          Object.keys(memoryStorage).forEach((key) => delete memoryStorage[key]);
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
      return data ? JSON.parse(data) : ['italian-longsword', 'german-longsword'];
    } catch (error) {
      console.error('Error getting selected disciplines:', error);
      return ['italian-longsword', 'german-longsword'];
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
