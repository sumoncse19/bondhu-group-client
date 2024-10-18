import { create } from "zustand";

interface UserState {
  singleUser: object;
  setSingleUser: (value: object) => void;
}

// Define the store with types
const useStore = create<UserState>((set) => ({
  singleUser: {},

  // Action to set modal state explicitly
  setSingleUser: (value: object) => set({ singleUser: value }), // Accept value to set
}));

export default useStore;
