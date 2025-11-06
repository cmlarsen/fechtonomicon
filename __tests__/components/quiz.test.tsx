import { fireEvent, render, screen } from '@testing-library/react-native';
import { QuestionTypeApplication } from '../../src/components/quiz/QuestionTypeApplication';
import { QuestionTypeDefinition } from '../../src/components/quiz/QuestionTypeDefinition';
import { QuestionTypeTranslate } from '../../src/components/quiz/QuestionTypeTranslate';
import { QuizAnswerFeedback } from '../../src/components/quiz/QuizAnswerFeedback';
import { QuizExitButton } from '../../src/components/quiz/QuizExitButton';
import { QuizFinalScore } from '../../src/components/quiz/QuizFinalScore';
import { QuizQuestionCard } from '../../src/components/quiz/QuizQuestionCard';
import { QuizScoreDisplay } from '../../src/components/quiz/QuizScoreDisplay';
import type { Flashcard } from '../../src/types/flashcard';

const mockCard: Flashcard = {
  id: 'test-card',
  category: 'guard',
  weapon: 'longsword',
  originalTerm: 'Vom Tag',
  englishTerm: 'From the Roof',
  briefDescription: 'A high guard position.',
  briefApplication: 'Use for overhead strikes.',
  discipline: 'german-longsword',
};

describe('Quiz Components', () => {
  describe('QuizScoreDisplay', () => {
    it('should display correct score format', () => {
      render(<QuizScoreDisplay correct={5} total={10} />);
      expect(screen.getByText('5 out of 10 correct')).toBeTruthy();
    });

    it('should handle zero scores', () => {
      render(<QuizScoreDisplay correct={0} total={0} />);
      expect(screen.getByText('0 out of 0 correct')).toBeTruthy();
    });
  });

  describe('QuizQuestionCard', () => {
    it('should display original term', () => {
      render(<QuizQuestionCard card={mockCard} questionText="What is the English translation?" />);
      expect(screen.getByText('Vom Tag')).toBeTruthy();
    });

    it('should display question text', () => {
      render(<QuizQuestionCard card={mockCard} questionText="What is the English translation?" />);
      expect(screen.getByText('What is the English translation?')).toBeTruthy();
    });
  });

  describe('QuizExitButton', () => {
    it('should render exit button', () => {
      const mockPress = jest.fn();
      const { getByText } = render(<QuizExitButton onPress={mockPress} />);
      expect(getByText('✕')).toBeTruthy();
    });
  });

  describe('QuestionTypeTranslate', () => {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <QuestionTypeTranslate
          options={options}
          selectedIndex={null}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      options.forEach((option) => {
        expect(screen.getByText(option)).toBeTruthy();
      });
    });

    it('should prevent selection after an answer is selected', () => {
      const { getByText } = render(
        <QuestionTypeTranslate
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      const optionText = getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it('should show correct answer when feedback is shown', () => {
      render(
        <QuestionTypeTranslate
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={true}
          onSelect={mockOnSelect}
        />
      );

      const correctButton = screen.getByText(options[0]);
      expect(correctButton).toBeTruthy();
    });
  });

  describe('QuestionTypeDefinition', () => {
    const options = ['Description 1', 'Description 2', 'Description 3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <QuestionTypeDefinition
          options={options}
          selectedIndex={null}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      options.forEach((option) => {
        expect(screen.getByText(option)).toBeTruthy();
      });
    });

    it('should prevent selection after an answer is selected', () => {
      render(
        <QuestionTypeDefinition
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      const optionText = screen.getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('QuestionTypeApplication', () => {
    const options = ['Application 1', 'Application 2', 'Application 3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <QuestionTypeApplication
          options={options}
          selectedIndex={null}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      options.forEach((option) => {
        expect(screen.getByText(option)).toBeTruthy();
      });
    });

    it('should prevent selection after an answer is selected', () => {
      render(
        <QuestionTypeApplication
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
        />
      );

      const optionText = screen.getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('QuizAnswerFeedback', () => {
    it('should show correct feedback', () => {
      render(<QuizAnswerFeedback isCorrect={true} correctAnswer="Correct Answer" />);
      expect(screen.getByText('✓ Correct!')).toBeTruthy();
    });

    it('should show incorrect feedback', () => {
      render(<QuizAnswerFeedback isCorrect={false} correctAnswer="Correct Answer" />);
      expect(screen.getByText('✗ Incorrect')).toBeTruthy();
      expect(screen.getByText('Correct answer: Correct Answer')).toBeTruthy();
    });
  });

  describe('QuizFinalScore', () => {
    const mockOnRestart = jest.fn();
    const mockOnExit = jest.fn();

    beforeEach(() => {
      mockOnRestart.mockClear();
      mockOnExit.mockClear();
    });

    it('should display final score', () => {
      render(
        <QuizFinalScore correct={7} total={10} onRestart={mockOnRestart} onExit={mockOnExit} />
      );
      expect(screen.getByText('Quiz Complete!')).toBeTruthy();
      expect(screen.getByText('7 out of 10')).toBeTruthy();
      expect(screen.getByText('70%')).toBeTruthy();
    });

    it('should display restart and exit buttons', () => {
      render(
        <QuizFinalScore correct={5} total={10} onRestart={mockOnRestart} onExit={mockOnExit} />
      );
      expect(screen.getByText('Restart Quiz')).toBeTruthy();
      expect(screen.getByText('Exit to Cards')).toBeTruthy();
    });

    it('should calculate percentage correctly', () => {
      render(
        <QuizFinalScore correct={3} total={4} onRestart={mockOnRestart} onExit={mockOnExit} />
      );
      expect(screen.getByText('75%')).toBeTruthy();
    });
  });
});
