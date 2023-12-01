import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu-container">
      {/* List of menu items */}
      <ul className="menu-list">
        <li><Link to="/">Home</Link></li>
        {/* Add more menu items here */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* etc. */}
      </ul>
    </div>
  );
};

export default Menu;
