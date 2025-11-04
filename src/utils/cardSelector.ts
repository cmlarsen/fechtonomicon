import { Flashcard, Discipline } from '../types/flashcard';

export function selectRandomCard(
  allCards: Flashcard[],
  selectedDisciplines: Discipline[],
  viewedCardIds: string[]
): Flashcard | null {
  const eligibleCards = allCards.filter(card =>
    selectedDisciplines.includes(card.discipline)
  );

  if (eligibleCards.length === 0) {
    return null;
  }

  const unviewedCards = eligibleCards.filter(
    card => !viewedCardIds.includes(card.id)
  );

  const cardsToChooseFrom = unviewedCards.length > 0 ? unviewedCards : eligibleCards;

  const randomIndex = Math.floor(Math.random() * cardsToChooseFrom.length);
  return cardsToChooseFrom[randomIndex];
}
