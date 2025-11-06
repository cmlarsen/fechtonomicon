import React, { createContext, ReactNode, useContext, useState } from 'react';

interface TermsSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TermsSearchContext = createContext<TermsSearchContextType | undefined>(undefined);

export const TermsSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <TermsSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </TermsSearchContext.Provider>
  );
};

export const useTermsSearch = () => {
  const context = useContext(TermsSearchContext);
  if (!context) {
    throw new Error('useTermsSearch must be used within TermsSearchProvider');
  }
  return context;
};
