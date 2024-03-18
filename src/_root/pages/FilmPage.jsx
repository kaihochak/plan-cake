import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import DummyFilmData from '@/data/DummyFilmData'
import DummyEventData from '@/data/DummyEventData'
import DummyCastData from '@/data/DummyCastData'
import { useUserContext } from '@/context/AuthContext'
import { useMediaQuery } from '@react-hook/media-query'

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
      <div className='inset-0 w-full mb-4'>
        {/* image & title*/}
        <div className='film-img-container'>
          <img src={bannerSrc} alt={film?.title} className='' />
          <div className='film-img-gradient'></div>
        </div>
        {/* Info */}
        <div className='relative flex -top-30'>
          {bp_768 &&
            <div className='flex justify-start'>
              <img src={film?.image} alt={film?.title} className='w-[200px]' />
            </div>}
          <div className="flex mx-auto">
            <div className='flex flex-col justify-center text-center gap-y-1'>
              <h1 className="text-m-l my-2 font-bold">{film?.title}</h1>
              <p className='text-m-s'>{film?.releasedYear} | {film?.duration}</p>
              <p className='text-m-s'>{film?.description}</p>
              <p className='text-m-s'>{film?.genre}</p>
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
      <div className='flex flex-col flex-shrink-0 w-full'>
        <h2 className='text-m-m text-center mb-2 font-bold'>Cast</h2>
        <div className="overflow-x-auto">
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
    <div className='film-container justify-between p-4 mb-20'>
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
        <Cast/>
        <Cast/>
        <Cast/>
        <Cast/>

        {/* In Current Events */}
        {/* <div>
        </div> */}

        {/* Similar Films */}
        {/* <div className="mt-2">
        </div> */}
      </div>
    </div>

  )
}

export default FilmPage