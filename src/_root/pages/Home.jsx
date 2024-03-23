// Home.jsx
import React from 'react';
import MostWatchlisted from '@/components/shared/MostWatchlisted';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';


const Home = () => {

  return (
    <div className='flex flex-1'>
      <section className='home-container'>
        <div className='home-posts'>
          {/* Most Watchlisted Section */}
          <MostWatchlisted />

          {/* My Events Section */}
          <MyEvents
            hasTitle={true}
            isFilterVisible={false}
            hasViewMore={true}
            hasButton={true}
            max="3"
            maxMobile="3"
          />
          {/* What's Nearby Section */}
          <WhatsNearby
            hasTitle={true}
            isFilterVisible={false}
            hasViewMore={false}
            hasButton={false}
            max="4"
            maxMobile="4"
          />
          {/* Gap */}
          <div className="h-8 md:h-0"></div>
        </div>
      </section>

    </div>
  );
};

export default Home;
