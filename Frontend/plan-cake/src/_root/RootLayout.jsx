import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Navbar from '@/components/Navbar';

const RootLayout = () => {

  return (
    <div className="">
      <Navbar/>
    {/* Routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-event" element={<CreateEvent />} />
    </Routes>
  </div>
  )
}

export default RootLayout
