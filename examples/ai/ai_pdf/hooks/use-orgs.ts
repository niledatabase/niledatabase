import { create } from 'zustand';

type OrgsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOrgs = create<OrgsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
