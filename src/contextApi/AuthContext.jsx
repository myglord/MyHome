import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_KEY = 'myhome_auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const { user: u, isAdmin: admin } = JSON.parse(stored);
        setUser(u);
        setIsAdmin(!!admin);
      }
    } catch (_) {}
  }, []);

  const login = (userData, admin = false) => {
    setUser(userData);
    setIsAdmin(!!admin);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user: userData, isAdmin: !!admin }));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
