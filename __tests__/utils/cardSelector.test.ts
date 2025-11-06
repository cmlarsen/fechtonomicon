import { Discipline, Flashcard } from '../../src/types/flashcard';
import { selectRandomCard } from '../../src/utils/cardSelector';

const mockCards: Flashcard[] = [
  {
    id: 'card1',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Card 1',
    englishTerm: 'Card 1',
    briefDescription: 'Description 1',
    discipline: 'italian-longsword',
  },
  {
    id: 'card2',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Card 2',
    englishTerm: 'Card 2',
    briefDescription: 'Description 2',
    discipline: 'italian-longsword',
  },
  {
    id: 'card3',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Card 3',
    englishTerm: 'Card 3',
    briefDescription: 'Description 3',
    discipline: 'german-longsword',
  },
  {
    id: 'card4',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Card 4',
    englishTerm: 'Card 4',
    briefDescription: 'Description 4',
    discipline: 'german-longsword',
  },
  {
    id: 'card5',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Card 5',
    englishTerm: 'Card 5',
    briefDescription: 'Description 5',
    discipline: 'italian-longsword',
  },
];

describe('Card Selector', () => {
  describe('selectRandomCard', () => {
    it('should return null when no cards are available', () => {
      const result = selectRandomCard([], ['italian-longsword'], []);
      expect(result).toBeNull();
    });

    it('should return null when no cards match selected disciplines', () => {
      const onlyItalianCards = mockCards.filter((c) => c.discipline === 'italian-longsword');
      const result = selectRandomCard(onlyItalianCards, ['german-longsword'], []);
      expect(result).toBeNull();
    });

    it('should return a card that matches selected discipline', () => {
      const result = selectRandomCard(mockCards, ['italian-longsword'], []);
      expect(result).not.toBeNull();
      expect(result?.discipline).toBe('italian-longsword');
    });

    it('should return a card from multiple selected disciplines', () => {
      const result = selectRandomCard(mockCards, ['italian-longsword', 'german-longsword'], []);
      expect(result).not.toBeNull();
      expect(['italian-longsword', 'german-longsword']).toContain(result?.discipline);
    });

    it('should avoid recently viewed cards when possible', () => {
      const viewedCards = ['card1', 'card2'];
      const results = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const result = selectRandomCard(
          mockCards.filter((c) => c.discipline === 'italian-longsword'),
          ['italian-longsword'],
          viewedCards
        );
        if (result) results.add(result.id);
      }

      expect(results.size).toBeGreaterThan(0);
    });

    it('should reset and return a viewed card when all cards have been viewed', () => {
      const viewedCards = ['card1', 'card2', 'card5'];
      const italianCards = mockCards.filter((c) => c.discipline === 'italian-longsword');

      const result = selectRandomCard(italianCards, ['italian-longsword'], viewedCards);

      expect(result).not.toBeNull();
      expect(['card1', 'card2', 'card5']).toContain(result?.id);
    });

    it('should return different cards on multiple calls', () => {
      const results = new Set<string>();

      for (let i = 0; i < 20; i++) {
        const result = selectRandomCard(mockCards, ['italian-longsword', 'german-longsword'], []);
        if (result) results.add(result.id);
      }

      expect(results.size).toBeGreaterThan(1);
    });

    it('should filter by multiple disciplines correctly', () => {
      const disciplines: Discipline[] = ['italian-longsword', 'german-longsword'];

      for (let i = 0; i < 10; i++) {
        const result = selectRandomCard(mockCards, disciplines, []);
        expect(result).not.toBeNull();
        expect(disciplines).toContain(result?.discipline);
      }
    });

    it('should handle single card scenario', () => {
      const singleCard = [mockCards[0]];
      const result = selectRandomCard(singleCard, ['italian-longsword'], []);

      expect(result).toEqual(singleCard[0]);
    });

    it('should handle viewed cards that exceed available cards', () => {
      const viewedCards = ['card1', 'card2', 'card3', 'card4', 'card5'];
      const result = selectRandomCard(mockCards, ['italian-longsword'], viewedCards);

      expect(result).not.toBeNull();
      expect(result?.discipline).toBe('italian-longsword');
    });
  });
});
