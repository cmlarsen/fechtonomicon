export type Discipline = 'italian-longsword' | 'german-longsword' | 'vadi-longsword';

export interface DisciplineInfo {
  name: string;
  shortName: string;
  color: string;
}

export const DISCIPLINE_INFO: Record<Discipline, DisciplineInfo> = {
  'italian-longsword': {
    name: 'Italian Longsword',
    shortName: 'Italian LS',
    color: '#8B2C2C',
  },
  'german-longsword': {
    name: 'German Longsword',
    shortName: 'German LS',
    color: '#5C3D2E',
  },
  'vadi-longsword': {
    name: 'Vadi Longsword',
    shortName: 'Vadi LS',
    color: '#6B4423',
  },
};

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

export interface VideoLink {
  title: string;
  url: string;
}

export interface Term {
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
  videoLinks?: VideoLink[];
  // Computed property for backwards compatibility
  discipline?: Discipline;
}

export interface AppState {
  currentCard: Term | null;
  viewedCardIds: string[];
  selectedDisciplines: Discipline[];
  allCards: Term[];
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
