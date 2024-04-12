import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const FilmPool = () => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [formData, setFormData] = useState({
    selectedFilms: [],
  });
  const [watchlistObject, setWatchlistObject] = useState({});
  const [users, setUsers] = useState([]);

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setshowFilmSearch}>
        <DialogContent className="bg-primary text-secondary">
          <FilmSearch 
            filteredResults={filteredResults}
            setFilteredResults={setFilteredResults}
            formData={formData}
            setFormData={setFormData}
            watchlistObject={watchlistObject}
            setWatchlistObject={setWatchlistObject}
            users={users}
            setUsers={setUsers}
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
      <FilmSearchModal />

      {/* Film poll */}
      <div className='p-4 my-2 rounded-sm bg-border'>
        <div className='flex flex-row justify-end gap-2 text-m-m text-primary-foreground'>
          <button>View Result</button>
          <button>Sort by</button>
        </div>
        {/* 
        <FilmCard 
        /> */}
      </div>



    </div>
  )
}

export default FilmPool