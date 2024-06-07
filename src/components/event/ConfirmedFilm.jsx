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
            {/* image & title*/}
            <div className='confirmedfilm-img-container z-10'>
              {bannerSrc && <img src={bannerSrc} alt={confirmedFilm?.title} className='film-img' />}
              {/* fade mask */}
              <div className='film-img-mask'></div> 
            </div>
            <div className='z-50'>
              <img src={confirmedFilm?.poster_path ? image500(confirmedFilm?.poster_path) : fallbackMoviePoster} alt={confirmedFilm?.title} className='' />

            </div>
          {/* <div className='inset-0 w-full mb-4 md:mb-0'>
            <div className='flex flex-rol'>
              <div className=''>
                <img src={confirmedFilm?.poster_path ? image500(confirmedFilm?.poster_path) : fallbackMoviePoster} alt={confirmedFilm?.title} className='' />
              </div>
              <div>
                <span>Selected Film</span>
                <p>{confirmedFilm?.title === confirmedFilm?.original_title ? confirmedFilm.title : confirmedFilm.original_title + " (" + confirmedFilm.title + ")"}</p>
              </div>

            </div>
    
          </div> */}



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
