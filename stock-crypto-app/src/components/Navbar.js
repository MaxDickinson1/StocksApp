import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
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
          <Link to="/auth">Login/Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

