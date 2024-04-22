import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<<<<<<< Updated upstream
const FilmPool = () => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [formData, setFormData] = useState({
    selectedFilms: [],
  });
  const [watchlistObject, setWatchlistObject] = useState({});
  const [users, setUsers] = useState([]);
=======
const FilmPoll = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState([]);
  
  const handleSearchApply = (formData) => {
    const newSelectedFilms = formData.selectedFilms;
    console.log(newSelectedFilms);

    setSelectedFilms(newSelectedFilms); //update local selected films

    setshowFilmSearch(false);
  }

  // update parent selected films
  useEffect(() => { 
    setParentFormData(previous => ({ 
      ...previous, 
      selectedFilms
    }))
  }, [selectedFilms]);
>>>>>>> Stashed changes

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setshowFilmSearch}>
<<<<<<< Updated upstream
        <DialogContent className="bg-primary text-secondary h-[100%] w-[100%] overflow-y-auto">
          <FilmSearch 
            filteredResults={filteredResults}
            setFilteredResults={setFilteredResults}
            formData={formData}
            setFormData={setFormData}
            watchlistObject={watchlistObject}
            setWatchlistObject={setWatchlistObject}
            users={users}
            setUsers={setUsers}
=======
        <DialogContent hasClose={true} className="w-full h-full lg:w-[70%] lg:h-[80%] overflow-y-auto bg-primary text-secondary">
          <FilmSearch
            formData={parentFormData}
            nextStep={handleSearchApply}
>>>>>>> Stashed changes
            hasTitle={false}
          />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <div className='mt-2 text-m-m text-border md:text-[20px]'>


      {/* Guess */}


      {/* Poster */}
      {/* if no film is selected, make it a button and ask users to add films */}

      {/* Film Poll Section */}
      <div className='flex justify-between'>
        Films

        <Button
          size="md"
          className="w-[100px] h-[25px] border-none bg-accent"
          onClick={() => setshowFilmSearch(true)}
        >
          <p className='text-m-s text-accent-foreground'>Add Film</p>
        </Button>
      </div>

      {/* FilmSearch */}
      <div className=''>
        <FilmSearchModal />
      </div>

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

export default FilmPool