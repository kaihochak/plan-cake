import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'
import GuestSelection from "@/components/event/GuestSelection";
import DummyPickAFilmData from '../../data/DummyPickAFilmData';
import ConfirmedFilm from '@/components/event/ConfirmedFilm';

const PickAFilmPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = 1; // To be updated
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [formData, setFormData] = useState(DummyPickAFilmData);

  const host = localStorage.getItem('host');

  useEffect(() => {
    if (!host) return;
    setFormData(previous => ({
      ...previous,
      guestList: previous.guestList.some(guest => guest.id === "0") ?
        [...previous.guestList] :
        [...previous.guestList, {
          id: "0",
          name: host,
          avatar: "/assets/avatars/avatar4.jpg",
          filmsVoted: []
        }]
    }))
  }, [host]);

  useEffect(() => {
    console.log(formData.confirmedFilm);
    
  }), [formData.confirmedFilm];

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-3 lg:pt-12 xl:pt-0 md:pb-32'>
        <h2 className="title">Pick A Film</h2>
        <div className='flex-between'>
          {/* Guests */}
          <GuestList />

          <GuestSelection
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Poster */}
        <ConfirmedFilm 
          confirmedFilm={formData.confirmedFilm}
          formData={formData}
        />

        {/* Film Poll */}
        <FilmPoll
          formData={formData}
          setFormData={setFormData}
          selectedGuest={selectedGuest}
          setSelectedGuest={setSelectedGuest} />
      </div>

    </div>
  )
}

export default PickAFilmPage
