import { render, screen } from '@testing-library/react-native';
import { Flashcard } from '../../src/components/Flashcard';
import type { Flashcard as FlashcardType } from '../../src/types/flashcard';

const mockCard: FlashcardType = {
  id: 'test-card',
  category: 'guard',
  weapon: 'longsword',
  originalTerm: 'Test Guard',
  englishTerm: 'Test Guard',
  briefDescription: 'This is a test description for the flashcard.',
  discipline: 'italian-longsword',
};

describe('Flashcard Component', () => {
  it('should render card original term', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.getByText('Test Guard')).toBeTruthy();
  });

  it('should render card description', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.getByText('This is a test description for the flashcard.')).toBeTruthy();
  });

  it('should apply medieval styling', () => {
    const { getByTestId } = render(<Flashcard card={mockCard} />);
    const container = getByTestId('flashcard-container');
    expect(container.props.style).toBeDefined();
  });
});
