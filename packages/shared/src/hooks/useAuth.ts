import { authStore } from '../store/authStore';
import { authService } from '../services/authService';

export function useAuth() {
  const user = authStore.useStore((state) => state.user);
  const status = authStore.useStore((state) => state.status);
  const error = authStore.useStore((state) => state.error);

  const isAuthenticated = status === 'authenticated' && !!user;
  const isLoading = status === 'loading';

  return {
    user,
    status,
    error,
    isAuthenticated,
    isLoading,
    login: authService.login,
    logout: authService.logout,
  };
}
