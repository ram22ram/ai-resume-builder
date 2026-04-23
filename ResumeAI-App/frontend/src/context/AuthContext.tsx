import React, { createContext, useState, useEffect, useContext } from 'react';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

/* ================= TYPES ================= */

interface User {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  isPremium?: boolean;

  resumeCreated?: boolean;
  resumesCreated?: number;
  applicationsCount?: number;
  atsScore?: number | string;
  nextInterview?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= HELPERS ================= */

const clearAuthStorage = () => {
  localStorage.removeItem('resume_user');
  localStorage.removeItem('resume_token');
};

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    // exp is in seconds; Date.now() in ms
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

/* ================= PROVIDER ================= */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Restore login on refresh — validates JWT expiry before restoring
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('resume_user');
      const storedToken = localStorage.getItem('resume_token');

      if (storedUser && storedToken) {
        if (isTokenValid(storedToken)) {
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired — clear stale session silently
          clearAuthStorage();
        }
      }
    } catch (err) {
      console.error('Auth restore failed', err);
      clearAuthStorage();
    } finally {
      setIsLoading(false);
    }
  }, []);


  // ✅ LOGIN
  const login = (userData: User, token: string) => {
    localStorage.setItem('resume_user', JSON.stringify(userData));
    localStorage.setItem('resume_token', token);

    setUser(userData);
    
  };

  const isAuthenticated = !!user;

  // ✅ LOGOUT
  const logout = () => {
    googleLogout();
    setUser(null);
    clearAuthStorage();
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
