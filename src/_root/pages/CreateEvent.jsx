import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventType from "@/components/createEventForm/CreateEventType";
import FilmSearch from "@/components/createEventForm/FilmSearch";
import EventDetails from "@/components/createEventForm/EventDetails";
import PreviewEvent from "@/components/createEventForm/PreviewEvent";
import ConfirmedEvent from "@/components/createEventForm/ConfirmedEvent";
import { BsArrowLeft } from "react-icons/bs";
import { useCreateEvent } from "../../lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const [currentStep, setCurrentStep] = useState(0);
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
  const [newPost, setNewPost] = useState(null);

  // Query to create a new event
  const { mutateAsync: createEventToDB, isPending: isLoadingCreate } = useCreateEvent();

  //  Go to the previous step
  const prevStep = () => {
    // If we're not on the first step, go to the previous step
    if (currentStep > 0) { setCurrentStep(currentStep - 1); }
    // If we're on the first step, prompt the user to confirm leaving the page
    else {
      if (window.confirm("Are you sure you want to leave this page?")) {
        navigate("/");
      }
    }
  };

  // Go to the next step
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

  // Submit form data to create event
  const handleSubmit = async (value) => {
    const newPost = await createEventToDB({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        variant: "error",
        title: `Create event failed. Please try again.`,
      });
    } else {
      toast({
        variant: "success",
        title: `Event created successfully.`,
      });
      setNewPost(newPost);
    }
  };


  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <section className="common-container">
      <div className="flex flex-col w-full max-w-[1024px] mx-auto">
        <header className="w-full">
          {/* Back Button */}
          <button className="text-m-2xl ml-1 mt-10 mb-6" onClick={prevStep}>
            <BsArrowLeft />
          </button>
        </header>
        {/* Current Step Content */}
        <div className="w-full">
          {currentStep === 0 && <CreateEventType formData={formData} nextStep={nextStep}/>}
          {currentStep === 1 && <EventDetails formData={formData} nextStep={nextStep}/>}
          {currentStep === 2 && <FilmSearch formData={formData} nextStep={nextStep}/>}
          {currentStep === 3 && <PreviewEvent formData={formData} nextStep={nextStep} isLoadingCreate={isLoadingCreate}/>}
          {currentStep === 4 && <ConfirmedEvent formData={formData} goToEventPage={nextStep}/>}
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;