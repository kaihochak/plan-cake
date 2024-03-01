import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventType from "@/components/createEventForm/CreateEventType";
import FilmSearch from "@/components/createEventForm/FilmSearch";
import EventDetails from "@/components/createEventForm/EventDetails";
import PreviewEvent from "@/components/createEventForm/PreviewEvent";
import ConfirmedEvent from "@/components/createEventForm/ConfirmedEvent";
import { BsArrowLeft } from "react-icons/bs";

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(2);
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
    "Event Created!"
  ];
  const totalSteps = 5;

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <section className="common-container max-w-[1024px] mx-auto">
      <header className="w-full">
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
      <div className="w-full">
        {currentStep === 0 && <CreateEventType formData={formData} nextStep={nextStep}/>}
        {currentStep === 1 && <EventDetails formData={formData} nextStep={nextStep}/>}
        {currentStep === 2 && <FilmSearch formData={formData} nextStep={nextStep}/>}
        {currentStep === 3 && <PreviewEvent formData={formData} nextStep={nextStep}/>}
        {currentStep === 4 && <ConfirmedEvent formData={formData}/>}
      </div>
    </section>
  );
};

export default CreateEvent;
