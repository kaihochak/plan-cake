import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from '../film/FilmSearch';

const FilmPool = () => {
  const [showFilmSearch, setshowFilmSearch] = useState(false);

  return (
    <div className='mt-2 text-m-m text-border md:text-[20px]'>
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

      {showFilmSearch && <FilmSearch formData={0} nextStep={2}/>}

      {/* Film poll */}
      <div className='bg-border p-4 my-2 rounded-sm'>
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