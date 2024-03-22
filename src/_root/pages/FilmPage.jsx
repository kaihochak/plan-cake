import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import DummyFilmData from '@/data/DummyFilmData'
import DummyEventData from '@/data/DummyEventData'
import DummyCastData from '@/data/DummyCastData'
import { useUserContext } from '@/context/AuthContext'
import { useMediaQuery } from '@react-hook/media-query'
import List from '@/components/shared/List'
import nearbyEventsData from '@/data/nearbyEventsData';

const FilmPage = () => {
  const [event, setEvent] = useState(null);
  const [film, setFilm] = useState(null);
  const [cast, setCast] = useState(null);
  const bp_768 = useMediaQuery('(min-width:768px)');
  const { setTopbarSticky } = useUserContext();

  // Get the film id from the URL
  const { id } = useParams();

  useEffect(() => {
    setTopbarSticky(false);
    return () => setTopbarSticky(true);
  }, []);

  // Get the film from the database
  useEffect(() => {
    // film data
    const film = DummyFilmData.find(film => film._id.toString() === id);
    if (!film)
      return console.log('Film not found');
    else {
      console.log('Film found:', film);
      setFilm(film);
    }

    // cast data
    const cast = film?.cast.map(id => DummyCastData[id])
    if (!cast)
      return console.log('Cast not found');
    else {
      console.log('Cast found:', cast);
      setCast(cast);
    }
  }, []);

  // banner changes based on screen size
  const FilmInfo = () => {
    return (
      <div className='inset-0 w-full mb-4 md:mb-0'>
        {/* image & title*/}
        <div className='film-img-container'>
          <img src={bannerSrc} alt={film?.title} className='' />
          <div className='film-img-gradient'></div>
        </div>
        {/* Info */}
        <div className='relative flex gap-x-8 -top-30 md:-top-52 md:mb-[-150px]'>
          {bp_768 &&
            <div className='flex justify-start'>
              <img src={film?.image} alt={film?.title} className='min-w-[200px] md:min-w-[250px]' />
            </div>}
          <div className="flex mx-auto">
            <div className='flex flex-col justify-center gap-y-1 md:gap-y-2 '>
              <h1 className="text-m-l md:text-[30px] md:my-4 my-2 font-bold ">{film?.title}</h1>
              <p className='text-m-m md:text-[15px]'>{film?.releasedYear} | {film?.duration} | {film?.genre}</p>
              <p className='text-m-m md:text-[15px]'>{film?.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  let bannerSrc = film?.image;
  if (bp_768) bannerSrc = film?.banner;

  // Cast
  const Cast = () => {
    return (
      <div className='flex flex-col flex-shrink-0 w-full md:mb-10'>
        <h2 className='text-m-l mb-2 font-bold'>Cast</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className='flex gap-x-3 py-2'>
            {cast?.map((actor, index) => (
              <div key={index} className='w-[80px] h-auto flex-shrink-0 relative'>
                <img src={actor?.image} alt={actor?.name} className='rounded-md inset-0 object-cover mb-2' />
                <p className='text-m-s'>{actor.name}</p>
                <p className='text-m-s'>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='film-container justify-between p-4 mb-32'>
      <div className='film-page-inner'>
        {/* Film Info */}
        {!film ?
          <div className='flex flex-col gap-2'>
            <Skeleton className="w-[250px] h-[400px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
            <Skeleton className="w-[250px] h-[20px] rounded-xl" />
          </div> :
          <FilmInfo />}

        {/* Cast */}
        <Cast/>

        {/* Similar Films */}
        <div>
          <h2 className='text-m-l mb-2 font-bold md:mb-10'>Similar Film</h2>
        </div>

        {/* In Current Events */}
        <div>
          <h2 className='text-m-l mb-2 font-bold'>You might also be interested in...</h2>
          <List
          items={nearbyEventsData}
          isFilterVisible={false}
          isParticipantsVisible={false}
          mobileLayout={"grid"}
          desktopLayout={"square"}
          max='2'
          hasButton={false}
        />
        </div>

      </div>
    </div>

  )
}

export default FilmPage