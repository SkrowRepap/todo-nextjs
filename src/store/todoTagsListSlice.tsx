import { Tag } from "@/types/TodoTypes";
import { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface TagListSlice {
  tags: Tag[];
  addTag: (Tag: Tag) => void;
  removeTag: (id: string) => void;
  editTag: (id: string, Tag: Tag) => void;
  clearAll: () => void;
}

export const defaultTags: Tag[] = [
  {
    id: uuidv4(),
    name: "home",
    color: "#d69e2e",
  },
  {
    id: uuidv4(),
    name: "shopping",
    color: "#e53e3e",
  },
  {
    id: uuidv4(),
    name: "self",
    color: "#319795",
  },
];

export const todoTagsListSlice: StateCreator<TagListSlice> = (set) => ({
  tags: defaultTags,
  addTag: (tag: Tag) => {
    set((state) => ({
      tags: [...state.tags, { ...tag, id: uuidv4() }],
    }));
  },
  removeTag: (id: string) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    }));
  },
  editTag: (id: string, editedTag: Tag) => {
    set((state) => ({
      tags: state.tags.map((tag) =>
        tag.id === id ? { ...tag, ...editedTag } : tag
      ),
    }));
  },
  clearAll: () => {
    set(() => ({
      tags: [],
    }));
  },
});
