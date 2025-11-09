import type { Discipline } from '../types/term';

/**
 * Data Set Configuration
 * Each entry defines a martial arts data set (e.g., a longsword system)
 */
export interface DataSetConfig {
  /** Unique identifier for this discipline */
  id: Discipline;
  /** Display name for the discipline */
  name: string;
  /** Brief description of the discipline */
  description: string;
  /** Path to the JSON data file (relative to assets/data/) */
  dataFile: string;
  /** ID prefix used in the data file's record IDs */
  idPrefix: string;
}

/**
 * DATA REGISTRY
 *
 * To add a new data set:
 * 1. Place your JSON file in assets/data/
 * 2. Add an entry below with the required configuration
 * 3. Add the discipline ID to the Discipline type in src/types/term.ts
 *
 * That's it! The system will automatically:
 * - Load your data
 * - Map IDs to disciplines
 * - Include it in filtering and search
 */
export const DATA_REGISTRY: readonly DataSetConfig[] = [
  {
    id: 'italian-longsword',
    name: 'Italian Longsword',
    description: "Fiore dei Liberi and Filippo Vadi's Italian longsword systems",
    dataFile: 'italian-longsword-data.json',
    idPrefix: 'italian.long.',
  },
  {
    id: 'german-longsword',
    name: 'German Longsword',
    description: "Joachim Meyer's German longsword system",
    dataFile: 'german-longsword-data.json',
    idPrefix: 'meyer1570.long.',
  },
  // Add more data sets here...
  // {
  //   id: 'vadi-longsword',
  //   name: 'Vadi Longsword',
  //   description: "Filippo Vadi's longsword system",
  //   dataFile: 'vadi-longsword-data.json',
  //   idPrefix: 'vadi.long.',
  // },
] as const;

/**
 * Get data set configuration by discipline ID
 */
export function getDataSetConfig(discipline: Discipline): DataSetConfig | undefined {
  return DATA_REGISTRY.find((config) => config.id === discipline);
}

/**
 * Get data set configuration by record ID prefix
 */
export function getDataSetByIdPrefix(recordId: string): DataSetConfig | undefined {
  return DATA_REGISTRY.find((config) => recordId.startsWith(config.idPrefix));
}

/**
 * Get the data file path for a given record ID
 */
export function getDataFilePathByRecordId(recordId: string): string | undefined {
  const config = getDataSetByIdPrefix(recordId);
  return config ? `assets/data/${config.dataFile}` : undefined;
}

/**
 * Get discipline from a record ID
 */
export function getDisciplineFromRecordId(recordId: string): Discipline {
  const config = getDataSetByIdPrefix(recordId);
  return config?.id ?? 'german-longsword'; // fallback to german-longsword
}

/**
 * Get all discipline info for display purposes
 */
export function getAllDisciplines(): Array<{
  id: Discipline;
  name: string;
  description: string;
}> {
  return DATA_REGISTRY.map((config) => ({
    id: config.id,
    name: config.name,
    description: config.description,
  }));
}
