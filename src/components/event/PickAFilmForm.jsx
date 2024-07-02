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
import DateTimePicker from "@/components/event/DateTimePicker";
import HourMinutePicker from "@/components/event/HourMinutePicker";

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
		date: new Date(new Date().setMinutes(0)),
		host: ""
	})

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
		setFormData({ ...formData, title: values.title, host: values.host });
		localStorage.setItem('host', values.host);
		onClose(!isOpen);
	}

	// useEffect to handle form submission after formData is set
	useEffect(() => {
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
						{/* DateTime */}
						<div className='grid justify-between grid-cols-2 gap-x-2 '>
							<DateTimePicker	
								formData={formData}
								setFormData={setFormData}
							/>
							{/* Hours and Minutes */}
							<HourMinutePicker formData={formData} setFormData={setFormData} />
						</div>
						<Button type="submit" variant="select" className="w-full">Create Event</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default PickAFilmForm