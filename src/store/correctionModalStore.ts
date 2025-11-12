import { create } from 'zustand';
import type { Term } from '../types/term';

interface CorrectionModalData {
  card: Term;
  fieldName: string;
  fieldValue: string;
}

interface CorrectionModalStore {
  isOpen: boolean;
  data: CorrectionModalData | null;

  openModal: (card: Term, fieldName: string, fieldValue: string) => void;
  closeModal: () => void;
}

export const useCorrectionModalStore = create<CorrectionModalStore>((set) => ({
  isOpen: false,
  data: null,

  openModal: (card, fieldName, fieldValue) => {
    set({
      isOpen: true,
      data: {
        card,
        fieldName,
        fieldValue,
      },
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      data: null,
    });
  },
}));
