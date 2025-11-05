import { storage } from '../../src/services/storage';

describe('Storage Service', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  describe('getViewedCards', () => {
    it('should return empty array when no cards have been viewed', () => {
      expect(storage.getViewedCards()).toEqual([]);
    });

    it('should return array of viewed card IDs', () => {
      storage.setViewedCards(['card1', 'card2', 'card3']);
      expect(storage.getViewedCards()).toEqual(['card1', 'card2', 'card3']);
    });
  });

  describe('setViewedCards', () => {
    it('should store array of card IDs', () => {
      storage.setViewedCards(['card1', 'card2']);
      expect(storage.getViewedCards()).toEqual(['card1', 'card2']);
    });

    it('should overwrite previously stored card IDs', () => {
      storage.setViewedCards(['card1']);
      storage.setViewedCards(['card2', 'card3']);
      expect(storage.getViewedCards()).toEqual(['card2', 'card3']);
    });
  });

  describe('addViewedCard', () => {
    it('should add a card ID to the viewed list', () => {
      storage.addViewedCard('card1');
      expect(storage.getViewedCards()).toContain('card1');
    });

    it('should not add duplicate card IDs', () => {
      storage.addViewedCard('card1');
      storage.addViewedCard('card1');
      expect(storage.getViewedCards()).toEqual(['card1']);
    });

    it('should append to existing viewed cards', () => {
      storage.setViewedCards(['card1']);
      storage.addViewedCard('card2');
      expect(storage.getViewedCards()).toEqual(['card1', 'card2']);
    });
  });

  describe('resetViewedCards', () => {
    it('should clear all viewed cards', () => {
      storage.setViewedCards(['card1', 'card2', 'card3']);
      storage.resetViewedCards();
      expect(storage.getViewedCards()).toEqual([]);
    });
  });

  describe('getSelectedDisciplines', () => {
    it('should return default discipline when none are selected', () => {
      expect(storage.getSelectedDisciplines()).toEqual(['meyer-longsword']);
    });

    it('should return stored disciplines', () => {
      storage.setSelectedDisciplines(['meyer-longsword', 'rapier']);
      expect(storage.getSelectedDisciplines()).toEqual(['meyer-longsword', 'rapier']);
    });
  });

  describe('setSelectedDisciplines', () => {
    it('should store selected disciplines', () => {
      storage.setSelectedDisciplines(['rapier', 'messer']);
      expect(storage.getSelectedDisciplines()).toEqual(['rapier', 'messer']);
    });

    it('should overwrite previously stored disciplines', () => {
      storage.setSelectedDisciplines(['meyer-longsword']);
      storage.setSelectedDisciplines(['rapier']);
      expect(storage.getSelectedDisciplines()).toEqual(['rapier']);
    });
  });

  describe('getLastCardShown', () => {
    it('should return null when no card has been shown', () => {
      expect(storage.getLastCardShown()).toBeNull();
    });

    it('should return last card ID shown', () => {
      storage.setLastCardShown('card5');
      expect(storage.getLastCardShown()).toBe('card5');
    });
  });

  describe('setLastCardShown', () => {
    it('should store the last card ID', () => {
      storage.setLastCardShown('card3');
      expect(storage.getLastCardShown()).toBe('card3');
    });

    it('should overwrite previously stored card ID', () => {
      storage.setLastCardShown('card1');
      storage.setLastCardShown('card2');
      expect(storage.getLastCardShown()).toBe('card2');
    });
  });

  describe('clearAll', () => {
    it('should clear all stored data', () => {
      storage.setViewedCards(['card1', 'card2']);
      storage.setSelectedDisciplines(['rapier']);
      storage.setLastCardShown('card3');

      storage.clearAll();

      expect(storage.getViewedCards()).toEqual([]);
      expect(storage.getSelectedDisciplines()).toEqual(['meyer-longsword']);
      expect(storage.getLastCardShown()).toBeNull();
    });
  });
});
