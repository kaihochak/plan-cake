import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingLayout = () => {

    return (
        <section id="landingLayout" className="flex flex-col w-full h-full">
            <LandingHeader />
            <Outlet />
        </section>
    );
};

export default LandingLayout;
