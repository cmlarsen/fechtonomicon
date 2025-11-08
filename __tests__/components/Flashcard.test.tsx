import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Flashcard } from '../../src/components/Flashcard';
import type { Flashcard as FlashcardType } from '../../src/types/flashcard';

const mockCard: FlashcardType = {
  id: 'test-card',
  category: 'guard',
  weapon: 'longsword',
  originalTerm: 'Test Guard Original',
  englishTerm: 'Test Guard',
  briefDescription: 'This is a test description for the flashcard.',
  discipline: 'italian-longsword',
};

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Flashcard Component', () => {
  it('should render card original term', () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Flashcard card={mockCard} />
      </SafeAreaProvider>
    );
    expect(screen.getByText('Test Guard Original')).toBeTruthy();
  });

  it('should render card description', () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Flashcard card={mockCard} />
      </SafeAreaProvider>
    );
    expect(screen.getByText('This is a test description for the flashcard.')).toBeTruthy();
  });

  it('should apply medieval styling', () => {
    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Flashcard card={mockCard} />
      </SafeAreaProvider>
    );
    const container = getByTestId('flashcard-container');
    expect(container.props.style).toBeDefined();
  });
});
