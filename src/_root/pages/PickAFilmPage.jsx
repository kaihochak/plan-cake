import React, { useEffect, useState, useReducer } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import GuestSelection from "@/components/event/GuestSelection";
import { useParams } from 'react-router-dom';
import { useGetPickAFilmById, useUpdatePickAFilmOptimistic } from '@/lib/react-query/queries';
import Loader from "@/components/utility/Loader";
import { fetchFilmDetails } from "@/lib/tmdb/api";
import TimeConvertor from '@/components/utility/TimeConvertor'
import { fallbackMoviePoster, image500, imagePath } from '@/lib/tmdb/config'
import { useMediaQuery } from '@react-hook/media-query'
import { BiShareAlt, BiCaretRight } from 'react-icons/bi'
import { useToast } from "@/components/ui/use-toast"
import { PiKeyReturnFill } from "react-icons/pi";

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
  const bp_768 = useMediaQuery('(min-width:768px)');
  const [rename, setRename] = useState(false);
  const [newName, setNewName] = useState("");
  const { toast } = useToast()

  // let bannerSrc = image500(state.confirmedFilm?.poster_path);
  // if (bp_768) bannerSrc = imagePath(state.confirmedFilm?.backdrop_path);
  let bannerSrc = imagePath(state.confirmedFilm?.backdrop_path);

  // Query: Get PickAFilm by ID
  const { data, isLoading: isLoadingPickAFilm } = useGetPickAFilmById(id);
  // Query: Update PickAFilm optimistically
  const { isPending, variables, mutateAsync: updatePickAFilmOptimistic, isError } = useUpdatePickAFilmOptimistic(); // Query: Update the guestList optimistically

  // Initialize local state with data from the query
  useEffect(() => {
    if (!isLoadingPickAFilm && data && !isInitialized) {

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
  }, [isLoadingPickAFilm, data, isInitialized]);

  // Handle renaming event
  const handleRename = async () => {
    // ensure name is valid
    if (!newName || newName === "" || newName === state.title) {
      setRename(false);
      return;
    }

    // update client state
    setRename(false);
    dispatch({ type: 'SET_TITLE', payload: newName });

    // update server state
    const success = await updatePickAFilmOptimistic({ id: state.id, title: newName });

    // if not successful, recover the previous state and show a toast message
    if (!success) {
      setRename(true);
      dispatch({ type: 'SET_TITLE', payload: variables.title }); // recover the previous state 
      toast({
        variant: "destructive",
        title: (<p className='subtitle'>🚨 Error renaming event</p>),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error renaming to <span className='italic subtitle'>{newName}</span>
          </p>
        ),
      });
      // if successful, show a toast message
    } else {
      toast({
        variant: "success",
        title: (<p className='subtitle'>🎉 Event renamed!</p>),
        description: (
          <p className='bold leading-[1.5] pt-2'>
            Event is renamed to <span className='italic subtitle'>{newName} </span>
          </p>
        ),
      });
    }
  }

  // Copy the URL to the clipboard
  const copyToClipboard = () => {
    const url = `${import.meta.env.VITE_HOSTING_URL}/pickAFilm/${state.id}`;
    navigator.clipboard.writeText(url);
    toast({
      variant: "success",
      title: (<p className='subtitle'>📋 URL copied!</p>),
      description: (
        <p className='bold leading-[1.5]'>
          The URL is copied to your clipboard
        </p>
      ),
    });
  }

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

  if (isLoadingPickAFilm) return (
    <div className='container min-h-screen flex-center'>
      <Loader />
    </div>
  )

  if (state.id == null) return (
    <div className='container min-h-screen flex-center'>
      <NoData />
    </div>
  )

  console.log('state', state);

  return (
    <div className='container flex-col items-center justify-start w-full overflow-x-hidden'>
      <div className='flex flex-col justify-start w-full max-w-[1024px] gap-y-4 pt-3 lg:pt-12 xl:pt-0 md:pb-32'>

        {/* banner */}
        {state.confirmedFilm &&
          <div className='confirmedfilm-img-container'>
            {bannerSrc && <img src={bannerSrc} alt={state.confirmedFilm?.title} className='film-img' />}
            <div className='film-img-mask'></div>
          </div>
        }

        <div className={`relative flex flex-col gap-y-10 ${state.confirmedFilm ? "-mt-10 sm:-mt-80" : ""}`}>
          <div className={`flex flex-col gap-y-8`}>

            <section className='flex flex-col gap-y-4'>
              {/* title & Share */}
              <div className='flex-between gap-x-10'>
                {/* title */}
                {!rename ?
                  <div className="flex items-center gap-x-2">
                    <h2
                      onClick={() => setRename(true)}
                      className={`hover:underline flex-wrap transition-all duration-500 ease-in-out cursor-pointer h3 " ${isPending ? "text-foreground-dark" : "text-foreground"}`}
                    >
                      {state.title || "Pick A Film"}
                    </h2>
                  </div> :
                  <div className="relative flex ">
                    <input
                      type="text"
                      value={newName || state.title}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                      onKeyUp={(e) => e.key === 'Escape' && setRename(false)}
                      className={`w-full pr-8 transition-all duration-500 ease-in-out border-b bg-primary h3 border-accent-dark text-foreground-dark focus:outline-none focus:border-primary ${isError ? "border-destructive" : "border-accent-dark"}`}
                    />
                    <button
                      onClick={handleRename}
                      className="absolute bottom-1.5 text-accent h3 right-1"
                    >
                      <PiKeyReturnFill />
                    </button>
                  </div>
                }

                {/* Share */}
                <button
                  className='flex items-center pl-2 rounded-lg gap-x-2 text-accent h3'
                  onClick={copyToClipboard}
                >
                  <BiShareAlt />
                </button>
              </div>

              {/* Info */}
              <div className={`gap-x-8 ${state.confirmedFilm ? "grid grid-cols-2" : "flex-between "}`}>
                {/* left - poster*/}
                {state.confirmedFilm &&
                  <div className=''>
                    <img
                      src={state.confirmedFilm?.poster_path ? image500(state.confirmedFilm?.poster_path) : fallbackMoviePoster}
                      alt={state.confirmedFilm?.title}
                    />
                  </div>
                }

                {/* right - details */}
                <div className={`flex w-full justify-between ${state.confirmedFilm ? "flex-col gap-4" : "gap-8 "}`}>
                  {/* film title */}
                  {state.confirmedFilm &&
                    <h3 className="body">
                      <span className='text-foreground-dark'>Selected Film</span><br />
                      {state.confirmedFilm.title} ({state.confirmedFilm.release_date?.split("-")[0]})
                    </h3>
                  }

                  {/* runtime */}
                  {state.confirmedFilm &&
                    <h3 className="body">
                      <span className='text-foreground-dark'>Runtime</span><br />
                      {Math.floor(state.confirmedFilm.runtime / 60) == 1 && `${Math.floor(state.confirmedFilm.runtime / 60)} hr`}
                      {Math.floor(state.confirmedFilm.runtime / 60) > 1 && `${Math.floor(state.confirmedFilm.runtime / 60)} hrs`}
                      {state.confirmedFilm.runtime % 60 == 0 && ` ${state.confirmedFilm.runtime % 60} min`}
                      {state.confirmedFilm.runtime % 60 > 0 && ` ${state.confirmedFilm.runtime % 60} mins`}
                    </h3>
                  }

                  {/* genres */}

                  {/* date */}
                  {state.date &&
                    <h3 className="body">
                      <span className='body text-foreground-dark'>Date & Time</span><br />
                      <TimeConvertor confirmedDateTime={state.date} />
                    </h3>
                  }
                  {/* Guest List */}
                  <div className='self-end w-full'>
                    <GuestSelection
                      id={state.id}
                      guestList={state.guestList}
                      selectedGuest={state.selectedGuest}
                      setSelectedGuest={(guest) => dispatch({ type: 'SET_SELECTED_GUEST', payload: guest })}
                      setGuestList={(guestList) => dispatch({ type: 'SET_GUEST_LIST', payload: guestList })}
                    />
                  </div>
                </div>
              </div>
            </section>

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
        </div>
      </div>
    </div >
  )
}

export default PickAFilmPage
