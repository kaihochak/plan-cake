
import React, { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import genresData from "@/data/genres";
import usersData from "@/data/users";
import Slider from '@mui/material/Slider';
import { Input } from "@/components/ui/input"

const Filters = ({ closeModal, maxNumWatchlists,
    selectedWatchlists: parentSelectedWatchlists, setSelectedWatchlists: parentSetSelectedWatchlists, 
    selectedGenres: parentSelectedGenres, setGenre: parentSetGenre,
    selectedYear: parentSelectedYear, setYear: parentSetYear, 
    selectedImdbRating: parentSelectedImdbRating, setImdbRating: parentSetRating }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');

    const [selectedWatchlists, setSelectedWatchlists] = useState(parentSelectedWatchlists);
    const [selectedGenres, setSelectedGenres] = useState(parentSelectedGenres);

    const handleWatchlistChange = (event, newNumWatchlist) => {
        setSelectedWatchlists(newNumWatchlist);
    };

    // Desktop
    if (isDesktop) {
        return (
            <div></div>
        )
    }

    // Mobile
    return (
        <div className="flex flex-col gap-y-6 text-primary-foreground py-10 px-8 z-50">


            <div className='flex justify-between mb-6 place-items-end'>
                <h3 className='text-m-xl'>Filters</h3>
                <button onClick={closeModal} className='text-m-l underline'>Apply</button>
            </div>

            {/* Is in watchlist */}
            <div className='flex flex-col placeholder:gap-y-6'>
                <div className='flex place-items-center'>
                    <div className='text-m-l'>In at least </div>
                    <Input 
                        className='text-accent mx-4 w-12 h-9 text-center bg-primary/80 border rounded-md' 
                        value={selectedWatchlists}
                        defaultValue={selectedWatchlists}
                        onChange={handleWatchlistChange}
                    /> 
                    <div>watchlists</div> 
                </div>

                <Slider
                    defaultValue={selectedWatchlists}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={selectedWatchlists}
                    onChange={handleWatchlistChange}
                />
            </div>

            {/* Genres */}
            <MultiSelect
                options={genresData}
                label="Genre"
                selected={selectedGenres}
                setSelected={parentSetGenre}
            />

            {/* Year and above */}
            {/* slider  */}


            {/* Imdb Rating */}
            {/* slider / multi select */}

            {/* Sort By */}


        </div>
    )
}

export default Filters;