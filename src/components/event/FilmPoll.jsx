import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '@/components/film/FilmSearch';
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog"

const FilmPoll = ({ formData, setFormData }) => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);

  const handleApply = (formData) => {
    setFormData(formData);
    setshowFilmSearch(false);
  }

  useEffect(() => {
    console.log('formData:', formData);
  }
  , [formData]);

  const FilmSearchModal = () => {
    return (
      <Dialog open={showFilmSearch} onOpenChange={setshowFilmSearch}>
        <DialogContent hasClose={true} className="w-full h-full lg:w-[70%] lg:h-[80%] overflow-y-auto bg-primary text-secondary">
          <FilmSearch
            formData={formData}
            nextStep={handleApply}
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
    <div className='mt-2 text-m-m text-border md:text-[20px]'>

      {/* Title */}
      <div className='flex justify-between'>
        <div>Film</div>
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
        {/* 
        <FilmCard 
        /> */}
      </div>
    </div>
  )
}

export default FilmPoll