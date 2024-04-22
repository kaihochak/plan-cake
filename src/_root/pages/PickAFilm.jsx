import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import DummyEventData from '@/data/DummyEventData'
import GuestList from '@/components/event/GuestList'
import { image500 } from '@/lib/tmdb/config'
import SelectedFilm from '@/components/event/SelectedFilm'

const PickAFilm = () => {
  const [event, setEvent] = useState(null);
  const { id } = 1; // To be updated
  const [film, setFilm] = useState(null);
  const [formData, setFormData] = useState({
    guestList: [],
    selectedFilms: [],
    file: [],
  });

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
        <SelectedFilm film={film}/>

        {/* Film Poll */}
        <FilmPoll formData={formData} setFormData={setFormData} />

      </div>

    </div>
  )
}

export default PickAFilm
