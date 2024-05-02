import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom'


const formSchema = z.object({
    title: z.string().min(2).max(50),
    host: z.string().min(2).max(50)
})

const PickAFilmForm = ({ isOpen, onClose }) => {
    // form validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            host: ""
        },
    })

    const [formData, setFormData] = useState({
        title: "",
        host: "",
        date: "",
    })

    const navigate = useNavigate();

    // form submit
    function handleFormSubmit(values) {
        setFormData({ ...formData, title: values.title, host: values.host });
        onClose(!isOpen);
        navigate("/pickAfilm/1")
    }

    /*****************************************************************************
     * Rendering
     *****************************************************************************/
    return (

        <Dialog open={isOpen} onOpenChange={() => onClose(!isOpen)}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>New PickAFilm</DialogTitle>
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
                                        <Input placeholder="Event Name*" {...field} />
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
                        <Popover>
                            <PopoverTrigger asChild className="hover:bg-white">
                                <Button
                                    variant='input'
                                    className={cn(
                                        "w-full rounded-none justify-start text-left font-normal bg-primary border-b-2 h-14 p-2 text-primary-foreground",
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
                                className="flex flex-col w-auto p-2 space-y-2"
                            >
                                <div className="rounded-md">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(date) => setFormData({ ...formData, date: date })}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button type="submit" variant="select" className="">Create PickAFilm</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>


    )
}

export default PickAFilmForm
