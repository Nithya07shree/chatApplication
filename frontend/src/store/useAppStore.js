import { create } from "zustand";

export const useAppStore = create((set) => ({
  currentPage: "", // Track the current page
  setCurrentPage: (page) => set({ currentPage: page }), // Method to update the current page
}));
