import type { Discipline, Flashcard } from '../types/flashcard';

export interface QuestionData {
  type: 'translate' | 'definition' | 'application';
  card: Flashcard;
  options: string[];
  correctIndex: number;
  questionText: string;
}

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Replaces term references in text with the target term
 * This is used to sanitize false answers so they don't give away clues
 */
function replaceTermReferences(text: string, allCards: Flashcard[], targetTerm: string): string {
  // Build a map of all terms (originalTerm and englishTerm) from all cards
  const termSet = new Set<string>();
  allCards.forEach((card) => {
    if (card.originalTerm) {
      termSet.add(card.originalTerm.toLowerCase());
    }
    if (card.englishTerm) {
      termSet.add(card.englishTerm.toLowerCase());
    }
  });

  // Remove the target term from the set so we don't replace it
  termSet.delete(targetTerm.toLowerCase());

  if (termSet.size === 0) return text;

  // Sort by length (longest first) to handle compound terms correctly
  const sortedTerms = Array.from(termSet).sort((a, b) => b.length - a.length);

  // Escape special regex characters and build regex pattern
  const escapedTerms = sortedTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

  // Replace all term references with the target term, preserving case of first letter
  return text.replace(regex, (match) => {
    // Preserve the case of the first letter of the match
    const firstChar = match[0];
    const isUpperCase = firstChar === firstChar.toUpperCase();
    return isUpperCase
      ? targetTerm.charAt(0).toUpperCase() + targetTerm.slice(1).toLowerCase()
      : targetTerm.toLowerCase();
  });
}

/**
 * Filters out text that contains references to the originalTerm or englishTerm
 */
export function filterOutTermReferences(
  text: string,
  originalTerm: string,
  englishTerm: string
): boolean {
  const commonWordsToAllow = ['point', 'vor', 'nach'];
  const lowerText = text.toLowerCase();
  const lowerOriginal = originalTerm.toLowerCase();
  const lowerEnglish = englishTerm.toLowerCase();

  return (
    !lowerText.includes(lowerOriginal || lowerEnglish) && !commonWordsToAllow.includes(lowerText)
  );
  // return !lowerText.includes(lowerOriginal) && !lowerText.includes(lowerEnglish);
}

/**
 * Gets random englishTerms from the current discipline dataset
 */
export function getRandomEnglishTerms(
  card: Flashcard,
  allCards: Flashcard[],
  _selectedDisciplines: Discipline[],
  count: number
): string[] {
  const currentDiscipline = card.discipline;
  if (!currentDiscipline) return [];

  const sameDisciplineCards = allCards.filter(
    (c) => c.discipline === currentDiscipline && c.id !== card.id && c.englishTerm
  );

  if (sameDisciplineCards.length === 0) return [];

  const shuffled = shuffleArray(sameDisciplineCards);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  return selected.map((c) => c.englishTerm).filter((term): term is string => Boolean(term));
}

/**
 * Gets random descriptions from other disciplines, filtering out term references
 */
export function getRandomDescriptions(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[],
  count: number
): string[] {
  const currentDiscipline = card.discipline;
  if (!currentDiscipline) return [];

  const otherDisciplineCards = allCards.filter(
    (c) =>
      c.discipline !== currentDiscipline &&
      selectedDisciplines.includes(c.discipline || 'german-longsword') &&
      c.briefDescription &&
      filterOutTermReferences(c.briefDescription, card.originalTerm, card.englishTerm)
  );

  if (otherDisciplineCards.length === 0) return [];

  const shuffled = shuffleArray(otherDisciplineCards);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  return selected
    .map((c) => {
      const desc = c.briefDescription;
      if (!desc) return null;
      // Replace term references with the current card's term
      return replaceTermReferences(desc, allCards, card.originalTerm);
    })
    .filter((desc): desc is string => Boolean(desc));
}

/**
 * Gets descriptions from the same discipline as fallback
 */
function getSameDisciplineDescriptions(
  card: Flashcard,
  allCards: Flashcard[],
  count: number
): string[] {
  const sameDisciplineCards = allCards.filter(
    (c) =>
      c.discipline === card.discipline &&
      c.id !== card.id &&
      c.briefDescription &&
      filterOutTermReferences(c.briefDescription, card.originalTerm, card.englishTerm)
  );

  if (sameDisciplineCards.length < count) return [];

  const shuffled = shuffleArray(sameDisciplineCards);
  const selected = shuffled.slice(0, count);
  return selected
    .map((c) => {
      const desc = c.briefDescription;
      if (!desc) return null;
      // Replace term references with the current card's term
      return replaceTermReferences(desc, allCards, card.originalTerm);
    })
    .filter((desc): desc is string => Boolean(desc));
}

/**
 * Gets applications from the same discipline as fallback
 */
function getSameDisciplineApplications(
  card: Flashcard,
  allCards: Flashcard[],
  count: number
): string[] {
  const sameDisciplineCards = allCards.filter(
    (c) =>
      c.discipline === card.discipline &&
      c.id !== card.id &&
      c.briefApplication &&
      filterOutTermReferences(c.briefApplication, card.originalTerm, card.englishTerm)
  );

  if (sameDisciplineCards.length < count) return [];

  const shuffled = shuffleArray(sameDisciplineCards);
  const selected = shuffled.slice(0, count);
  return selected
    .map((c) => {
      const app = c.briefApplication;
      if (!app) return null;
      // Replace term references with the current card's term
      return replaceTermReferences(app, allCards, card.originalTerm);
    })
    .filter((app): app is string => Boolean(app));
}

/**
 * Gets random applications from other disciplines, filtering out term references
 */
export function getRandomApplications(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[],
  count: number
): string[] {
  const currentDiscipline = card.discipline;
  if (!currentDiscipline) return [];

  const otherDisciplineCards = allCards.filter(
    (c) =>
      c.discipline !== currentDiscipline &&
      selectedDisciplines.includes(c.discipline || 'german-longsword') &&
      c.briefApplication &&
      filterOutTermReferences(c.briefApplication, card.originalTerm, card.englishTerm)
  );

  if (otherDisciplineCards.length === 0) return [];

  const shuffled = shuffleArray(otherDisciplineCards);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  return selected
    .map((c) => {
      const app = c.briefApplication;
      if (!app) return null;
      // Replace term references with the current card's term
      return replaceTermReferences(app, allCards, card.originalTerm);
    })
    .filter((app): app is string => Boolean(app));
}

/**
 * Prepares and shuffles cards for the quiz
 */
export function prepareQuizCards(
  allCards: Flashcard[],
  selectedDisciplines: Discipline[]
): Flashcard[] {
  const filtered = allCards.filter(
    (card) => card.discipline && selectedDisciplines.includes(card.discipline)
  );
  return shuffleArray(filtered);
}

/**
 * Generates a translate question (englishTerm)
 */
function generateType1Question(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[]
): QuestionData | null {
  if (!card.englishTerm) return null;

  const randomTerms = getRandomEnglishTerms(card, allCards, selectedDisciplines, 4);
  const allOptions = [card.englishTerm, ...randomTerms];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(card.englishTerm);

  return {
    type: 'translate',
    card,
    options: shuffled,
    correctIndex,
    questionText: `Select the best English translation`,
  };
}

/**
 * Generates a definition question (description)
 */
function generateType2Question(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[]
): QuestionData | null {
  if (!card.briefDescription) return null;

  const randomDescriptions = getRandomDescriptions(card, allCards, selectedDisciplines, 2);
  let descriptions = randomDescriptions;

  if (descriptions.length < 2) {
    descriptions = getSameDisciplineDescriptions(card, allCards, 2);
    if (descriptions.length < 2) return null;
  }

  const allOptions = [card.briefDescription, ...descriptions];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(card.briefDescription);

  return {
    type: 'definition',
    card,
    options: shuffled,
    correctIndex,
    questionText: `Select the best description`,
  };
}

/**
 * Generates an application question (application)
 */
function generateType3Question(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[]
): QuestionData | null {
  if (!card.briefApplication) return null;

  const randomApplications = getRandomApplications(card, allCards, selectedDisciplines, 2);
  let applications = randomApplications;

  if (applications.length < 2) {
    applications = getSameDisciplineApplications(card, allCards, 2);
    if (applications.length < 2) return null;
  }

  const allOptions = [card.briefApplication, ...applications];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(card.briefApplication);

  return {
    type: 'application',
    card,
    options: shuffled,
    correctIndex,
    questionText: `Select the best application`,
  };
}

/**
 * Generates a random question for a given card
 */
export function generateQuestion(
  card: Flashcard,
  allCards: Flashcard[],
  selectedDisciplines: Discipline[],
  retryCount = 0
): QuestionData | null {
  const maxRetries = 10;
  if (retryCount >= maxRetries) {
    return generateType1Question(card, allCards, selectedDisciplines);
  }

  const questionTypes: Array<'translate' | 'definition' | 'application'> = [
    'translate',
    'definition',
    'application',
  ];
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  if (questionType === 'translate') {
    const question = generateType1Question(card, allCards, selectedDisciplines);
    return question || generateQuestion(card, allCards, selectedDisciplines, retryCount + 1);
  }

  if (questionType === 'definition') {
    const question = generateType2Question(card, allCards, selectedDisciplines);
    return question || generateQuestion(card, allCards, selectedDisciplines, retryCount + 1);
  }

  if (questionType === 'application') {
    const question = generateType3Question(card, allCards, selectedDisciplines);
    return question || generateQuestion(card, allCards, selectedDisciplines, retryCount + 1);
  }

  return null;
}
