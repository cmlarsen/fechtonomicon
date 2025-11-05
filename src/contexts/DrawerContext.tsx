import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Flashcard } from '../types/flashcard';

interface DrawerContextType {
  cards: Flashcard[];
  setCards: (cards: Flashcard[]) => void;
  onCardPress: (cardId: string, index: number) => void;
  setOnCardPress: (callback: (cardId: string, index: number) => void) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [onCardPress, setOnCardPress] = useState<(cardId: string, index: number) => void>(
    () => () => {}
  );

  return (
    <DrawerContext.Provider
      value={{
        cards,
        setCards,
        onCardPress,
        setOnCardPress,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within DrawerProvider');
  }
  return context;
};
