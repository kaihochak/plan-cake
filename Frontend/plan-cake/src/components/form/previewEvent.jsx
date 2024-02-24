import React, { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import filmData from "@/data/filmData";


const PreviewEvent = ({ formData, nextStep }) => {
    // debug
    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const handleNextStep = () => {

        nextStep(formData);
    
    }

    const formattedDate = formData.eventDate instanceof Date ? formData.eventDate.toDateString() : '';

    return (
        <div className="flex flex-col ">

            {/* Selected Items Image Carousel */}
            <Carousel className="w-[70%] mx-auto lg:w-[40%]">
                <CarouselContent className="mx-auto mt-10">
                    {formData.selectedItems.map((filmID, id) => {

                        const item = filmData.find(item => item.id === filmID);
                        return (
                            <CarouselItem key={id} className="flex justify-center mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title || 'Carousel image'} // Fallback text if title is not available
                                    className="object-cover object-center rounded-xl transition duration-300 ease-in-out transform hover:scale-105" // Added hover effect
                                />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


            {/* Event Name */}
            <div>
                <p className="text-m-xl mt-10">{formData.eventName}</p>
            </div>

            {/* Selected Items Title */}
            <div>
                <p className="mt-8 text-m-m text-border">Selected Movies</p>
                <div>{formData.selectedItems.map((filmID, id) => {

                    const item = filmData.find(item => item.id === filmID);
                    return (
                        <div key={id}>{item.title}</div>
                    )
                })}</div>
            </div>

            {/* Date & Time */}
            <div className="mt-8 text-m-m text-border">
                <p className="">Date & Time</p>
                <p>{formattedDate}</p>
            </div>

            {/* Location */}
            <div>
                <p className="mt-8 text-m-m text-border">Location</p>
                <p>{formData.eventLocation}</p>
            </div>

            {/* Event Description */}
            <div>
                <p className="mt-8 text-m-m text-border">Guests</p>
                <p>{formData.eventGuestList}</p>
            </div>

            {/* Confirm */}
          <Button onClick={handleNextStep} type="submit" className="mt-10">
            Confirm
          </Button>

        </div>
    )
};

export default PreviewEvent;