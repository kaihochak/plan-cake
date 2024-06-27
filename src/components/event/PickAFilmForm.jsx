import React, { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, min } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom'
import { useCreatePickAFilm } from '@/lib/react-query/queries'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/timeSelect"

const formSchema = z.object({
	title: z.string().optional(),
	host: z.string().min(2).max(50)
})

const PickAFilmForm = ({ isOpen, onClose }) => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const [newPickAFilm, setNewPickAFilm] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		date: new Date(),
		hour: "",
		minute: "",
		host: ""
	})
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	// Query to create a new event
	const { mutateAsync: createPickAFilmToDB, isPending: isLoadingCreate } = useCreatePickAFilm();

	// form validation
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			host: ""
		},
	})

	// useEffect to handle navigation after newPickAFilm is set
	useEffect(() => {
		if (newPickAFilm && newPickAFilm.$id) {
			navigate(`/pickAfilm/${newPickAFilm.$id}`);
		}
	}, [newPickAFilm, navigate]);

	// form submit
	async function handleFormSubmit(values) {
		console.log("values", values);
		if (formData.hour !== "") formData.date.setHours(formData.hour);
		if (formData.minute !== "") formData.date.setMinutes(formData.minute);
		setFormData({ ...formData, title: values.title, host: values.host });
		localStorage.setItem('host', values.host);
		onClose(!isOpen);
	}

	// useEffect to handle form submission after formData is set
	useEffect(() => {
		console.log("formData", formData);

		if (formData.host) {
			submitToDB(formData);
		}
	}, [formData]);

	// Submit form data to backend
	async function submitToDB(formData) {
		const newPickAFilm = await createPickAFilmToDB({
			title: formData.title,
			host: formData.host,
			date: formData.date
		});

		console.log("newPickAFilm", newPickAFilm);

		if (!newPickAFilm) {
			toast({
				variant: "destructive",
				title: (
					<p className='subtitle'>🚨 Error add PickAFilm</p>
				),
				description: (
					<p className='bold leading-[1.5]'>
						There was an error creating <span className='italic subtitle'>${formData.title}</span>. Please try again.
					</p>
				),
			});
			return false;
		} else {
			toast({
				variant: "success",
				title: (
					<p className='subtitle'>🎉 PickAFilm created!</p>
				),
				description: (
					<p className='bold leading-[1.5] pt-2'>
						<span className='italic subtitle'>{formData.title} </span>has been created.
					</p>
				),
			});
			setNewPickAFilm(newPickAFilm);
		}
	};

	/*****************************************************************************
	 * Rendering
	 *****************************************************************************/
	return (

		<Dialog open={isOpen} onOpenChange={() => onClose(!isOpen)}>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>New Event</DialogTitle>
					<DialogDescription>
					</DialogDescription>
				</DialogHeader>

				{/* Form */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
						{/* title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Event Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* host */}
						<FormField
							control={form.control}
							name="host"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Your Name*" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Date */}
						<div className='flex items-end gap-x-2'>
							<Popover
								open={isDatePickerOpen}
								onOpenChange={setIsDatePickerOpen}
							>
								<PopoverTrigger asChild className="hover:bg-white">
									<Button
										variant='input'
										className={cn(
											"w-full rounded-none justify-start text-left font-normal bg-primary border-foreground-dark border-b-2 h-14 p-2 text-primary-foreground",
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
								<SelectTrigger className="w-[20%]">
									<SelectValue placeholder="HH" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{Array.from({ length: 24 }, (_, i) => i).map((i) => (
											<SelectItem key={i} value={i.toString().padStart(2, "0")}>{i.toString().padStart(2, "0")}</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>

							{/* minutes */}
							<Select
								value={formData.minute}
								onValueChange={(value) => setFormData({ ...formData, minute: value })}
							>
								<SelectTrigger className="w-[20%]">
									<SelectValue placeholder="MM" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* iterate and render 00 - 55 per each 5 minutes */}
										{Array.from({ length: 60 }, (_, i) => i).filter((i) => i % 5 === 0).map((i) => (
											<SelectItem key={i} value={i.toString().padStart(2, "0")}>{i.toString().padStart(2, "0")}</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>

						</div>
						<Button type="submit" variant="select" className="w-full">Create Event</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default PickAFilmForm