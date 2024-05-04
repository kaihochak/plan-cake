import React from 'react';
import EventCollection from '@/components/shared/EventCollection';
import DummyEventData from '@/data/DummyEventData';
import { BsArrowRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const WhatsNearby = ({hasTitle, isFilterVisible, hasViewMore, hasButton, max, maxMobile}) => {

  return (
    <section className='w-full mb-14'>
      {/* Title */}
      {hasTitle &&
        <div>
          <div className='flex items-baseline justify-between pb-2 mb-2 border-b-2'>
            <h2 className='h2'>What's Nearby</h2>
            <NavLink
              to={`/explore/nearby`}
              className='flex items-center'
            >
              <p className='mr-2 bold'>VIEW MORE</p>
              <BsArrowRight />
            </NavLink>
          </div>
        </div>
      }

      {/* Pass the necessary props to EventCollection */}
      <EventCollection
        events={DummyEventData}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={false}
        mobileLayout={"grid"}
        desktopLayout={"square"}
        max={max}
        maxMobile={maxMobile}
        hasButton={false}
      />
    </section>
  );
};

export default WhatsNearby;
