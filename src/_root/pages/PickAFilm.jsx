import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import PickAFilmForm from "@/components/event/PickAFilmForm";
import { fallbackMoviePoster, image500 } from '@/lib/tmdb/config'
import { fetchTrending } from '@/lib/tmdb/api';
import Loader from '@/components/utility/Loader';
import { motion } from "framer-motion";


// framer motion variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: { opacity: 1, scale: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.04
    }
  }
};

const item = {
  hidden: { y: 0, opacity: 0, scale: 1.05 },
  visible: { y: 10, opacity: 1, scale: 1 }
};


/********************************************************
 * PickAFilm
 ********************************************************/

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
    <div className='flex flex-col items-center flex-1 py-10 mx-auto max-w-screen-2xl gap-x-10 gap-y-6 custom-scrollbar xl:items-start'>
      <div className='flex-col justify-start h-screen pt-10 xl:pt-0 gap-y-2 xl:ml-20 xl:grid xl:grid-cols-5'>

        {/* text */}
        <div className='flex-col h-[35%] xl:h-full px-10 text-center xl:px-0 flex-center xl:text-start xl:items-start xl:justify-center lg:col-span-2'>
          <h2 className="my-4 h2 text-accent">Pick a film!</h2>
          <p className='z-50 mx-10 mb-6 xl:mr-14 lg:ml-0 subtitle'>Let's pick a film with your friends and start watching the film that everyone likes!</p>
          <Button
            variant="accent"
            type="button"
            className="w-40 md:w-52"
            onClick={() => setIsFormOpen(true)}
          >
            Create Event
          </Button>
        </div>

        {/* poster collage */}
        {loading ?
          <div className='flex-center mx-auto py-3 xl:py-4 h-[180px] xl:h-[400px] xl:max-w-[850px]'>
            <Loader height="h-[40px]" weight="h-[40px]" />
          </div> :
          <div className='relative flex-col px-10 flex-center xl:col-span-3 xl:h-full'>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className='mx-auto w-[350px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1200px]'
            >
              {/* film 1 - bottom left (mobile) */}
              <motion.div variants={item} >
                <img
                  src={trending && trending[0]?.poster_path ? image500(trending[0].poster_path) : fallbackMoviePoster}
                  alt={trending && trending[0]?.title}
                  className='poster-collage z-10 translate-x-[10%] translate-y-[83%] rotate-[-5deg]
                              lg:translate-y-[20%] lg:translate-x-[0%] lg:rotate-[-10deg] xl:translate-y-[-50%] xl:translate-x-[-20%]'
                />
              </motion.div>
              {/* film 2 - top right (mobile) */}
              <motion.div variants={item} >
                <img
                  variants={item}
                  src={trending && trending[1]?.poster_path ? image500(trending[1].poster_path) : fallbackMoviePoster}
                  alt={trending && trending[1]?.title}
                  className='poster-collage z-20 translate-x-[130%] translate-y-[25%] rotate-[15deg] 
                              lg:translate-y-[20%] lg:translate-x-[70%] lg:rotate-[10deg] xl:translate-y-[-50%] xl:translate-x-[40%]'
                />
              </motion.div>
              {/* film 3 - top left (mobile) */}
              <motion.div variants={item} >
                <img
                  variants={item}
                  src={trending && trending[2]?.poster_path ? image500(trending[2].poster_path) : fallbackMoviePoster}
                  alt={trending && trending[2]?.title}
                  className='poster-collage z-30 translate-x-[-8%] translate-y-[24%] rotate-[-15deg]
                              lg:translate-y-[20%] lg:translate-x-[140%] lg:rotate-[-5deg] xl:translate-y-[-50%] xl:translate-x-[100%]'
                />
              </motion.div>
              {/* film 4 - bottom right (mobile) */}
              <motion.div variants={item} >
                <img
                  variants={item}
                  src={trending && trending[3]?.poster_path ? image500(trending[3].poster_path) : fallbackMoviePoster}
                  alt={trending && trending[3]?.title}
                  className='poster-collage z-40 translate-x-[110%] translate-y-[85%] rotate-[7deg]
                              lg:translate-y-[20%] lg:translate-x-[210%] lg:rotate-[10deg] xl:translate-y-[-50%] xl:translate-x-[160%]'
                />
              </motion.div>
              {/* film 5 - center */}
              <motion.div variants={item} >
                <img
                  variants={item}
                  src={trending && trending[4]?.poster_path ? image500(trending[4].poster_path) : fallbackMoviePoster}
                  alt={trending && trending[4]?.title}
                  className='poster-collage z-50 translate-x-[60%] translate-y-[15%] rotate-[-3deg]
                              lg:translate-y-[20%] lg:translate-x-[280%] lg:rotate-[-12deg] xl:translate-y-[-50%] xl:translate-x-[220%]'
                />
              </motion.div>
            </motion.div>
          </div>
        }
      </div>

      <PickAFilmForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  )
}

export default PickAFilm