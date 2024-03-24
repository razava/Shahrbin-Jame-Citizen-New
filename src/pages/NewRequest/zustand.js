import { create } from "zustand";

export const useQuickStore = create((set) => ({
  data: null,
  count: false,
  inc: (payload) => set((state) => ({ count: !state.count, data: payload })),
  del: () => set((state) => ({ ...state, count: !state.count })),
}));
