import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Discipline, Flashcard } from '../types/flashcard';
import { selectRandomCard } from '../utils/cardSelector';

interface FlashcardStore {
  currentCard: Flashcard | null;
  viewedCardIds: string[];
  selectedDisciplines: Discipline[];
  allCards: Flashcard[];

  loadCards: (cards: Flashcard[]) => void;
  getRandomCard: () => void;
  markCardViewed: (cardId: string) => void;
  toggleDiscipline: (discipline: Discipline) => void;
  setSelectedDisciplines: (disciplines: Discipline[]) => void;
  resetProgress: () => void;
  resetStore: () => void;
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      currentCard: null,
      viewedCardIds: [],
      selectedDisciplines: ['italian-longsword', 'german-longsword'],
      allCards: [],

      loadCards: (cards: Flashcard[]) => {
        set({ allCards: cards });
        get().getRandomCard();
      },

      getRandomCard: () => {
        const { allCards, selectedDisciplines, viewedCardIds } = get();
        const card = selectRandomCard(allCards, selectedDisciplines, viewedCardIds);

        if (card) {
          set({ currentCard: card });
          get().markCardViewed(card.id);
        }
      },

      markCardViewed: (cardId: string) => {
        const { viewedCardIds } = get();
        if (!viewedCardIds.includes(cardId)) {
          set({ viewedCardIds: [...viewedCardIds, cardId] });
        }
      },

      toggleDiscipline: (discipline: Discipline) => {
        const { selectedDisciplines } = get();
        let newDisciplines: Discipline[];

        if (selectedDisciplines.includes(discipline)) {
          if (selectedDisciplines.length === 1) {
            return;
          }
          newDisciplines = selectedDisciplines.filter((d) => d !== discipline);
        } else {
          newDisciplines = [...selectedDisciplines, discipline];
        }

        set({ selectedDisciplines: newDisciplines });
      },

      setSelectedDisciplines: (disciplines: Discipline[]) => {
        set({ selectedDisciplines: disciplines });
      },

      resetProgress: () => {
        set({ viewedCardIds: [] });
        get().getRandomCard();
      },

      resetStore: () => {
        set({
          currentCard: null,
          viewedCardIds: [],
          selectedDisciplines: ['italian-longsword', 'german-longsword'],
          allCards: [],
        });
      },
    }),
    {
      name: 'flashcard-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedDisciplines: state.selectedDisciplines,
        currentCard: state.currentCard,
      }),
    }
  )
);
