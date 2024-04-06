import React, { useState } from 'react'
import { motion } from "framer-motion";
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'
import CommentSection from '@/components/event/CommentSection'
import FilmSearch from '@/components/film/FilmSearch';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

const PickAFilm = () => {
  /************************************************************************
 * Can get rid of this after filmSearch is refractored
 ************************************************************************/

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    date: "",
    location: "",
    guestList: [],
    selectedFilms: [],
    file: [],
    imageUrl: "",
    imageId: "",
  });

  const nextStep = (formData) => {
    if (formData) { setFormData({ ...formData, ...formData }); }

    // submit form data to create event
    if (currentStep === 3) {
      // wait until loading is done
      if (!isLoadingCreate) {
        handleSubmit(formData);
      } else {
        return;
      }
    }

    // If we're on the last step, navigate to the event page
    if (currentStep === 4) { navigate(`/event/${newPost.id}`); }

    setCurrentStep(currentStep + 1);
  };

  /************************************************************************
 * Different Components, can be refractored into separate files later
 ************************************************************************/


  return (
    <div className='w-full p-10 mx-auto'>
      <ResizablePanelGroup
        direction="horizontal"
        className="border rounded-lg"
      >

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">

            <ResizablePanel defaultSize={75}>
              <div className='p-10'>
                {/* Guests */}
                <GuestList />

                {/* Film Poll */}
                <FilmPoll />
              </div>

            </ResizablePanel>

            <ResizableHandle/>

            {/* CommentSection */}
            <ResizablePanel defaultSize={25}>
              <div className='p-10'>
                <CommentSection />
              </div>
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle/>

        {/* Film Search */}
        <ResizablePanel defaultSize={50}>
          <motion.div className="p-10 " variants={item}>
            <FilmSearch formData={formData} nextStep={nextStep} />
          </motion.div>
        </ResizablePanel>



      </ResizablePanelGroup>


    </div>
  )
}

/************************************************************************
 *  FRAME MOTION VARIANTS
 ************************************************************************/

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default PickAFilm
