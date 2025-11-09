/**
 * This file now derives discipline information from the central data registry.
 * To add a new discipline, update src/config/dataRegistry.ts instead.
 */
import { getAllDisciplines } from '../config/dataRegistry';
import type { Discipline } from '../types/term';

export interface DisciplineInfo {
  id: Discipline;
  name: string;
  description: string;
}

/**
 * All available disciplines, derived from the data registry.
 * This ensures discipline info stays in sync with available data sets.
 */
export const DISCIPLINES: DisciplineInfo[] = getAllDisciplines();
