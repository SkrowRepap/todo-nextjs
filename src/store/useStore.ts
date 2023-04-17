import { create, StateCreator } from "zustand";
import { TodoListSlice, todoListSlice } from "./todoListSlice";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import {
  defaultTags,
  TagListSlice,
  todoTagsListSlice,
} from "./todoTagsListSlice";

type HasHydratedSlice = {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
};

const hasHydratedSlice: StateCreator<HasHydratedSlice> = (set) => ({
  hasHydrated: false,
  setHasHydrated: (state) => set({ hasHydrated: state }),
});

export const useBoundStore = create<
  TodoListSlice & TagListSlice & HasHydratedSlice
>()(
  devtools(
    persist(
      (...a) => ({
        ...todoListSlice(...a),
        ...todoTagsListSlice(...a),
        ...hasHydratedSlice(...a),
      }),
      {
        name: "todo-list",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          console.log("hydration starts");
          if (state) {
            state.setHasHydrated(true);
          }
        },
      }
    )
  )
);
