import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from '@/components/landing/LandingHeader';

const LandingLayout = () => {

    return (
        <div className="flex flex-col w-full">
            <LandingHeader />
            <section id="landingLayout" className="flex flex-col w-full h-full">
                <Outlet />
            </section>
        </div>
    );
};

export default LandingLayout;
