import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { AppNavigator } from '../../src/navigation/AppNavigator';
import { storage } from '../../src/services/storage';

jest.mock('../../src/services/storage');
jest.mock('../../src/services/widgetService', () => ({
  widgetService: {
    updateWidget: jest.fn(),
    isAvailable: jest.fn(() => true),
  },
}));

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.getSelectedDisciplines as jest.Mock).mockReturnValue(['meyer-longsword']);
    (storage.getViewedCards as jest.Mock).mockReturnValue([]);
  });

  describe('Card Viewing Flow', () => {
    it('should load and display a flashcard on app start', async () => {
      const { findByText } = render(<AppNavigator />);

      await waitFor(async () => {
        const title = await findByText(/HEMA Flash Cards/i);
        expect(title).toBeTruthy();
      });
    });

    it('should show swipe instruction to user', async () => {
      const { findByText } = render(<AppNavigator />);

      await waitFor(async () => {
        const instruction = await findByText(/swipe left or right/i);
        expect(instruction).toBeTruthy();
      });
    });
  });

  describe('Discipline Selection Flow', () => {
    it('should navigate to discipline selection screen', async () => {
      const { findByText, getByText } = render(<AppNavigator />);

      await waitFor(async () => {
        const title = await findByText(/HEMA Flash Cards/i);
        expect(title).toBeTruthy();
      });

      const settingsButton = getByText('⚔');
      fireEvent.press(settingsButton);

      await waitFor(async () => {
        const disciplineTitle = await findByText(/Select Disciplines/i);
        expect(disciplineTitle).toBeTruthy();
      });
    });

    it('should display available disciplines', async () => {
      const { findByText, getByText } = render(<AppNavigator />);

      await waitFor(async () => {
        const title = await findByText(/HEMA Flash Cards/i);
        expect(title).toBeTruthy();
      });

      const settingsButton = getByText('⚔');
      fireEvent.press(settingsButton);

      await waitFor(async () => {
        const meyerLongsword = await findByText(/Meyer Longsword/i);
        expect(meyerLongsword).toBeTruthy();
      });
    });

    it('should return to card screen after selecting disciplines', async () => {
      const { findByText, getByText } = render(<AppNavigator />);

      await waitFor(async () => {
        const title = await findByText(/HEMA Flash Cards/i);
        expect(title).toBeTruthy();
      });

      const settingsButton = getByText('⚔');
      fireEvent.press(settingsButton);

      await waitFor(async () => {
        const disciplineTitle = await findByText(/Select Disciplines/i);
        expect(disciplineTitle).toBeTruthy();
      });

      const doneButton = getByText(/Done/i);
      fireEvent.press(doneButton);

      await waitFor(async () => {
        const title = await findByText(/HEMA Flash Cards/i);
        expect(title).toBeTruthy();
      });
    });
  });

  describe('Storage Integration', () => {
    it('should load selected disciplines from storage on app start', async () => {
      (storage.getSelectedDisciplines as jest.Mock).mockReturnValue(['rapier', 'messer']);

      render(<AppNavigator />);

      await waitFor(() => {
        expect(storage.getSelectedDisciplines).toHaveBeenCalled();
      });
    });

    it('should load viewed cards from storage on app start', async () => {
      (storage.getViewedCards as jest.Mock).mockReturnValue(['card1', 'card2']);

      render(<AppNavigator />);

      await waitFor(() => {
        expect(storage.getViewedCards).toHaveBeenCalled();
      });
    });
  });
});
