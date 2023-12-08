import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Menu from './components/Menu';
import Logo from './images/logo.png'; 
import menuIcon from './images/menu.png'; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="bg-primary px-6 py-8 font-Urbanist text-default">
        {/* Navigation */}
        <nav className="flex justify-between items-center pb-10">
          {/* Logo as Home Button */}
          <Link to="/" className="home-logo">
            <img src={Logo} alt="Home" className="w-20 "/>
          </Link>

          {/* Menu Button */}
          <button onClick={toggleMenu} >
            <img src={menuIcon} alt="Menu" className="w-16 md:w-16" />
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
