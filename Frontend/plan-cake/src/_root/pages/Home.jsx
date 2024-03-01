// Home.jsx
import React from 'react';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';

const Home = () => {
  return (
    <section className='home-container'>
      <div className='flex flex-col max-w-[1024px] mx-auto gap-y-10 pt-6 pb-12'>
        {/* My Events Section */}
        <MyEvents />
        {/* What's Nearby Section */}
        <WhatsNearby />
      </div>
    </section>
  );
};

export default Home;
