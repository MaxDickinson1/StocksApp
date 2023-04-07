import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/stocks">Stocks</Link>
      <Link to="/cryptocurrency">Cryptocurrency</Link>
      <Link to="/auth">Login/Register</Link>
    </nav>
  );
};

export default Navbar;
