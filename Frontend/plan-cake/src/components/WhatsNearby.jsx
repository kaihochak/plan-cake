import React from 'react';
import List from './List';
// You will need to import your data for what's nearby or fetch it from an API
import nearbyEventsData from '../data/nearbyEventsData';

const WhatsNearby = () => {
  // Assuming nearbyEventsData is an array of event objects
  return (
    <section>
      <header>
        <h2>What's Nearby</h2>
        {/* Insert filter component here if you have one */}
      </header>
      {/* Pass the necessary props to List */}
      <List 
        items={nearbyEventsData} 
        isFilterVisible={true} 
        isParticipantsVisible={false} 
        layout="grid" 
      />
    </section>
  );
};

export default WhatsNearby;
