import React from 'react';
import EventCollection from '@/components/shared/EventCollection';
// You will need to import your data for what's nearby or fetch it from an API
import nearbyEventsData from '@/data/nearbyEventsData';
import { BsArrowRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const WhatsNearby = ({hasTitle, isFilterVisible, hasViewMore, hasButton, max}) => {

  return (
    <section className='w-full mb-14'>
      {/* Title */}
      {hasTitle &&
        <div>
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>What's Nearby</h2>
            <NavLink
              to={`/explore/nearby`}
              className='flex items-center'
            >
              <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
              <BsArrowRight />
            </NavLink>
          </div>
        </div>
      }

      {/* Pass the necessary props to EventCollection */}
      <EventCollection
        items={nearbyEventsData}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={false}
        mobileLayout={"grid"}
        desktopLayout={"square"}
        max='8'
        hasButton={false}
      />
    </section>
  );
};

export default WhatsNearby;
