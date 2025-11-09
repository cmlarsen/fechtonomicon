import type { Discipline } from '../types/term';

export interface DisciplineInfo {
  id: Discipline;
  name: string;
  description: string;
}

export const DISCIPLINES: DisciplineInfo[] = [
  {
    id: 'italian-longsword',
    name: 'Italian Longsword',
    description: "Fiore dei Liberi and Filippo Vadi's Italian longsword systems",
  },
  {
    id: 'german-longsword',
    name: 'German Longsword',
    description: "Joachim Meyer's German longsword system",
  },
];
