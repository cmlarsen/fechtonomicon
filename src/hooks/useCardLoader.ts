import { useEffect, useRef, useState } from 'react';
import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import { useFlashcardStore } from '../store/flashcardStore';
import type { Flashcard } from '../types/flashcard';
import { getDisciplineFromCardId } from '../utils/disciplineMapper';

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

export const useCardLoader = () => {
  const loadCards = useFlashcardStore((state) => state.loadCards);
  const [isLoading, setIsLoading] = useState(true);
  const cardsLoadedRef = useRef(false);

  useEffect(() => {
    if (cardsLoadedRef.current) return;
    cardsLoadedRef.current = true;
    setIsLoading(true);

    try {
      const italianRecords = (italianData as DataFile).records;
      const germanRecords = (germanData as DataFile).records;
      const allRecords = [...italianRecords, ...germanRecords];

      const cardsWithDiscipline: Flashcard[] = allRecords.map((card) => ({
        ...card,
        weapon: card.weapon || 'longsword',
        briefDescription: card.briefDescription || '',
        discipline: getDisciplineFromCardId(card.id),
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
