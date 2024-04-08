import { create } from "zustand";

export const useQuickStore = create((set) => ({
  data: null,
  count: false,
  bool: false,
  category: null,
  updateCategory: (payload) =>
    set((state) => ({ ...state, category: payload })),
  inc: (payload) => set((state) => ({ count: !state.count, data: payload })),
  change: (payload) => set((state) => ({ ...state, bool: payload })),
  del: () => set((state) => ({ ...state, count: false })),
}));
