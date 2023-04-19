import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useHistory } from 'react-router-dom';
import './Cryptocurrency.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isLogin ? '/login' : '/register';
    const apiUrl = `https://stark-chamber-73716.herokuapp.com/users${route}`;

    try {
      const response = await axiosInstance.post(apiUrl, { username, password });

      if (isLogin) {
        const token = response.data.token;
        const userId = response.data.userId;

        // Save token and user ID to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        history.push('/');
      } else {
        alert('User registered');
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      if (isLogin) {
        alert('Invalid username or password');
      } else {
        alert('Error registering user');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">{isLogin ? 'Login' : 'Register'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'No account? Register.' : 'Already have an account? Login.'}
      </p>
    </div>
  );
};

export default Auth;


