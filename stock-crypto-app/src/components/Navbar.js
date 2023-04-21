import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentUser(null);
  };

  console.log('Current User:', currentUser);

  let username;
  if (currentUser) {
    const decodedToken = jwt_decode(currentUser.token);
    username = decodedToken.username;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CryptoTracker</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cryptocurrency">Coins</Link>
        {currentUser ? (
          <>
            <span className="navbar-username">{`Hello, ${username}`}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth">Login/Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




