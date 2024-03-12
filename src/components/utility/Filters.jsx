import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import genresData from "@/data/genres";
import usersData from "@/data/users";
import Slider from '@mui/material/Slider';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { IoClose } from "react-icons/io5";
import RatingButton from '@mui/material/Button';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
const Filters = ({ closeModal, maxNumWatchlist, minYear, maxYear, ratingSteps,
    selectedSortBy: parentSelectedSortBy, setSelectedSortBy: parentSetSelectedSortBy,
    selectedWatchlists: parentSelectedWatchlists, setSelectedWatchlists: parentSetSelectedWatchlists,
    selectedSpecificWatchlists: parentSelectedSpecificWatchlists, setSelectedSpecificWatchlists: parentSetSelectedSpecificWatchlists,
    selectedGenres: parentSelectedGenres, setGenre: parentSetGenre,
    selectedYear: parentSelectedYear, setYear: parentSetYear,
    selectedRating: parentSelectedRating, setRating: parentSetRating }) => {
        
    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');
    const [sortBy, setSortBy] = useState(parentSelectedSortBy)
    const [selectedWatchlists, setSelectedWatchlists] = useState(parentSelectedWatchlists);
    const [selectedSpecificWatchlists, setSelectedSpecificWatchlists] = useState(parentSelectedSpecificWatchlists);
    const [selectedGenres, setSelectedGenres] = useState(parentSelectedGenres);
    const [selectedYear, setSelectedYear] = useState(parentSelectedYear);
    const [tempStartYear, setTempStartYear] = useState(parentSelectedYear[0]);
    const [tempEndYear, setTempEndYear] = useState(parentSelectedYear[1]);
    const [selectedRating, setSelectedRating] = useState(parentSelectedRating);

    const handleSortByChange = (newSortBy) => {
        setSortBy(newSortBy);
    };

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
    
    const handleRatingChange = (value) => {
        setSelectedRating(value);
    }
    
    // const handleRatingChange = (event, newValue) => {
        //     // For slider component, the newValue is directly provided as the second argument
    //     if (newValue !== undefined) {
    //         setSelectedRating(newValue);
    //     } else {
    //         // For standard input, extract the value from event.target.value
    //         const inputVal = event.target.value === '' ? 0 : Number(event.target.value);
    //         if (inputVal > 10 || inputVal < 0) {
    //             return;
    //         }
    //         setSelectedRating(inputVal);
    //     }
    // };

    // reset filters
    const resetFilters = () => {
        setSortBy("Watchlists: Most to Least");
        setSelectedWatchlists(0);
        setSelectedSpecificWatchlists([]);
        setSelectedGenres([]);
        setSelectedYear([minYear, maxYear]);
        setSelectedRating(0);
    };

    // apply filters
    const applyFilters = () => {
        parentSetSelectedSortBy(sortBy);
        parentSetSelectedWatchlists(selectedWatchlists);
        parentSetSelectedSpecificWatchlists(selectedSpecificWatchlists);
        parentSetGenre(selectedGenres);
        parentSetYear(selectedYear);
        parentSetRating(selectedRating);
        closeModal();
    };
    

    // rating buttons
    const RatingBtnGroup = () => {


        const buttons = [];
        const getSx = (index) => ({
            color: selectedRating===index ? 'hsl(var(--accent-foreground))':'hsl(var(--primary-foreground))',
            backgroundColor: selectedRating===index ? 'hsl(var(--accent))':'hsl(var(--primary))',
            borderColor: 'hsl(var(--border))',
            borderWidth: '1px',
            '&:hover': {
                color: 'hsl(var(--primary))',
                backgroundColor: 'hsl(var(--accent))',
                borderStyle: 'none'
            },
        });

        buttons.push(
            <RatingButton 
                className='border rounded-md text-m-s ml-3 w-12 h-6 text-center' 
                variant={selectedRating===0?"contained":"outlined"}
                sx={getSx(0)}
                onClick={() => handleRatingChange(0)}
                key={0}
            >Any
            </RatingButton>
        );
        for (let i = 1; i < ratingSteps; i++) {
            buttons.push(
                <RatingButton                 
                    className='border rounded-md text-m-s ml-3 w-12 h-6 text-center' 
                    variant={selectedRating===i?"contained":"outlined"}
                    sx={getSx(i)}
                    onClick={() => handleRatingChange(i)}
                    key={i}
                 > {i}+ </RatingButton>
            );
        }
        buttons.push(
            <RatingButton 
                className='border rounded-md text-m-s ml-3 w-12 h-6 text-center' 
                variant={selectedRating===ratingSteps?"contained":"outlined"}
                sx={getSx(ratingSteps)}
                onClick={() => handleRatingChange(ratingSteps)}
                key={ratingSteps}
            > {ratingSteps} </RatingButton>
        );
        return (
            <div className='flex gap-2 flex-wrap'>
                {buttons}
            </div>
        );
    };

    // Desktop
    // if (isDesktop) {
    //     return (
    //         <div></div>
    //     )
    // }

    // Mobile
    return (
        <div className="flex flex-col gap-y-4 text-primary-foreground w-full pt-10 pb-32 px-8 z-50 lg:mx-auto  ">
            <div className='flex justify-between mb-4 place-items-end'>
                <h3 className='text-m-xl'>Filters & Sort</h3>
                <div onClick={closeModal} className='text-m-xl cursor-pointer'>
                    <IoClose />
                </div>
            </div>

            {/* Sort By */}
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-4'>Sort by </div>

                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{sortBy}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortByChange}>
                    <DropdownMenuRadioItem value="Watchlists: Most to Least">Watchlists: Most to Least</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Watchlists: Least to Most">Watchlists: Least to Most</DropdownMenuRadioItem>
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
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-2'>Watchlists 
                    <p className='text-m-s pt-2 text-primary-foreground/70'>The minimum number of watchlists they're on.</p>
                </div>
                

            <div className='w-[100%] mx-auto'>
                {/* https://mui.com/material-ui/react-slider/ */}
                <div className='flex items-center'>

                    <Slider
                        defaultValue={selectedWatchlists}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        value={selectedWatchlists}
                        onChange={handleWatchlistChange}
                        min={0}
                        max={maxNumWatchlist}
                        sx={
                            {color: 'hsl(var(--accent))',
                            height: 2,
                            '& .MuiSlider-thumb': {
                            height: 12,
                            width: 12,
                            },
                        }}
                    />

                    <Input
                        type="text"
                        className="border rounded-md text-m-s ml-2 w-12 h-6 text-center bg-primary/80 "
                        value={selectedWatchlists.toString()}
                        onChange={handleWatchlistChange}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    </div>

                {/* Specific Watchlist */}
                <div className='mt-4'>
                    <p className='text-m-s pb-4 text-primary-foreground/70'>Whose watchlists they appear on.</p>
                </div>
                <div className='w-[100%] mx-auto'>
                    <MultiSelect
                        options={usersData}
                        label="All"
                        selected={selectedSpecificWatchlists}
                        setSelected={handleSpecificWatchlistChange}
                        separator=" &&nbsp;"
                    />
                </div>
            </div>

            </div>

            {/* Genres */}
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-4'>Genres</div>
                <div className='w-[100%] mx-auto'>
                    <MultiSelect
                        options={genresData}
                        label="All"
                        selected={selectedGenres}
                        setSelected={handleGenreChange}
                        separator=",&nbsp;"
                    />
                </div>
            </div>

            {/* Years */}
            <div className='flex flex-col py-3 '>
                <div className='text-m-l pb-4'>Years</div>
                
                <div className='w-[100%] mx-auto flex items-center'>
                    {/* https://mui.com/material-ui/react-slider/ */}
                                           {/* Start Year Input */}
                    <Input
                        type="text"
                        className='border rounded-md text-m-s mr-3 w-12 h-6 text-center bg-primary/80'
                        value={tempStartYear}
                        onChange={handleYearsInputChange("start")}
                        onBlur={handleYearsInputBlur("start")}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />

                    <Slider
                        defaultValue={selectedYear}
                        getAriaLabel={() => 'Year range'}
                        valueLabelDisplay="auto"
                        value={selectedYear}
                        onChange={handleYearsSliderChange}
                        max={maxYear}
                        min={minYear}
                        sx={
                            {color: 'hsl(var(--accent))',
                            height: 2,
                            '& .MuiSlider-thumb': {
                              height: 12,
                              width: 12,
                        }}}
                    />

                    {/* End Year Input */}
                    <Input
                        type="text"
                        className='border rounded-md text-m-s ml-3 w-12 h-6 text-center bg-primary/80'
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

            {/* Rating */}
            <div className='flex flex-col py-3 '>
                <div className='text-m-l pb-4'>Rating </div>

                <div className='w-[100%] mx-auto3.79'>

                    <RatingBtnGroup/>

                </div>
            </div>

            <Separator />

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