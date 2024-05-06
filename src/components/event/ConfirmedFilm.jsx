import React, { useEffect, useState } from 'react'
import { image500 } from '@/lib/tmdb/config'


const ConfirmedFilm = ({confirmedFilm, formData}) => {
    const getVotes = (confirmedFilm) => {
        if (confirmedFilm) {
            let count = formData.guestList.filter(guest => guest.filmsVoted?.some(vote => vote.id.toString() === confirmedFilm.id.toString())).length
            return count;
        } return [];
    }
    


    return (
        <div>
            <div className='p-4'>
                {/* Confirmed Film */}
                {confirmedFilm && (
                    <div className='flex-col flex-center'>
                        <h2 className="self-end m3">Confirmed Film ({getVotes(confirmedFilm)})</h2>
                        <img
                            src={image500(confirmedFilm?.poster_path)}
                            alt={confirmedFilm?.title}
                            className="object-cover object-center rounded-sm"
                        />
                    </div>
                )} 
            </div>
        </div>
    )
}

export default ConfirmedFilm
