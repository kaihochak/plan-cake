import React from 'react';
import List from './List';
// You will need to import your data for what's nearby or fetch it from an API
import nearbyEventsData from '../data/nearbyEventsData';
import { BsArrowRight } from 'react-icons/bs';

const WhatsNearby = () => {
  // Assuming nearbyEventsData is an array of event objects
  return (
    <section className='mb-14'>
      <header>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <div>
            <h2 className='text-m-2xl max-w-0 inline-block'>What's Nearby</h2>
          </div>
          <div className='flex items-center'>
            <p className='mr-2'>VIEW MORE</p>
            <BsArrowRight />
          </div>
        </div>
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
