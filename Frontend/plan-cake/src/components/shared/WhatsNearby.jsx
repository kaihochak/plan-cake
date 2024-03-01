import React from 'react';
import List from './List';
// You will need to import your data for what's nearby or fetch it from an API
import nearbyEventsData from '@/data/nearbyEventsData';
import { BsArrowRight } from 'react-icons/bs';

const WhatsNearby = () => {

  return (
    <section className='w-full mb-14'>
      {/* Title */}
      <div>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
        <h2 className='text-m-2xl'>What's Nearby</h2>
          <div className='flex items-center'>
            <p className='mr-2'>VIEW MORE</p>
            <BsArrowRight />
          </div>
        </div>
      </div>
      {/* Pass the necessary props to List */}
      <List 
        items={nearbyEventsData} 
        isFilterVisible={true} 
        isParticipantsVisible={false} 
        mobileLayout="grid"
        max='8'
        hasButton={false}        
      />
    </section>
  );
};

export default WhatsNearby;
