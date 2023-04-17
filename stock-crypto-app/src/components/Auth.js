import React, { useState } from 'react';
import axios from 'axios';
import './Cryptocurrency.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isLogin ? '/login' : '/register';
    const apiUrl = 'https://stark-chamber-73716.herokuapp.com/users' + route;

    try {
      const response = await axios.post(apiUrl, { username, password });
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      {isLoggedIn ? (
        <div className="auth-indication">
          You are logged in as <span>{username}</span>
        </div>
      ) : null}
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

