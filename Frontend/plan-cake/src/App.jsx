import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateEvent from './screens/CreateEvent'; // Import CreateEvent component
import Menu from './components/Menu';
import Logo from '@/assets/icons/logo.png'; 
import menuIcon from '@/assets/icons/menu.png'; 
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="bg-primary px-6 py-8 font-Urbanist text-default">
      {/* Navigation */}
      <nav className="flex justify-between items-center">
        {/* Logo as Home Button */}
        {/* <Link to="/" className="home-logo">
          <img src={Logo} alt="Home" className="w-20 "/>
        </Link> */}

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

        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>

      </Routes>
    </main>
  );
}

export default App;
