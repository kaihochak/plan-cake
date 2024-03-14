import React, { useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection'
import { DummyEventData } from '@/data/DummyEventData';
import { NavLink } from 'react-router-dom/dist';
import { BsArrowRight } from 'react-icons/bs';

const Explore = () => {
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState(DummyEventData);

  return (
    <div className="common-container">
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-10 pt-6 pb-24 lg:pt-0'>
        <SearchBar />

        <section>
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>Events</h2>
              <NavLink 
                to={`/explore/events`} 
                className='flex items-center'
              >
                <div className='flex items-center'>
                    <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
                    <BsArrowRight />
                </div>
              </NavLink>
          </div>
          <EventCollection
            items={events}
            isFilterVisible={false}
            isParticipantsVisible={false}
            mobileLayout="vertical"
            desktopLayout="tall"
            max='4'
            hasButton={false}
          />
        </section>

      </div>
    </div>
  )
}

export default Explore


