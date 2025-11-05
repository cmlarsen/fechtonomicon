import { render, screen } from '@testing-library/react-native';
import { Flashcard } from '../../src/components/Flashcard';
import { Flashcard as FlashcardType } from '../../src/types/flashcard';

const mockCard: FlashcardType = {
  id: 'test-card',
  title: 'Test Guard',
  description: 'This is a test description for the flashcard.',
  discipline: 'meyer-longsword',
};

const mockCardWithRelated: FlashcardType = {
  id: 'test-card-2',
  title: 'Another Guard',
  description: 'This is another test description.',
  discipline: 'meyer-longsword',
  relatedCards: ['card1', 'card2'],
  externalLinks: [{ url: 'https://example.com', label: 'Example Link' }],
};

describe('Flashcard Component', () => {
  it('should render card title', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.getByText('Test Guard')).toBeTruthy();
  });

  it('should render card description', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.getByText('This is a test description for the flashcard.')).toBeTruthy();
  });

  it('should not render related cards section when none exist', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.queryByText('Related Concepts')).toBeNull();
  });

  it('should render related cards when they exist', () => {
    render(<Flashcard card={mockCardWithRelated} />);
    expect(screen.getByText('Related Concepts')).toBeTruthy();
  });

  it('should not render external links section when none exist', () => {
    render(<Flashcard card={mockCard} />);
    expect(screen.queryByText('Learn More')).toBeNull();
  });

  it('should render external links when they exist', () => {
    render(<Flashcard card={mockCardWithRelated} />);
    expect(screen.getByText('Learn More')).toBeTruthy();
    expect(screen.getByText('Example Link')).toBeTruthy();
  });

  it('should apply medieval styling', () => {
    const { getByTestId } = render(<Flashcard card={mockCard} />);
    const container = getByTestId('flashcard-container');
    expect(container.props.style).toBeDefined();
  });
});
