import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Logo from '@/assets/icons/logo.png';
import menuIcon from '@/assets/icons/menu.png';
import Menu from '@/components/shared/menu';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>

            <nav className="flex justify-between items-center">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-20 " />
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
        </div>
    )
}

export default Navbar
