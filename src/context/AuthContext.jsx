import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import * as api from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.setAuthToken(storedToken);
      api.getMe().then(setUser).catch(logout).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.login({ email, password });
    setUser(res.user); setToken(res.token);
    localStorage.setItem('token', res.token); api.setAuthToken(res.token);
  }, []);

  const register = useCallback(async (email, password) => {
    await api.register({ email, password });
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null); setToken(null);
    localStorage.removeItem('token'); api.setAuthToken(null);
  }, []);

  const contextValue = useMemo(() => ({
    user, token, loading, login, register, logout
  }), [user, token, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
