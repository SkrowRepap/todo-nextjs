import { Todo } from "@/types/TodoTypes";
import { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface TodoListSlice {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, todo: Todo) => void;
}

export const todoListSlice: StateCreator<TodoListSlice> = (set) => ({
  todos: [],
  addTodo: (todo: Todo) =>
    set((state) => ({ todos: [...state.todos, { ...todo, id: uuidv4() }] })),
  removeTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodo: (id: string) => {
    console.log("🚀 ~ file: todoListSlice.tsx:40 ~ id:", id);

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  editTodo: (id: string, editedTodo: Todo) => {
    console.log("🚀 ~ file: todoListSlice.tsx:36 ~ id:", id);
    console.log("🚀 ~ file: todoListSlice.tsx:28 ~ editedTodo:", editedTodo);

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...editedTodo } : todo
      ),
    }));
  },
});
