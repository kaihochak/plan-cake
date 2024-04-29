import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PickAFilmForm from "@/components/event/PickAFilmForm";

const PickAFilm = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  
  /*****************************************************************************
   * Rendering
   *****************************************************************************/
  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-12 xl:pt-0 md:pb-32'>
        <h2 className="title">Pick A Film</h2>
        <Button
          variant="select"
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          Pick
        </Button>
      </div>

      <PickAFilmForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  )
}

export default PickAFilm