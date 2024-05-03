import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { IoMdAdd } from "react-icons/io";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/guestCommand"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const GuestSelection = ({ formData, setFormData, selectedGuest, setSelectedGuest }) => {
	const [openGuestList, setOpenGuestList] = useState(false);
	const [searchGuestName, setSearchGuestName] = useState("");

	const handleAddGuest = () => {

		// make sure the name is valid
		const existingGuest = formData.guestList.find((guest) => guest.name === searchGuestName);
		if (!searchGuestName || existingGuest) return;

		// add the new guest
		if (searchGuestName) {
			const newGuest = {
				id: `-${formData.guestList.length + 1}`,
				name: searchGuestName,
				avatar: "/assets/avatars/avatar1.jpg",
				filmsVoted: []
			};
			
			setFormData((previous) => ({
				...previous,
				guestList: [...previous.guestList, newGuest]
			}));
	
			setSelectedGuest(newGuest.id);
			setSearchGuestName("");
		}
	}

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
								onClick={handleAddGuest}
							>
								<IoMdAdd className="w-6 h-6" />
							</Button>
						</div>
						<CommandEmpty>Welcome, <b>{searchGuestName}</b>! 🎉</CommandEmpty>
						<CommandGroup>
							{formData?.guestList?.map((guest, index) => (
								<CommandItem
									key={guest.id}
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
