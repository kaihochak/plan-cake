import React, { useEffect, useState, useReducer } from 'react'
import Joyride, { ACTIONS} from 'react-joyride';
import { useMount, useSetState } from 'react-use';
import FilmPoll from '@/components/event/FilmPoll'
import GuestSelection from "@/components/event/GuestSelection";
import { useParams } from 'react-router-dom';
import { useGetPickAFilmById, useUpdatePickAFilmOptimistic } from '@/lib/react-query/queries';
import Loader from "@/components/utility/Loader";
import { fetchFilmDetails } from "@/lib/tmdb/api";
import { fallbackMoviePoster, image500, imagePath } from '@/lib/tmdb/config'
import { useToast } from "@/components/ui/use-toast"
import EventTitleAndShare from '@/components/event/EventTitleAndShare';
import FilmPreview from "@/components/film/FilmPreview";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent } from "@/components/ui/voteSelectDialog";
import getFormattedLocalDateTime from '@/components/utility/getFormattedLocalDateTime';
import DateTimePicker from '../../components/event/DateTimePicker';
import { min, set } from 'date-fns';
import HourMinutePicker from '../../components/event/HourMinutePicker';
import { Button } from '../../components/ui/button';
import { PiKeyReturnFill } from 'react-icons/pi';


// Define initial state
const initialState = {
  title: "",
  date: new Date(),
  hour: "",
  minute: "",
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
    case 'SET_HOUR':
      return { ...state, hour: action.payload };
    case 'SET_MINUTE':
      return { ...state, minute: action.payload };
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


/**********************************************************************************
 * PickAFilmPage
 **********************************************************************************/
const PickAFilmPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Define local state
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [rename, setRename] = useState(false);
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [viewFilmId, setViewFilmId] = React.useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isHourMinutePickerOpen, setIsHourMinutePickerOpen] = useState(false);
  // const [{ run, stepsIndex }, setTourState] = useState({ run: true, stepsIndex: 0 });
  const [{ run, filmpollOpen, stepsIndex, steps }, setTourState] = useSetState({
    run: false,
    filmpollOpen: false,
    stepIndex: 0,
    steps: [],
  });
  const [showVoteResult, setShowVoteResult] = useState(false);

  const host = localStorage.getItem('host');
  const localDateTime = getFormattedLocalDateTime(state.date);

  // Query: Get PickAFilm by ID
  const { data, isLoading: isLoadingPickAFilm } = useGetPickAFilmById(id);
  // Query: Update PickAFilm optimistically
  const { isPending, variables, mutateAsync: updatePickAFilmOptimistic, isError } = useUpdatePickAFilmOptimistic(); // Query: Update the guestList optimistically

  // Set Tour Guide
useMount(() => {
  setTourState({
    run: true,
    steps: [
      {
        target: '.tour-add-film',
        content: (
          <div>
            <p className='mb-1 bold'>Add a Film</p>
            <p className='body'>Got a movie in mind? Hit the "Add Film" button to start adding your favorites.</p>
          </div>
        ),
        disableBeacon: true,
        stepIndex: 0,
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
        content: (
          <div>
            <p className='mb-1 bold'>Add Guest Name</p>
            <p className='body'>Open the guest name drop-down, and add your friends' names. Want to vote on their behalf? Select their name and cast their vote (but make sure you've got their permission first)!</p>
          </div>
        ),
        placement: 'bottom',
        stepIndex: 1,
        spotlightClicks: true,
        styles: {
          options: {
            zIndex: 10000,
          },
        },
      },
      {
        target: '.tour-search-filter',
        content: (
          <div>
            <p className='mb-1 bold'>Search/Filter for a Film</p>
            <p className='body'>Use the search bar to find the movie you’re looking for, or click on the filter button to narrow down your choices.</p>
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
        target: '.tour-apply',
        content: (
          <div>
            <p className='mb-1 bold'>Apply selection</p>
            <p className='body'>Found something interesting? Hover over the film to see the "Add" button and an "Info" button for details. Click "Apply" after selecting the films you want to add to the poll.</p>
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
        target: '.tour-vote',
        content: (
          <div>
            <p className='mb-1 bold'>Vote for the Film</p>
            <p className='body'>Check out the selected films in the poll section. Hover over your pick and click the "+" button to cast your vote for the movie you want to watch.</p>
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
        target: '.tour-confirm',
        content: (
          <div>
            <p className='mb-1 bold'>Confirm Film</p>
            <p className='body'>After everyone has voted, click the "Confirmed Film" button to see which movie the group decided to watch. Popcorn(pancake) time!</p>
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
        target: '.tour-edit',
        content: (
          <div>
            <p className='mb-1 bold'>Edit Event Title and Date & Time</p>
            <p className='body'>Want to change the event name or tweak the date and time? Just click on the title or the date & time fields and make it yours!</p>
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
    ]
  })
})


  // Initialize local state with data from the query
  useEffect(() => {
    if (!isLoadingPickAFilm && data && !isInitialized) {

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

        // Fetch confirmed film 
        const fetchConfirmedFilm = async () => {
          if (data.confirmedFilm) {
            try {
              const confirmedFilm = await fetchFilmDetails(parseInt(data.confirmedFilm));
              dispatch({ type: 'SET_CONFIRMED_FILM', payload: confirmedFilm });
            } catch (error) {
              console.error("Error fetching confirmed film id:", data.confirmedFilm, error);
            }
          }
        }

        // Dispatch actions to set the state
        dispatch({ type: 'SET_TITLE', payload: data.title });
        dispatch({ type: 'SET_DATE', payload: new Date(data.date) });
        dispatch({ type: 'SET_HOUR', payload: new Date(data.date).getHours() });
        dispatch({ type: 'SET_MINUTE', payload: new Date(data.date).getMinutes() });
        dispatch({ type: 'SET_GUEST_LIST', payload: guestJSONs });
        dispatch({ type: 'SET_ID', payload: data.$id });

        await fetchSelectedFilms();
        await fetchConfirmedFilm();
      };

      initializeState();
      setIsInitialized(true);
    }
  }, [isLoadingPickAFilm, data, isInitialized]);


  useEffect(() => {
    if (state.confirmedFilm) {
      console.log("state.confirmedFilm", state.confirmedFilm);
    }
  }, [state.confirmedFilm]);


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
   * Handlers
   *******************************************************************************/

  // Handle renaming event
  const handleRename = async () => {

    setRename(false);

    // ensure name is valid
    if (!newName || newName === "" || newName === state.title) {
      return;
    }

    // update client state
    dispatch({ type: 'SET_TITLE', payload: newName });

    // update server state
    const success = await updatePickAFilmOptimistic({ id: state.id, title: newName });

    console.log("variables.title", variables.title);

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
  const handleReschedule = async (newDate, type) => {

    newDate.setHours(state.date.getHours());
    newDate.setMinutes(state.date.getMinutes());

    if (type === "date") {
      // update client state 
      dispatch({ type: 'SET_DATE', payload: newDate });
      setIsDatePickerOpen(false);
    }

    if (type === "hourMinute") {
      setIsHourMinutePickerOpen(false);
    }

    // update server state
    const success = await updatePickAFilmOptimistic({ id: state.id, date: newDate });

    console.log("variables.date", variables.date);

    // if not successful, recover the previous state and show a toast message
    if (!success) {
      dispatch({ type: 'SET_DATE', payload: variables.date }); // recover the previous state
      // dispatch({ type: 'SET_HOUR', payload: variables.hour });  
      // dispatch({ type: 'SET_MINUTE', payload: variables.minute });
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

  // Handle setting the confirmed film
  const handleSetConfirmedFilm = async (newConfirmedFilm) => {

    dispatch({ type: 'SET_CONFIRMED_FILM', payload: newConfirmedFilm });

    console.log("newConfirmedFilm", newConfirmedFilm);

    // update server state
    const success = await updatePickAFilmOptimistic({ id: state.id, confirmedFilm: newConfirmedFilm.id.toString() });

    // if not successful, recover the previous state and show a toast message
    if (!success) {
      dispatch({ type: 'SET_CONFIRMED_FILM', payload: variables.confirmedFilm }); // recover the previous state
      toast({
        variant: "destructive",
        title: (<p className='subtitle'>🚨 Error setting the confirmed film</p>),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error setting the confirmed film
          </p>
        ),
      });
    }
    // if successful, show a toast message
    else {
      toast({
        variant: "success",
        title: (<p className='subtitle'>🎉 Confirmed film set!</p>),
        description: (
          <p className='bold leading-[1.5]'>
            The confirmed film is set to <span className='italic'>{newConfirmedFilm.title}</span>
          </p>
        ),
      });
    }
  }

  

  // Handle the next step in the tour
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    console.log('Type:', type, 'Action:', action, 'Index:', index, 'Status:', status);

    const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);


  if (filmpollOpen && index === 0) {
    setTimeout(() => {
      setTourState({ run: true});
    }, 400);
  } else if (filmpollOpen && index === 1) {
    setTourState({ 
      run: false,
      filmpollOpen: false,
      stepIndex: nextStepIndex,
    });

    setTimeout(() => {
      setTourState({ run: true});
    }, 400);
  } else {
    setTourState({ 
      filmpollOpen: false, 
      stepsIndex: nextStepIndex });
  }

    // if (action === 'next') {
    //   setTourState({ run: true, stepsIndex: index + 1 });
    // }
  };

  const handleStateChange = (isOpen) => {
    console.log("isOpen", isOpen);
    setTourState({ filmpollOpen: isOpen });
  }


  // Open the Film Preview Modal
  const handleViewFilm = (itemId) => {
    setViewFilmId(itemId);
    setIsModalOpen(true);
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

  return (
    <div className={`flex-col items-center justify-start w-full px-4 mx-auto mt-4 overflow-x-hidden overflow-y-scroll xl:px-10 custom-scrollbar  ${state.confirmedFilm ? "mt-0" : ""}`}>
      <Joyride
        run={run}
        steps={steps}
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
        callback={handleJoyrideCallback}
      />

      <div className={`mx-auto flex flex-col justify-start gap-y-4 md:pb-32 max-w-[1280px]
        ${!state.confirmedFilm ? "pt-12 md:pt-16 lg:pt-24 xl:pt-12" : ""}
      `}>
        {/* banner */}
        {state.confirmedFilm && imagePath(state.confirmedFilm?.backdrop_path) &&
          <div className='confirmedfilm-img-container'>
            {imagePath(state.confirmedFilm?.backdrop_path) && <img src={imagePath(state.confirmedFilm?.backdrop_path)} alt={state.confirmedFilm?.title} className='film-img' />}
            <div className='film-img-mask'></div>
          </div>
        }
        {/* content */}
        <div className={`relative flex flex-col gap-y-10 w-full max-w-[1280px] mx-auto md:px-10 ${state.confirmedFilm && imagePath(state.confirmedFilm?.backdrop_path) ? "-mt-10 md:-mt-80 lg:-mt-96 xl:-mt-[450px]" : ""}`}>
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
                {/* left - poster */}
                {state.confirmedFilm &&
                  <div className='w-full min-w-[150px] lg:w-[320px] xl:w-[380px] 2xl:w-[400px] cursor-pointer'>
                    <img
                      src={state.confirmedFilm?.poster_path ? image500(state.confirmedFilm?.poster_path) : fallbackMoviePoster}
                      alt={state.confirmedFilm?.title}
                      className=''
                      onClick={() => handleViewFilm(state.confirmedFilm?.id)}
                    />
                  </div>
                }

                {/* right - details */}
                <div className={`flex w-full justify-start tour-edit ${state.confirmedFilm ? "flex-col gap-2 md:gap-4" : "justify-between gap-8"}`}>

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
                    <div className="cursor-pointer body [&_div]:hover:underline" onClick={() => setShowVoteResult(true)}>
                      <span className='text-foreground-dark'>Selected Film</span><br />
                      <div>{state.confirmedFilm.title} ({state.confirmedFilm.release_date?.split("-")[0]})</div>
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

                  <div className='flex flex-col gap-y-2'>
                    {/* date */}
                    {state.date &&
                      <Popover
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                      >
                        <PopoverTrigger asChild >
                          <div className="flex flex-col gap-y-0 cursor-pointer [&_div]:hover:underline">
                            <span className='body text-foreground-dark'>Date</span>
                            <div className={`body transition-all duration-500 ease-in-out ${isPending ? "text-foreground-dark" : "text-foreground"}`}>
                              {/* show only date */}
                              {localDateTime.split('·')[0]}
                              <span className='italic small text-foreground-dark'>
                                {
                                  new Date(state.date) > new Date() &&
                                  ` (in ${Math.floor((new Date(state.date) - new Date()) / (1000 * 60 * 60 * 24)) + 1} days)`
                                }
                              </span>
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="flex flex-col w-auto p-2 space-y-2"
                        >
                          <div className="rounded-md">
                            <Calendar
                              mode="single"
                              selected={state.date}
                              onSelect={(date) => handleReschedule(date, "date")}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    }


                    {/* time */}
                    {state.date &&
                      <Popover
                        open={isHourMinutePickerOpen}
                        onOpenChange={setIsHourMinutePickerOpen}
                      >
                        <PopoverTrigger asChild >
                          <div className="flex flex-col gap-y-0 cursor-pointer [&_div]:hover:underline">
                            <span className='body text-foreground-dark'>Time</span>
                            <div className={`body transition-all duration-500 ease-in-out ${isPending ? "text-foreground-dark" : "text-foreground"}`}>
                              {localDateTime.split('·')[1]}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="flex flex-col w-auto p-2 space-y-2"
                        >
                          <div className="gap-2 rounded-md flex-between">
                            <HourMinutePicker
                              formData={{ date: state.date }}
                              setFormData={() => dispatch({ type: 'SET_DATE', payload: new Date(state.date) })}
                            />
                            <button
                              className="text-accent h3"
                              onClick={() => handleReschedule(state.date, "hourMinute")}>
                              <PiKeyReturnFill />
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    }
                    {/* date & time */}
                  </div>

                  {/* Guest List */}
                  <div className=''>
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
              setConfirmedFilm={handleSetConfirmedFilm}
              showVoteResult={showVoteResult}
              setShowVoteResult={setShowVoteResult}
              isOpen={filmpollOpen}
              onStateChange={handleStateChange}
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