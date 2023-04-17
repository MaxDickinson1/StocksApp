import React from 'react';
import { Link } from 'react-router-dom';
import './Cryptocurrency.css';

const Navbar = ({ loggedIn, username }) => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stocks">Stocks</Link>
        </li>
        <li>
          <Link to="/cryptocurrency">Cryptocurrency</Link>
        </li>
        <li>
          {loggedIn ? (
            <p>Welcome, {username}!</p>
          ) : (
            <Link to="/auth">Login/Register</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


