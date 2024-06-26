import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/guestCommand";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUpdatePickAFilm, useUpdatePickAFilmOptimistic } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";

const GuestSelection = ({ guestList, id, selectedGuest, setSelectedGuest, setGuestList }) => {
  const [openGuestList, setOpenGuestList] = useState(false);
  const [searchGuestName, setSearchGuestName] = useState("");
  const { toast } = useToast();
  // const { mutateAsync: updateGuestList, isLoading, variables } = useUpdatePickAFilm(); 	// Query: Update the guestList
  const { isPending, submittedAt, variables, mutateAsync: updateGuestList, isError } = useUpdatePickAFilmOptimistic(); 	// Query: Update the guestList optimistically

  // Update the guestList to DB
  const handleUpdateGuestList = async (newGuest) => {
    // convert guestList back to string before sending to the DB
    let newGuestList = [...guestList, newGuest];
    newGuestList = newGuestList.map((guest) => JSON.stringify(guest));

    // send the new guest to the DB
    let updatedGuestList = await updateGuestList({
      id: id,
      guestList: newGuestList
    });

    // show a toast message
    if (!updatedGuestList) {
      console.log("Error adding guest", updatedGuestList);
      toast({
        variant: "destructive",
        title: (
          <p className='subtitle'>🚨 Error adding guest</p>
        ),
        description: (
          <p className='bold leading-[1.5]'>
            There was an error adding <span className='italic subtitle'>{newGuest.name}</span> to the guest list.
          </p>
        ),
      });
      return false;
    } else {
      toast({
        variant: "success",
        title: (
          <p className='subtitle'>🎉 Guest added!</p>
        ),
        description: (
          <p className='bold leading-[1.5] pt-2'>
            <span className='italic subtitle'>{newGuest.name} </span>has been added to the guest list.
          </p>
        ),
      });
      return true;
    }
  };

  // Update the guestList
  const handleAddGuestOptimistic = async () => {
    // make sure the name is valid
    const existingGuest = guestList.find((guest) => guest.name === searchGuestName);
    if (!searchGuestName || existingGuest) return;

    // add the new guest
    if (searchGuestName) {
      // store existing guestList
      const existingGuestList = guestList;

      // create a new guest object
      const newGuest = {
        id: `-${guestList.length + 1}`,
        name: searchGuestName,
        filmsVoted: []
      };

      // update the guestList & selected guest in client state OPTIMISTICALLY
      setGuestList([...existingGuestList, newGuest]);
      setSelectedGuest(newGuest.id);

      // send the new guest to the DB
      const success = await handleUpdateGuestList(newGuest);

      // if there was an error, remove the guest from the guestList in client state
      if (!success) {
        // remove the guest from the guestList in client state
        setGuestList(existingGuestList);
        setSelectedGuest("");
      }

      // reset the search input
      setSearchGuestName("");
    }
  };

  /************************************************************
   * Render
   * **********************************************************/
  return (
    <Popover 
      open={openGuestList} 
      onOpenChange={setOpenGuestList}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openGuestList}
          className={`button-sizing justify-between body ${selectedGuest ? "" : "text-foreground-dark"}`}
        >
          {selectedGuest
            ? guestList?.find((guest) => guest.id === selectedGuest)?.name
            : "Select a guest"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className='relative'>
            <CommandInput
              placeholder="Enter your name"
              value={searchGuestName}
              onValueChange={(value) => setSearchGuestName(value)}
            />
            <Button
              size="icon"
              className="absolute top-0.5 right-0 border-none bg-background hover:bg-accent"
              onClick={handleAddGuestOptimistic}
            >
              <IoMdAdd className="w-6 h-6" />
            </Button>
          </div>
          <CommandEmpty>Welcome, <b>{searchGuestName}</b>! 🎉</CommandEmpty>
          <CommandGroup>
            {guestList?.map((guest, index) => (
              <CommandItem
                key={index}
                value={guest.name || ""}
                onSelect={() => {
                  setSelectedGuest(guest.id === selectedGuest ? "" : guest.id);
                  setOpenGuestList(false);
                }}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground flex-between"
              >
                {guest.name}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 ",
                    selectedGuest === guest.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSelection;
