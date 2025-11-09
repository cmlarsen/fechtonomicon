import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useTermStore } from '../../src/store/termStore';
import type { Discipline, Term } from '../../src/types/term';

jest.mock('@react-native-async-storage/async-storage');

const mockTerms = [
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
] as Term[];

describe('Term Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
  });

  describe('initialization', () => {
    it('should initialize with empty state', () => {
      const { result } = renderHook(() => useTermStore());

      expect(result.current.allCards).toEqual([]);
      expect(result.current.selectedDisciplines).toEqual(['italian-longsword']);
    });

    it('should persist selected disciplines', async () => {
      const { result } = renderHook(() => useTermStore());

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
      const { result } = renderHook(() => useTermStore());

      act(() => {
        result.current.loadCards(mockTerms);
      });

      expect(result.current.allCards).toEqual(mockTerms);
    });
  });

  describe('toggleDiscipline', () => {
    it('should set the selected discipline', () => {
      const { result } = renderHook(() => useTermStore());

      act(() => {
        result.current.toggleDiscipline('german-longsword');
      });

      expect(result.current.selectedDisciplines).toEqual(['german-longsword']);
    });

    it('should switch between disciplines', () => {
      const { result } = renderHook(() => useTermStore());

      act(() => {
        result.current.toggleDiscipline('german-longsword');
      });
      expect(result.current.selectedDisciplines).toEqual(['german-longsword']);

      act(() => {
        result.current.toggleDiscipline('italian-longsword');
      });
      expect(result.current.selectedDisciplines).toEqual(['italian-longsword']);
    });
  });

  describe('setSelectedDisciplines', () => {
    it('should set multiple disciplines', () => {
      const { result } = renderHook(() => useTermStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword', 'german-longsword']);
      });

      expect(result.current.selectedDisciplines).toEqual(['italian-longsword', 'german-longsword']);
    });

    it('should persist when changed', async () => {
      const { result } = renderHook(() => useTermStore());

      act(() => {
        result.current.setSelectedDisciplines(['italian-longsword', 'german-longsword']);
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });
  });
});
