import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import TransTopBar from '@/components/shared/TransTopbar';

const RootLayout = () => {
  const location = useLocation();

  // only return true if the current route is in the transparentRoutes array
  const isTransparentRoute = () => {
    return ['/film', '/event'].some(route => {
      if (location.pathname === route) { return true; } // if the current route is exactly the same as the route in the array
      else if (location.pathname.startsWith(route + '/')) { return true; } // if the current route starts with the route in the array
      else return false; // if the current route is not the same as the route in the array
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
