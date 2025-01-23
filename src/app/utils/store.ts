import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isPasswordProtected: boolean;
  password?: string;
  spaceId: string;
  deadline?: string;
}

interface Space {
  id: string;
  name: string;
  isPasswordProtected: boolean;
  password?: string;
  isUnlocked?: boolean;
}

interface Store {
  spaces: Space[];
  todos: Todo[];
  addSpace: (name: string, password?: string) => void;
  deleteSpace: (id: string) => void;
  addTodo: (
    spaceId: string,
    text: string,
    password?: string,
    deadline?: string
  ) => void;
  toggleTodoCompletion: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodosBySpaceId: (spaceId: string) => Todo[];
  getSpaceById: (spaceId: string) => Space | undefined;
  getUpcomingDeadlines: () => Todo[];
  unlockSpace: (spaceId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      spaces: [],
      todos: [],
      addSpace: (name, password) =>
        set((state) => ({
          spaces: [
            ...state.spaces,
            {
              id: Date.now().toString(),
              name,
              isPasswordProtected: !!password,
              password,
              isUnlocked: !password,
            },
          ],
        })),
      deleteSpace: (id) =>
        set((state) => ({
          spaces: state.spaces.filter((space) => space.id !== id),
          todos: state.todos.filter((todo) => todo.spaceId !== id),
        })),
      addTodo: (spaceId, text, password, deadline) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              isPasswordProtected: !!password,
              password,
              spaceId,
              deadline,
            },
          ],
        })),
      toggleTodoCompletion: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      getTodosBySpaceId: (spaceId) =>
        get().todos.filter((todo) => todo.spaceId === spaceId),
      getSpaceById: (spaceId) =>
        get().spaces.find((space) => space.id === spaceId),
      getUpcomingDeadlines: () => {
        const today = new Date();
        const twoDaysBefore = new Date(today);
        twoDaysBefore.setDate(today.getDate() - 2);

        return get().todos.filter((todo) => {
          if (todo.completed || !todo.deadline) return false;
          const deadline = new Date(todo.deadline);
          return deadline <= today && deadline >= twoDaysBefore;
        });
      },
      unlockSpace: (spaceId) =>
        set((state) => ({
          spaces: state.spaces.map((space) =>
            space.id === spaceId ? { ...space, isUnlocked: true } : space
          ),
        })),
    }),
    {
      name: "todo-app-storage",
    }
  )
);
