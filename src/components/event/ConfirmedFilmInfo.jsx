import React from 'react'
import { image500 } from '@/lib/tmdb/config'

    const ConfirmedFilmInfo = ({confirmedFilm, formData}) => {
        return (
          <div className='inset-0 w-full mb-4 md:mb-0 '>
            {/* image & title*/}
            <div className='film-img-container'>
              {bannerSrc && <img src={bannerSrc} alt={confirmedFilm?.titile} className='film-img' />}
              {/* fade mask */}
              <div className='film-img-mask'></div>
            </div>
    
            {/* Info */}
            <div className='relative flex -mb-24 gap-x-8 -top-20 sm:-top-36 sm:-mb-36 md:-top-72 md:-mb-60'>
              {/* image */}
              {bp_768 &&
                <div className='flex justify-start'>
                  <img src={confirmedFilm?.poster_path ? image500(confirmedFilm.poster_path) : fallbackMoviePoster} alt={confirmedFilm?.title} className='min-w-[200px] md:min-w-[250px]' />
                </div>
              }
              <div className="flex mx-auto">
                <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
                  {/* title */}
                  <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">{confirmedFilm?.title === confirmedFilm.original_title ? confirmedFilm.title : confirmedFilm.original_title + " (" + confirmedFilm.title + ")"}</h1>
                  <p className='text-m-m md:text-[15px]'>{confirmedFilm?.overview}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      let bannerSrc = image500(confirmedFilm?.poster_path);
      if (bp_768) bannerSrc = imagePath(confirmedFilm?.backdrop_path);
    
      export default ConfirmedFilmInfo