import { create } from "zustand";

type UseMobileSidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};


export const UseMobileSidebarState = create<UseMobileSidebarState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

