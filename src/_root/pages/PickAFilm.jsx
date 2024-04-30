import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import DummyEventData from '@/data/DummyEventData'
import GuestList from '@/components/event/GuestList'

const PickAFilm = () => {
    const [event, setEvent] = useState(null);
    const { id } = 1; // To be updated

  /************************************************************************
 * Can get rid of this after filmSearch is refractored
 ************************************************************************/

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    date: "",
    location: "",
    guestList: [],
    selectedFilms: [],
    file: [],
    imageUrl: "",
    imageId: "",
  });

  // Get the event from the database
  useEffect(() => {
    // event data
    const event = DummyEventData.find(event => event._id.toString() === id);
    console.log('Event ID:', id);
    if (!event)
      return console.log('Event not found');
    else {
      console.log('Event found:', event);
      setEvent(event);
    }
  }, []);

  return (
    <div className='w-full p-5 mx-auto'>
        <h2 className="mb-3 text-m-2xl">Pick A Film</h2>

        {/* Guests */}
        <GuestList />

<<<<<<< Updated upstream
        {/* Film Poll */}
        <FilmPoll/>
=======

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
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[-10%] translate-y-[20%] z-40'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[1].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-10deg] top-1/2 left-1/2 translate-x-[-50%] translate-y-[5%] z-50'
              />
             <img
                src={trending && trending[0]?.poster_path ? image500(trending[2].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[130%] translate-y-[20%] z-40'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[3].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[-15deg] top-1/2 translate-x-[20%] translate-y-[80%] z-20'
              />
              <img
                src={trending && trending[0]?.poster_path ? image500(trending[4].poster_path) : fallbackMoviePoster}
                alt={trending && trending[0]?.title}
                className='rounded-sm absolute w-[150px] rotate-[15deg] top-1/2 translate-x-[90%] translate-y-[80%] z-30'
              />
            </div>
          </div>
        }

      </div>

      <PickAFilmForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
>>>>>>> Stashed changes

    </div>
  )
}

export default PickAFilm
