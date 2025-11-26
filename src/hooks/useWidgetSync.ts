import { useEffect } from 'react';
import { useFilteredCards } from './useFilteredCards';
import { widgetService } from '../services/widgetService';

export const useWidgetSync = () => {
  const { disciplineFilteredCards } = useFilteredCards();

  useEffect(() => {
    const syncToWidget = async () => {
      if (widgetService.isAvailable() && disciplineFilteredCards.length > 0) {
        await widgetService.updateAllTerms(disciplineFilteredCards);
      }
    };

    syncToWidget();
  }, [disciplineFilteredCards]);
};
