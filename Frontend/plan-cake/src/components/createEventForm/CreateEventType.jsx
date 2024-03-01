import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

const CreateEventType = ({ formData: parentFormData, nextStep }) => {
    const [formData, setFormData] = useState(parentFormData);
    const [validationMessages, setValidationMessages] = useState({
        eventType: "",
    });

    // Handler to validate the event type and move to the next step
    const handleNextStep = () => {
        let isValid = true;
        let newValidationMessages = {};

        if (formData.eventType === "") {
            newValidationMessages.eventType = "*Required";
            isValid = false;
        }

        // Update the state with new validation messages
        setValidationMessages(newValidationMessages);

        if (isValid) {
            nextStep(formData);
        }
    }

    // Handler to update the event type
    const handleSelectEventType = (type) => {
        setFormData({ ...formData, eventType: type });
    };

    return (
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
                <Button onClick={handleNextStep} type="submit" className="mt-10">
                    Next
                </Button>
            </div>
        </div>
    )
}

export default CreateEventType
