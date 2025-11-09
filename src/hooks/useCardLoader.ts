import { useEffect, useRef, useState } from 'react';
import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import vadiData from '../../assets/data/vadi-longsword-data.json';
import { DATA_REGISTRY, getDisciplineFromRecordId } from '../config/dataRegistry';
import { useTermStore } from '../store/termStore';
import type { Term } from '../types/term';

interface DataFileRecord {
  id: string;
  originalTerm: string;
  englishTerm: string;
  category: string;
  weapon?: string;
  briefDescription?: string;
  fullDescription?: string;
  briefApplication?: string;
  fullApplication?: string;
  [key: string]: unknown;
}

interface DataFile {
  records: DataFileRecord[];
}

/**
 * Map of data file names to their imported data
 * When adding a new data set, add the import at the top and include it here
 */
const DATA_FILE_MAP: Record<string, DataFile> = {
  'italian-longsword-data.json': italianData as DataFile,
  'german-longsword-data.json': germanData as DataFile,
  'vadi-longsword-data.json': vadiData as DataFile,
};

export const useCardLoader = () => {
  const loadCards = useTermStore((state) => state.loadCards);
  const [isLoading, setIsLoading] = useState(true);
  const cardsLoadedRef = useRef(false);

  useEffect(() => {
    if (cardsLoadedRef.current) return;
    cardsLoadedRef.current = true;
    setIsLoading(true);

    try {
      // Load all records from all registered data sets
      const allRecords: DataFileRecord[] = [];

      for (const dataSetConfig of DATA_REGISTRY) {
        const dataFile = DATA_FILE_MAP[dataSetConfig.dataFile];
        if (dataFile) {
          allRecords.push(...dataFile.records);
        } else {
          console.warn(`Data file not found: ${dataSetConfig.dataFile}`);
        }
      }

      const cardsWithDiscipline: Term[] = allRecords.map((card) => ({
        ...card,
        weapon: card.weapon || 'longsword',
        briefDescription: card.briefDescription || '',
        discipline: getDisciplineFromRecordId(card.id),
      }));

      loadCards(cardsWithDiscipline);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading cards:', error);
      setIsLoading(false);
    }
  }, [loadCards]);

  return { isLoading };
};
