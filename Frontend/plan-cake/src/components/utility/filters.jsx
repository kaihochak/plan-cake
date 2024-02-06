import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import genresData from "@/data/genres";
import usersData from "@/data/users";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { IoClose } from "react-icons/io5";

const Filters = ({ closeModal, maxNumWatchlist, minYear, maxYear,
    selectedWatchlists: parentSelectedWatchlists, setSelectedWatchlists: parentSetSelectedWatchlists,
    selectedGenres: parentSelectedGenres, setGenre: parentSetGenre,
    selectedYear: parentSelectedYear, setYear: parentSetYear,
    selectedRating: parentSelectedRating, setRating: parentSetRating }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');
    const [selectedWatchlists, setSelectedWatchlists] = useState(parentSelectedWatchlists);
    const [selectedGenres, setSelectedGenres] = useState(parentSelectedGenres);
    const [selectedYear, setSelectedYear] = useState(parentSelectedYear);
    const [selectedRating, setSelectedRating] = useState(parentSelectedRating);

    const handleWatchlistChange = (event, newNumWatchlist) => {
        if (newNumWatchlist == null) {
            newNumWatchlist = 0;
        }
        setSelectedWatchlists(newNumWatchlist);
    };

    const handleGenreChange = (newGenre) => {
        setSelectedGenres(newGenre);
    };

    const handleYearChange = (event, newYear) => {
        setSelectedYear(newYear);
    };

    const handleRatingChange = (event, newRating) => {
        setSelectedRating(newRating);
    };

    // reset filters
    const resetFilters = () => {
        setSelectedWatchlists(0); 
        setGenre([]); 
        setYearRange(1860); 
        setImdbRating(0); 
    };

    // apply filters
    const applyFilters = () => {
        closeModal();
    };

    useEffect(() => {
        console.log('selectedWatchlists', selectedWatchlists);
    }, [selectedWatchlists]);

    useEffect(() => {
        console.log('selectedGenres', selectedGenres);
    }, [selectedGenres]);

    useEffect(() => {
        console.log('selectedYear', selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        console.log('selectedRating', selectedRating);
    }, [selectedRating]);

    // Desktop
    if (isDesktop) {
        return (
            <div></div>
        )
    }

    // Mobile
    return (
        <div className="flex flex-col gap-y-4 text-primary-foreground py-10 px-8 z-50">


            <div className='flex justify-between mb-6 place-items-end'>
                <h3 className='text-m-xl'>Filters</h3>
                <div onClick={closeModal} className='text-m-xl cursor-pointer'>
                    <IoClose />
                </div>
            </div>

            {/* Is in watchlist */}
            <div className='flex flex-col py-4'>
                <div className='text-m-l pb-2'>Watchlists </div>

                {/* https://mui.com/material-ui/react-slider/ */}
                <Slider
                    defaultValue={selectedWatchlists}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={selectedWatchlists}
                    onChange={handleWatchlistChange}
                />

                <div className='flex place-items-center justify-center'>
                    <div>in </div>
                    <Input
                        className='text-accent mx-4 w-12 h-6 text-center bg-primary/80 border rounded-md'
                        value={selectedWatchlists}
                        defaultValue={selectedWatchlists}
                        onChange={handleWatchlistChange}
                    />
                    <div>or more</div>
                </div>
            </div>

            {/* Genres */}
            <div className='flex flex-col py-2'>
                <div className='text-m-l pb-4'>Genres</div>
                <MultiSelect
                    options={genresData}
                    label="All"
                    selected={selectedGenres}
                    setSelected={handleGenreChange}
                />
            </div>

            {/* Year and above */}
            <div className='flex flex-col py-4'>
                <div className='text-m-l pb-2'>Year </div>

                {/* https://mui.com/material-ui/react-slider/ */}
                <Slider
                    defaultValue={selectedYear}
                    getAriaLabel={() => 'range'}
                    valueLabelDisplay="auto"
                    value={selectedYear}
                    onChange={handleYearChange}
                    max={maxYear}
                    min={minYear}
                />

                <div className='flex place-items-center justify-between'>
                    <Input
                        className='text-accent mx-4 w-16 h-6 text-center bg-primary/80 border rounded-md'
                        value={selectedYear[0]}
                        defaultValue={minYear}
                        onChange={(event, newYearStart) => {
                            setSelectedYear([selectedYear[0], newYearStart])
                        }}
                    />
                    <Input
                        className='text-accent mx-4 w-16 h-6 text-center bg-primary/80 border rounded-md'
                        value={selectedYear[1]}
                        defaultValue={maxYear}
                        onChange={(event, newYearEnd) => {
                            setSelectedYear([selectedYear[0], newYearEnd])
                        }}
                    />
                </div>
            </div>

            {/* Rating */}
            <div className='flex flex-col py-4'>
                <div className='text-m-l pb-2'>Rating </div>

                {/* https://mui.com/material-ui/react-slider/ */}
                <Slider
                    defaultValue={selectedRating}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={selectedRating}
                    onChange={(event, newRating) => {
                        setSelectedRating(newRating);
                    }}
                />

                <div className='flex place-items-center justify-center'>
                    <Input
                        className='text-accent mx-4 w-12 h-6 text-center bg-primary/80 border rounded-md'
                        value={selectedRating}
                        defaultValue={selectedRating}
                        onChange={(event, newRating) => {
                            setSelectedRating(newRating);
                        }}
                    />
                    <div>or more</div>
                </div>
            </div>

            <Separator />
            {/* Sort By */}

            <div className='flex w-full space-x-2'>
                {/* reset */}
                <button onClick={resetFilters} className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent py-2 px-4">Reset</button>
                
                {/* apply */}
                <button onClick={applyFilters} className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent py-2 px-4">Apply</button>
            </div>
        </div>
    )
}

export default Filters;