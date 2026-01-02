import { create } from "zustand";
import { persist } from "zustand/middleware";

export const buyCoinStore = create(
  persist((set) => ({
    isOpen: false,
    selectedPlan: null,
    openModel: (plan) =>
      set({
        isOpen: true,
        selectedPlan: plan,
      }),
    closeModel: () =>
      set({
        isOpen: false,
        selectedPlan: null,
      }),
  })),
  { name: "count" }
);
