import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Navbar from '@/components/shared/NavBar';
import Bottombar from '../components/shared/Bottombar';

const RootLayout = () => {
  return (
    <div className="lg:mx-auto lg:w-[1024px]">
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
      <Bottombar />
    </div>
  )
}

export default RootLayout
