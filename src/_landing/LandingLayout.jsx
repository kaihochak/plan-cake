import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingLayout = () => {

    return (
        <div className="flex flex-col w-full overflow-y-scroll custom-scrollbar">
            <LandingHeader/>
            <section id="landingLayout" className="flex flex-col w-full">
                <Outlet />
            </section>
            <LandingFooter/>
        </div>
    );
};

export default LandingLayout;
