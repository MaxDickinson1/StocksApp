import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      axios.get(`https://stark-chamber-73716.herokuapp.com/user/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user:', error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://stark-chamber-73716.herokuapp.com/auth/login', {
        email,
        password,
      });

      const { token, userId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const userResponse = await axios.get(`https://stark-chamber-73716.herokuapp.com/user/${userId}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    axios.defaults.headers.common.Authorization = null;
  };

  return children({ user, loading, login, logout });
};

export default Auth;


