import { create } from "zustand";

const useWidgetStore = create((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));

export default useWidgetStore;
