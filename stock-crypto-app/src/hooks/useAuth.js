import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const tokenData = localStorage.getItem('token');

    if (userData && tokenData) {
      setUser(JSON.parse(userData));
      setToken(tokenData);
    }
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, token, login, logout };
};

export default useAuth;
