import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'

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
      {
        id: "24",
        title: "Kill Bill: Vol. 1"
      },
      {
        id: "38",
        title: "Eternal Sunshine of the Spotless Mind"
      },
      {
        id: "200",
        title: "Star Trek: Insurrection"
      },
      {
        id: "300",
        title: "The Science of Sleep"
      },
      {
        id: "604788",
        title: "Tourists"
      },
      {
        id: "823464",
        title: "Godzilla vs. Kong"
      },
      {
        id: "634492",
        title: "Madame Web"
      }
    ],
    file: [],
  });

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-12 xl:pt-0 md:pb-32'>
        <h2 className="title">Pick A Film</h2>
        {/* Guests */}
        <GuestList/>
        {/* Poster */}
        {/* <SelectedFilm selectedFilms={formData.selectedFilms}/> */}
        {/* Film Poll */}
        <FilmPoll formData={formData} setFormData={setFormData} />
      </div>

    </div>
  )
}

export default PickAFilm
