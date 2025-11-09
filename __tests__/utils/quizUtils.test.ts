import type { Term } from '../../src/types/term';
import {
  filterOutTermReferences,
  generateQuestion,
  getRandomApplications,
  getRandomDescriptions,
  getRandomEnglishTerms,
  prepareFullQuiz,
  prepareQuickQuiz,
  shuffleArray,
} from '../../src/utils/quizUtils';

const mockCards: Term[] = [
  {
    id: 'card1',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Vom Tag',
    englishTerm: 'From the Roof',
    briefDescription: 'A high guard position.',
    briefApplication: 'Use for overhead strikes.',
    discipline: 'german-longsword',
  },
  {
    id: 'card2',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Alber',
    englishTerm: 'Fool',
    briefDescription: 'A low guard position.',
    briefApplication: 'Use to bait attacks.',
    discipline: 'german-longsword',
  },
  {
    id: 'card3',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Ochs',
    englishTerm: 'Ox',
    briefDescription: 'A high thrusting guard.',
    briefApplication: 'Use for thrusting attacks.',
    discipline: 'german-longsword',
  },
  {
    id: 'card4',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Posta di Donna',
    englishTerm: 'Lady Guard',
    briefDescription: 'An Italian high guard.',
    briefApplication: 'Use for powerful cuts.',
    discipline: 'italian-longsword',
  },
  {
    id: 'card5',
    category: 'guard',
    weapon: 'longsword',
    originalTerm: 'Porta di Ferro',
    englishTerm: 'Iron Gate',
    briefDescription: 'An Italian low guard.',
    briefApplication: 'Use for defensive positioning.',
    discipline: 'italian-longsword',
  },
];

describe('Quiz Utils', () => {
  describe('shuffleArray', () => {
    it('should shuffle an array', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);

      expect(shuffled).toHaveLength(5);
      expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);

      expect(original).toEqual(originalCopy);
    });

    it('should handle empty arrays', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it('should handle single element arrays', () => {
      const result = shuffleArray([1]);
      expect(result).toEqual([1]);
    });
  });

  describe('filterOutTermReferences', () => {
    it('should return false if text contains originalTerm', () => {
      const result = filterOutTermReferences('This is about Vom Tag', 'Vom Tag', 'From the Roof');
      expect(result).toBe(false);
    });

    it('should return false if text contains englishTerm', () => {
      const result = filterOutTermReferences(
        'This is about From the Roof',
        'Vom Tag',
        'From the Roof'
      );
      expect(result).toBe(false);
    });

    it('should return true if text does not contain either term', () => {
      const result = filterOutTermReferences(
        'This is about something else',
        'Vom Tag',
        'From the Roof'
      );
      expect(result).toBe(true);
    });

    it('should be case insensitive', () => {
      const result = filterOutTermReferences('This is about vom tag', 'Vom Tag', 'From the Roof');
      expect(result).toBe(false);
    });
  });

  describe('getRandomEnglishTerms', () => {
    it('should return random englishTerms from same discipline', () => {
      const card = mockCards[0];
      const result = getRandomEnglishTerms(card, mockCards, ['german-longsword'], 2);

      expect(result.length).toBeLessThanOrEqual(2);
      result.forEach((term) => {
        expect(term).not.toBe(card.englishTerm);
        const sourceCard = mockCards.find((c) => c.englishTerm === term);
        expect(sourceCard?.discipline).toBe('german-longsword');
      });
    });

    it('should exclude the current card', () => {
      const card = mockCards[0];
      const result = getRandomEnglishTerms(card, mockCards, ['german-longsword'], 10);

      expect(result).not.toContain(card.englishTerm);
    });

    it('should return empty array if no cards available', () => {
      const card = mockCards[0];
      const result = getRandomEnglishTerms(card, [], ['german-longsword'], 2);

      expect(result).toEqual([]);
    });

    it('should return fewer terms if not enough available', () => {
      const card = mockCards[0];
      const germanCards = mockCards.filter((c) => c.discipline === 'german-longsword');
      const result = getRandomEnglishTerms(card, germanCards, ['german-longsword'], 10);

      expect(result.length).toBeLessThanOrEqual(germanCards.length - 1);
    });
  });

  describe('getRandomDescriptions', () => {
    it('should return random descriptions from other disciplines', () => {
      const card = mockCards[0];
      const result = getRandomDescriptions(
        card,
        mockCards,
        ['german-longsword', 'italian-longsword'],
        2
      );

      expect(result.length).toBeLessThanOrEqual(2);
      result.forEach((desc) => {
        const sourceCard = mockCards.find((c) => c.briefDescription === desc);
        expect(sourceCard?.discipline).toBe('italian-longsword');
      });
    });

    it('should replace term references in descriptions with the current card term', () => {
      const card = mockCards[0];
      const cardsWithReference: Term[] = [
        ...mockCards,
        {
          id: 'card6',
          category: 'guard',
          weapon: 'longsword',
          originalTerm: 'Test',
          englishTerm: 'Test',
          briefDescription: 'This mentions Alber and Ochs in the description',
          discipline: 'italian-longsword',
        },
      ];

      const result = getRandomDescriptions(
        card,
        cardsWithReference,
        ['german-longsword', 'italian-longsword'],
        10
      );

      result.forEach((desc) => {
        // Other term references should be replaced with the current card's term
        expect(desc.toLowerCase()).not.toContain('alber');
        expect(desc.toLowerCase()).not.toContain('ochs');
        expect(desc.toLowerCase()).not.toContain('fool');
        expect(desc.toLowerCase()).not.toContain('ox');
      });
    });

    it('should return empty array if no cards available', () => {
      const card = mockCards[0];
      const result = getRandomDescriptions(card, [], ['italian-longsword'], 2);

      expect(result).toEqual([]);
    });
  });

  describe('getRandomApplications', () => {
    it('should return random applications from other disciplines', () => {
      const card = mockCards[0];
      const result = getRandomApplications(
        card,
        mockCards,
        ['german-longsword', 'italian-longsword'],
        2
      );

      expect(result.length).toBeLessThanOrEqual(2);
      result.forEach((app) => {
        const sourceCard = mockCards.find((c) => c.briefApplication === app);
        expect(sourceCard?.discipline).toBe('italian-longsword');
      });
    });

    it('should replace term references in applications with the current card term', () => {
      const card = mockCards[0];
      const cardsWithReference: Term[] = [
        ...mockCards,
        {
          id: 'card6',
          category: 'guard',
          weapon: 'longsword',
          originalTerm: 'Test',
          englishTerm: 'Test',
          briefDescription: 'Test description',
          briefApplication: 'This mentions Alber and Ochs in the application',
          discipline: 'italian-longsword',
        },
      ];

      const result = getRandomApplications(
        card,
        cardsWithReference,
        ['german-longsword', 'italian-longsword'],
        10
      );

      result.forEach((app) => {
        // Other term references should be replaced with the current card's term
        expect(app.toLowerCase()).not.toContain('alber');
        expect(app.toLowerCase()).not.toContain('ochs');
        expect(app.toLowerCase()).not.toContain('fool');
        expect(app.toLowerCase()).not.toContain('ox');
      });
    });

    it('should return empty array if no cards available', () => {
      const card = mockCards[0];
      const result = getRandomApplications(card, [], ['italian-longsword'], 2);

      expect(result).toEqual([]);
    });
  });

  describe('prepareQuickQuiz', () => {
    it('should filter cards by selected disciplines', () => {
      const result = prepareQuickQuiz(mockCards, ['german-longsword']);

      expect(result.length).toBeLessThanOrEqual(10);
      result.forEach((card: Term) => {
        expect(card.discipline).toBe('german-longsword');
      });
    });

    it('should limit to 10 cards', () => {
      const result = prepareQuickQuiz(mockCards, ['german-longsword', 'italian-longsword']);

      expect(result.length).toBeLessThanOrEqual(10);
    });

    it('should return empty array if no cards match disciplines', () => {
      const result = prepareQuickQuiz(mockCards, []);

      expect(result).toEqual([]);
    });
  });

  describe('prepareFullQuiz', () => {
    it('should filter cards by selected disciplines', () => {
      const result = prepareFullQuiz(mockCards, ['german-longsword']);

      result.forEach((card: Term) => {
        expect(card.discipline).toBe('german-longsword');
      });
    });

    it('should limit to 50 cards', () => {
      const result = prepareFullQuiz(mockCards, ['german-longsword', 'italian-longsword']);

      expect(result.length).toBeLessThanOrEqual(50);
    });

    it('should shuffle the cards', () => {
      const result1 = prepareFullQuiz(mockCards, ['german-longsword', 'italian-longsword']);
      const result2 = prepareFullQuiz(mockCards, ['german-longsword', 'italian-longsword']);

      if (result1.length === result2.length && result1.length > 1) {
        const ids1 = result1.map((c: Term) => c.id);
        const ids2 = result2.map((c: Term) => c.id);

        const allSame = ids1.every((id: string, index: number) => id === ids2[index]);
        expect(allSame).toBe(false);
      }
    });
  });

  describe('generateQuestion', () => {
    it('should generate a valid question', () => {
      const card = mockCards[0];
      const question = generateQuestion(card, mockCards, ['german-longsword', 'italian-longsword']);

      expect(question).not.toBeNull();
      if (question) {
        expect(['translate', 'definition', 'application']).toContain(question.type);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.options.length);
      }
    });

    it('should generate translate question with englishTerm when card has englishTerm', () => {
      const card = mockCards[0];
      let question: ReturnType<typeof generateQuestion> = null;
      let attempts = 0;

      while (question?.type !== 'translate' && attempts < 50) {
        question = generateQuestion(card, mockCards, ['german-longsword', 'italian-longsword']);
        attempts++;
      }

      if (question && question.type === 'translate') {
        expect(question.options).toContain(card.englishTerm);
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(question.options[question.correctIndex]).toBe(card.englishTerm);
      }
    });

    it('should generate definition question (description)', () => {
      const card = mockCards[0];
      const question = generateQuestion(card, mockCards, ['german-longsword', 'italian-longsword']);

      if (question?.type === 'definition') {
        expect(question.options).toContain(card.briefDescription);
        expect(question.options.length).toBe(3);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.options[question.correctIndex]).toBe(card.briefDescription);
      }
    });

    it('should generate application question (application)', () => {
      const card = mockCards[0];
      const question = generateQuestion(card, mockCards, ['german-longsword', 'italian-longsword']);

      if (question?.type === 'application') {
        expect(question.options).toContain(card.briefApplication);
        expect(question.options.length).toBe(3);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.options[question.correctIndex]).toBe(card.briefApplication);
      }
    });

    it('should randomize correct answer position', () => {
      const card = mockCards[0];
      const positions = new Set<number>();

      for (let i = 0; i < 20; i++) {
        const question = generateQuestion(card, mockCards, [
          'german-longsword',
          'italian-longsword',
        ]);
        if (question) {
          positions.add(question.correctIndex);
        }
      }

      expect(positions.size).toBeGreaterThan(1);
    });

    it('should handle cards without englishTerm', () => {
      const cardWithoutEnglish: Term = {
        id: 'test',
        category: 'guard',
        weapon: 'longsword',
        originalTerm: 'Test Guard',
        englishTerm: '',
        briefDescription: 'A unique test description for this guard position.',
        briefApplication: 'A unique test application for this technique.',
        discipline: 'german-longsword',
      };

      const question = generateQuestion(cardWithoutEnglish, mockCards, [
        'german-longsword',
        'italian-longsword',
      ]);

      if (question !== null) {
        expect(question.type).not.toBe('translate');
      }
    });

    it('should handle cards with missing optional fields gracefully', () => {
      const cardWithoutApp: Term = {
        id: 'test',
        category: 'guard',
        weapon: 'longsword',
        originalTerm: 'Test',
        englishTerm: 'Test',
        briefDescription: 'Test',
        discipline: 'german-longsword',
      };

      let question: ReturnType<typeof generateQuestion> = null;
      let attempts = 0;

      while (question === null && attempts < 20) {
        question = generateQuestion(cardWithoutApp, mockCards, ['german-longsword']);
        attempts++;
      }

      expect(question).not.toBeNull();
      if (question) {
        expect(['translate', 'definition']).toContain(question.type);
      }
    });
  });
});
