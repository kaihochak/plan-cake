import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { IoMdAdd } from "react-icons/io";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/guestCommand"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUpdatePickAFilmGuestList } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast"


const GuestSelection = ({ formData, setFormData, selectedGuest, setSelectedGuest }) => {
	const [openGuestList, setOpenGuestList] = useState(false);
	const [searchGuestName, setSearchGuestName] = useState("");
	const { toast } = useToast()
	const { mutateAsync: updateGuestList, isLoading } = useUpdatePickAFilmGuestList(); 	// Query: Update the guestList

	// Update the guestList to DB
	const handleUpdateGuestList = async (newGuest) => {

		// convert guestList back to string before sending to the DB
		let newGuestList = [...formData.guestList, newGuest];
		newGuestList = newGuestList.map((guest) => JSON.stringify(guest))

		// send the new guest to the DB
		let updatedGuestList = await updateGuestList({
			id: formData.$id,
			newGuestList
		});

		// show a toast message
		if (!updatedGuestList) {
			toast({
				variant: "destructive",
				title: (
					<p className='subtitle'>🚨 Error adding guest</p>
				),
				description: (
					<p className='bold leading-[1.5]'>
						There was an error adding <span className='italic subtitle'>${newGuest.name}</span> to the guest list.
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
	}

	// Update the guestList
	const handleAddGuestOptimistic = () => {

		// make sure the name is valid
		const existingGuest = formData.guestList.find((guest) => guest.name === searchGuestName);
		if (!searchGuestName || existingGuest) return;

		// add the new guest
		if (searchGuestName) {
			
			// create a new guest object
			const newGuest = {
				id: `-${formData.guestList.length + 1}`,
				name: searchGuestName,
				// avatar: "/assets/avatars/avatar1.jpg",
				filmsVoted: []
			};

			// update the guestList in local state OPTIMISTICALLY
			setFormData((previous) => ({
				...previous,
				guestList: [...previous.guestList, newGuest]
			}));
			// update the selected guest
			setSelectedGuest(newGuest.id);

			// send the new guest to the DB
			const success = handleUpdateGuestList(newGuest);

			// if there was an error, remove the guest from the guestList in local state
			if (!success) {
				// remove the guest from the guestList in local state
				setFormData((previous) => ({
					...previous,
					guestList: previous.guestList.filter((guest) => guest.id !== newGuest.id)
				}));
				setSelectedGuest("");
			}
			
			// reset the search input
			setSearchGuestName("");
		}
	}


	/************************************************************
	 * Render
	 * **********************************************************/
	return (
		<div className='flex-center'>
			<Popover open={openGuestList} onOpenChange={setOpenGuestList} >
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openGuestList}
						className={`w-[200px] justify-between ${selectedGuest ? "bg-accent text-accent-foreground" : "bg-background text-secondary"}`}
					>
						{selectedGuest
							? formData.guestList?.find((guest) => guest.id === selectedGuest)?.name
							: "Select your name"}
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
							{formData?.guestList?.map((guest, index) => (
								<CommandItem
									key={index}
									value={guest.name || ""}
									onSelect={() => {
										setSelectedGuest(guest.id === selectedGuest ? "" : guest.id)
										setOpenGuestList(false)
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

		</div>
	)
}

export default GuestSelection
