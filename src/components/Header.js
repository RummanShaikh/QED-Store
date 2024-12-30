import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = ({ cartCount }) => (
  <header>
    <h1>QED42</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cartCount})</Link>
    </nav>
  </header>
);

export default Header;
