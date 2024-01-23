import React, { useState, useEffect } from "react";

const PreviewEvent = ({ formData }) => {
    // debug
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const formattedDate = formData.eventDate instanceof Date ? formData.eventDate.toDateString() : '';

    return ( 
    <div>
        {/* Event Name */}
        <div>
            <p className="text-m-xl mt-10">{formData.eventName}</p>
        </div>

        {/* Event Description */}

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

        {/* Selected Items */}
        <div>
            <p className="mt-8 text-m-m text-border">Selected</p>
            <p>{formData.selectedItems}</p>
        </div> 
    </div>
    )
};

export default PreviewEvent;