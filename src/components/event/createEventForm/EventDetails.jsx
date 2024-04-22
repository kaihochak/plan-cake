import React, { useState, useEffect } from "react";

// components from Shadcn
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/shared/FileUploader";
import { convertFileToUrl } from "@/lib/utils";


const EventDetails = ({ formData: parentFormData, nextStep }) => {
    const [date, setDate] = useState();
    const [formData, setFormData] = useState(parentFormData);
    const [validationMessages, setValidationMessages] = useState({
        title: "",
        location: "",
    });

    const handleNextStep = () => {
        let isValid = true;
        let newValidationMessages = {};

        if (formData.title === "") {
            newValidationMessages.title = "*Required";
            isValid = false;
        }
        
        if (formData.location === "") {
            newValidationMessages.location = "*Required";
            isValid = false;
        }

        // Update the state with new validation messages
        setValidationMessages(newValidationMessages);
        if (isValid) {
            nextStep(formData);
        }
    }

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    }

    const handleLocationChange = (e) => {
        setFormData({ ...formData, location: e.target.value });
    }

    const handleGuestsChange = (e) => {
        setFormData({ ...formData, guests: e.target.value });
    }

    const handleImageChange = (file) => {
        setFormData({ ...formData, imageUrl: convertFileToUrl(file[0]), file: file});
    }

    return (
        <div className="mt-6 space-y-8 pb-44 ">
            <h2 className="mb-3 text-m-2xl">Event Details</h2>
            
            {/* Upload Image*/}
            <FileUploader
                fieldChange={(file) => handleImageChange(file)}
                mediaUrl={formData.imageUrl}
            />

            {/* Event Name */}
            <div>
                <Input
                    name="title"
                    placeholder="Event Name*"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                {validationMessages.title && <p className="pt-2 text-destructive-foreground text-m-m">{validationMessages.title}</p>}
            </div>

            {/* Date */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant='input'
                        className={cn(
                            "w-full rounded-none justify-start text-left font-normal bg-primary border-b-2 h-14 p-2 text-primary-foreground",
                            !formData.date? "text-input" : ""
                        )}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formData.date ? (
                            format(formData.date, "PPP")
                        ) : (
                            <span className="text-m-m">Pick A Date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="flex flex-col w-auto p-2 space-y-2"
                >
                    <Select
                        onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border rounded-md">
                        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
                    </div>
                </PopoverContent>
            </Popover>

            {/* Location */}
            <div>
                <Input
                    name="location"
                    placeholder="Location*"
                    onChange={handleLocationChange}
                    value={formData.location}
                />
                {validationMessages.location && <p className="pt-2 text-destructive-foreground text-m-m">{validationMessages.location}</p>}
            </div>

            {/* Guests */}
            <Input
                name="guests"
                placeholder="Guests"
                onChange={handleGuestsChange}
            />

            {/* Next Step */}
            <Button onClick={handleNextStep} type="submit" className="mt-10">
                Next
            </Button>
        </div>
    )
};

export default EventDetails

