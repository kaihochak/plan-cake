import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import { Outlet } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';

const RootLayout = () => {
  return (
    <div className="w-full lg:flex">
      <TopBar />
      <LeftSidebar />

      {/* Routes */}
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      
      <Bottombar />
    </div>
  )
}

export default RootLayout
