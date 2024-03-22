import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/utility/SearchBar'
import EventCollection from '@/components/shared/EventCollection'
import DummyEventData from '@/data/DummyEventData';
import DummyFilmData from '@/data/DummyFilmData';
import DummyUserData from '@/data/DummyUserData';
import FilmCollection from '@/components/shared/FilmCollection';
import MemberCollection from '@/components/shared/MemberCollection';
import { set } from 'date-fns';
import { CiFilter } from 'react-icons/ci';

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [events, setEvents] = useState(DummyEventData);
  const [films, setFilms] = useState(DummyFilmData);
  const [members, setMembers] = useState(DummyUserData);
  const categories = ["All", "Events", "Films", "Members"];
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Content
  const FilterContent = () => {
    return (
      <section className='explore-inner_container'>
        <div className='explore-innermost'>
          {selectedCategory === "All" && (<>
            <EventContent title={true} />
            <FilmContent title={true} />
            <MemberContent title={true} />
            <Gap />
          </>)}
          {selectedCategory === "Events" && (<><EventContent /><Gap/></>)}
          {selectedCategory === "Films" && (<><FilmContent /><Gap/></>)}
          {selectedCategory === "Members" && (<><MemberContent /><Gap/></>)}
        </div>
      </section>
    )
  };

  const EventContent = ({ title }) => {
    return (
      <div id="events" className='w-full'>
        {title &&
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>Events</h2>
          </div>}

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
      </div>
    )
  }

  const FilmContent = ({ title }) => {
    return (
      <div id="films">
        {title && <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl sm:text-m-3xl'>Films</h2>
        </div>}
        <FilmCollection
          items={films}
          isFilterVisible={false}
          max='8'
          maxMobile='4'
        />
      </div>
    )
  }

  const MemberContent = ({ title }) => {
    return (
      <div id="members" className='w-full' >
        {title &&
          <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
            <h2 className='text-m-2xl sm:text-m-3xl'>Members</h2>
          </div>}
        <MemberCollection
          members={DummyUserData}
          isFilterVisible={false}
          max='8'
          maxMobile='4'
        />
      </div>
    )
  }

  const Gap = () => {
    return (
      <div className="h-[150px] md:h-96"></div>
    )
  }

  return (
    <div className="explore-container">

      {/* this part is sticky with max width */}
      <section className='explore-search_container'>
        <div className="flex-between gap-x-4 ">
          {/* Search */}
          <SearchBar />
          {/* Filter */}
          {selectedCategory !== "All" && <button
            className={`flex items-center text-[30px] mr-2 mt-2 text-primary-foreground/60" 
              ${isFilterApplied ? "text-accent/70" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          ><CiFilter /></button>}
        </div>

        {/* Category */}
        <div className='flex py-4 cursor-pointer'>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                handleCategoryChange(category);
              }}
              className={`text-xl flex items-center justify-center px-4 bg-primary-dark
                          ${category === selectedCategory ? "text-primary-foreground underline" : "text-primary-foreground/50"}`}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <FilterContent />

    </div>
  )
}

export default Explore


