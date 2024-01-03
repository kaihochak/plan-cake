import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
// Form validation from Zod and React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// button component from Shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// calendar component from Shadcn
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
// popover component from Shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// select component from Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// input component from Shadcn
import { Input } from "@/components/ui/input";
// pick a film dummy data
import filmData from "@/data/filmData";
import FilmSearch from "@/components/pickAFilm/filmSearch";

// Zod Schema for form validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// implementation of CreateEvent
const CreateEvent = () => {
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Event data across all steps
    eventType: "",
  });
  const [date, setDate] = useState();
  const [validationMessages, setValidationMessages] = useState({
    eventType: "",
    eventName: "",
    eventDate: "",
    eventLocation: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  
  const navigate = useNavigate();

  // Form definition
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Form submission handler
  function onSubmit(values) {
    console.log(values);
  }

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

    // Check if the event type is selected in the first step
    if (currentStep === 0 && formData.eventType === "") {
      newValidationMessages.eventType = "*Required";
      isValid = false;
    } else if (currentStep === 1) {
      // Example validation logic for Event Details step
      if (!formData.eventName || !formData.eventLocation) {
        newValidationMessages.eventDetails = "*Please complete the required fields.";
        isValid = false;
      } else {
        newValidationMessages.eventDetails = "";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Event Type Selection Handler
  const handleSelectEventType = (type) => {
    if (type === formData.eventType) {
      setFormData({ ...formData, eventType: "" });
      return;
    }
    setFormData({ ...formData, eventType: type });
  };

  useEffect(() => {
    console.log(formData.eventType);
  }, [formData.eventType]);

  
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };

  // handle selection change from PickAFilm (filmSearch.jsx)
  const handleSelectionChange = useCallback((newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  }, []); // Dependencies array is empty, so this function is created only once
  

  // fetch pick a film data
  const [pickafilmData, setPickafilmData] = useState(filmData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetchEvents();
        // setMyEventsData(data);
      } catch (error) {
        // Handle error, show an error message, etc.
      }
    };

    fetchData();
  }, []);

  const Create = () => (
    <div>
      <p className="text-m-l mt-10">What type of events are you planning?</p>
      <Form {...form}>
        <form className="space-y-8 mt-6">
          {/* Event Type */}
          <div className="flex flex-col gap-y-4">
            {validationMessages.eventType && <p className="text-primary-foreground text-m-m">{validationMessages.eventType}</p>}
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
            {/* <Button variant='select' type='button' onClick={() => handleSelectEventType('Music')} className={formData.eventType === 'Music' ? 'bg-default' : ''}>Music (coming soon)</Button>
          <Button variant='select' type='button' onClick={() => handleSelectEventType('Performance')} className={formData.eventType === 'Performance' ? 'bg-default' : ''}>Performance (coming soon)</Button>
          <Button variant='select' type='button' onClick={() => handleSelectEventType('Custom')} className={formData.eventType === 'Custom' ? 'bg-default' : ''}>Custom (coming soon)</Button> */}
          </div>
        </form>
      </Form>
    </div>
  );

  const EventDetails = ({ validationMessages }) => (
    <div>
    {validationMessages.eventDetails && <p className="text-primary-foreground text-m-m">{validationMessages.eventDetails}</p>}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        {/* Event Name */}
        <FormField
          control={form.control}
          name="Event Name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Event Name*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <span className="text-m-m">Pick A Date*</span>
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
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </PopoverContent>
        </Popover>

        {/* Location */}
        <FormField
          control={form.control}
          name="Location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Guests */}
        <FormField
          control={form.control}
          name="Guests"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Guests*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
  );

  const PickAFilm = () => (
    <FilmSearch onSelectionChange={handleSelectionChange} selectedItems={selectedItems} />
  );

  const PreviewEvent = () => <div></div>;

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
      {currentStep === 1 && <EventDetails validationMessages={validationMessages} />}
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
