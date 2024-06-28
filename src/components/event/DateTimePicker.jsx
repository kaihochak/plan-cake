import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/timeSelect";
import { cn } from "@/lib/utils";

const DateTimePicker = ({ formData, setFormData }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
            {formData.date && !isNaN(formData.date) ? (
              format(formData.date, "PPP")
            ) : (
              <span className="text-m-m">Pick A Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex flex-col w-full p-2 space-y-2"
        >
          <div className="rounded-md">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => {
                setIsDatePickerOpen(false);
                setFormData({ ...formData, date: date });
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* hours */}
      <Select
        value={formData.hour}
        onValueChange={(value) => setFormData({ ...formData, hour: value })}
      >
        <SelectTrigger
          className={`w-[20%] ${
            formData.hour ? "text-primary-foreground" : " "
          }`}
        >
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: 24 }, (_, i) => i).map((i) => (
              <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* minutes */}
      <Select
        value={formData.minute}
        onValueChange={(value) => setFormData({ ...formData, minute: value })}
      >
        <SelectTrigger
          className={`w-[20%] ${
            formData.minute ? "text-primary-foreground" : " "
          }`}
        >
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* iterate and render 00 - 55 per each 5 minutes */}
            {Array.from({ length: 60 }, (_, i) => i)
              .filter((i) => i % 5 === 0)
              .map((i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateTimePicker;
