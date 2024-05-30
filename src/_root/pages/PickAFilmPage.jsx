import React, { useEffect, useState } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'
import GuestSelection from "@/components/event/GuestSelection";
import DummyPickAFilmData from '../../data/DummyPickAFilmData';
import ConfirmedFilm from '@/components/event/ConfirmedFilm';
import { useParams } from 'react-router-dom';
import { useGetPickAFilmById } from '@/lib/react-query/queries';
import Loader from "@/components/utility/Loader";
import { fallbackMoviePoster } from '@/lib/tmdb/config'
import { fetchFilmDetails } from "@/lib/tmdb/api";

const PickAFilmPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const host = localStorage.getItem('host');

  // Query: Get PickAFilm by ID
  const { data, isLoading } = useGetPickAFilmById(id);

  // Initialize local state with data from the query 
  useEffect(() => {
    if (data && !formData) {
      // convert the stringified guestList to JSON
      let guestJSONs = [];
      data.guestList.map((guest) => {
        guestJSONs.push(JSON.parse(guest));
      });

      // get the selectedFilms by ID
      let selectedFilmsJSONs = [];
      data.selectedFilms?.map(async (filmID) => {
        try {
          const film = await fetchFilmDetails(filmID);
          selectedFilmsJSONs.push(film);
        } catch (error) {
          console.error("Error fetching selected film id:", filmID, error);
        }
      });

      // set the formData local state
      setFormData({
        ...data,
        guestList: guestJSONs,
        selectedFilms: selectedFilmsJSONs,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log('formData', formData);
  }, [formData]);

  /**********************************************************************************
   * Components
   **********************************************************************************/
  const PageContent = () => {
    return (
      <div className='flex flex-col justify-end w-full max-w-[1024px] mx-auto gap-y-2 pt-3 lg:pt-12 xl:pt-0 md:pb-32'>
        <h2 className="title">Pick A Film</h2>
        <div className='flex-between'>
          {/* Guests */}
          {/* <GuestList /> */}
          <GuestSelection
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Poster */}
        {formData.confirmedFilm &&
          <ConfirmedFilm
            confirmedFilm={formData.confirmedFilm}
            formData={formData}
          />
        }

        {/* Film Poll */}
        <FilmPoll
          formData={formData}
          setFormData={setFormData}
          selectedGuest={selectedGuest}
          setSelectedGuest={setSelectedGuest}
        />
      </div>
    )
  }

  const NoData = () => {
    return (
      <div className='flex-center common-container'>
        <img
          src={fallbackMoviePoster}
          alt="404"
          className="w-full max-w-[300px] mt-4"
        ></img>
        <p>404 - Event not found</p>
      </div>
    )
  }

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      {isLoading ?
        <div className='min-h-screen flex-center'>
          <Loader />
        </div> :
        // If there is data, render the page content, otherwise render a 404 message
        formData !== null ?
          <PageContent /> : <NoData />
      }
    </div>
  )
}

export default PickAFilmPage
