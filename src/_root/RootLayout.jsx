import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import { useUserContext } from '@/context/AuthContext';
import TransTopBar from '../components/shared/TransTopbar';

const RootLayout = () => {
  const location = useLocation();

  // Function to determine if the current route requires a transparent top bar
  const isTransparentRoute = () => {
    const transparentRoutes = ['/film', '/explore']; // Add exact and prefix routes here

    // Check if the current pathname is an exact match or starts with any of the transparentRoutes
    return transparentRoutes.some(route => {
      if (location.pathname === route) { // Check for exact match
        return true;
      }
      if (location.pathname.startsWith(route + '/')) { // Check for prefix match
        return true;
      }
      return false;
    });
  };

  return (
    <div className="w-full xl:flex">
      {isTransparentRoute() ? <TransTopBar /> : <TopBar />}
      <LeftSidebar />

      <section id="rootLayout" className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
