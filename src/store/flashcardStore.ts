import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Discipline, Flashcard } from '../types/flashcard';

interface FlashcardStore {
  selectedDisciplines: Discipline[];
  allCards: Flashcard[];

  loadCards: (cards: Flashcard[]) => void;
  toggleDiscipline: (discipline: Discipline) => void;
  setSelectedDisciplines: (disciplines: Discipline[]) => void;
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set) => ({
      selectedDisciplines: ['italian-longsword'],
      allCards: [],

      loadCards: (cards: Flashcard[]) => {
        set({ allCards: cards });
      },

      toggleDiscipline: (discipline: Discipline) => {
        set({ selectedDisciplines: [discipline] });
      },

      setSelectedDisciplines: (disciplines: Discipline[]) => {
        set({ selectedDisciplines: disciplines });
      },
    }),
    {
      name: 'flashcard-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedDisciplines: state.selectedDisciplines,
      }),
    }
  )
);
