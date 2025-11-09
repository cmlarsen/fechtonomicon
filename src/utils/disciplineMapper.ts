/**
 * @deprecated Use getDisciplineFromRecordId from config/dataRegistry instead.
 * This file is kept for backwards compatibility.
 */
import { getDisciplineFromRecordId } from '../config/dataRegistry';
import type { Discipline } from '../types/term';

export function getDisciplineFromCardId(cardId: string): Discipline {
  return getDisciplineFromRecordId(cardId);
}
