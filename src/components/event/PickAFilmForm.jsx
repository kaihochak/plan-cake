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


const formSchema = z.object({
    title: z.string().min(2).max(50),
    date: z.string().min(2).max(50),
    time: z.string().min(2).max(50),
})

const PickAFilmForm = ({ isOpen, onClose }) => {
    const [date, setDate] = useState();

    // form validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: "",
            time: "",
        },
    })

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
    })




    // form submit
    function handleFormSubmit(values) {
        console.log(values)
    }

    /*****************************************************************************
     * Rendering
     *****************************************************************************/
    return (

        <Dialog open={isOpen} onOpenChange={() => onClose(!isOpen)}>
            <DialogContent>
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

                        {/* Date */}
                        <Popover>
                            <PopoverTrigger asChild>
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
                                <div className="border rounded-md">
                                    <Calendar mode="single" selected={date} onSelect={(date) => setFormData({ ...formData, date: date })} />
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
