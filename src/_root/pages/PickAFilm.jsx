import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import DummyEventData from '@/data/DummyEventData'
import GuestList from '@/components/event/GuestList'
import { image500 } from '@/lib/tmdb/config'
import SelectedFilm from '@/components/event/SelectedFilm'

const PickAFilm = () => {
  const [event, setEvent] = useState(null);
  const { id } = 1; // To be updated
  const [formData, setFormData] = useState({
    guestList: [
      {
        id: "-1",
        name: "Darcy",
        avatar: "/assets/avatars/avatar1.jpg",
        filmsVoted: ["604788", "823464", "300", "24"]
      },
      {
        id: "-2",
        name: "Susan",
        avatar: "/assets/avatars/avatar2.jpg",
        filmsVoted: ["634492", "300", "24"]
      },
      {
        id: "-3",
        name: "Joanna",
        avatar: "/assets/avatars/avatar3.jpg",
        filmsVoted: ["200", "38", "24"]
      }
    ],
    selectedFilms: [
      { "24": 3 },
      { "38": 1 },
      { "200": 1 },
      { "300": 2 },
      { "604788": 1 },
      { "823464": 1 },
      { "634492": 1 }
    ],
    file: [],
  });

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-24 pb-32'>
        <h2 className="title">Pick A Film</h2>
        {/* Guests */}
        <GuestList/>
        {/* Poster */}
        <SelectedFilm selectedFilms={formData.selectedFilms}/>
        {/* Film Poll */}
        <FilmPoll formData={formData} setFormData={setFormData} />
      </div>

    </div>
  )
}

export default PickAFilm
