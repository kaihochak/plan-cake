import React from 'react';

const Home = () => {
  return (
    <div id="home" className='flex px-4'>
      {/* My Events */}
      <MyEvents />
      {/* What's Nearby */}
      <WhatsNearby />
    </div>
  );
};

export default Home;
