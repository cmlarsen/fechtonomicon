import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useFlashcardStore } from '../../src/store/flashcardStore';
import { Discipline } from '../../src/types/flashcard';

jest.mock('@react-native-async-storage/async-storage');

const mockFlashcards = [
  {
    id: 'card1',
    category: 'test',
    weapon: 'longsword',
    originalTerm: 'Card 1',
    englishTerm: 'Card 1',
    briefDescription: 'Description 1',
    discipline: 'italian-longsword' as Discipline,
  },
  {
    id: 'card2',
    category: 'test',
    weapon: 'longsword',
    originalTerm: 'Card 2',
    englishTerm: 'Card 2',
    briefDescription: 'Description 2',
    discipline: 'italian-longsword' as Discipline,
  },
  {
    id: 'card3',
    category: 'test',
    weapon: 'longsword',
    originalTerm: 'Card 3',
    englishTerm: 'Card 3',
    briefDescription: 'Description 3',
    discipline: 'german-longsword' as Discipline,
  },
] as const;

describe('Flashcard Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

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
      expect(result.current.selectedDisciplines).toEqual(['italian-longsword', 'german-longsword']);
    });

    it('should persist selected disciplines', async () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword']);
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });
  });

  describe('loadCards', () => {
    it('should load cards into store', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
      });

      expect(result.current.allCards).toEqual(mockFlashcards);
    });

    it('should set current card after loading cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
      });

      expect(result.current.currentCard).not.toBeNull();
    });
  });

  describe('getRandomCard', () => {
    it('should select a random card based on selected disciplines', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
        result.current.getRandomCard();
      });

      expect(result.current.currentCard).not.toBeNull();
      expect(['italian-longsword', 'german-longsword']).toContain(
        result.current.currentCard?.discipline
      );
    });

    it('should update viewedCardIds state', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
        result.current.getRandomCard();
      });

      expect(result.current.viewedCardIds.length).toBeGreaterThan(0);
    });
  });

  describe('toggleDiscipline', () => {
    it('should add discipline when not selected', async () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword']);
        result.current.toggleDiscipline('german-longsword');
      });

      expect(result.current.selectedDisciplines).toContain('german-longsword');
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it('should remove discipline when already selected', async () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword', 'german-longsword']);
        result.current.toggleDiscipline('german-longsword');
      });

      expect(result.current.selectedDisciplines).not.toContain('german-longsword');
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it('should not remove the last selected discipline', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword']);
        result.current.toggleDiscipline('italian-longsword');
      });

      expect(result.current.selectedDisciplines).toContain('italian-longsword');
    });
  });

  describe('resetProgress', () => {
    it('should clear viewed cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
        result.current.getRandomCard();
        result.current.resetProgress();
      });

      expect(result.current.viewedCardIds).toEqual([]);
    });

    it('should select a new card after reset', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.loadCards(mockFlashcards as any);
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
    });

    it('should not add duplicate viewed cards', () => {
      const { result } = renderHook(() => useFlashcardStore());

      act(() => {
        result.current.markCardViewed('card1');
        result.current.markCardViewed('card1');
      });

      expect(result.current.viewedCardIds.filter((id) => id === 'card1').length).toBe(1);
    });
  });
});
