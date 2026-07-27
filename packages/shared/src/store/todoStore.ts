import { createStore } from './createStore';
import { Todo, TodoFilter } from '../types/todo';

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

const initialTodoState: TodoState = {
  todos: [
    {
      id: '1',
      title: 'Set up Monorepo architecture',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Share state logic between React Web & React Native',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
  filter: 'all',
};

export const todoStore = createStore<TodoState>(initialTodoState);

export const todoActions = {
  addTodo: (title: string) => {
    if (!title.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const currentTodos = todoStore.getState().todos;
    todoStore.setState({ todos: [newTodo, ...currentTodos] });
  },
  toggleTodo: (id: string) => {
    const todos = todoStore.getState().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    todoStore.setState({ todos });
  },
  deleteTodo: (id: string) => {
    const todos = todoStore.getState().todos.filter((todo) => todo.id !== id);
    todoStore.setState({ todos });
  },
  setFilter: (filter: TodoFilter) => {
    todoStore.setState({ filter });
  },
};
