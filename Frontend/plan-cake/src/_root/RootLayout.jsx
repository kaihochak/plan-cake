import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import TopBar from '@/components/shared/TopBar';
// import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';

const RootLayout = () => {
  return (
    <div className="lg:mx-auto lg:w-[1024px]">
      <TopBar />
      {/* <LeftSidebar /> */}
      {/* Routes */}
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout
