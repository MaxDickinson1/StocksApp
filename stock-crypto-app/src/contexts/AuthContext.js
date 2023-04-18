import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get('https://stark-chamber-73716.herokuapp.com/users/check-logged-in', { withCredentials: true });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };
    checkLoggedInStatus();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
