import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import { useUserContext } from '@/context/AuthContext';

const RootLayout = () => {

  const { topbarSticky } = useUserContext(); // some pages would not need a sticky topbar

  return (
    <div className="w-full xl:flex">
      <TopBar isSticky={topbarSticky}/>
      <LeftSidebar />

      {/* Routes */}
      <section id="rootLayout" className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      
      <Bottombar />
    </div>
  )
}

export default RootLayout
