import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Menu from './components/Menu';
import Logo from '../public/images/logo.png'; 
import menuIcon from '../public/images/menu.png'; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="bg-primary p-4">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-4">
          {/* Logo as Home Button */}
          <Link to="/" className="home-logo">
            <img src={Logo} alt="Home" />
          </Link>

          {/* Menu Button */}
          <button onClick={toggleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" />
          </button>
        </nav>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <div className="sidebar-menu">
            <Menu />
          </div>
        )}

        {/* Overlay for menu */}
        {isMenuOpen && (
          <div className="menu-overlay" onClick={toggleMenu} />
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Additional routes go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
