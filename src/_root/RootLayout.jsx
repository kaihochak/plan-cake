import React, { useState, useEffect } from 'react';
import { useLayoutEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import TopBar from '@/components/shared/Topbar';
import TransTopBar from '@/components/shared/TransTopbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';

const RootLayout = () => {
  const location = useLocation();

  // scroll to top of page after a page transition.
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);


  // only return true if the current route is in the transparentRoutes array
  const isTransparentRoute = () => {
    return ['/film', '/event', '/pickAfilm'].some(route => {
      if (location.pathname === route) { return true; } // if the current route is exactly the same as the route in the array
      else if (location.pathname.startsWith(route + '/')) { return true; } // if the current route starts with the route in the array
      else return false; // if the current route is not the same as the route in the array
    });
  };

  return (
    <div className="w-full xl:flex">
      {/* <LeftSidebar /> */}
      {isTransparentRoute() ? <TransTopBar /> : <TopBar />}
      <section id="rootLayout" className="flex flex-1 h-full">
        <Outlet />
      </section>
      {/* <Bottombar /> */}
    </div>
  );
};

export default RootLayout;
