# React Web & React Native Monorepo Architecture

An enterprise-grade monorepo setup for **React JS (Web)** and **React Native (Mobile)** sharing state management, custom hooks, API services, types, and utility logic.

## 🏗️ Architecture & Structure

```
monorepo-react/
├── package.json               # Root monorepo workspace configuration
├── tsconfig.base.json         # Base TypeScript configuration & path aliases
├── packages/
│   └── shared/                # Shared logic & state management (@shared/logic)
│       ├── src/
│       │   ├── hooks/         # Custom React hooks (useCounter, useAuth, useTodos)
│       │   ├── store/         # State management stores (counterStore, authStore, todoStore)
│       │   ├── services/      # API services & business logic (authService, fetchJson)
│       │   ├── types/         # TypeScript interfaces & models (User, Todo, AuthState)
│       │   ├── utils/         # Helper functions (formatCurrency, formatDate, validators)
│       │   └── index.ts       # Main package barrel export
│       └── package.json
├── web/                       # React Web Application (Vite + React)
│   ├── src/
│   │   ├── App.jsx            # Web UI consuming @shared/ hooks & utils
│   │   └── main.jsx
│   ├── vite.config.js         # Configured with @shared path aliases
│   └── tsconfig.json
└── mobile/                    # React Native Mobile Application
    ├── App.tsx                # Mobile UI consuming @shared/ hooks & utils
    ├── metro.config.js        # Monorepo watchFolders & nodeModules resolution
    ├── babel.config.js        # Module resolver plugin for @shared path alias
    └── tsconfig.json
```

---

## 🚀 `@shared/` Import Patterns

All shared state and business logic can be cleanly imported in both Web and Mobile apps using the `@shared/` alias:

```typescript
// Import custom state hooks
import { useCounter } from '@shared/hooks/useCounter';
import { useAuth } from '@shared/hooks/useAuth';
import { useTodos } from '@shared/hooks/useTodos';

// Import state stores & actions
import { authStore, authActions } from '@shared/store/authStore';
import { counterStore } from '@shared/store/counterStore';

// Import services & utilities
import { authService } from '@shared/services/authService';
import { formatCurrency, formatDate } from '@shared/utils/formatters';

// Import TypeScript interfaces
import { User, Todo, TodoFilter } from '@shared/types';

// Or import directly from barrel export
import { useAuth, formatCurrency, User } from '@shared';
```

---

## 🛠️ Getting Started & Scripts

### Installation
Run `npm install` at the project root to link workspaces:
```bash
npm install
```

### Web Development (Vite)
```bash
# Start Vite dev server
npm run dev:web

# Build production Web bundle
npm run build:web
```

### Mobile Development (React Native)
```bash
# Start Metro bundler
npm run start:mobile

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Typechecking
```bash
# Run TypeScript type check across all workspaces (@shared, web, mobile)
npm run typecheck
```
