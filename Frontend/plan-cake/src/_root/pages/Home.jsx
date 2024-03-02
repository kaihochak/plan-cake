// Home.jsx
import React from 'react';
import SearchBar from '@/components/utility/SearchBar';
import NewFilms from '@/components/shared/NewFilms';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <section className='home-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-12 lg:pt-0'>

        {/* New Films Section */}
        <NewFilms
          isFilterVisible={false}
          hasButton={false}
          max="4"
        />

        {/* My Events Section */}
        <MyEvents
          hasViewMore={true}
          hasButton={true}
          max="3"
        />
        {/* What's Nearby Section */}
        <WhatsNearby
          isFilterVisible={true}
          hasViewMore={false}
          hasButton={false}
          max="4"
        />
      </div>
    </section>
  );
};

export default Home;
