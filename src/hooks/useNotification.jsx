import { create } from "zustand";

const useNotification = create((set) => ({
  notification: false,
  delete: () => set((state) => ({ notification: false })),
  update: () => set((state) => ({ notification: true })),
}));

export default useNotification;
