import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'user';

interface AuthContextType {
  user: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      const { email, role } = JSON.parse(session);
      setUser(email);
      setRole(role);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    isAuthenticated: !!user,
    isAdmin: role === 'admin',
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 