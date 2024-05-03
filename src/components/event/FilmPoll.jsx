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

const FilmPoll = ({ formData, setFormData, selectedGuest, setSelectedGuest }) => {
  const [showFilmSearch, setShowFilmSearch] = useState(false);
  const [showGuestSelection, setShowGuestSelection] = useState(false);
  const [showVoteResult, setShowVoteResult] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState(formData.selectedFilms);
  const [votedFilms, setVotedFilms] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const host = localStorage.getItem('host');

  // if it's the host, set the host to be the current user
  useEffect(() => {
    if (host && !selectedGuest) setSelectedGuest("0")
  }), [];

  // call api to get the voted films of the selected user
  useEffect(() => {
    setVotedFilms(formData.guestList.find(guest => (guest.id === selectedGuest))?.filmsVoted);
  }, [selectedGuest]);

  // sort the films
  const sortFilms = (order) => {
    const films = [...selectedFilms]; // Create a copy to avoid directly mutating state
    if (order === 'asc') {
      films.sort((a, b) => a.title.localeCompare(b.title)); // Sort ascending
    } else if (order === 'desc') {
      films.sort((a, b) => b.title.localeCompare(a.title)); // Sort descending
    }
    setSelectedFilms(films);
  };

  // when votedFilms is updated, update the formData
  useEffect(() => {
    setFormData(previous => ({
      ...previous,
      guestList: previous.guestList.map(guest => (
        guest.id === selectedGuest ? { ...guest, filmsVoted: votedFilms } : guest
      ))
    }))
  }, [votedFilms]);

  // handle search apply, prompt to user selection
  const handleSearchApply = (formData) => {
    setShowFilmSearch(false);
    const newSelectedFilms = formData.selectedFilms;
    setSelectedFilms(newSelectedFilms); //update local selected films
  }

  // update selected films
  useEffect(() => {
    setFormData(previous => ({
      ...previous,
      selectedFilms
    }))
  }, [selectedFilms]);

  /**********************************************************************************
   * Modals
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

  const VoteResultModal = () => {
    return (
      <SmallDialog open={showVoteResult} onOpenChange={setShowVoteResult}>
        <SmallDialogContent hasClose={true} className="overflow-y-auto custom-scrollbar bg-primary text-secondary border-border w-[90%]">
          <VoteResult formData={formData} />
        </SmallDialogContent>
      </SmallDialog>
    )
  }

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setShowFilmSearch}>
        <DialogContent hasClose={true} className="w-full h-full lg:w-[85%] lg:h-[85%] overflow-y-auto custom-scrollbar bg-primary text-secondary">
          <FilmSearch
            formData={formData}
            nextStep={handleSearchApply}
            hasTitle={false}
            selectedGuest={selectedGuest}
            protectedFilms={selectedFilms}
          />
        </DialogContent>
      </Dialog>
    )
  }

  const FilmDisplay = () => {
    return (
      <div className='p-4 my-2 rounded-sm bg-primary-light'>
        <div className='flex-row gap-4 pb-2 flex-between '>
          <button
            className="button-text text-primary-foreground flex-between gap-x-2"
            onClick={() => setShowVoteResult(true)}>
            <p>View Result</p>
            <PiFilmStripBold className="w-5 h-5 mb-1" />
          </button>
          <Select>
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
        <div className='grid grid-cols-2 gap-4 xl:gap-6 sm:grid-cols-3 md:grid-cols-4 '>
          {selectedFilms.length === 0 && (
            <div className='col-span-4 py-32 mx-auto md:py-36 text-primary-foreground h3'>No film selected</div>
          )}
          {selectedFilms.map((item) => (
            <div key={item.id}>
              <FilmCard
                item={item}
                selectedFilms={votedFilms}
                setSelectedFilms={setVotedFilms}
                voteDisabled={!selectedGuest}
                setShowGuestSelection={!selectedGuest && setShowGuestSelection}
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