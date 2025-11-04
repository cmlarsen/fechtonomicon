import { selectRandomCard } from '../../src/utils/cardSelector';
import { Flashcard, Discipline } from '../../src/types/flashcard';

const mockCards: Flashcard[] = [
  {
    id: 'card1',
    title: 'Card 1',
    description: 'Description 1',
    discipline: 'meyer-longsword',
  },
  {
    id: 'card2',
    title: 'Card 2',
    description: 'Description 2',
    discipline: 'meyer-longsword',
  },
  {
    id: 'card3',
    title: 'Card 3',
    description: 'Description 3',
    discipline: 'rapier',
  },
  {
    id: 'card4',
    title: 'Card 4',
    description: 'Description 4',
    discipline: 'rapier',
  },
  {
    id: 'card5',
    title: 'Card 5',
    description: 'Description 5',
    discipline: 'messer',
  },
];

describe('Card Selector', () => {
  describe('selectRandomCard', () => {
    it('should return null when no cards are available', () => {
      const result = selectRandomCard([], ['meyer-longsword'], []);
      expect(result).toBeNull();
    });

    it('should return null when no cards match selected disciplines', () => {
      const result = selectRandomCard(mockCards, ['sword-buckler'], []);
      expect(result).toBeNull();
    });

    it('should return a card that matches selected discipline', () => {
      const result = selectRandomCard(mockCards, ['meyer-longsword'], []);
      expect(result).not.toBeNull();
      expect(result?.discipline).toBe('meyer-longsword');
    });

    it('should return a card from multiple selected disciplines', () => {
      const result = selectRandomCard(mockCards, ['rapier', 'messer'], []);
      expect(result).not.toBeNull();
      expect(['rapier', 'messer']).toContain(result?.discipline);
    });

    it('should avoid recently viewed cards when possible', () => {
      const viewedCards = ['card1', 'card2'];
      const results = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const result = selectRandomCard(
          mockCards.filter(c => c.discipline === 'meyer-longsword'),
          ['meyer-longsword'],
          viewedCards
        );
        if (result) results.add(result.id);
      }

      expect(results.size).toBeGreaterThan(0);
    });

    it('should reset and return a viewed card when all cards have been viewed', () => {
      const viewedCards = ['card1', 'card2'];
      const meyerCards = mockCards.filter(c => c.discipline === 'meyer-longsword');

      const result = selectRandomCard(meyerCards, ['meyer-longsword'], viewedCards);

      expect(result).not.toBeNull();
      expect(['card1', 'card2']).toContain(result?.id);
    });

    it('should return different cards on multiple calls', () => {
      const results = new Set<string>();

      for (let i = 0; i < 20; i++) {
        const result = selectRandomCard(mockCards, ['meyer-longsword', 'rapier'], []);
        if (result) results.add(result.id);
      }

      expect(results.size).toBeGreaterThan(1);
    });

    it('should filter by multiple disciplines correctly', () => {
      const disciplines: Discipline[] = ['meyer-longsword', 'rapier'];

      for (let i = 0; i < 10; i++) {
        const result = selectRandomCard(mockCards, disciplines, []);
        expect(result).not.toBeNull();
        expect(disciplines).toContain(result!.discipline);
      }
    });

    it('should handle single card scenario', () => {
      const singleCard = [mockCards[0]];
      const result = selectRandomCard(singleCard, ['meyer-longsword'], []);

      expect(result).toEqual(singleCard[0]);
    });

    it('should handle viewed cards that exceed available cards', () => {
      const viewedCards = ['card1', 'card2', 'card3', 'card4', 'card5'];
      const result = selectRandomCard(mockCards, ['meyer-longsword'], viewedCards);

      expect(result).not.toBeNull();
      expect(result?.discipline).toBe('meyer-longsword');
    });
  });
});
