import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Carousel from '@/components/utility/Carousel';
import DummyFilmData from '@/data/DummyFilmData';
import { BsArrowRight } from 'react-icons/bs';
import { fetchTrending } from '@/lib/tmdb/api';
import Loader from '@/components/utility/Loader';

const MostWatchlisted = ({ isFilterVisible, hasButton, max }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mostWatchlistedData, setMostWatchlistedData] = useState(DummyFilmData);

  // call api, fetch data
  useEffect(() => {
    getMostWatchlisted();
  }, []);

  // fetch data for most watchlisted films
  const getMostWatchlisted = async () => {
    const data = await fetchTrending(); // will be using tmdb trending api for now until more users are there
    if (data && data.results) setMostWatchlistedData(data.results);
    setLoading(false);
  }

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
      {loading ?
        <div className='flex-center mx-auto py-3 md:py-4 h-[200px] md:h-[400px] lg:max-w-[700px] xl:max-w-[850px]'>
          <Loader height="h-[40px]" weight="h-[40px]"/>
        </div> :
        <div className='mx-auto py-3 md:py-4  lg:max-w-[700px] xl:max-w-[850px]'>
          <Carousel items={mostWatchlistedData} />
        </div>
      }

    </section>
  );
};

export default MostWatchlisted;
