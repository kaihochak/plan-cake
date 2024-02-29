import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Logo from '@/assets/icons/logo.png';
import Button from '@/components/ui/Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section>
            <nav className="flex justify-between items-center">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-20 " />
                </Link>

                {/* Logout */}
                <div>
                    <Button>

                    </Button>
                </div>
            </nav>
        </section>
    )
}

export default Navbar
