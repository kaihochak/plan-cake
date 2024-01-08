import React, {useState} from "react";

// components from Shadcn
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";


const EventDetailsForm = ({ key, formData: parentFormData}) => {
    const [date, setDate] = useState();
    const [formData, setFormData] = useState(parentFormData);
    const [validationMessages, setValidationMessages] = useState({
        eventName: "",
        eventLocation: "",
    });

    // Log on every render
    console.log('EventDetailsForm Props:', { validationMessages, formData });

    const handleNameChange = (e) => {
        setFormData({ ...formData, eventName: e.target.value });
    }

    return (

        <div className="space-y-8 mt-6">

            {/* Event Name */}
            <div>
                <Input
                    name="eventName"
                    placeholder="Event Name*"
                    onChange={handleNameChange}
                    value={formData.eventName}
                />
                {validationMessages.eventName && <p className="text-destructive-foreground text-m-m">{validationMessages.eventName}</p>}
            </div>

            {/* Date */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant='input'
                        className={cn(
                            "w-full rounded-none justify-start text-left font-normal bg-primary border-b-2 h-14 p-2",
                            !date && "text-input"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, "PPP")
                        ) : (
                            <span className="text-m-m">Pick A Date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2"
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
                    <div className="rounded-md border">
                        <Calendar mode="single" selected={date} onSelect={onDateChange} />
                    </div>
                </PopoverContent>
            </Popover>

            {/* Location */}
            <div>
                <Input
                    name="eventLocation"
                    placeholder="Location*"
                    onChange={onInputChange}
                />
                {validationMessages.eventLocation && <p className="text-destructive-foreground text-m-m">{validationMessages.eventLocation}</p>}
            </div>

            {/* Guests */}
            <Input
                name="guests"
                placeholder="Guests"
                onChange={onInputChange}
            />
        </div>
    )
};

export default EventDetailsForm

