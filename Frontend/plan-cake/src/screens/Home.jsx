import React from 'react';
import MyEvents from '../components/myEvents';

const Home = () => {
  return (
    <div id="home" className='flex px-4 text-3xl font-bold underline'>
      {/* My Events */}
      <MyEvents />
      {/* What's Nearby */}
      {/* <WhatsNearby /> */}
    </div>
  );
};

export default Home;
