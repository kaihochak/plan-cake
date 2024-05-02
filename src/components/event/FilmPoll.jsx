import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent } from "@/components/ui/voteSelectDialog";
import VoteResult from "@/components/event/VoteResult";
import GuestSelection from "@/components/event/GuestSelection";

const FilmPoll = ({ formData, setFormData }) => {
  const [showFilmSearch, setShowFilmSearch] = useState(false);
  const [showGuestSelection, setShowGuestSelection] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showVoteResult, setShowVoteResult] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState(formData.selectedFilms);
  const [votedFilms, setVotedFilms] = useState([]);         // the voted films of the selected user

  const host = localStorage.getItem('host');

  useEffect(() => {
    if(host && !selectedGuest) {     
      setSelectedGuest("0")
    }
  }), [];
 
  // call api to get the voted films of the selected user
  useEffect(() => {
    // set the votedFilms by usingFormData
    setVotedFilms( formData.guestList.filter(guest => (guest.id === selectedGuest)) )

    console.log(selectedGuest);

    // check whether user is logged in
    // const selectedGuest = null; // user logged in will be implemented in the future

    
    if (!selectedGuest && !host) {
      console.log("GuestList: ", formData.guestList);
      setShowGuestSelection(true);
    }
  }, [selectedGuest]);
  
  // when votedFilms is updated, update the formData
  useEffect(() => {
    setFormData(previous => ({
      ...previous,
      votedFilms
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  /**********************************************************************************
   * Modals
   * ******************************************************************************/


  const GuestSelectionModal = () => {
    return (
      <AlertDialog open={showGuestSelection} onOpenChange={setShowGuestSelection}>
        <AlertDialogContent hasClose={true} >
          <AlertDialogTitle>Add films to poll as</AlertDialogTitle>
          <GuestSelection
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
            formData={formData}
          />
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
        <SmallDialogContent hasClose={true} className="overflow-y-auto bg-primary text-secondary border-none w-[90%]">
          <VoteResult formData={formData}/>
        </SmallDialogContent>
      </SmallDialog>
    )
  }

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setShowFilmSearch}>
        <DialogContent hasClose={true} className="w-full h-full lg:w-[70%] lg:h-[80%] overflow-y-auto bg-primary text-secondary">
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

  /**********************************************************************************
   * Rendering
   * ******************************************************************************/

  return (
    <div className='mt-2 '>

      {/* Title */}
      <div className='flex justify-between'>
        <div className='subtitle'>Film</div>
        <Button
          size="md"
          className="w-[100px] h-[25px] border-none bg-accent"
          // onClick={() => setShowFilmSearch(true)}
          onClick={() => {
            if (selectedGuest) {
              setShowFilmSearch(true);
            } else {
              setShowGuestSelection(true);
            }
          }}
        >
          <p className='text-m-s text-accent-foreground'>Add Film</p>
        </Button>
      </div>

      {/* Film poll */}
      <div className='p-4 my-2 rounded-sm bg-border'>
        <div className='flex flex-row justify-end gap-2 text-m-m text-primary-foreground'>
          <button
            onClick={() => setShowVoteResult(true)}
          >
            View Result
          </button>
          <button>Sort by</button>
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
              />
            </div>
          ))}
        </div>
      </div>

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