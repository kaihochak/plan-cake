import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, setMinutes, setHours } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import getFormattedLocalDateTime from '@/components/utility/getFormattedLocalDateTime';

import { cn } from "@/lib/utils";
import HourMinutePicker from "./HourMinutePicker";

const DateTimePicker = ({ formData, setFormData }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const localDateTime = getFormattedLocalDateTime(formData.date);

    const handleDateTimeButton = () => {  
        setIsDatePickerOpen(false);
        console.log("formData date time", formData.date, formData.hour, formData.minute);
    }
    

  const combinedDateTime = formData.date
  ? setMinutes(setHours(new Date(formData.date), formData.hour), formData.minute)
  : null;

  return (
    <div className="flex items-end gap-x-2">
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild className="hover:bg-white">
          <Button
            variant="input"
            className={cn(
              "w-full rounded-none justify-start text-left font-normal bg-primary border-foreground-dark border-b-2 h-12 p-2 text-primary-foreground",
              !formData.date ? "text-input" : ""
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {combinedDateTime && !isNaN(combinedDateTime.getTime()) ? (
                format(combinedDateTime, "PPPpp")
              // {localDateTime}
            ) : (
              <span className="text-m-m">Pick A Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex flex-col w-full p-2 space-y-2 "
        >
          <div className="flex flex-col w-full gap-4">
            <div className="rounded-md">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => {
                //   setIsDatePickerOpen(false);
                  setFormData({ ...formData, date: date });
                }}
              />
            </div>
            {/* Hours and Minutes */}
            
            <HourMinutePicker formData={formData} setFormData={setFormData} />
            <button 
                className="w-full border-2 border-input h-12 bg-primary text-primary-foreground rounded-md"
                onClick={handleDateTimeButton}
            >
                Confirm
            </button>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
};

export default DateTimePicker;
