import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import genresData from "@/data/genres";
import usersData from "@/data/users";
import Slider from '@mui/material/Slider';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { IoClose } from "react-icons/io5";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
 

const Filters = ({ closeModal, maxNumWatchlist, minYear, maxYear,
    selectedWatchlists: parentSelectedWatchlists, setSelectedWatchlists: parentSetSelectedWatchlists,
    selectedSpecificWatchlists: parentSelectedSpecificWatchlists, setSelectedSpecificWatchlists: parentSetSelectedSpecificWatchlists,
    selectedGenres: parentSelectedGenres, setGenre: parentSetGenre,
    selectedYear: parentSelectedYear, setYear: parentSetYear,
    selectedRating: parentSelectedRating, setRating: parentSetRating }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');
    const [selectedWatchlists, setSelectedWatchlists] = useState(parentSelectedWatchlists);
    const [selectedSpecificWatchlists, setSelectedSpecificWatchlists] = useState(parentSelectedSpecificWatchlists);
    const [selectedGenres, setSelectedGenres] = useState(parentSelectedGenres);
    const [selectedYear, setSelectedYear] = useState(parentSelectedYear);
    const [tempStartYear, setTempStartYear] = useState(parentSelectedYear[0]);
    const [tempEndYear, setTempEndYear] = useState(parentSelectedYear[1]);
    const [selectedRating, setSelectedRating] = useState(parentSelectedRating);

    const handleWatchlistChange = (event, newValue) => {
        // For slider component, the newValue is directly provided as the second argument
        if (newValue !== undefined) {
            setSelectedWatchlists(newValue);
        } else {
            // For standard input, extract the value from event.target.value
            const inputVal = event.target.value === '' ? 0 : Number(event.target.value);
            if (inputVal > maxNumWatchlist || inputVal < 0) {
                return;
            }
            setSelectedWatchlists(inputVal);
        }
    };

    const handleSpecificWatchlistChange = (newSpecificWatchlist) => {
        setSelectedSpecificWatchlists(newSpecificWatchlist);
    };

    const handleGenreChange = (newGenre) => {
        setSelectedGenres(newGenre);
    };

    const handleYearsSliderChange = (event, newValue) => {
        setSelectedYear(newValue);
        setTempStartYear(newValue[0].toString());
        setTempEndYear(newValue[1].toString());
    };

    const handleYearsInputBlur = (type) => (event) => {
        const newValue = parseInt(event.target.value, 10);
        setSelectedYear((currentYears) => {
            let startYear = currentYears[0], endYear = currentYears[1];
    
            if (type === "start") {
                // Adjust the start year within the boundaries
                startYear = isNaN(newValue) ? minYear : Math.min(Math.max(newValue, minYear), endYear);
            } else {
                // Adjust the end year within the boundaries
                endYear = isNaN(newValue) ? maxYear : Math.max(Math.min(newValue, maxYear), startYear);
            }
    
            // Update temporary states to reflect the new value or the adjusted boundary value
            const newYears = [startYear, endYear];
            setTempStartYear(newYears[0].toString());
            setTempEndYear(newYears[1].toString());
    
            return newYears;
        });
    };
    
    
    const handleYearsInputChange = (type) => (event) => {
        const value = event.target.value;
        if (type === "start") {
            setTempStartYear(value);
        } else { // Assuming type is "end"
            setTempEndYear(value);
        }
    };

    const handleRatingChange = (event, newValue) => {
        // For slider component, the newValue is directly provided as the second argument
        if (newValue !== undefined) {
            setSelectedRating(newValue);
        } else {
            // For standard input, extract the value from event.target.value
            const inputVal = event.target.value === '' ? 0 : Number(event.target.value);
            if (inputVal > 10 || inputVal < 0) {
                return;
            }
            setSelectedRating(inputVal);
        }
    };

    // reset filters
    const resetFilters = () => {
        setSelectedWatchlists(0);
        setSelectedSpecificWatchlists([]);
        setSelectedGenres([]);
        setSelectedYear([minYear, maxYear]);
        setSelectedRating(0);
    };

    // apply filters
    const applyFilters = () => {
        parentSetSelectedWatchlists(selectedWatchlists);
        parentSetSelectedSpecificWatchlists(selectedSpecificWatchlists);
        parentSetGenre(selectedGenres);
        parentSetYear(selectedYear);
        parentSetRating(selectedRating);
        closeModal();
    };

    // Desktop
    if (isDesktop) {
        return (
            <div></div>
        )
    }

    const [position, setPosition] = React.useState("Sort by")

    // Mobile
    return (
        <div className="flex flex-col gap-y-4 text-primary-foreground py-10 px-8 z-50">
            <div className='flex justify-between mb-6 place-items-end'>
                <h3 className='text-m-xl'>Filters & Sort</h3>
                <div onClick={closeModal} className='text-m-xl cursor-pointer'>
                    <IoClose />
                </div>
            </div>

            {/* Sort By */}
            <div className='flex flex-col py-2'>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{position}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="Year: Old to New">Year: Old to New</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Year: New to Old">Year: New to Old</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Rating: High to Low">Rating: High to Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Rating: Low to High">Rating: Low to High</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Separator />

            {/* Is in watchlist */}
            <div className='flex flex-col py-2'>
                <div className='text-m-l pb-2'>Watchlists </div>

            <div className='w-[90%] mx-auto'>
                {/* https://mui.com/material-ui/react-slider/ */}
                <Slider
                    defaultValue={selectedWatchlists}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={selectedWatchlists}
                    onChange={handleWatchlistChange}
                    min={0}
                    max={maxNumWatchlist}
                />

                <div className='flex justify-center'>
                    <div>in </div>
                    <Input
                        type="text"
                        className="text-accent mx-4 w-12 h-6 text-center bg-primary/80 border rounded-md"
                        value={selectedWatchlists.toString()}
                        onChange={handleWatchlistChange}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <div>or more watchlists</div>
                </div>

                {/* Specific Watchlist */}
                <div className='mt-4 text-center text-accent'>AND</div>
                <div className='mt-4 text-center'> in the watchlists of </div>
                <div className=' mt-4 gap-y-4'>
                    <MultiSelect
                        options={usersData}
                        label="All"
                        selected={selectedSpecificWatchlists}
                        setSelected={handleSpecificWatchlistChange}
                    />
                </div>
            </div>

            </div>

            {/* Genres */}
            <div className='flex flex-col py-2'>
                <div className='text-m-l pb-4'>Genres</div>
                <div className='w-[90%] mx-auto'>
                    <MultiSelect
                        options={genresData}
                        label="All"
                        selected={selectedGenres}
                        setSelected={handleGenreChange}
                    />
                </div>
            </div>

            {/* Years */}
            <div className='flex flex-col py-2'>
                <div className='text-m-l pb-2'>Years</div>
                
                <div className='w-[90%] mx-auto'>
                    {/* https://mui.com/material-ui/react-slider/ */}
                    <Slider
                        defaultValue={selectedYear}
                        getAriaLabel={() => 'Year range'}
                        valueLabelDisplay="auto"
                        value={selectedYear}
                        onChange={handleYearsSliderChange}
                        max={maxYear}
                        min={minYear}
                    />

                    <div className='flex place-items-center justify-between'>
                        {/* Start Year Input */}
                        <Input
                            type="text"
                            className='text-accent w-16 h-6 text-center bg-primary/80 border rounded-md'
                            value={tempStartYear}
                            onChange={handleYearsInputChange("start")}
                            onBlur={handleYearsInputBlur("start")}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />

                        {/* End Year Input */}
                        <Input
                            type="text"
                            className='text-accent w-16 h-6 text-center bg-primary/80 border rounded-md'
                            value={tempEndYear}
                            onChange={handleYearsInputChange("end")}
                            onBlur={handleYearsInputBlur("end")}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div className='flex flex-col py-2'>
                <div className='text-m-l pb-2'>Rating </div>

                <div className='w-[90%] mx-auto'>
                    {/* https://mui.com/material-ui/react-slider/ */}
                    <Slider
                        defaultValue={selectedRating}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        value={selectedRating}
                        onChange={handleRatingChange}
                        min={0}
                        max={10}
                    />

                    <div className='flex place-items-center justify-center'>
                        <div>at least</div>
                        <Input
                            type="text"
                            className="text-accent mx-4 w-12 h-6 text-center bg-primary/80 border rounded-md"
                            value={selectedRating.toString()}
                            onChange={handleRatingChange}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <div>/ 10</div>
                    </div>
                </div>
            </div>

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