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
      <div className='flex flex-col  lg:flex-row w-full max-w-[1024px] mx-auto gap-y-2 pt-12 xl:pt-0 md:pb-32'>

        {/* text */}
        <div className='flex-col flex-between gap-y-4'>
          <h2 className="title text-accent">Pick a film!</h2>
          <p className='h3'>Let's pick a film with your friends and start watching the film that everyone likes!</p>
          <Button
            variant="accent"
            type="button"
            className="w-52"
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
                className='rounded-sm absolute w-[100px] rotate-[-10deg] top-1/2 left-1/2 translate-x-[-50%] translate-y-[10%] z-40'
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