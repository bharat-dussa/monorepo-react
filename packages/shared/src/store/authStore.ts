import { createStore } from './createStore';
import { AuthState, User } from '../types/user';

const initialAuthState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const authStore = createStore<AuthState>(initialAuthState);

export const authActions = {
  loginStart: () => {
    authStore.setState({ status: 'loading', error: null });
  },
  loginSuccess: (user: User) => {
    authStore.setState({ user, status: 'authenticated', error: null });
  },
  loginFailure: (error: string) => {
    authStore.setState({ user: null, status: 'unauthenticated', error });
  },
  logout: () => {
    authStore.setState({ user: null, status: 'unauthenticated', error: null });
  },
};
