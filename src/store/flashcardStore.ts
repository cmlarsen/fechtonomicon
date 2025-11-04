import { create } from 'zustand';
import { Flashcard, Discipline } from '../types/flashcard';
import { storage } from '../services/storage';
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
  loadFromStorage: () => void;
  resetStore: () => void;
}

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  currentCard: null,
  viewedCardIds: [],
  selectedDisciplines: ['meyer-longsword'],
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
      storage.setLastCardShown(card.id);
    }
  },

  markCardViewed: (cardId: string) => {
    const { viewedCardIds } = get();
    if (!viewedCardIds.includes(cardId)) {
      set({ viewedCardIds: [...viewedCardIds, cardId] });
      storage.addViewedCard(cardId);
    }
  },

  toggleDiscipline: (discipline: Discipline) => {
    const { selectedDisciplines } = get();
    let newDisciplines: Discipline[];

    if (selectedDisciplines.includes(discipline)) {
      if (selectedDisciplines.length === 1) {
        return;
      }
      newDisciplines = selectedDisciplines.filter(d => d !== discipline);
    } else {
      newDisciplines = [...selectedDisciplines, discipline];
    }

    set({ selectedDisciplines: newDisciplines });
    storage.setSelectedDisciplines(newDisciplines);
  },

  setSelectedDisciplines: (disciplines: Discipline[]) => {
    set({ selectedDisciplines: disciplines });
    storage.setSelectedDisciplines(disciplines);
  },

  resetProgress: () => {
    storage.resetViewedCards();
    set({ viewedCardIds: [] });
    get().getRandomCard();
  },

  loadFromStorage: () => {
    const selectedDisciplines = storage.getSelectedDisciplines();
    const viewedCardIds = storage.getViewedCards();
    set({ selectedDisciplines, viewedCardIds });
  },

  resetStore: () => {
    set({
      currentCard: null,
      viewedCardIds: [],
      selectedDisciplines: ['meyer-longsword'],
      allCards: [],
    });
  },
}));
