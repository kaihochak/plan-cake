import React, { useEffect, useState, useReducer } from 'react'
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
import TimeConvertor from '@/components/utility/TimeConvertor'
import { BiCalendarEvent } from "react-icons/bi";


// Define initial state
const initialState = {
  title: "",
  date: null,
  confirmedFilm: null,
  guestList: [],
  selectedFilms: [],
  selectedGuest: null,
  id: null,
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_CONFIRMED_FILM':
      return { ...state, confirmedFilm: action.payload };
    case 'SET_GUEST_LIST':
      return { ...state, guestList: action.payload };
    case 'SET_SELECTED_FILMS':
      return { ...state, selectedFilms: action.payload };
    case 'SET_SELECTED_GUEST':
      return { ...state, selectedGuest: action.payload };
    case 'SET_ID':
      return { ...state, id: action.payload };
    default:
      return state;
  }
};

const PickAFilmPage = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const host = localStorage.getItem('host');

  // Query: Get PickAFilm by ID
  const { data, isLoading } = useGetPickAFilmById(id);


  // Initialize local state with data from the query
  useEffect(() => {
    if (!isLoading && data && !isInitialized) {

      console.log('started------------------', data);
      const initializeState = async () => {
        // Convert the stringified guestList to JSON
        const guestJSONs = data.guestList.map(guest => JSON.parse(guest));

        // Fetch selected films by ID
        const fetchSelectedFilms = async () => {
          const selectedFilmsJSONs = [];
          for (const filmID of data.selectedFilms || []) {
            try {
              const film = await fetchFilmDetails(filmID);
              selectedFilmsJSONs.push(film);
            } catch (error) {
              console.error("Error fetching selected film id:", filmID, error);
            }
          }
          dispatch({ type: 'SET_SELECTED_FILMS', payload: selectedFilmsJSONs });
        };

        // Dispatch actions to set the state
        dispatch({ type: 'SET_TITLE', payload: data.title });
        dispatch({ type: 'SET_DATE', payload: data.date });
        dispatch({ type: 'SET_CONFIRMED_FILM', payload: data.confirmedFilm });
        dispatch({ type: 'SET_GUEST_LIST', payload: guestJSONs });
        dispatch({ type: 'SET_ID', payload: data.$id });

        await fetchSelectedFilms();
      };

      initializeState();
      setIsInitialized(true);
    }
  }, [isLoading, data, isInitialized]);

  useEffect(() => {
    console.log('PickAFilmPage mounted');
  }, []);


  /**********************************************************************************
   * Components
   **********************************************************************************/
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
        state.id !== null ?
          <div className='flex flex-col justify-end w-full max-w-[1024px] mx-auto gap-y-2 pt-3 lg:pt-12 xl:pt-0 md:pb-32'>
            <div className='items-end flex-between'>
              <h2 className="title">{state.title || "Pick A Film"}</h2>
              {state.date &&
                <h3 className="subtitle flex-between gap-x-2">
                  <BiCalendarEvent />
                  <TimeConvertor confirmedDateTime={state.date} />
                </h3>
              }
            </div>
            <div className='flex-between'>
              <GuestSelection
                id={state.id}
                guestList={state.guestList}
                selectedGuest={state.selectedGuest}
                setSelectedGuest={(guest) => dispatch({ type: 'SET_SELECTED_GUEST', payload: guest })}
                setGuestList={(guestList) => dispatch({ type: 'SET_GUEST_LIST', payload: guestList })}
              />
            </div>

            {/* Poster */}
            {state.confirmedFilm &&
              <ConfirmedFilm
                confirmedFilm={state.confirmedFilm}
                guestList={state.guestList}
              />
            }

            {/* Film Poll */}
            <FilmPoll
              id={state.id}
              guestList={state.guestList}
              selectedFilms={state.selectedFilms}
              selectedGuest={state.selectedGuest}
              setGuestList={(guestList) => dispatch({ type: 'SET_GUEST_LIST', payload: guestList })}
              setSelectedFilms={(films) => dispatch({ type: 'SET_SELECTED_FILMS', payload: films })}
              setSelectedGuest={(guest) => dispatch({ type: 'SET_SELECTED_GUEST', payload: guest })}
              setConfirmedFilm={(film) => dispatch({ type: 'SET_CONFIRMED_FILM', payload: film })}
            />
          </div>
          :
          <NoData />
      }
    </div>
  )
}

export default PickAFilmPage
