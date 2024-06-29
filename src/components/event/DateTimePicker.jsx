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

  const handleDateChange = (newDate) => {
    setIsDatePickerOpen(false);

    setFormData({
      ...formData,
      date: setMinutes(setHours(newDate, formData.date.getHours()), formData.date.getMinutes()),
    });
  };

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
            {formData.date ? (
              format(formData.date, "PPP")
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
                onSelect={handleDateChange}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
};

export default DateTimePicker;
