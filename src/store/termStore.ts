import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Discipline, Term } from '../types/term';

interface TermStore {
  selectedDisciplines: Discipline[];
  allCards: Term[];

  loadCards: (cards: Term[]) => void;
  toggleDiscipline: (discipline: Discipline) => void;
  setSelectedDisciplines: (disciplines: Discipline[]) => void;
}

export const useTermStore = create<TermStore>()(
  persist(
    (set) => ({
      selectedDisciplines: ['italian-longsword'],
      allCards: [],

      loadCards: (cards: Term[]) => {
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
      name: 'term-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedDisciplines: state.selectedDisciplines,
      }),
    }
  )
);
