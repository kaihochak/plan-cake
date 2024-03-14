import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Carousel from '@/components/utility/Carousel';
import { DummyEventData } from '@/data/DummyEventData';
import { BsArrowRight } from 'react-icons/bs';

const MostWatchlisted = ({ isFilterVisible, hasButton, max }) => {
  const [mostWatchlistedData, setMostWatchlistedData] = useState(DummyEventData) ;
  const navigate = useNavigate();
  return (
    <section className='w-full '>
      {/* Title */}
      <div>
      <div className='flex justify-between items-baseline border-b-2 pb-2 mb-2'>
          <h2 className='text-m-2xl sm:text-m-3xl'>Most Watchlisted</h2>
            <div className='flex items-center'>
              <NavLink to='/explore/most-watchlisted'>
                <p className='mr-2 sm:text-m-l'>VIEW MORE</p>
              </NavLink>
              <BsArrowRight />
            </div>
        </div>
      </div>
      {/* Carousell */}
      <div className='mx-auto py-6 md:py-4  lg:max-w-[700px] xl:max-w-[850px]'>
        <Carousel items={mostWatchlistedData} />
      </div>

    </section>
  );
};

export default MostWatchlisted;
