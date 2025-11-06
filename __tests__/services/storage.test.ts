import { storage } from '../../src/services/storage';

describe('Storage Service', () => {
  beforeEach(async () => {
    await storage.clearAll();
  });

  describe('getViewedCards', () => {
    it('should return empty array when no cards have been viewed', async () => {
      const cards = await storage.getViewedCards();
      expect(cards).toEqual([]);
    });

    it('should return array of viewed card IDs', async () => {
      await storage.setViewedCards(['card1', 'card2', 'card3']);
      const cards = await storage.getViewedCards();
      expect(cards).toEqual(['card1', 'card2', 'card3']);
    });
  });

  describe('setViewedCards', () => {
    it('should store array of card IDs', async () => {
      await storage.setViewedCards(['card1', 'card2']);
      const cards = await storage.getViewedCards();
      expect(cards).toEqual(['card1', 'card2']);
    });

    it('should overwrite previously stored card IDs', async () => {
      await storage.setViewedCards(['card1']);
      await storage.setViewedCards(['card2', 'card3']);
      const cards = await storage.getViewedCards();
      expect(cards).toEqual(['card2', 'card3']);
    });
  });

  describe('addViewedCard', () => {
    it('should add a card ID to the viewed list', async () => {
      await storage.addViewedCard('card1');
      const cards = await storage.getViewedCards();
      expect(cards).toContain('card1');
    });

    it('should not add duplicate card IDs', async () => {
      await storage.addViewedCard('card1');
      await storage.addViewedCard('card1');
      const cards = await storage.getViewedCards();
      expect(cards).toEqual(['card1']);
    });

    it('should append to existing viewed cards', async () => {
      await storage.setViewedCards(['card1']);
      await storage.addViewedCard('card2');
      const cards = await storage.getViewedCards();
      expect(cards).toEqual(['card1', 'card2']);
    });
  });

  describe('resetViewedCards', () => {
    it('should clear all viewed cards', async () => {
      await storage.setViewedCards(['card1', 'card2', 'card3']);
      await storage.resetViewedCards();
      const cards = await storage.getViewedCards();
      expect(cards).toEqual([]);
    });
  });

  describe('getSelectedDisciplines', () => {
    it('should return default disciplines when none are selected', async () => {
      const disciplines = await storage.getSelectedDisciplines();
      expect(disciplines).toEqual(['italian-longsword', 'german-longsword']);
    });

    it('should return stored disciplines', async () => {
      await storage.setSelectedDisciplines(['italian-longsword', 'german-longsword']);
      const disciplines = await storage.getSelectedDisciplines();
      expect(disciplines).toEqual(['italian-longsword', 'german-longsword']);
    });
  });

  describe('setSelectedDisciplines', () => {
    it('should store selected disciplines', async () => {
      await storage.setSelectedDisciplines(['italian-longsword', 'german-longsword']);
      const disciplines = await storage.getSelectedDisciplines();
      expect(disciplines).toEqual(['italian-longsword', 'german-longsword']);
    });

    it('should overwrite previously stored disciplines', async () => {
      await storage.setSelectedDisciplines(['italian-longsword']);
      await storage.setSelectedDisciplines(['german-longsword']);
      const disciplines = await storage.getSelectedDisciplines();
      expect(disciplines).toEqual(['german-longsword']);
    });
  });

  describe('getLastCardShown', () => {
    it('should return null when no card has been shown', async () => {
      const cardId = await storage.getLastCardShown();
      expect(cardId).toBeNull();
    });

    it('should return last card ID shown', async () => {
      await storage.setLastCardShown('card5');
      const cardId = await storage.getLastCardShown();
      expect(cardId).toBe('card5');
    });
  });

  describe('setLastCardShown', () => {
    it('should store the last card ID', async () => {
      await storage.setLastCardShown('card3');
      const cardId = await storage.getLastCardShown();
      expect(cardId).toBe('card3');
    });

    it('should overwrite previously stored card ID', async () => {
      await storage.setLastCardShown('card1');
      await storage.setLastCardShown('card2');
      const cardId = await storage.getLastCardShown();
      expect(cardId).toBe('card2');
    });
  });

  describe('clearAll', () => {
    it('should clear all stored data', async () => {
      await storage.setViewedCards(['card1', 'card2']);
      await storage.setSelectedDisciplines(['italian-longsword']);
      await storage.setLastCardShown('card3');

      await storage.clearAll();

      const viewedCards = await storage.getViewedCards();
      const disciplines = await storage.getSelectedDisciplines();
      const lastCard = await storage.getLastCardShown();

      expect(viewedCards).toEqual([]);
      expect(disciplines).toEqual(['italian-longsword', 'german-longsword']);
      expect(lastCard).toBeNull();
    });
  });
});
