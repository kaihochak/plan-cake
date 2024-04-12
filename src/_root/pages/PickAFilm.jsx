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
        <h2 className="mb-3 title">Pick A Film</h2>

        {/* Guests */}
        <GuestList />

        {/* Film Poll */}
        <FilmPoll/>

    </div>
  )
}

export default PickAFilm
