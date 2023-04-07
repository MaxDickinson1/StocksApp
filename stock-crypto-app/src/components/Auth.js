import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const route = isLogin ? '/login' : '/register';
      const apiUrl = 'http://localhost:5000/users' + route;
  
      try {
        const response = await axios.post(apiUrl, { username, password });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'No account? Register.' : 'Already have an account? Login.'}
        </p>
      </div>
    );
  };
  

export default Auth;
