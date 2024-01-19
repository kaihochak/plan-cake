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
            <p>{formData.eventName}</p>
        </div>

        {/* Event Description */}

        {/* Date & Time */}
        <div>
            <p>Date & Time</p>
            <p>{formattedDate}</p>
        </div> 

        {/* Location */}
        <div>
            <p>Location</p>
            <p>{formData.eventLocation}</p>
        </div> 

        {/* Event Description */}
        <div>
            <p>Guests</p>
            <p>{formData.eventGuestList}</p>
        </div> 

    </div>
    )
};

export default PreviewEvent;