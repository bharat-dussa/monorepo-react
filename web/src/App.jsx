import React, { useState } from 'react';
import { useCounter } from '@shared/hooks/useCounter';
import { useAuth } from '@shared/hooks/useAuth';
import { useTodos } from '@shared/hooks/useTodos';
import { formatCurrency, formatDate } from '@shared/utils/formatters';
import './App.css';

export default function App() {
  const { count, step, increment, decrement, reset, setStep } = useCounter();
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();
  const { todos, filter, stats, addTodo, toggleTodo, deleteTodo, setFilter } = useTodos();

  const [emailInput, setEmailInput] = useState('developer@company.com');
  const [todoInput, setTodoInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(emailInput).catch(() => {});
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      addTodo(todoInput);
      setTodoInput('');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="badge">React Web App</div>
        <h1>Monorepo Architecture</h1>
        <p className="subtitle">
          UI components consume state & logic via <code>@shared/</code> package modules
        </p>
      </header>

      <main className="grid-container">
        {/* Auth Section */}
        <section className="card auth-card">
          <div className="card-header">
            <h2>Authentication Logic</h2>
            <span className="source-tag">@shared/hooks/useAuth</span>
          </div>

          {isAuthenticated ? (
            <div className="user-profile">
              <div className="avatar-wrapper">
                <img src={user.avatarUrl} alt={user.name} />
              </div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className="role-pill">{user.role}</span>
              </div>
              <button className="btn btn-outline" onClick={logout}>
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="login-form">
              <p className="description">Simulate logging in via shared authService:</p>
              <div className="input-group">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email..."
                  required
                />
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
              {error && <p className="error-text">{error}</p>}
            </form>
          )}
        </section>

        {/* Counter Section */}
        <section className="card counter-card">
          <div className="card-header">
            <h2>Shared State Counter</h2>
            <span className="source-tag">@shared/hooks/useCounter</span>
          </div>

          <div className="counter-display">
            <span className="count-number">{count}</span>
            <span className="currency-note">
              Formatted: <strong>{formatCurrency(count * 49.99)}</strong>
            </span>
          </div>

          <div className="counter-controls">
            <button className="btn btn-icon" onClick={decrement}>-</button>
            <button className="btn btn-icon" onClick={increment}>+</button>
            <button className="btn btn-secondary" onClick={reset}>Reset</button>
          </div>

          <div className="step-selector">
            <label>Step Size: </label>
            {[1, 5, 10].map((s) => (
              <button
                key={s}
                className={`step-btn ${step === s ? 'active' : ''}`}
                onClick={() => setStep(s)}
              >
                +{s}
              </button>
            ))}
          </div>
        </section>

        {/* Todo List Section */}
        <section className="card todo-card">
          <div className="card-header">
            <h2>Task Management Logic</h2>
            <span className="source-tag">@shared/hooks/useTodos</span>
          </div>

          <form onSubmit={handleAddTodo} className="todo-form">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="Add new task..."
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </form>

          <div className="todo-filter-bar">
            {(['all', 'active', 'completed']).map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? stats.total : f === 'active' ? stats.activeCount : stats.completedCount})
              </button>
            ))}
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                  <span className="todo-title">{todo.title}</span>
                </label>
                <div className="todo-meta">
                  <span className="date-tag">{formatDate(todo.createdAt)}</span>
                  <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
