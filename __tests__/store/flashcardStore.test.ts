import { renderHook, act } from '@testing-library/react-native';
import { useFlashcardStore } from '../../src/store/flashcardStore';
import { storage } from '../../src/services/storage';

jest.mock('../../src/services/storage');

const mockFlashcards = [
  {
    id: 'card1',
    title: 'Card 1',
    description: 'Description 1',
    discipline: 'meyer-longsword' as const,
  },
  {
    id: 'card2',
    title: 'Card 2',
    description: 'Description 2',
    discipline: 'meyer-longsword' as const,
  },
  {
    id: 'card3',
    title: 'Card 3',
    description: 'Description 3',
    discipline: 'rapier' as const,
  },
];

describe('Flashcard Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.getSelectedDisciplines as jest.Mock).mockReturnValue(['meyer-longsword']);
    (storage.getViewedCards as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useFlashcardStore());
    act(() => {
      result.current.resetStore();
    });
  });

  describe('initialization', () => {
    it('should initialize with empty state', () => {
      const { result } = renderHook(() => useFlashcardStore());

      expect(result.current.currentCard).toBeNull();
      expect(result.current.allCards).toEqual([]);
      expect(result.current.viewedCardIds).toEqual([]);
    });

    it('should load selected disciplines from storage', () => {
      (storage.getSelectedDisciplines as jest.Mock).mockReturnValue(['rapier', 'messer']);

      const { result } = renderHook(() => useFlashcardStore());
      act(() => {
        result.current.loadFromStorage();
      });

      expect(result.current.selectedDisciplines).toContain('rapier');
      expect(result.current.selectedDisciplines).toContain('messer');
    });
  });

  describe('loadCards', () => {
    it('should load cards into store', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
      });

      expect(result.current.allCards).toEqual(mockFlashcards);
    });

    it('should set current card after loading cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
      });

      expect(result.current.currentCard).not.toBeNull();
    });
  });

  describe('getRandomCard', () => {
    it('should select a random card based on selected disciplines', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
        result.current.getRandomCard();
      });

      expect(result.current.currentCard).not.toBeNull();
      expect(result.current.currentCard?.discipline).toBe('meyer-longsword');
    });

    it('should mark card as viewed', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
        result.current.getRandomCard();
      });

      expect(storage.addViewedCard).toHaveBeenCalled();
    });

    it('should update viewedCardIds state', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
        result.current.getRandomCard();
      });

      expect(result.current.viewedCardIds.length).toBeGreaterThan(0);
    });
  });

  describe('toggleDiscipline', () => {
    it('should add discipline when not selected', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.toggleDiscipline('rapier');
      });

      expect(result.current.selectedDisciplines).toContain('rapier');
      expect(storage.setSelectedDisciplines).toHaveBeenCalled();
    });

    it('should remove discipline when already selected', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['meyer-longsword', 'rapier']);
        result.current.toggleDiscipline('rapier');
      });

      expect(result.current.selectedDisciplines).not.toContain('rapier');
      expect(storage.setSelectedDisciplines).toHaveBeenCalled();
    });

    it('should not remove the last selected discipline', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['meyer-longsword']);
        result.current.toggleDiscipline('meyer-longsword');
      });

      expect(result.current.selectedDisciplines).toContain('meyer-longsword');
    });
  });

  describe('resetProgress', () => {
    it('should clear viewed cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
        result.current.getRandomCard();
        result.current.resetProgress();
      });

      expect(result.current.viewedCardIds).toEqual([]);
      expect(storage.resetViewedCards).toHaveBeenCalled();
    });

    it('should select a new card after reset', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards);
        result.current.getRandomCard();
        result.current.resetProgress();
      });

      expect(result.current.currentCard).not.toBeNull();
    });
  });

  describe('markCardViewed', () => {
    it('should add card to viewed list', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.markCardViewed('card1');
      });

      expect(result.current.viewedCardIds).toContain('card1');
      expect(storage.addViewedCard).toHaveBeenCalledWith('card1');
    });

    it('should not add duplicate viewed cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.markCardViewed('card1');
        result.current.markCardViewed('card1');
      });

      expect(result.current.viewedCardIds.filter(id => id === 'card1').length).toBe(1);
    });
  });
});
