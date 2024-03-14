import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DummyFilmData from '@/data/DummyFilmData'
import DummyEventData from '@/data/DummyEventData'

const FilmPage = () => {
  const [event, setEvent] = useState(null);
  const [film, setFilm] = useState(null);

  // Get the film id from the URL
  const { id } = useParams();

  // Get the film from the database
  useEffect(() => {
    console.log('FilmPage id:', id);
    const film = DummyFilmData.find(film => film._id.toString() === id);
    if (!film) return console.log('Film not found');
    else setFilm(film);


  }, []);

  
  return (
    <div>
        <div>
          <div>
            {/* Image placeholder */}
            <img src={film?.image} alt={film.title}/>
          </div>

          {/* Film Information */}
          <div className="space-y-3">
            {/* Content */}
            <div>
              <h1>{film?.title}</h1>
              <p>{film?.description}</p>
              <p>{film?.genre}</p>
              <p>{film?.duration}</p>
              <p>{film?.releaseDate}</p>
              </div>
          </div>

          {/* Cast */}
          <div>
            {/* Cast component */}
          </div>

          {/* In Current Events */}
          <div>
            
          </div>

          {/* Similar Films */}
          <div className="mt-2">
            {/* FilmList component */}
          </div>
          
        </div>
    </div>

  )
}

export default FilmPage