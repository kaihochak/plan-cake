import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import { useUserContext } from '@/context/AuthContext';
import TransTopBar from '../components/shared/TransTopbar';
import SearchBar from '../components/utility/SearchBar';

const RootLayout = () => {
  const location = useLocation();
  
  
  // const navigate = useNavigate()

  // const [searchTerm, setSearchTerm] = useState(''); // State for search term
  
  // // Function to handle search term change
  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  
  // // Function to handle search submission
  // const handleSearchSubmit = () => {
  //   // Redirect to explore page with search term as URL parameter
  //   navigate(`/explore?search=${searchTerm}`);
  // };
  
  // const isExploreRoute = () => { return location.pathname === '/explore';};

  // only return true if the current route is in the transparentRoutes array
  const isTransparentRoute = () => {
    return ['/film'].some(route => {
      if (location.pathname === route) { return true; } // if the current route is exactly the same as the route in the array
      else if (location.pathname.startsWith(route + '/')) { return true; } // if the current route starts with the route in the array
      else return false; // if the current route is not the same as the route in the array
    });
  };


  const { topbarSticky } = useUserContext(); // some pages would not need a sticky topbar

  return (
    <div className="w-full xl:flex">
      {isTransparentRoute() ? <TransTopBar /> : <TopBar />}

      {/* {!isExploreRoute() && (isTransparentRoute() ? <TransTopBar /> : <TopBar />)} */}
      {/* {isExploreRoute() &&
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />} */}

      <LeftSidebar />
      <section id="rootLayout" className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
