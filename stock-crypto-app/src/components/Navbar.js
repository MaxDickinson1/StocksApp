import React from 'react';
import { Link } from 'react-router-dom';
import './Cryptocurrency.css';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo-container">
        
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/cryptocurrency">Cryptocurrency</Link>
        </li>
        <li>
          <Link to="/auth">{currentUser ? currentUser.username : 'Login/Register'}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

