// Home.jsx
import React from 'react';
import SearchBar from '@/components/utility/SearchBar';
import MostWatchlisted from '@/components/shared/MostWatchlisted';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';

const Home = () => {
  return (
    <section className='home-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-24 lg:pt-0'>

        {/* Most Watchlisted Section */}
        <MostWatchlisted/>

        {/* My Events Section */}
        <MyEvents
          hasTitle={true}
          isFilterVisible={false}
          hasViewMore={true}
          hasButton={true}
          max="3"
        />
        {/* What's Nearby Section */}
        <WhatsNearby
          hasTitle={true}
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
