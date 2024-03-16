import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection'
import DummyEventData from '@/data/DummyEventData';
import DummyFilmData from '@/data/DummyFilmData';
import DummyUserData from '@/data/DummyUserData';
import { NavLink } from 'react-router-dom/dist';
import { BsArrowRight } from 'react-icons/bs';
import FilmCollection from '@/components/shared/FilmCollection';
import MemberCollection from '@/components/shared/MemberCollection';
import { Element } from 'react-scroll';

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("Events");
  const [events, setEvents] = useState(DummyEventData);
  const [films, setFilms] = useState(DummyFilmData);
  const categories = ["Events", "Films", "Members"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  const scrollToSection = (sectionName) => {
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="explore-container w-full mx-auto gap-y-4 mb-12 pt-0">

      {/* this part is sticky with max width */}
      <section className='explore-search_container'>
        {/* Search */}
        <SearchBar
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          scrollToSection={scrollToSection}
        />
      </section>

      {/* this part is the content with scroll bar */}
      <section className='explore-inner_container'>
        {/* this part has max width */}
        <div className='explore-innermost'>
          {/* Events */}
          <Element id="events" className='w-full'>
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
              max='8'
              maxMobile='4'
              hasButton={false}
            />
          </Element>

          {/* Films */}
          <Element id="films">
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
              max='8'
              maxMobile='4'
            />
          </Element>

          {/* members */}
          <Element id="members" className='w-full' >
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
              max='8'
              maxMobile='4'
            />
          </Element>
        </div>
      </section>
    </div>
  )
}

export default Explore


