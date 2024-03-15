import React, { useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection'
import DummyEventData from '@/data/DummyEventData';
import DummyFilmData from '@/data/DummyFilmData';
import { NavLink } from 'react-router-dom/dist';
import { BsArrowRight } from 'react-icons/bs';
import FilmCollection from '../../components/shared/FilmCollection';

const Explore = () => {
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState(DummyEventData);
  const [films, setFilms] = useState(DummyFilmData);

  return (
    <div className="common-container mb-12">
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-5 pb-24 lg:pt-0'>
        <SearchBar />

        {/* Events */}
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
            maxMobile='3'
            hasButton={false}
          />
        </section>

        {/* Films */}
        <section>
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>Films</h2>
            <NavLink
              to={`/explore/films`}
              className='flex items-center'
            >
              <div className='flex items-center'>
                <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
                <BsArrowRight />
              </div>
            </NavLink>
          </div>
          <FilmCollection
            items={films}
            isFilterVisible={false}
            max='4'
          />
        </section>


      </div>
    </div>
  )
}

export default Explore


