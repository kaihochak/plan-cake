import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent } from "@/components/ui/voteSelectDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/sortSelect";
import VoteResult from "@/components/event/VoteResult";
import GuestSelection from "@/components/event/GuestSelection";
import { PiFilmStripBold } from "react-icons/pi";
import { useUpdatePickAFilm } from "@/lib/react-query/queries";
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

const FilmPoll = ({ selectedFilms, setSelectedFilms, guestList, id, selectedGuest, setSelectedGuest, setGuestList, setConfirmedFilm }) => {
	const { toast } = useToast()
  const [showFilmSearch, setShowFilmSearch] = useState(false);
  const [showGuestSelection, setShowGuestSelection] = useState(false);
  const [showVoteResult, setShowVoteResult] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortedFilms, setSortedFilms] = useState(null);
  const [votedFilms, setVotedFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = localStorage.getItem('host');

  // Query
  const { mutateAsync: updatePickAFilm, isLoading } = useUpdatePickAFilm();


  useEffect(() => {
    console.log('re-mounded, time down to second', new Date().toLocaleTimeString());
  }, []);

  // if it's the host, set the host to be the current user
  useEffect(() => {
    if (host && !selectedGuest) setSelectedGuest("0");
  }, [host]);

  // sort the films, when selectedFilms is updated
  useEffect(() => {
    // https://stackoverflow.com/questions/62617690/array-shows-empty-but-should-have-one-element
    // not sure why if not setting a delay, the array would be empty with one element, leading to not populating the films
    setLoading(true);
    setTimeout(() => {
      handleSortChange(sortOrder, selectedFilms);
      setLoading(false);
    }, 200);
  }, [selectedFilms, sortOrder]);

  // set the voted films, when the selected guest changes
  useEffect(() => {
    setVotedFilms(guestList?.find(guest => (guest.id === selectedGuest))?.filmsVoted);
    handleSortChange(sortOrder, selectedFilms);
  }, [selectedGuest]);

  /**********************************************************************************
   * Guest Selection
   * ******************************************************************************/

  const GuestSelectionModal = () => {
    return (
      <AlertDialog open={showGuestSelection} onOpenChange={setShowGuestSelection}>
        <AlertDialogContent>
          <AlertDialogTitle>Who are you voting as?</AlertDialogTitle>
          <div className='p-6'>
          <GuestSelection
              id={id}
              guestList={guestList}
              selectedGuest={selectedGuest}
              setSelectedGuest={setSelectedGuest}
              setGuestList={setGuestList}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  /**********************************************************************************
   * Votes
   * ******************************************************************************/

  // Update the guestList to DB
  const handleUpdateGuestList = async (newGuestList) => {
    // convert guestList back to string before sending to the DB
    newGuestList = newGuestList.map((guest) => JSON.stringify(guest));

    // send the new guest to the DB
    let updatedGuestList = await updatePickAFilm({
      id: id,
      guestList: newGuestList
    });

    // show a toast message
    if (!updatedGuestList) {
      toast({
        variant: "destructive",
        title: (
          <p className='subtitle'>🚨 Error adding guest</p>
        ),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error adding <span className='italic subtitle'>${newGuest.name}</span> to the guest list.
          </p>
        ),
      });
      return false;
    } else {
      return true;
    }
  }

  const handleVotedFilmsOptimistic = async (allVotedFilms) => {
    // store existing guestList
    const existingGuestList = guestList;

    // update the voted films in local state
    setVotedFilms(allVotedFilms);

    // get the new guestList with the updated voted films
    const newGuestList = guestList.map(guest => {
      if (guest.id === selectedGuest) {
        return { ...guest, filmsVoted: allVotedFilms };
      }
      return guest;
    });

    // update the guestList in parent state 
    setGuestList(newGuestList);

    // update the guestList in the DB
    const success = await handleUpdateGuestList(newGuestList);

    // if there was an error, revert the guestList in local state
    if (!success) {
      setGuestList(existingGuestList);
    }

    // update the sorted films
    handleSortChange(sortOrder, selectedFilms);
  }

  const VoteResultModal = () => {
    return (
      <SmallDialog open={showVoteResult} onOpenChange={setShowVoteResult}>
        <SmallDialogContent hasClose={true} className="overflow-y-auto custom-scrollbar bg-primary text-secondary border-border w-[90%] max-w-[1024px] xl:w-[70%]">
          <VoteResult
            selectedFilms={selectedFilms}
            guestList={guestList}
            setConfirmedFilm={setConfirmedFilm}
            setShowVoteResult={setShowVoteResult}
          />
        </SmallDialogContent>
      </SmallDialog>
    )
  }

  const getVotes = (film) => {
    let count = guestList.filter(guest => guest.filmsVoted?.some(vote => vote.id.toString() === film.id.toString())).length
    return count;
  }

  /**********************************************************************************
  * Film Search
  * ******************************************************************************/

  const FilmSearchModal = () => {
    if (!showFilmSearch) return null;

    return (
      <Dialog open={showFilmSearch} onOpenChange={setShowFilmSearch}>
        <DialogContent
          hasClose={false}
          className="max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] overflow-y-auto custom-scrollbar bg-primary text-secondary"
        >
          <FilmSearch
            selectedFilms={selectedFilms}
            nextStep={handleSearchApplyOptimistic}
            title={"Apply"}
            protectedFilms={selectedFilms}
            setModalOpen={setShowFilmSearch}
          />
        </DialogContent>
      </Dialog>
    )
  }


  // update the selectedFilms to DB
  const handleUpdateSelectedFilms = async (newSelectedFilms) => {

    // only send the id of the films to the DB
    newSelectedFilms = newSelectedFilms.map(film => film.id);

    // send the new selectedFilms to the DB
    let updatedSelectedFilms = await updatePickAFilm({
      id: id,
      selectedFilms: newSelectedFilms
    });

    // show a toast message
    if (!updatedSelectedFilms) {
      toast({
        variant: "destructive",
        title: (
          <p className='subtitle'>🚨 Error adding film</p>
        ),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error adding the film to the selected films.
          </p>
        ),
      });
      return false;
    } else {
      return true;
    }
  }

  // handle search apply, prompt to user selection
  const handleSearchApplyOptimistic = async (newData) => {
    // close the search modal
    setShowFilmSearch(false);

    // store existing selectedFilms
    const existingSelectedFilms = selectedFilms;
    // get the new selected films
    const newSelectedFilms = newData.selectedFilms;

    // set parent state
    setSelectedFilms(newSelectedFilms);

    // send to the DB
    const success = await handleUpdateSelectedFilms(newSelectedFilms);

    // if there was an error, revert the selectedFilms in local state
    if (!success) {
      setSelectedFilms(existingSelectedFilms);
    }
  }

  /**********************************************************************************
   * Sorting
   *******************************************************************************/

  const sortByVotedFilmsByCurrentUser = (sortedItems) => {
    if (!sortedItems || !votedFilms) return sortByVotes(sortedItems);

    // Split films into voted and unvoted
    let voted = [];
    let unvoted = [];
    sortedItems.forEach(item => {
      if (votedFilms.some(vote => vote.id.toString() === item.id.toString())) voted.push(item);
      else unvoted.push(item);
    });

    // Sort unvoted films by highest to lowest votes of all users
    voted = sortByVotes(voted);
    unvoted = sortByVotes(unvoted);

    // Return voted films first, then unvoted films
    return [...voted, ...unvoted];
  };

  const sortByVotes = (sortedItems) => {
    return sortedItems.sort((a, b) => {
      const aVotes = getVotes(a);
      const bVotes = getVotes(b);
      if (aVotes === bVotes) return 0;
      return aVotes > bVotes ? -1 : 1;
    });
  }

  const sortFilms = (sortBy, sortedItems) => {
    switch (sortBy) {
      case 'Default':
        sortedItems = sortByVotedFilmsByCurrentUser(sortedItems); // Sort from voted to not voted
        break;
      case 'Votes: High to Low':
        sortedItems = sortByVotes(sortedItems);
        break;
      case "Rating: High to Low":
        sortedItems = sortedItems.sort((a, b) => b.vote_average - a.vote_average); // if b > a, b comes first
        break;
      case "Rating: Low to High":
        sortedItems = sortedItems.sort((a, b) => a.vote_average - b.vote_average); // if a > b, b comes first
        break;
      case "Year: New to Old":
        sortedItems = sortedItems.sort((a, b) => parseInt(b.release_date.split("-")[0]) - parseInt(a.release_date.split("-")[0]));
        break;
      case "Year: Old to New":
        sortedItems = sortedItems.sort((a, b) => parseInt(a.release_date.split("-")[0]) - parseInt(b.release_date.split("-")[0]));
        break;
      default:
        sortedItems = sortByVotedFilmsByCurrentUser(sortedItems); // Sort from voted to not voted
        break;
    }

    return sortedItems;
  }

  const handleSortChange = (value, films) => {

    if (!films || films.length === 0) return;

    let sortedItems = sortFilms(value, films);
    if (value === 'Default') value = '';

    setSortedFilms(sortedItems);
    setSortOrder(value);
  }

  /**********************************************************************************
   * Film Display
   *******************************************************************************/

  const FilmDisplay = () => {
    return (
      <div className='px-4 py-2 my-2 rounded-sm bg-primary-light'>
        {/* Buttons */}
        <div className='flex-row gap-4 pb-2 flex-between '>
          <button
            className="button-text text-primary-foreground flex-between gap-x-2"
            onClick={() => setShowVoteResult(true)}>
            <p>View Result</p>
            <PiFilmStripBold className="w-5 h-5 mb-[0.5]" />
          </button>
          <Select
            value={sortOrder}
            onValueChange={value => handleSortChange(value, selectedFilms)}
          >
            <SelectTrigger className="w-[110px] lg:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="Votes: High to Low">Votes: High to Low</SelectItem>
              <SelectItem value="Year: Old to New">Year: Old to New</SelectItem>
              <SelectItem value="Year: New to Old">Year: New to Old</SelectItem>
              <SelectItem value="Rating: High to Low">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Film Cards */}
        <div className='grid grid-cols-2 gap-4 xl:gap-6 sm:grid-cols-3 md:grid-cols-4 '>
          {loading && !sortedFilms && (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative flex flex-col gap-y-2">
                <Skeleton className="aspect-w-1 aspect-h-[1.5]" />
              </div>
            ))
          )}

          {sortedFilms?.length === 0 || sortedFilms === null &&
            (<div className='col-span-4 py-32 mx-auto md:py-36 text-primary-foreground h3'>No film selected</div>)}

          {sortedFilms?.map((item) => (
            <div key={item.id}>
              <FilmCard
                item={item}
                selectedFilms={votedFilms}
                setSelectedFilms={handleVotedFilmsOptimistic}
                voteDisabled={!selectedGuest}
                setShowGuestSelection={!selectedGuest && setShowGuestSelection}
                votes={getVotes(item)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  /**********************************************************************************
   * Rendering
   * ******************************************************************************/

  return (
    <div className='flex flex-col gap-2'>
      {/* Title */}
      <div className='flex justify-between'>
        <div className='subtitle text-foreground-dark'>Film Poll</div>
        <Button
          variant="accent"
          className="w-[100px] h-[25px] md:w-[120px] md:h-[35px] "
          onClick={() => {
            if (selectedGuest) setShowFilmSearch(true);
            else setShowGuestSelection(true);
          }}
        >
          <p className='body'>Add Film</p>
        </Button>
      </div>

      {/* Film poll */}
      <FilmDisplay />

      {/* FilmSearch */}
      <FilmSearchModal />

      {/* Guest Selection Modal */}
      <GuestSelectionModal />

      {/* Vote Result Modal */}
      <VoteResultModal />
    </div>
  )
}
export default FilmPoll;