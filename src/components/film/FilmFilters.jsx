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
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";


const FilmFilters = ({ modalOpen, setModalOpen, dispatch, filterState }) => {
  // setIsFilterApplied,
  // sortBy: parentSortBy, setSortBy: parentSetSortBy,
  // filters: parentFilters, setFilters: parentSetFilters }) => {

  const [sortBy, setSortBy] = useState(filterState.sortBy);
  const [filters, setFilters] = useState(filterState.filters);
  const [genres, setGenres] = useState(new Set());

  // call api, fetch data
  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchMovieGenres();
      if (data) {
        const newGenresObject = {};
        data.genres.forEach(genre => { newGenresObject[genre.id] = genre.name; });
        setGenres(newGenresObject);
      }
    };
    getGenres();
  }, []);

  /******************************************************************************
   *  SORTS
   ******************************************************************************/

  const SortOptions = () => {
    return (
      <div className='flex flex-col py-3'>
        <div className='pb-4 subtitle'>Sort by </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-accent text-accent-foreground">{sortBy}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="Most Popular">Most Popular</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Least Popular">Least Popular</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Oldest">Oldest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Highest Rated">Highest Rated</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Lowest Rated">Lowest Rated</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  /*******************************************************************************
   *  GENRES
   ******************************************************************************/
  const handleGenreChange = (newGenre) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      genreFilter: newGenre
    }));
  };

  /*******************************************************************************
   *  YEARS
   ******************************************************************************/

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

  /*******************************************************************************
   *  RATING
   ******************************************************************************/

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
        className='w-12 h-6 ml-3 text-center border rounded-md text-m-s'
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
          className='w-12 h-6 ml-3 text-center border rounded-md text-m-s'
          variant={filters.ratingFilter === i ? "contained" : "outlined"}
          sx={getSx(i)}
          onClick={() => handleRatingChange(i)}
          key={i}
        > {i}+ </RatingButton>
      );
    }
    buttons.push(
      <RatingButton
        className='w-12 h-6 ml-3 text-center border rounded-md text-m-s'
        variant={filters.ratingFilter === ratingSteps ? "contained" : "outlined"}
        sx={getSx(ratingSteps)}
        onClick={() => handleRatingChange(ratingSteps)}
        key={ratingSteps}
      > {ratingSteps} </RatingButton>
    );
    return (
      <div className='flex flex-wrap gap-2 flex-evenly'>
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

  /*******************************************************************************
   *  RESET & APPLY BUTTONS
   ******************************************************************************/

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
    const hasFilter = checkIsFilterApplied(filters);
    if (hasFilter) {
      setIsFilterApplied(true);
      parentSetSortBy(sortBy);
      parentSetFilters({
        watchlistFilter: filters.watchlistFilter,
        specificWatchlistFilter: filters.specificWatchlistFilter,
        isSpecificAnd: filters.isSpecificAnd,
        genreFilter: filters.genreFilter,
        yearFilter: filters.yearFilter,
        ratingFilter: filters.ratingFilter,
      });
    } else {
      setIsFilterApplied(false);
      parentSetSortBy(defaultSortBy);
      parentSetFilters({
        watchlistFilter: defaultFilters.watchlistFilter,
        specificWatchlistFilter: defaultFilters.specificWatchlistFilter,
        isSpecificAnd: defaultFilters.isSpecificAnd,
        genreFilter: defaultFilters.genreFilter,
        yearFilter: defaultFilters.yearFilter,
        ratingFilter: defaultFilters.ratingFilter,
      });
    }
    // Close the modal
    setModalOpen(false);
  }

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
    if (sortBy !== defaultSortBy) count++;

    // if only isSpecificAnd is different from the parent state, no need to indicate that the filter is applied
    if (filters.isSpecificAnd !== defaultFilters.isSpecificAnd) {
      if (count == 2) return false;
      else return true;
    } else {
      if (count > 0) return true;
      else return false;
    }
  }

  /*******************************************************************************
   * RENDER
   * ******************************************************************************/

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent hasClose={false} className="max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] overflow-y-auto bg-primary custom-scrollbar text-secondary">
        <div className="z-50 flex flex-col w-full h-full px-8 mt-4 gap-y-4 bg-primary text-primary-foreground lg:mx-auto ">
          <div className='mb-4 flex-between'>
            <h3 className='h3'>Filters & Sort</h3>
            <div onClick={() => setModalOpen(false)}
              className='cursor-pointer text-m-xl'>
              <IoClose />
            </div>
          </div>

          <SortOptions />

          <Separator />

          {/* GENRES */}
          <div className='flex flex-col py-3'>
            <div className='pb-4 subtitle'>Genres</div>
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
            <div className='pb-4 subtitle'>Years</div>
            <div className='w-[100%] mx-auto flex items-center'>
              {/* https://mui.com/material-ui/react-slider/ */}
              {/* Start Year Input */}
              <Input
                type="text"
                className='w-12 h-6 mr-3 text-center border rounded-md text-m-s bg-primary/80'
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
                className='w-12 h-6 ml-3 text-center border rounded-md text-m-s bg-primary/80'
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
            <div className='pb-4 subtitle'>Rating </div>
            <div className='w-[100%] mx-auto3.79'>
              <RatingBtnGroup />
            </div>
          </div>

          <Separator />

          {/* Buttons */}
          <div className='flex w-full space-x-2'>
            <button onClick={resetFilters} className="flex-grow px-4 py-2 bg-transparent border rounded-md border-border text-secondary">Reset</button>
            <button onClick={applyFilters} className="flex-grow px-4 py-2 bg-transparent border rounded-md border-border text-secondary">Apply</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default FilmFilters;