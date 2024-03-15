import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import DummyFilmData from '@/data/DummyFilmData'
import DummyEventData from '@/data/DummyEventData'
import DummyCastData from '@/data/DummyCastData'

const FilmPage = () => {
  const [event, setEvent] = useState(null);
  const [film, setFilm] = useState(null);
  const [cast, setCast] = useState(null);

  // Get the film id from the URL
  const { id } = useParams();

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

  return (
    <div className='common-container'>

      {!film ?
        <div className='flex flex-col gap-2 '>
          <Skeleton className="w-[250px] h-[400px] rounded-xl" /> 
          <Skeleton className="w-[250px] h-[20px] rounded-xl" /> 
          <Skeleton className="w-[250px] h-[20px] rounded-xl" /> 
          <Skeleton className="w-[250px] h-[20px] rounded-xl" /> 
          <Skeleton className="w-[250px] h-[20px] rounded-xl" /> 
          <Skeleton className="w-[250px] h-[20px] rounded-xl" /> 
        </div>:
        <div>
          <div className='aspect-w-[0.9] aspect-h-[1.5] max-w-2xl mx-auto'>
            <img src={film?.image} alt={film?.title} />
          </div>
          <div className="space-y-3">
            <div>
              <h1>{film?.title}</h1>
              <p>{film?.description}</p>
              <p>{film?.genre}</p>
              <p>{film?.duration}</p>
              <p>{film?.releaseDate}</p>
            </div>
          </div>
        </div>
      }

      {/* Cast */}
      <h2>Cast</h2>
      {!cast ?
        <div className='flex gap-x-2'>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
          <Skeleton className="w-[50px] h-[50px] rounded-full"/>
        </div>:
        <div>
          <div className='flex gap-x-2'>
            {cast.map((actor, index) => (
              <div key={index}>
                <img src={actor.image} alt={actor.name} />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      }

      {/* In Current Events */}
      <div>

      </div>

      {/* Similar Films */}
      <div className="mt-2">
        {/* FilmList component */}
      </div>
    </div>

  )
}

export default FilmPage