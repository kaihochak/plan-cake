import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/guestSelectDialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel
} from "@/components/ui/select";


const FilmPoll = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);
  const [showGuestSelection, setshowGuestSelection] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState([]);

  // handle search apply, prompt to user selection
  const handleSearchApply = (formData) => {
    setshowFilmSearch(false);

    // check whether user is logged in
    const user = null; // user logged in will be implemented in the future
    if (!user) {
      console.log("GuestList: ", parentFormData.guestList);
      setshowGuestSelection(true);
    }


    const newSelectedFilms = formData.selectedFilms;
    console.log(newSelectedFilms);

    setSelectedFilms(newSelectedFilms); //update local selected films

  }

  // update parent selected films
  useEffect(() => {
    setParentFormData(previous => ({
      ...previous,
      selectedFilms
    }))
  }, [selectedFilms]);

  useEffect(() => {
    console.log(parentFormData);
  }, [parentFormData]);

  /**********************************************************************************
 * Function for guest vote
 * ******************************************************************************/

  // Guest Selection for voting films
  const GuestSelection = () => {

    // handle guest selection
    const handleGuestSelection = (id) => {

      setParentFormData(prevFormData => {
        // Map through the guestList to find the correct guest and update their filmsVoted
        const updatedGuestList = prevFormData.guestList.map(guest => {
          if (guest.id === id) {
            const updateFilmVoted = selectedFilms.filter(film => {
              if (!guest.filmsVoted.includes(film.id)) {
                return film.id;
              }
            })

            if (updateFilmVoted.length > 0) {
              return {
                ...guest,
                filmsVoted: [...guest.filmsVoted, ...updateFilmVoted]
              }
            }
          }

          return guest;
        })

        // update the guestList
        return {
          ...prevFormData,
          guestList: updatedGuestList
        }
      })
      setshowGuestSelection(false);
    }


    return (
      <div className=''>
        {/* render each guest */}
        <Select onValueChange={handleGuestSelection}>
          <SelectTrigger className="mb-6">
            <SelectValue placeholder="Select your name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              {parentFormData.guestList.map((item) => (
                <SelectItem key={item.id} value={`${item.id}`} >{item.name}</SelectItem>
              ))}
            </SelectGroup>


            {/* Option 1: Perhaps we can use small dialog, see import at the top, which would cover this whole dialog */}
            {/* Option 2: not using dialog, since guest selection is already a dialog, you would have to think about how to put the input for name */}

            {/* when this part is done, we have to make the onChange function, which would be creating a new guest in formData using setFormData, etc. */}

            {/*             
            <AlertDialog>
              <AlertDialogTrigger className="flex w-full py-3 pl-8 rounded-sm p-medium-14 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>New Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Input type="text" placeholder="Category name" className="mt-3 input-field" onChange={(e) => setNewCategory(e.target.value)} />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
          </SelectContent>
        </Select>

        {/* Buttons */}
        <div className='flex w-full space-x-2'>
          <button className="flex-grow px-4 py-2 bg-transparent border rounded-md border-secondary-default text-secondary-default">New Guest</button>
          <button className="flex-grow px-4 py-2 bg-transparent border rounded-md border-secondary-default text-secondary-default">Confirm</button>
        </div>
      </div>
    )
  }


  /**********************************************************************************
   * Modals
   * ******************************************************************************/

  const GuestSelectionModal = () => {
    return (
      <SmallDialog open={showGuestSelection} onOpenChange={setshowGuestSelection}>
        <SmallDialogContent hasClose={true} className="overflow-y-auto bg-primary text-secondary border-none w-[90%]">
          <div>Add films to poll as</div>
          <GuestSelection />
        </SmallDialogContent>
      </SmallDialog>
    )
  }

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setshowFilmSearch}>
        <DialogContent hasClose={true} className="w-full h-full lg:w-[70%] lg:h-[80%] overflow-y-auto bg-primary text-secondary">
          <FilmSearch
            formData={parentFormData}
            nextStep={handleSearchApply}
            hasTitle={false}
          />
        </DialogContent>
      </Dialog>
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
          size="md"
          className="w-[100px] h-[25px] border-none bg-accent"
          onClick={() => setshowFilmSearch(true)}
        >
          <p className='text-m-s text-accent-foreground'>Add Film</p>
        </Button>
      </div>

      {/* FilmSearch */}
      <FilmSearchModal />

      {/* Guest Selection Modal */}
      <GuestSelectionModal />

      {/* Film poll */}
      <div className='p-4 my-2 rounded-sm bg-border'>
        <div className='flex flex-row justify-end gap-2 text-m-m text-primary-foreground'>
          <button>View Result</button>
          <button>Sort by</button>
        </div>
        <div className='grid grid-cols-2 gap-4 xl:gap-6 sm:grid-cols-3 md:grid-cols-4'>
          {selectedFilms.map((item) => (
            <div key={item.id}>
              <FilmCard
                item={item}
                selectedFilms={selectedFilms}
                setSelectedFilms={setSelectedFilms}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default FilmPoll