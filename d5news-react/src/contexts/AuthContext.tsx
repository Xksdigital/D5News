import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'journalist' | 'subscriber';
  avatar: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem('d5news-user');
    if (stored) return JSON.parse(stored);
  } catch {
    // invalid or unavailable
  }
  return null;
}

function getStoredToken(): string | null {
  try {
    return localStorage.getItem('d5news-token');
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [token, setToken] = useState<string | null>(getStoredToken);

  const isLoggedIn = !!user && !!token;
  const isAdmin = user?.role === 'admin';

  const login = useCallback(async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!email || !password) {
      return { success: false, error: 'Email et mot de passe requis' };
    }

    let mockUser: User;
    const mockToken = 'd5news_mock_token_' + Date.now();

    if (email === 'admin@d5news.com' && password === 'admin123') {
      mockUser = {
        id: 1,
        name: 'Admin D5News',
        email: 'admin@d5news.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+D5News&background=0f58bd&color=fff',
        plan: 'Enterprise',
      };
    } else {
      // Any other combo creates a regular subscriber
      const name = email.split('@')[0].replace(/[._]/g, ' ');
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      mockUser = {
        id: Math.floor(Math.random() * 10000) + 100,
        name: displayName,
        email,
        role: 'subscriber',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6b7280&color=fff`,
        plan: 'Gratuit',
      };
    }

    try {
      localStorage.setItem('d5news-token', mockToken);
      localStorage.setItem('d5news-user', JSON.stringify(mockUser));
    } catch {
      // localStorage unavailable
    }

    setUser(mockUser);
    setToken(mockToken);
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!name || !email || !password) {
      return { success: false, error: 'Tous les champs sont requis' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Le mot de passe doit contenir au moins 6 caracteres' };
    }

    const mockToken = 'd5news_mock_token_' + Date.now();
    const mockUser: User = {
      id: Math.floor(Math.random() * 10000) + 100,
      name,
      email,
      role: 'subscriber',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6b7280&color=fff`,
      plan: 'Gratuit',
    };

    try {
      localStorage.setItem('d5news-token', mockToken);
      localStorage.setItem('d5news-user', JSON.stringify(mockUser));
    } catch {
      // localStorage unavailable
    }

    setUser(mockUser);
    setToken(mockToken);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('d5news-token');
      localStorage.removeItem('d5news-user');
    } catch {
      // localStorage unavailable
    }
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
