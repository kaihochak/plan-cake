import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PickAFilmForm from "@/components/event/PickAFilmForm";
import { fetchFilmDetails } from '@/lib/tmdb/api'
import { fallbackMoviePoster, image500 } from '@/lib/tmdb/config'
import { fetchTrending } from '@/lib/tmdb/api';
import Loader from '@/components/utility/Loader';

const PickAFilm = () => {
  const [trending, setTrending] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // call api, fetch data
  useEffect(() => {
    setLoading(true)
    getTrending();
  }, []);

  // fetch data for most watchlisted films
  const getTrending = async () => {
    const data = await fetchTrending();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  }

  useEffect(() => {
    console.log("trending: ", trending);
  }, [trending])

  /*****************************************************************************
   * Rendering
   *****************************************************************************/
  return (
    <div className='common-container'>
      <div className='flex flex-col lg:flex-row max-w-[1024px] mx-auto pt-6 xl:pt-0 md:pb-32 h-screen overflow-hidden'>

        {/* text */}
        <div className='flex-col flex-between'>
          <h2 className="my-4 title text-accent">Pick a film!</h2>
          <p className='mb-6 h3'>Let's pick a film with your friends and start watching the film that everyone likes!</p>
          <Button
            variant="accent"
            type="button"
            className="mb-6 w-52"
            onClick={() => setIsFormOpen(true)}
          >
            Create Event
          </Button>
        </div>


        {/* poster collage */}
        {loading ?
          <div className='flex-center mx-auto py-3 md:py-4 h-[200px] md:h-[400px] lg:max-w-[700px] xl:max-w-[850px]'>
            <Loader height="h-[40px]" weight="h-[40px]" />
          </div> :

          <div className='relative'>
            {/* film 1 */}
            <div className='flex justify-start'>
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[0].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[-10%] translate-y-[20%] z-40
                lg:w-[200px] lg:rotate-[-10deg] lg:top-1/2 lg:translate-x-[-10%] lg:translate-y-[20%] lg:z-40'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[1].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-10deg] top-1/2 left-1/2 translate-x-[-50%] translate-y-[5%] z-50'
              />
             <img
                src={trending && trending[0]?.poster_path ? image500(trending[2].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[130%] translate-y-[20%] z-40'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[3].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[20%] translate-y-[80%] z-20'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[4].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[90%] translate-y-[80%] z-30'
              />
            </div>
            {/* film 2 */}
            {/* film 3 */}
            {/* film 4 */}
            {/* film 5 */}
          </div>
        }

      </div>

      <PickAFilmForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  )
}

export default PickAFilm