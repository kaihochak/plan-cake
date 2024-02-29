// Home.jsx
import React from 'react';
import MyEvents from '@/components/shared/MyEvents';
import WhatsNearby from '@/components/shared/WhatsNearby';

const Home = () => {
  return (
    <div id="home">
      {/* My Events Section */}
      <MyEvents />
      {/* What's Nearby Section */}
      <WhatsNearby />
    </div>
  );
};

export default Home;
