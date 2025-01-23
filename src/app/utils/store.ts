import { create } from "zustand";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isPasswordProtected: boolean;
  password?: string;
  spaceId: string;
}

interface Space {
  id: string;
  name: string;
  isPasswordProtected: boolean;
  password?: string;
}

interface Store {
  spaces: Space[];
  todos: Todo[];
  addSpace: (name: string, password?: string) => void;
  deleteSpace: (id: string) => void;
  addTodo: (spaceId: string, text: string, password?: string) => void;
  toggleTodoCompletion: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodosBySpaceId: (spaceId: string) => Todo[];
  getSpaceById: (spaceId: string) => Space | undefined;
}

export const useStore = create<Store>((set, get) => ({
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
        },
      ],
    })),
  deleteSpace: (id) =>
    set((state) => ({
      spaces: state.spaces.filter((space) => space.id !== id),
      todos: state.todos.filter((todo) => todo.spaceId !== id),
    })),
  addTodo: (spaceId, text, password) =>
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
  getSpaceById: (spaceId) => get().spaces.find((space) => space.id === spaceId),
}));
