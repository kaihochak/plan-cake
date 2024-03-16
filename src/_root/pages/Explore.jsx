import React, { useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection'
import DummyEventData from '@/data/DummyEventData';
import DummyFilmData from '@/data/DummyFilmData';
import DummyUserData from '@/data/DummyUserData';
import { NavLink } from 'react-router-dom/dist';
import { BsArrowRight } from 'react-icons/bs';
import FilmCollection from '../../components/shared/FilmCollection';
import MemberCollection from '../../components/shared/MemberCollection';

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState(DummyEventData);
  const [films, setFilms] = useState(DummyFilmData);
  const categories = ["All", "Events", "Films", "Members"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
    } else if (category === "Events") {
    } else if (category === "Films") {
    }
  }

  return (
    <div className="explore-container w-full max-w-[1024px] mx-auto gap-y-4 pb-24 mb-12 pt-0">

      <section className='w-full sticky top-0 z-50 bg-primary'>
        {/* Search */}
        <SearchBar
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </section>


      <section className='w-full overflow-scroll custom-scrollbar'>
        {/* Events */}
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
          events={events}
          isFilterVisible={false}
          isParticipantsVisible={true}
          mobileLayout="vertical"
          desktopLayout="tall"
          max='4'
          maxMobile='3'
          hasButton={false}
        />

      {/* Films */}

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

      {/* members */}
        <div className='flex justify-between  items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl sm:text-m-3xl'>Members</h2>
          <NavLink
            to={`/explore/members`}
            className='flex items-center'
          >
            <div className='flex items-center'>
              <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
              <BsArrowRight />
            </div>
          </NavLink>
        </div>
        <MemberCollection
          members={DummyUserData}
          isFilterVisible={false}
          max='4'
        />
      </section>
    </div>
  )
}

export default Explore


