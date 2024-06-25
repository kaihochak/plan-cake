import React, { useEffect, useState, useReducer } from 'react'
import { Button } from "@/components/ui/button"
import FilmPoll from '@/components/event/FilmPoll'
import GuestSelection from "@/components/event/GuestSelection";
import { useParams } from 'react-router-dom';
import { useGetPickAFilmById, useUpdatePickAFilmOptimistic } from '@/lib/react-query/queries';
import Loader from "@/components/utility/Loader";
import { fetchFilmDetails } from "@/lib/tmdb/api";
import TimeConvertor from '@/components/utility/TimeConvertor'
import { fallbackMoviePoster, image500, imagePath } from '@/lib/tmdb/config'
import { useMediaQuery } from '@react-hook/media-query'
import { useToast } from "@/components/ui/use-toast"
import EventTitleAndShare from '@/components/event/EventTitleAndShare';
import FilmPreview from "@/components/film/FilmPreview";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
// import timeConvertor from '../../components/utility/timeConvertor';
import Joyride from 'react-joyride';

// Set Tour Guide
const tourSteps = [
  {
    target: '.tour-add-film',
    content: (
      <div>
        You can interact with your own components through the spotlight.
        <br />
        Click the menu above!
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
  {
    target: '.tour-share',
    content: 'Share the event with your friends by copying the URL.',
    placement: 'bottom',
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  }
];

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

// Define the component
const PickAFilmPage = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const host = localStorage.getItem('host');
  const bp_768 = useMediaQuery('(min-width:768px)');
  const [rename, setRename] = useState(false);
  const [newName, setNewName] = useState("");
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [viewFilmId, setViewFilmId] = React.useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [{run, stepsIndex}, setTourState] = useState({run: true, stepsIndex: 0});

  // Open the Film Preview Modal
  const handleViewFilm = (itemId) => {
    setViewFilmId(itemId);
    setIsModalOpen(true);
  };


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

  // Handle rescheduling event
  const handleReschedule = async (newDate) => {

    // update client state
    dispatch({ type: 'SET_DATE', payload: newDate });

    // update server state
    const success = await updatePickAFilmOptimistic({ id: state.id, date: newDate });

    // if not successful, recover the previous state and show a toast message
    if (!success) {
      dispatch({ type: 'SET_DATE', payload: variables.date }); // recover the previous state
      toast({
        variant: "destructive",
        title: (<p className='subtitle'>🚨 Error rescheduling event</p>),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error rescheduling the event
          </p>
        ),
      });
    }
    // if successful, show a toast message
    else {
      toast({
        variant: "success",
        title: (<p className='subtitle'>🎉 Event rescheduled!</p>),
        description: (
          <p className='bold leading-[1.5]'>
            Event is rescheduled to <br></br><span className='italic'>{newDate.toLocaleString()}</span>
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


  // Handle the next step in the tour
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    console.log('Type:', type, 'Action:', action, 'Index:', index, 'Status:', status);
  
    if (action === 'next') {
      setTourState({ run: true, stepsIndex: index + 1 });
    }
  };



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

  // console.log('newTime', timeConvertor(state.date));

  return (
    <div className='mx-auto w-full max-w-[1280px] flex-col items-center justify-start overflow-x-hidden mt-10 md:mt-14 px-4 xl:mt-24 xl:px-10'>
      <Joyride
        run={run}
        steps={tourSteps}
        stepIndex={stepsIndex}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: 'hsl(var(--secondary))',
            backgroundColor: 'hsl(var(--secondary))',
            overlayColor: 'hsl(var(--primary-light))',
            primaryColor: 'hsl(var(--accent2))',
            textColor: 'hsl(var(--secondary-foreground))',
            width: 400,
            zIndex: 1000,
          },
        }}
      />
  
      <div className='flex flex-col justify-start pt-12 gap-y-4 md:pt-16 lg:pt-24 xl:pt-12 md:pb-32'>

        {/* banner */}
        {state.confirmedFilm &&
          <div className='confirmedfilm-img-container'>
            {bannerSrc && <img src={bannerSrc} alt={state.confirmedFilm?.title} className='film-img' />}
            <div className='film-img-mask'></div>
          </div>
        }

        <div className={`relative flex flex-col gap-y-10 w-full max-w-[1280px] mx-auto md:px-10 ${state.confirmedFilm ? "-mt-10 md:-mt-80 lg:-mt-96 xl:-mt-[450px]" : ""}`}>
          <div className={`flex flex-col gap-y-4 md:gap-y-8`}>
            <section className='flex flex-col gap-y-4'>
              {/* title & Share */}
              {!state.confirmedFilm &&
                <EventTitleAndShare
                  state={state}
                  isPending={isPending}
                  copyToClipboard={copyToClipboard}
                  rename={rename}
                  setRename={setRename}
                  newName={newName}
                  setNewName={setNewName}
                  handleRename={handleRename}
                  isError={isError}
                />
              }

              {/* Info */}
              <div className={`w-full ${state.confirmedFilm ? "flex-start gap-x-4 md:gap-x-14" : "flex-between "}`}>
                {/* left - poster*/}
                {state.confirmedFilm &&
                  <div className='w-full min-w-[150px] w-[300px] lg:w-[320px] xl:w-[380px] 2xl:w-[400px] cursor-pointer'>
                    <img
                      src={state.confirmedFilm?.poster_path ? image500(state.confirmedFilm?.poster_path) : fallbackMoviePoster}
                      alt={state.confirmedFilm?.title}
                      className=''
                      onClick={() => handleViewFilm(state.confirmedFilm?.id)}
                    />
                  </div>
                }

                {/* right - details */}
                <div className={`flex w-full justify-start ${state.confirmedFilm ? "flex-col gap-2 md:gap-4" : "justify-between gap-8"}`}>

                  {/* title & Share */}
                  {state.confirmedFilm &&
                    <EventTitleAndShare
                      state={state}
                      isPending={isPending}
                      copyToClipboard={copyToClipboard}
                      rename={rename}
                      setRename={setRename}
                      newName={newName}
                      setNewName={setNewName}
                      handleRename={handleRename}
                      isError={isError}
                    />
                  }

                  {/* Selected film title */}
                  {state.confirmedFilm &&
                    <div className="body">
                      <span className='text-foreground-dark'>Selected Film</span><br />
                      {state.confirmedFilm.title} ({state.confirmedFilm.release_date?.split("-")[0]})
                    </div>
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

                  {/* date */}
                  {state.date &&
                    <Popover
                      open={isDatePickerOpen}
                      onOpenChange={setIsDatePickerOpen}
                    >
                      <PopoverTrigger asChild >
                        <p className="flex flex-col gap-y-0 cursor-pointer [&_div]:hover:underline">
                          <span className='body text-foreground-dark'>Date & Time</span>
                          <TimeConvertor confirmedDateTime={state.date} />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex flex-col w-auto p-2 space-y-2"
                      >
                        <div className="rounded-md">
                          <Calendar
                            mode="single"
                            selected={state.date}
                            onSelect={() => {
                              setIsDatePickerOpen(false);
                              handleReschedule(state.date)
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  }

                  {/* Guest List */}
                  <div className='md:self-end'>
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
              setTourState={setTourState}
              id={state.id}
              guestList={state.guestList}
              selectedFilms={state.selectedFilms}
              selectedGuest={state.selectedGuest}
              confirmedFilm={state.confirmedFilm}
              setGuestList={(guestList) => dispatch({ type: 'SET_GUEST_LIST', payload: guestList })}
              setSelectedFilms={(films) => dispatch({ type: 'SET_SELECTED_FILMS', payload: films })}
              setSelectedGuest={(guest) => dispatch({ type: 'SET_SELECTED_GUEST', payload: guest })}
              setConfirmedFilm={(film) => dispatch({ type: 'SET_CONFIRMED_FILM', payload: film })}
            />

          </div>
        </div>
      </div>


      <FilmPreview
        filmId={viewFilmId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div >
  )
}

export default PickAFilmPage