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
    <div className='flex flex-col items-center flex-1 py-10 overflow-scroll gap-x-10 gap-y-6 custom-scrollbar lg:items-start'>
      <div className='h-screen pt-6 overflow-hidden lg:ml-20 lg:grid lg:grid-cols-5'>

        {/* text */}
        <div className='flex-col px-5 text-center flex-between lg:text-start lg:items-start lg:justify-center lg:col-span-2 '>
          <h2 className="my-4 h2 text-accent ">Pick a film!</h2>
          <p className='mb-6 subtitle z-50 lg:mr-36'>Let's pick a film with your friends and start watching the film that everyone likes!</p>
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
          <div className='flex-center mx-auto py-3 lg:py-4 h-[200px] lg:h-[400px] lg:max-w-[700px] xl:max-w-[850px]'>
            <Loader height="h-[40px]" weight="h-[40px]" />
          </div> :

          <div className='relative flex-center lg:col-span-3 '>
            <div className='w-[350px] sm:w-[380px] md:w-[350px] mx-auto lg:w-[724px] xl:w-[1200]'>
              {/* film 1 */}
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[0].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[-8%] translate-y-[25%] z-40 lg:z-20
                lg:w-[190px] lg:rotate-[-10deg] lg:translate-x-[50%] lg:translate-y-[-50%] xl:w-[220px] xl:translate-x-[-80%]'
              />
              {/* film 2 */}

              <img
                src={trending && trending[0]?.poster_path ? image500(trending[1].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-10deg] top-1/2 translate-x-[80%] translate-y-[3%] z-50 lg:z-30 lg:w-[180px] lg:translate-x-[100%] lg:rotate-[10deg] lg:translate-y-[-50%] xl:w-[220px] xl:translate-x-[0%]'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[2].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[150%] translate-y-[25%] z-40 lg:z-40 lg:w-[190px] lg:translate-x-[140%] lg:rotate-[-5deg] lg:translate-y-[-50%] xl:w-[220px] xl:translate-x-[70%]'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[3].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[30%] translate-y-[80%] z-40 lg:z-50 lg:w-[180px] lg:translate-x-[210%] lg:rotate-[10deg] lg:translate-y-[-50%] xl:w-[220px] xl:translate-x-[150%]'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[4].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[90%] translate-y-[80%] z-30 lg:z-50 lg:w-[190px] lg:translate-x-[260%] lg:rotate-[-15deg] lg:translate-y-[-50%] xl:w-[220px] xl:translate-x-[230%]'
              />
            </div>
          </div>
        }

      </div>

      <PickAFilmForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  )
}

export default PickAFilm