import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axiosInstance.get('https://stark-chamber-73716.herokuapp.com/api/users/check-logged-in', { withCredentials: true });
        setCurrentUser(response.data.currentUser);
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
