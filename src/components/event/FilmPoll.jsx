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
import { useUpdatePickAFilmGuestList } from "@/lib/react-query/queries";

const FilmPoll = ({ formData, setFormData, selectedGuest, setSelectedGuest }) => {
  const [showFilmSearch, setShowFilmSearch] = useState(false);
  const [showGuestSelection, setShowGuestSelection] = useState(false);
  const [showVoteResult, setShowVoteResult] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedFilms, setSelectedFilms] = useState(formData.selectedFilms);
  const [sortedFilms, setSortedFilms] = useState(formData.selectedFilms);
  const [votedFilms, setVotedFilms] = useState([]);
  const host = localStorage.getItem('host');

  // Query
  const { mutate: updateGuestList, isLoading } = useUpdatePickAFilmGuestList();

  // if it's the host, set the host to be the current user
  useEffect(() => {
    if (host && !selectedGuest) setSelectedGuest("0")
  }), [host];

  // update formData, when votedFilms is updated
  useEffect(() => {
    if (votedFilms.length === 0) return;
    setFormData(previous => ({
      ...previous,
      guestList: previous.guestList.map(guest => (
        guest.id === selectedGuest ? { ...guest, filmsVoted: votedFilms } : guest
      ))
    }))

    handleSortChange(sortOrder);
  }, [votedFilms]);

  // sort the films, when selectedFilms is updated
  useEffect(() => {
    handleSortChange(sortOrder);
  }, [selectedFilms]);

  // set the voted films, when the selected guest changes
  useEffect(() => {
    // call api to get the voted films of the selected user
    setVotedFilms(formData.guestList.find(guest => (guest.id === selectedGuest))?.filmsVoted);
    handleSortChange(sortOrder);
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
              selectedGuest={selectedGuest}
              setFormData={setFormData}
              setSelectedGuest={setSelectedGuest}
              formData={formData}
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

  const VoteResultModal = () => {
    return (
      <SmallDialog open={showVoteResult} onOpenChange={setShowVoteResult}>
        <SmallDialogContent hasClose={true} className="overflow-y-auto custom-scrollbar bg-primary text-secondary border-border w-[90%]">
          <VoteResult
            formData={formData}
            setFormData={setFormData}
            setShowVoteResult={setShowVoteResult}
          />
        </SmallDialogContent>
      </SmallDialog>
    )
  }

  const getVotes = (film) => {
    let count = formData.guestList.filter(guest => guest.filmsVoted?.some(vote => vote.id.toString() === film.id.toString())).length
    return count;
  }


  /**********************************************************************************
  * Film Search
  * ******************************************************************************/

  const FilmSearchModal = () => {
    if (!showFilmSearch) return null;
    else console.log('showFilmSearch', showFilmSearch);

    return (
      <Dialog open={showFilmSearch} onOpenChange={setShowFilmSearch}>
        <DialogContent 
          hasClose={false} 
          className="max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] overflow-y-auto custom-scrollbar bg-primary text-secondary"
        >
          <FilmSearch
            setModalOpen={setShowFilmSearch}
            formData={formData}
            nextStep={handleSearchApply}
            hasTitle={false}
            selectedGuest={selectedGuest}
            protectedFilms={formData.selectedFilms}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // handle search apply, prompt to user selection
  const handleSearchApply = (newData) => {
    setShowFilmSearch(false);
    const newSelectedFilms = newData.selectedFilms;
    // set parent state
    setFormData(previous => ({
      ...previous,
      selectedFilms: newSelectedFilms
    }))

    // set local state
    setSelectedFilms(newSelectedFilms);
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

  const handleSortChange = (value) => {
    
    if (!selectedFilms) return;
    
    let sortedItems = sortFilms(value, selectedFilms);
    if (value === 'Default') value = '';

    setSortedFilms(sortedItems);
    setSortOrder(value);
  }

  /**********************************************************************************
   * Film Display
   *******************************************************************************/

  const FilmDisplay = () => {
    return (
      <div className='p-4 my-2 rounded-sm bg-primary-light'>
        {/* Buttons */}
        <div className='flex-row gap-4 pb-4 flex-between '>
          <button
            className="button-text text-primary-foreground flex-between gap-x-2"
            onClick={() => setShowVoteResult(true)}>
            <p>View Result</p>
            <PiFilmStripBold className="w-5 h-5 mb-[0.5]" />
          </button>
          <Select
            value={sortOrder}
            onValueChange={handleSortChange}
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
          {sortedFilms.length === 0 && (<div className='col-span-4 py-32 mx-auto md:py-36 text-primary-foreground h3'>No film selected</div>)}
          {sortedFilms.map((item) => (
            <div key={item.id}>
              <FilmCard
                item={item}
                selectedFilms={votedFilms}
                setSelectedFilms={setVotedFilms}
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
    <div className='mt-2'>
      {/* Title */}
      <div className='flex justify-between'>
        <div className='subtitle'>Film</div>
        <Button
          variant="accent"
          className="w-[100px] h-[25px] md:w-[120px] md:h-[35px] "
          onClick={() => {
            console.log("test");
            console.log('selectedGuest', selectedGuest);
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
export default FilmPoll