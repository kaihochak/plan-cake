import React, { useEffect, useState } from 'react'
import { fallbackMoviePoster, image500, imagePath } from '@/lib/tmdb/config'
import { useMediaQuery } from '@react-hook/media-query'


const ConfirmedFilm = ({confirmedFilm, guestList}) => {
  
    const getVotes = (confirmedFilm) => {
        if (confirmedFilm) {
            let count = guestList.filter(guest => 
                guest.filmsVoted?.some(vote => vote.id.toString() === confirmedFilm.id?.toString())).length
            return count;
        } return [];
    }
    const bp_768 = useMediaQuery('(min-width:768px)');

    let bannerSrc = image500(confirmedFilm?.poster_path);
    if (bp_768) bannerSrc = imagePath(confirmedFilm?.backdrop_path);
    
    return (
        <div>
          <div className='inset-0 w-full mb-4 md:mb-0'>
            {/* image & title*/}
            <div className='film-img-container'>
              {bannerSrc && <img src={bannerSrc} alt={confirmedFilm?.title} className='film-img' />}
              {/* fade mask */}
              <div className='film-img-mask'></div> 
            </div>
            <div className='flex justify-start w-[140px]'>
              <div>
                <img src={confirmedFilm?.poster_path ? image500(confirmedFilm?.poster_path) : fallbackMoviePoster} alt={confirmedFilm?.title} className='' />
              </div>
              <div>
                
              </div>

            </div>
    
            {/* Info */}
            <div className='relative flex -mb-24 gap-x-8 -top-20 sm:-top-36 sm:-mb-36 md:-top-72 md:-mb-60'>
              {/* image */}
           
              <div className="flex mx-auto">
                <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
                  {/* title */}
                  <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">{confirmedFilm?.title === confirmedFilm?.original_title ? confirmedFilm.title : confirmedFilm.original_title + " (" + confirmedFilm.title + ")"}</h1>
    
                </div>
              </div>
            </div>
          </div>

            <div className='p-4'>
                {/* Confirmed Film */}
                {/* {confirmedFilm && (
                    <div className='flex-col md:hidden flex-center'>
                        <h2 className="self-end m3">Confirmed Film ({getVotes(confirmedFilm)})</h2>
                        <img
                            src={image500(confirmedFilm?.poster_path)}
                            alt={confirmedFilm?.title}
                            className="object-cover object-center rounded-sm"
                        />
                    </div>
                )}  */}
            </div>
        </div>
    )
}



export default ConfirmedFilm
