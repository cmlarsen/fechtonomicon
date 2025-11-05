export type Discipline = 'meyer-longsword' | 'rapier' | 'sword-buckler' | 'messer' | 'longsword';

export interface Citation {
  type: string;
  ref: string;
  locator?: string;
  note?: string;
}

export interface SourcePrimary {
  work: string;
  section: string;
  folio_or_marker: string;
}

export interface Flashcard {
  id: string;
  category: string;
  weapon: string;
  originalTerm: string;
  englishTerm: string;
  briefDescription: string;
  fullDescription?: string;
  briefApplication?: string;
  fullApplication?: string;
  related?: string[];
  source_primary?: SourcePrimary;
  citations?: Citation[];
  status?: string;
  // Computed property for backwards compatibility
  discipline?: Discipline;
}

export interface AppState {
  currentCard: Flashcard | null;
  viewedCardIds: string[];
  selectedDisciplines: Discipline[];
  allCards: Flashcard[];
}

export interface StorageKeys {
  VIEWED_CARDS: 'viewedCards';
  SELECTED_DISCIPLINES: 'selectedDisciplines';
  LAST_CARD_SHOWN: 'lastCardShown';
}

export const STORAGE_KEYS: StorageKeys = {
  VIEWED_CARDS: 'viewedCards',
  SELECTED_DISCIPLINES: 'selectedDisciplines',
  LAST_CARD_SHOWN: 'lastCardShown',
};
