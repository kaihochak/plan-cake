import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilmSearch from "@/components/pickAFilm/filmSearch";
import EventDetailsForm from "@/components/form/eventDetailsForm";
import PreviewEventForm from "@/components/form/previewEvent";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import filmData from "@/data/filmData";

// implementation of CreateEvent
const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventGuestList: [],
    selectedItems: []
  });
  const [validationMessages, setValidationMessages] = useState({
    eventType: "",
  });

  const navigate = useNavigate();

  const title = [
    "Create Event",
    "Event Details",
    "Pick A Film",
    "Preview Event",
  ];
  const totalSteps = 4;

  const prevStep = () => {
    // If we're not on the first step, go to the previous step
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } 
    // If we're on the first step, prompt the user to confirm leaving the page
    else {
      if (window.confirm("Are you sure you want to leave this page?")) {
        navigate("/");
      }
    }
  };


  const nextStep = (formData) => {
    if (formData) {
      setFormData({ ...formData, ...formData });      
    }
    setCurrentStep(currentStep + 1);
  };
  
  // Handler to update the event type
  const handleSelectEventType = (type) => {
    if (type === formData.eventType) {
      setFormData({ ...formData, eventType: "" });
      return;
    }
    setFormData({ ...formData, eventType: type });
  };

  const handleEventTypeNextStep = () => {
    let isValid = true;

    if (formData.eventType === "") {
      setValidationMessages({ ...validationMessages, eventType: "*Required" });
      isValid = false;
      return;
    } 

    // Update the state with new validation messages
    setValidationMessages({ ...validationMessages, eventType: "" });
    nextStep();
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  
  /*
    Step Content:
      1. Create
      2. Event Details
      3. PickAFilm (filmSearch.jsx)
      4. Preview
  */
  const Create = () => (
    <div>
      <p className="text-m-l mt-10">What type of events are you planning?</p>
        <div className="space-y-8 mt-6">
          {/* Event Type */}
          <div className="flex flex-col gap-y-4">
            <Button
              variant="select"
              type="button"
              onClick={() => handleSelectEventType("Film")}
              className={
                formData.eventType === "Film"
                  ? "bg-accent text-accent-foreground border-none"
                  : ""
              }
              
            >
              Movie Screening
            </Button>
            <Button disabled variant="select">
              Gig Buddies (coming soon)
            </Button>
            {validationMessages.eventType && <p className="text-destructive-foreground text-m-m">{validationMessages.eventType}</p>}
          </div>
          {/* Next */}
          <Button onClick={handleEventTypeNextStep} type="submit" className="mt-10">
            Next
          </Button>
        </div>
    </div>
  );

  const EventDetails = () => (
    <EventDetailsForm
      formData={formData}
      nextStep={nextStep}
    />
  );

  const PickAFilm = () => (
    <FilmSearch 
      formData={formData}
      nextStep={nextStep}
    />
  );

  const PreviewEvent = () => (
    <PreviewEventForm 
      formData = {formData}
    />
  );

  /*
    Return the appropriate step content based on the current step
  */
  return (
    <section>
      <header>
        {/* Back Button */}
        <button className="text-m-2xl ml-1 mt-10 mb-6" onClick={prevStep}>
          <BsArrowLeft />
        </button>
        {/* Title */}
        <div className="flex justify-start items-center">
          <h2 className="text-m-2xl mb-3">{title[currentStep]}</h2>
        </div>
      </header>

      {/* Current Step Content */}
      {currentStep === 0 && <Create />}
      {currentStep === 1 && <EventDetails />}
      {currentStep === 2 && <PickAFilm />}
      {currentStep === 3 && <PreviewEvent />}
    </section>
  );
};

export default CreateEvent;
