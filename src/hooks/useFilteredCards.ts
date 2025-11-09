import { useMemo } from 'react';
import { useTermsSearch } from '../contexts/TermsSearchContext';
import { useTermStore } from '../store/termStore';

export const useFilteredCards = () => {
  const allCards = useTermStore((state) => state.allCards);
  const selectedDisciplines = useTermStore((state) => state.selectedDisciplines);
  const { searchQuery } = useTermsSearch();

  const disciplineFilteredCards = useMemo(() => {
    if (allCards.length === 0) return [];

    const filtered = allCards.filter((card) => {
      return card.discipline && selectedDisciplines.includes(card.discipline);
    });

    return [...filtered].sort((a, b) => a.originalTerm.localeCompare(b.originalTerm));
  }, [allCards, selectedDisciplines]);

  const filteredAndSortedCards = useMemo(() => {
    if (disciplineFilteredCards.length === 0) return [];

    let filtered = disciplineFilteredCards;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = disciplineFilteredCards.filter((card) => {
        return (
          card.originalTerm.toLowerCase().startsWith(query) ||
          card.englishTerm.toLowerCase().startsWith(query)
        );
      });
    }

    return [...filtered].sort((a, b) => a.originalTerm.localeCompare(b.originalTerm));
  }, [disciplineFilteredCards, searchQuery]);

  return {
    disciplineFilteredCards,
    filteredAndSortedCards,
  };
};
