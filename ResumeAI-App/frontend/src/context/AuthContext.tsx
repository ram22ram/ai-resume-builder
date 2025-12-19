import React, { createContext, useState, useEffect, useContext } from 'react';
import { googleLogout } from '@react-oauth/google';

interface User {
  name: string;
  email: string;
  picture: string;
  _id: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // Important: Default loading true rakho taaki check hone tak purana UI na dikhe
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // App start hote hi check karo: Kya user pehle se saved hai?
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem('resume_user');
        const storedToken = localStorage.getItem('resume_token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth Load Error", error);
        localStorage.removeItem('resume_user');
        localStorage.removeItem('resume_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('resume_user', JSON.stringify(userData));
    localStorage.setItem('resume_token', token);
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('resume_user');
    localStorage.removeItem('resume_token');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};