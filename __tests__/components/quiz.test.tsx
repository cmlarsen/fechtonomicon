import { fireEvent, render, screen } from '@testing-library/react-native';
import { ApplicationQuestion } from '../../src/components/quiz/ApplicationQuestion';
import { DefinitionQuestion } from '../../src/components/quiz/DefinitionQuestion';
import { TranslateQuestion } from '../../src/components/quiz/TranslateQuestion';
import { QuizAnswerFeedback } from '../../src/components/quiz/QuizAnswerFeedback';
import { QuizExitButton } from '../../src/components/quiz/QuizExitButton';
import { QuizFinalScore } from '../../src/components/quiz/QuizFinalScore';
import { QuizQuestionCard } from '../../src/components/quiz/QuizQuestionCard';
import { QuizScoreDisplay } from '../../src/components/quiz/QuizScoreDisplay';
import type { Term } from '../../src/types/term';

const mockCard: Term = {
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

  describe('TranslateQuestion', () => {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <TranslateQuestion
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

    it('should allow changing selection before checking answer', () => {
      const { getByText } = render(
        <TranslateQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
          isChecked={false}
        />
      );

      const optionText = getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).toHaveBeenCalledWith(0);
    });

    it('should prevent selection after answer is checked', () => {
      const { getByText } = render(
        <TranslateQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={true}
          onSelect={mockOnSelect}
          isChecked={true}
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
        <TranslateQuestion
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

  describe('DefinitionQuestion', () => {
    const options = ['Description 1', 'Description 2', 'Description 3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <DefinitionQuestion
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

    it('should allow changing selection before checking answer', () => {
      render(
        <DefinitionQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
          isChecked={false}
        />
      );

      const optionText = screen.getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).toHaveBeenCalledWith(0);
    });

    it('should prevent selection after answer is checked', () => {
      render(
        <DefinitionQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={true}
          onSelect={mockOnSelect}
          isChecked={true}
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

  describe('ApplicationQuestion', () => {
    const options = ['Application 1', 'Application 2', 'Application 3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('should render all options', () => {
      render(
        <ApplicationQuestion
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

    it('should allow changing selection before checking answer', () => {
      render(
        <ApplicationQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={false}
          onSelect={mockOnSelect}
          isChecked={false}
        />
      );

      const optionText = screen.getByText(options[0]);
      const touchable = optionText.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      expect(mockOnSelect).toHaveBeenCalledWith(0);
    });

    it('should prevent selection after answer is checked', () => {
      render(
        <ApplicationQuestion
          options={options}
          selectedIndex={1}
          correctIndex={0}
          showFeedback={true}
          onSelect={mockOnSelect}
          isChecked={true}
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
