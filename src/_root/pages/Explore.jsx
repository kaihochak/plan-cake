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
      setEvents(DummyEventData);
      setFilms(DummyFilmData);
    } else if (category === "Events") {
      setEvents(DummyEventData);
      setFilms([]);
    } else if (category === "Films") {
      setEvents([]);
      setFilms(DummyFilmData);
    }
  }

  return (
    <div className="common-container mb-12">
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-4 pb-24 lg:pt-0'>

        {/* Search */}
        <SearchBar isSticky={true} />

        {/* categorical filters */}
        <div className='flex pb-2'>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`text-xl flex items-center justify-center px-4 bg-primary 
                  ${category === selectedCategory ? "text-primary-foreground underline" : "text-primary-foreground/50"}
              `}>
              {category}
            </div>
          ))}
        </div>


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
            events={events}
            isFilterVisible={false}
            isParticipantsVisible={true}
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

        {/* members */}
        <section>
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
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
    </div>
  )
}

export default Explore


