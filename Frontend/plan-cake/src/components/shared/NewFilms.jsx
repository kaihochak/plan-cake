import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import List from './List';
import dumMyEventData from '@/data/MyEventsData';
import { BsArrowRight } from 'react-icons/bs';

const NewFilms = ({ isFilterVisible, hasButton, max}) => {
  const [NewFilmsData, setNewFilmsData] = useState(dumMyEventData);
  const navigate = useNavigate(); 

  return (
    <section className='w-full'>
      {/* Title */}
      <div>
        <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl'>New Films</h2>
            <div className='flex items-center'>
            <NavLink to='/explore/new'>
              <p className='mr-2'>VIEW MORE</p>
            </NavLink>
              <BsArrowRight />
            </div>
        </div>
      </div>

      <List 
        items={NewFilmsData}
        isFilterVisible={isFilterVisible}
        isParticipantsVisible={true}
        mobileLayout="vertical"
        max={max}
        hasButton={hasButton}
      />
    </section>
  );
};

export default NewFilms;
