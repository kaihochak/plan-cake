import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query'
import MultiSelect from "@/components/utility/multiSelect";
import Slider from '@mui/material/Slider';
import { IoClose } from "react-icons/io5";
import RatingButton from '@mui/material/Button';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { defaultFilters, defaultSortBy } from "@/constants";
import { fetchMovieGenres } from '../../lib/tmdb/api';
import { Ampersand } from "lucide-react"
import { z } from 'zod';

const FilmFilters = ({ filmData, users: parentUsers, setIsFilterApplied, setModalOpen, sortBy: parentSortBy, setSortBy: parentSetSortBy,
    filters: parentFilters, setFilters: parentSetFilters, setFilteredResults: parentSetFilteredResults }) => {

    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');
    const [sortBy, setSortBy] = useState(parentSortBy);
    const [filters, setFilters] = useState(parentFilters);
    const [genres, setGenres] = useState(new Set());
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // call api, fetch data
    useEffect(() => {
        getGenres();
        convertUsers();
    }, []);

    // fetch data for most watchlisted films
    const getGenres = async () => {
        const data = await fetchMovieGenres();
        if (data) {
            const newGenresObject = {};
            data.genres.forEach(genre => { newGenresObject[genre.id] = genre.name; });
            setGenres(newGenresObject);
        }
        setLoading(false);
    };

    // convert users to the format required by the MultiSelect component
    const convertUsers = () => {
        const newUsers = parentUsers.map(user => ({ id: user._id, name: user.username }));
        setUsers(newUsers);
    };

    // useEffect(() => {
    //     console.log('sorting by', sortBy);
    //     console.log("filters", filters);
    // }, [sortBy, filters]);

    /**
     *  SORTS
     */

    const SortOptions = () => {
        return (
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-4'>Sort by </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className=" bg-accent text-accent-foreground">{sortBy}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
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
        )
    }

    /**
     *  WATCHLISTS
     */
    let maxNumWatchlist = users.length;
    const handleWatchlistChange = (event, newValue) => {
        // For slider component, the newValue is directly provided as the second argument
        if (newValue !== undefined) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: newValue
            }));
        } else {
            // For standard input, extract the value from event.target.value
            const inputVal = event.target.value === '' ? 0 : Number(event.target.value);
            if (inputVal > maxNumWatchlist || inputVal < 0) return;
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: inputVal
            }));
        }
    };

    const handleSpecificWatchlistChange = (newSpecificWatchlist) => {

        // if AND is selected, number of watchlist should be at least the number of selected users
        if ( filters.isSpecificAnd && newSpecificWatchlist.length > filters.watchlistFilter) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: newSpecificWatchlist.length
            }));
        }

        // if OR is selected, number of watchlist should be at least 1
        if ( !filters.isSpecificAnd && newSpecificWatchlist.length > 0 && filters.watchlistFilter === 0) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: 1
            }));
        }

        // Update the watchlist filter if the new specific watchlist is empty
        if (newSpecificWatchlist.length === 0) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: 0
            }));
        }

        // Update the specific watchlist filter
        setFilters((currentFilters) => ({
            ...currentFilters,
            specificWatchlistFilter: newSpecificWatchlist
        }));
    };

    const handleIsSpecificAnd = () => {

        // toggle the isSpecificAnd filter
        setFilters((currentFilters) => ({
            ...currentFilters,
            isSpecificAnd: !filters.isSpecificAnd
        }));
    };

    useEffect(() => {
        // if OR is selected and specific watchlist is not empty, set watchlist filter to 1
        if ( !filters.isSpecificAnd && filters.specificWatchlistFilter.length > 0) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: 1
            }));
        }

        // if AND is selected, number of watchlist should be at least the number of selected users
        if ( filters.isSpecificAnd && filters.specificWatchlistFilter.length > filters.watchlistFilter) {
            setFilters((currentFilters) => ({
                ...currentFilters,
                watchlistFilter: filters.specificWatchlistFilter.length
            }));
        }
    }, [filters.isSpecificAnd]);

    /**
     *  GENRES
     */
    const handleGenreChange = (newGenre) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            genreFilter: newGenre
        }));
    };

    /**
     *  YEARS
    */
    let minYear = 1900;
    let maxYear = new Date().getFullYear();

    const handleYearsInputBlur = (type) => (event) => {
        const newValue = parseInt(event.target.value, 10);
        let startYear = filters.yearFilter[0], endYear = filters.yearFilter[1];

        if (type === "start") {
            // Adjust the start year within the boundaries
            startYear = isNaN(newValue) ? minYear : Math.min(Math.max(newValue, minYear), endYear);
        } else {
            // Adjust the end year within the boundaries
            endYear = isNaN(newValue) ? maxYear : Math.max(Math.min(newValue, maxYear), startYear);
        }

        const newYears = [startYear, endYear];
        setFilters((currentFilters) => ({
            ...currentFilters,
            yearFilter: newYears
        }));
    };

    const handleYearsInputChange = (type) => (event) => {
        const value = event.target.value;
        if (type === "start") {
            setFilters((currentFilters) => ({
                ...currentFilters,
                yearFilter: [value, ...currentFilters.yearFilter.slice(1)]
            }));
        } else if (type === "end") {
            setFilters((currentFilters) => ({
                ...currentFilters,
                yearFilter: [...currentFilters.yearFilter.slice(0, 1), value]
            }));
        }
    };

    const handleYearsSliderChange = (event, newValue) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            yearFilter: newValue
        }));
    };

    /**
     *  RATING
    */
    let ratingSteps = 10;
    const RatingBtnGroup = () => {
        const buttons = [];
        const getSx = (index) => ({
            color: filters.ratingFilter === index ? 'hsl(var(--accent-foreground))' : 'hsl(var(--primary-foreground))',
            backgroundColor: filters.ratingFilter === index ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
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
                variant={filters.ratingFilter === 0 ? "contained" : "outlined"}
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
                    variant={filters.ratingFilter === i ? "contained" : "outlined"}
                    sx={getSx(i)}
                    onClick={() => handleRatingChange(i)}
                    key={i}
                > {i}+ </RatingButton>
            );
        }
        buttons.push(
            <RatingButton
                className='border rounded-md text-m-s ml-3 w-12 h-6 text-center'
                variant={filters.ratingFilter === ratingSteps ? "contained" : "outlined"}
                sx={getSx(ratingSteps)}
                onClick={() => handleRatingChange(ratingSteps)}
                key={ratingSteps}
            > {ratingSteps} </RatingButton>
        );
        return (
            <div className='flex gap-2 flex-wrap flex-evenly'>
                {buttons}
            </div>
        );
    };

    const handleRatingChange = (value) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            ratingFilter: value
        }));
    }

    // const handleRatingChange = (event, newValue) => {
    //     // For slider component, the newValue is directly provided as the second argument
    //     if (newValue !== undefined) {
    //         setfilters.ratingFilter(newValue);
    //     } else {
    //         // For standard input, extract the value from event.target.value
    //         const inputVal = event.target.value === '' ? 0 : Number(event.target.value);
    //         if (inputVal > 10 || inputVal < 0) {
    //             return;
    //         }
    //         setfilters.ratingFilter(inputVal);
    //     }
    // };

    /**
     *  RESET & APPLY BUTTONS
    */

    // reset filters
    const resetFilters = () => {
        setSortBy(defaultSortBy);
        setFilters({
            watchlistFilter: defaultFilters.watchlistFilter,
            specificWatchlistFilter: defaultFilters.specificWatchlistFilter,
            isSpecificAnd: defaultFilters.isSpecificAnd,
            genreFilter: defaultFilters.genreFilter,
            yearFilter: defaultFilters.yearFilter,
            ratingFilter: defaultFilters.ratingFilter,
        });
    };

    // apply filters
    const applyFilters = () => {

        // Update the parent state with the new filters and sorting
        checkIsFilterApplied(filters);
        parentSetSortBy(sortBy);
        parentSetFilters(filters);

        // Close the modal
        setModalOpen(false);
    };

    // check if any filters are applied
    const checkIsFilterApplied = (filters) => {

        /**
         * if isSpecificAnd is the ONLY filter applied, no need to indicate that the filter is applied
         */

        // count the number of filters that are different from the parent state
        let count = 0;
        for (const key in filters) {
            if (filters[key] !== defaultFilters[key]) count++
        }

        if (filters.isSpecificAnd === parentFilters.isSpecificAnd) {
            console.log(count);
            if (count < 2) setIsFilterApplied(false); // if only isSpecificAnd is different from the parent state
            else setIsFilterApplied(true);
        }
        // Update the parent state if there is any filters or sorting applied
        // if (Object.keys(filters).some(key => filters[key] !== defaultFilters[key]) || sortBy !== defaultSortBy) {
        //     setIsFilterApplied(true);
        // } else {
        //     setIsFilterApplied(false);
        // }
        // if isSpecificAnd is different from the parent state
    }

    return (
        <div className="flex flex-col gap-y-4 bg-primary text-primary-foreground w-full h-full pt-10 pb-32 px-8 z-50 lg:mx-auto  ">
            <div className='flex justify-between mb-4 place-items-end'>
                <h3 className='text-m-xl'>Filters & Sort</h3>
                <div onClick={() => setModalOpen(false)}
                    className='text-m-xl cursor-pointer'>
                    <IoClose />
                </div>
            </div>

            {/* SORTS */}
            <SortOptions />

            <Separator />

            {/* WATCHLISTS */}
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-2'>Watchlists
                    <p className='text-m-s pt-2 text-primary-foreground/70'>The minimum number of watchlists they're on.</p>
                </div>

                <div className='w-[100%] mx-auto'>
                    {/* https://mui.com/material-ui/react-slider/ */}
                    <div className='flex items-center'>
                        <Slider
                            defaultValue={filters.watchlistFilter}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            value={filters.watchlistFilter}
                            onChange={handleWatchlistChange}
                            min={0}
                            max={maxNumWatchlist}
                            sx={{ color: 'hsl(var(--accent))', height: 2, '& .MuiSlider-thumb': { height: 12, width: 12, }, }}
                        />
                        <Input
                            type="text"
                            className="border rounded-md text-m-s ml-2 w-12 h-6 text-center bg-primary/80 "
                            value={filters.watchlistFilter}
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
                    <div className='flex items-center gap-2 '>
                        {/* set AND OR */}
                        <Button variant="outline" size="icon" className="bg-accent text-accent-foreground" onClick={() => handleIsSpecificAnd()} >
                            <div className={` h-[1.2rem] w-[1.4rem] rotate-0  transition-all ${filters.isSpecificAnd ? "-rotate-90 scale-0 hidden md:block" : "scale-100"}`}>OR</div>
                            <Ampersand className={`md:absolute h-[1.4rem] w-[1.4rem] transition-all ${filters.isSpecificAnd ? "rotate-0 scale-100" : "hidden md:scale-0 rotate-90"}`} />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        {/* Selection */}
                        <div className='w-full'>
                            <MultiSelect
                                options={users}
                                label="Member"
                                selected={filters.specificWatchlistFilter}
                                setSelected={handleSpecificWatchlistChange}
                                separator={filters.isSpecificAnd ? " &\u00A0" : ",\u00A0"}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* GENRES */}
            <div className='flex flex-col py-3'>
                <div className='text-m-l pb-4'>Genres</div>
                <div className='w-[100%] mx-auto z-50'>
                    <MultiSelect
                        options={genres}
                        label="Genre"
                        selected={filters.genreFilter}
                        setSelected={(newGenre) => handleGenreChange(newGenre)}
                        separator={",\u00A0"}
                    />
                </div>
            </div>

            {/* YEARS */}
            <div className='flex flex-col py-3 '>
                <div className='text-m-l pb-4'>Years</div>
                <div className='w-[100%] mx-auto flex items-center'>
                    {/* https://mui.com/material-ui/react-slider/ */}
                    {/* Start Year Input */}
                    <Input
                        type="text"
                        className='border rounded-md text-m-s mr-3 w-12 h-6 text-center bg-primary/80'
                        value={filters.yearFilter[0]}
                        onChange={handleYearsInputChange("start")}
                        onBlur={handleYearsInputBlur("start")}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <Slider
                        defaultValue={filters.yearFilter}
                        getAriaLabel={() => 'Year range'}
                        valueLabelDisplay="auto"
                        value={filters.yearFilter}
                        onChange={handleYearsSliderChange}
                        max={maxYear}
                        min={minYear}
                        sx={{ color: 'hsl(var(--accent))', height: 2, '& .MuiSlider-thumb': { height: 12, width: 12, } }}
                    />
                    {/* End Year Input */}
                    <Input
                        type="text"
                        className='border rounded-md text-m-s ml-3 w-12 h-6 text-center bg-primary/80'
                        value={filters.yearFilter[1]}
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

            {/* RATING */}
            <div className='flex flex-col py-3 '>
                <div className='text-m-l pb-4'>Rating </div>
                <div className='w-[100%] mx-auto3.79'>
                    <RatingBtnGroup />
                </div>
            </div>

            <Separator />

            {/* Buttons */}
            <div className='flex w-full space-x-2'>
                <button onClick={resetFilters} className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent py-2 px-4">Reset</button>
                <button onClick={applyFilters} className="rounded-md flex-grow border border-secondary-default text-secondary-default bg-transparent py-2 px-4">Apply</button>
            </div>
        </div>
    )
}

export default FilmFilters;