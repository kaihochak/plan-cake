import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilmSearch from "@/components/pickAFilm/filmSearch";
import EventDetailsForm from "@/components/form/eventDetailsForm";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import filmData from "@/data/filmData";

// implementation of CreateEvent
const CreateEvent = () => {
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    eventName: "",
    date: "",
    location: "",
    guestList: [],
  });
  const [validationMessages, setValidationMessages] = useState({
    eventType: "",
    eventName: "",
    eventLocation: "",
  });

  // State for the selected items in the PickAFilm component
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pickafilmData, setPickafilmData] = useState(filmData);

  const navigate = useNavigate();

  const title = [
    "Create Event",
    "Event Details",
    "Pick A Film",
    "Preview Event",
  ];
  const totalSteps = 4;

  const nextStep = () => {
    let isValid = true;
    let newValidationMessages = {};
    let required = "*Required"

    console.log("formData.eventName: " + formData.eventName );
    console.log("formData.eventLocation: " + formData.eventLocation );

    // Check if the event type is selected in step 1
    if (currentStep === 0 && formData.eventType === "") {
      newValidationMessages.eventType = required;
      isValid = false;
    } 
    // Check for step 2
    else if (currentStep === 1 ) {
      if (formData.eventName === "") {
        newValidationMessages.eventName = required;
        isValid = false;
      } 
      if (formData.eventLocation === "") {
        newValidationMessages.eventLocation = required;
        isValid = false;
      }
    }

    // Update the state with new validation messages
    setValidationMessages(newValidationMessages);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      if (window.confirm("Are you sure you want to leave this page?")) {
        navigate("/");
      }
    }
  };

  const handleFinalize = () => {
    console.log("Finalize event creation with data: ", formData);
    // Here, handle the final submission logic
    // navigate('/event-created'); // Navigate to a confirmation page or another appropriate location
  };

  // Handler to update the event type
  const handleSelectEventType = (type) => {
    if (type === formData.eventType) {
      setFormData({ ...formData, eventType: "" });
      return;
    }
    setFormData({ ...formData, eventType: type });
  };

  // Handler to update the formData state
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }, []);  
  
  // Handler specifically for the date since it's not a typical input
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, eventDate: newDate });
  };

  // handle selection change from PickAFilm (filmSearch.jsx)
  const handleSelectionChange = useCallback((newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  }, []); // Dependencies array is empty, so this function is created only once

  useEffect(() => {
    console.log(formData.eventType);
  }, [formData.eventType]);
  
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
        <form className="space-y-8 mt-6">
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
        </form>
    </div>
  );

  const EventDetails = () => (
    <EventDetailsForm
      key="event-details-form"
      formData={formData}
    />
  );

  const PickAFilm = () => (
    <FilmSearch 
      onSelectionChange={handleSelectionChange} 
      selectedItems={selectedItems} 
      searchTerm={searchTerm}
    />
  );

  const PreviewEvent = () => <div></div>;

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

      {/* Next or Confirm Button */}
      {currentStep < totalSteps ? (
        <Button onClick={nextStep} type="submit" className="mt-10">
          Next
        </Button>
      ) : (
        <button onClick={handleFinalize}>Confirm</button>
      )}
    </section>
  );
};

export default CreateEvent;
