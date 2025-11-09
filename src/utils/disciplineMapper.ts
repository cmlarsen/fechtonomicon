import type { Discipline } from '../types/term';

export function getDisciplineFromCardId(cardId: string): Discipline {
  if (cardId.startsWith('italian.long.')) {
    return 'italian-longsword';
  }
  if (cardId.startsWith('meyer1570.long.')) {
    return 'german-longsword';
  }
  return 'german-longsword';
}
