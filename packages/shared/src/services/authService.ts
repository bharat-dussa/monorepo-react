import { authActions } from '../store/authStore';
import { isValidEmail } from '../utils/validators';
import { User } from '../types/user';

export const authService = {
  async login(email: string): Promise<User> {
    authActions.loginStart();

    // Validate email
    if (!isValidEmail(email)) {
      const errorMsg = 'Invalid email address format';
      authActions.loginFailure(errorMsg);
      throw new Error(errorMsg);
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0],
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: 'admin',
    };

    authActions.loginSuccess(mockUser);
    return mockUser;
  },

  logout() {
    authActions.logout();
  },
};
