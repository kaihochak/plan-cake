import React, { useState, useEffect } from "react";

const PreviewEvent = ({ formData }) => {
    // debug
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const formattedDate = formData.eventDate instanceof Date ? formData.eventDate.toDateString() : '';

    return ( 
    <div className="flex flex-col ">

        {/* Selected Items Image */}
        <div className="w-2/3 mx-auto mt-10"> {/* mx-auto for horizontal centering of the container */}
        {formData.selectedItems.map((item, index) => (
            <div key={index} className="flex justify-center mb-4"> {/* Container for each image, mb-4 for some margin between images */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover object-center rounded-xl"
                />
            </div>
        ))}
        </div>

        {/* Event Name */}
        <div>
            <p className="text-m-xl mt-10">{formData.eventName}</p>
        </div>
        
        {/* Selected Items Title */}
        <div>
            <p className="mt-8 text-m-m text-border">Selected Movies</p>
            <p>{formData.selectedItems.map(item => (
                <div key={item.id}>{item.title}</div>
            ))}</p>
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

    </div>
    )
};

export default PreviewEvent;