import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { IoMdAdd } from "react-icons/io";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/guestCommand"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const GuestSelection = ({ formData:parentFormData }) => {
	const [openGuestList, setOpenGuestList] = useState(false);
	const [selectedGuest, setSelectedGuest] = useState("");
	const [searchGuestName, setSearchGuestName] = useState("");

	useEffect(() => {
		console.log('selectedGuest:', selectedGuest);
	}, [selectedGuest])

	// handle guest selection
	// const handleGuestSelection = (id) => {

	// 	setParentFormData(prevFormData => {
	// 		// Map through the guestList to find the correct guest and update their filmsVoted
	// 		const updatedGuestList = prevFormData.guestList.map(guest => {
	// 			if (guest.id === id) {
	// 				const updateFilmVoted = selectedFilms.filter(film => {
	// 					if (!guest.filmsVoted.includes(film.id)) {
	// 						return film.id;
	// 					}
	// 				})
	// 				if (updateFilmVoted.length > 0) {
	// 					return {
	// 						...guest,
	// 						filmsVoted: [...guest.filmsVoted, ...updateFilmVoted]
	// 					}
	// 				}
	// 			}

	// 			return guest;
	// 		})

	// 		// update the guestList
	// 		return {
	// 			...prevFormData,
	// 			guestList: updatedGuestList
	// 		}
	// 	})
	// 	setshowGuestSelection(false);
	// }

	const handleAddGuest = () => {
		if (searchGuestName) {
			const newGuest = {
				id: `-${parentFormData.guestList.length + 1}`,
				name: searchGuestName,
				avatar: "/assets/avatars/avatar1.jpg",
				filmsVoted: []
			}

			parentFormData.guestList.push(newGuest);
			setSelectedGuest(newGuest.id);
			setSearchGuestName("");
		}
	}	

	return (
		<div className='p-6 flex-center '>
			<Popover open={openGuestList} onOpenChange={setOpenGuestList} className="">
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openGuestList}
						className={`w-[200px] justify-between ${selectedGuest ? "bg-accent text-accent-foreground" : "bg-primary text-secondary"}`}
					>
						{selectedGuest
							? parentFormData.guestList?.find((guest) => guest.id === selectedGuest)?.name
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
								className="absolute top-0.5 right-0 border-none hover:bg-accent" 
								onClick={handleAddGuest}
							>
								<IoMdAdd className="w-6 h-6" />
							</Button>
						</div>
						<CommandEmpty>Welcome, <b>{searchGuestName}</b>! 🎉</CommandEmpty>
						<CommandGroup>
							{parentFormData?.guestList?.map((guest) => (
								<CommandItem
									key={guest.id}
									value={guest.name}
									onSelect={() => {
										console.log('currentId:', guest.id);
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
