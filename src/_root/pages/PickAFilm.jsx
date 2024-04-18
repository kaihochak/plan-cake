import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import DummyEventData from '@/data/DummyEventData'
import GuestList from '@/components/event/GuestList'
import { image500 } from '@/lib/tmdb/config'

const PickAFilm = () => {
  const [event, setEvent] = useState(null);
  const { id } = 1; // To be updated
  const [film, setFilm] = useState(null);
  const [formData, setFormData] = useState({
    guestList: [],
    selectedFilms: [],
    file: [],
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


  const SelectedFilm = () => {
    return (
      <div className='p-4'>
        {/* Selected Film */}
        {film ? (
          <div className='flex-col flex-center'>
            <h2 className="self-end m3">Selected Film ({3})</h2>
            <img
              src={image500(film?.poster_path)}
              alt={film?.title}
              className="object-cover object-center rounded-sm"
            />
          </div>
        ) : (
          // Placeholder
          <div className="w-[70%] mx-auto bg-primary border-2 border-border">
            <div className='aspect-w-1 aspect-h-[1.5] rounded-sm'>
              <div className='p-6 flex-center'>
                <p className='self-center text-center'>Starting adding films to the poll</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-6 pb-32'>
        <h2 className="title">Pick A Film</h2>

        {/* Guests */}
        <GuestList />

        {/* Poster */}
        <SelectedFilm />

        {/* Film Poll */}
        <FilmPoll formData={formData} setFormData={setFormData} />

      </div>

    </div>
  )
}

export default PickAFilm
