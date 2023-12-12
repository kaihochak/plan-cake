import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsFillPlusCircleFill } from 'react-icons/bs';

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Event data across all steps
  });
  const navigate = useNavigate(); 

  const title = ['Create Event', 'Event Details', 'Pick A Film', 'Preview Event']

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      if (window.confirm("Are you sure you want to leave this page?")) {
        navigate('/home');
      }
    }
  };

  const handleFinalize = () => {
    console.log("Finalize event creation with data: ", formData);
    // Here, handle the final submission logic
    // navigate('/event-created'); // Navigate to a confirmation page or another appropriate location
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const CreateEvent = () => (
    <div>
    </div>
  );

  const EventDetails = () => (
    <div>
    </div>
  );

  const PickAFilm = () => (
    <div>
    </div>
  );

    const PreviewEvent = () => (
    <div>
    </div>
    );

  const totalSteps = 2; // Update this based on your number of steps

  return (
    <section>
        <header>
            {/* Back Button */}
            <button className="text-m-2xl ml-1 mt-10 mb-6" onClick={prevStep}>
                <BsArrowLeft />
            </button>
            {/* Step Indicator */}
            <div className="flex justify-start items-center">
                <h2 className='text-m-2xl mb-3'>{title[currentStep]}</h2>
            </div>
        </header>

        {/* Current Step Content */}
        {currentStep === 0 && <CreateEvent/>}
        {currentStep === 1 && <EventDetails />}
        {currentStep === 2 && <PickAFilm />}
        {currentStep === 3 && <PreviewEvent />}

        {/* Next or Confirm Button */}
        {currentStep < totalSteps ? (
            <button onClick={nextStep}>Next</button>
        ) : (
            <button onClick={handleFinalize}>Confirm</button>
        )}
    </section>
  );
};

export default CreateEvent;
