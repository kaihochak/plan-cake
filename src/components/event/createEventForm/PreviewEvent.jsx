import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { image500 } from "@/lib/tmdb/config";

const PreviewEvent = ({ formData, nextStep, isLoadingCreate }) => {

    const handleNextStep = () => {
        nextStep(formData);
    }

    const formattedDate = formData.date instanceof Date ? formData.date.toDateString() : '';

    return (
        <div className="flex flex-col ">
            <h2 className="mb-3 text-m-2xl">Preview Event</h2>

            {/* event image */}
            {formData.imageUrl &&
                <div className="flex justify-center flex-1 p-5 lg:p-10">
                    <img src={formData.imageUrl} alt="image" className="file_uploader-img" />
                </div>
            }

            {/* Selected Items Image Carousel */}
            <Carousel className="w-[70%] mx-auto lg:w-[40%]">
                <CarouselContent className="mx-auto mt-10">
                    {formData.selectedFilms.map((film, id) => {
                        return (
                            <CarouselItem key={id} className="flex justify-center mb-4">
                                <img
                                    src={image500(film.poster_path)}
                                    alt={film.title || 'Carousel image'} // Fallback text if title is not available
                                    className="object-cover object-center transition duration-300 ease-in-out transform rounded-sm hover:scale-105" // Added hover effect
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
                <p className="mt-10 text-m-xl">{formData.title}</p>
            </div>

            {/* Selected Items Title */}
            <div>
                <p className="mt-8 text-m-m text-border">Selected Movies</p>
                <div>{formData.selectedFilms.map((film, id) => <div key={id}>{film.title}</div>)}</div>
            </div>

            {/* Date & Time */}
            <div className="mt-8 text-m-m text-border">
                <p className="">Date & Time</p>
                <p>{formattedDate}</p>
            </div>

            {/* Location */}
            <div>
                <p className="mt-8 text-m-m text-border">Location</p>
                <p>{formData.location}</p>
            </div>

            {/* Event Description */}
            <div>
                <p className="mt-8 text-m-m text-border">Guests</p>
                <p>{formData.guestList}</p>
            </div>

            {/* Confirm */}
            <Button onClick={handleNextStep} type="submit" className="mt-10">
                {isLoadingCreate ? (
                    <div className='flex items-center gap-2'>
                        <Loader />Loading...
                    </div>
                ) : (
                    <div>Confirm</div>
                )}
            </Button>

        </div>
    )
};

export default PreviewEvent;