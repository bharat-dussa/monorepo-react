import { useMemo } from 'react';
import { todoStore, todoActions } from '../store/todoStore';

export function useTodos() {
  const todos = todoStore.useStore((state) => state.todos);
  const filter = todoStore.useStore((state) => state.filter);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completedCount = todos.filter((t) => t.completed).length;
    const activeCount = total - completedCount;
    return { total, completedCount, activeCount };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    stats,
    addTodo: todoActions.addTodo,
    toggleTodo: todoActions.toggleTodo,
    deleteTodo: todoActions.deleteTodo,
    setFilter: todoActions.setFilter,
  };
}
