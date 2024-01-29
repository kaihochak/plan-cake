
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import genresData from "@/data/genres";
import usersData from "@/data/users";

const Filters = ({ closeModal,
    selectedWatchlists, setSelectedWatchlists, selectedGenres, setGenre, 
    selectedYearRange, setYearRange, selectedImdbRating, setImdbRating }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');

    // Desktop
    if (isDesktop) {
        return (
            <div></div>
        )
    }

    // Mobile
    return (
        <div className="flex flex-col gap-y-3 text-primary-foreground py-10 px-8 z-50">

            <div className='flex justify-between mb-6 place-items-end'>
                <h3 className='text-m-xl'>Filters</h3>
                <button onClick={closeModal} className='text-m-l underline'>Apply</button>
            </div>

            {/* Is in watchlist */}
            <div className='flex flex-col'>
                <div className='text-m-l'>Show Films in Watchlists</div>
                {/* slider or set number */}
                {/* try slider first */}
                <MultiSelect
                    options={usersData}
                    label="Watchlist"
                    selected={selectedWatchlists}
                    setSelected={setSelectedWatchlists}
                />
            </div>

            {/* Genres */}
            <MultiSelect
                options={genresData}
                label="Genre"
                selected={selectedGenres}
                setSelected={setGenre}
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