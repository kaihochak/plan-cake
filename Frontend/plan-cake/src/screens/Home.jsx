// Home.jsx
import React from 'react';
import MyEvents from '../components/MyEvents';
import WhatsNearby from '../components/WhatsNearby';

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
