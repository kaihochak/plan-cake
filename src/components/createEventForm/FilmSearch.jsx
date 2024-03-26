import React, { useState, useEffect, useCallback } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import { CiFilter } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "@/styles/utility.css"
import Filters from "@/components/utility/Filters";
import DummyUserData from "@/data/users";
import { cn } from "@/lib/utils"
import SearchBar from "@/components/utility/SearchBar";
import Loader from "@/components/utility/Loader";
import debounce from "lodash.debounce";
import { fetchUpcoming, searchFilms } from "../../lib/tmdb/api";
import { defaultFilters, defaultSortBy } from "@/constants";

const FilmSearch = ({ formData: parentFormData, nextStep }) => {
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState(defaultFilters);
    const [showFilters, setShowFilters] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(parentFormData);
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);
    
    const [filmData, setFilmData] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [users, setUsers] = useState(DummyUserData);

    /**
     * FILM DATA
     */

    // Fetch initial film data
    useEffect(() => {
        setLoading(true);
        getInitialFilms();
    }, []);
    const getInitialFilms = async () => {
        const upcoming = await fetchUpcoming();
        if (upcoming && upcoming.results) {
            setFilmData(upcoming.results);
            setFilteredItems(upcoming.results);
            setUpcomingFilms(upcoming.results);
            setLoading(false);
        }
    }

    // handle search should be debounced to avoid multiple API calls
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };
    const debouncedSearch = useCallback(
        (searchTerm) => requestSearch(searchTerm), []
    );
    const requestSearch = debounce(async (searchTerm) => {
        console.log("searching for", searchTerm);
        // if search term is not empty, fetch search results
        if (searchTerm && searchTerm.length > 0) {
            setLoading(true);
            const data = await searchFilms({
                query: searchTerm,
                include_adult: false,
                language: 'en-US',
                page: 1
            })
            if (data && data.results) {
                console.log("search results", data);
                setFilmData(data.results);
            }
        } else setFilmData(upcomingFilms);
        setLoading(false);
    }, 500);

    /**
     * FILTERS & SORTING
     */

    // // keep track of whether any filter or sort has been applied
    // useEffect(() => {
    //     const hasChanged = Object.keys(filters).some(key => filters[key] !== defaultFilters[key]) && sortBy !== defaultSortBy;
    //     setIsFilterApplied(hasChanged);
    // }, [sortBy, filters]);
  
    // Filter & sort the film data based on the current state
    useEffect(() => {
        console.log("filmData", filmData);
        const filteredResults = applyFilters(filmData); // Apply filters based on the current state
        const sortedResults = applySort(filteredResults); // Then, sort those results before returning them
        console.log("filteredResults", filteredResults);
        console.log("sortedResults", sortedResults);
        setFilteredItems(sortedResults);
    }, [filmData, sortBy, filters]);    

    // Filter the film data based on the search term & filters
    const applyFilters = (filmData) => {
        return filmData;
        //         // && (filters.watchlistFilter === 0 || (item.watchlists.length >= filters.watchlistFilter))
        //         // && (filters.specificWatchlistFilter.length === 0 || (Array.isArray(item.watchlists) && item.watchlists.some(user => filters.specificWatchlistFilter.includes(user))))
        //         // && (filters.genreFilter.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => filters.genreFilter.includes(genre))))
        //         // && (filters.yearFilter[0] <= item.year && item.year <= filters.yearFilter[1])
        //         // && (filters.ratingFilter === 0 || item.rating >= filters.ratingFilter)
        // });
    };

    // Sort the film data based on the selected sort option
    const applySort = (results) => {
        let sortedItems = results;
        console.log("sortedItems", sortedItems);
        switch (sortBy) {
            // case "Watchlists: Most to Least":
            //     sortedItems = sortedItems.sort((a, b) => b.watchlists.length - a.watchlists.length);
            //     break;
            // case "Watchlists: Least to Most":
            //     sortedItems = sortedItems.sort((a, b) => a.watchlists.length - b.watchlists.length);
            //     break;
            // case "Rating: High to Low":
            //     sortedItems = sortedItems.sort((a, b) => b.rating - a.rating);
            //     break;
            // case "Rating: Low to High":
            //     sortedItems = sortedItems.sort((a, b) => a.rating - b.rating);
            //     break;
            // case "Year: Newest to Oldest":
            //     sortedItems = sortedItems.sort((a, b) => b.year - a.year);
            //     break;
            // case "Year: Oldest to Newest":
            //     sortedItems = sortedItems.sort((a, b) => a.year - b.year);
            //     break;
            default:
                break;
        }
        return sortedItems;
    }

    // const DisplayAppliedFilters = () => {
    //     return (
    //         <div className="flex flex-wrap gap-2 justify-start mt-1 mb-4">
    //             {/* {sortBy !== defaultSortBy && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{sortBy}</p>
    //                 </button>
    //             )}
    //             {watchlistFilter > 0 && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">Watchlists: ≥ {watchlistFilter}</p>
    //                 </button>
    //             )}
    //             {specificWatchlistFilter.length > 0 && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{specificWatchlistFilter.join(" & ")}</p>
    //                 </button>
    //             )}
    //             {genreFilter.length > 0 && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{genreFilter.join(", ")}</p>
    //                 </button>
    //             )}
    //             {(yearFilter[0] !== defaultYearFilter[0] || yearFilter[1] !== defaultYearFilter[1]) && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{yearFilter[0]} - {yearFilter[1]}</p>
    //                 </button>
    //             )}
    //             {ratingFilter > 0 && (
    //                 <button onClick={() => setShowFilters(true)}>
    //                     <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">≥ {ratingFilter}</p>
    //                 </button>
    //             )}
    //             {isFilterApplied && (
    //                 <button onClick={() => {
    //                     setSortBy(defaultSortBy);
    //                     setwatchlistFilter(defaultWatchlistFilter);
    //                     setSpecificWatchlistFilter(defaultSpecificWatchlistFilter);
    //                     setGenreFilter(defaultGenreFilter);
    //                     setYearFilter(defaultYearFilter);
    //                     setRatingFilter(defaultRating);
    //                 }}>
    //                     <IoMdCloseCircleOutline className="text-accent/50 text-xl" />
    //                 </button>
    //             )} */}
    //         </div>
    //     )
    // }





     // Update selected films
     const updateSelection = (newSelectedFilms) => {
        setFormData(formData => ({ ...formData, selectedFilms: newSelectedFilms}));
    };

    // Handle next step
    const handleNextStep = () => {
        if (formData.selectedFilms.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else setShowNoSelectionError(false); // Hide error message if films are selected
        nextStep(formData);
    };


    return (
        <div className="w-full">
            <h2 className="text-m-2xl mb-3">Pick A Film</h2>
            {/* {showFilters ?
                <Filters
                    closeModal={() => setShowFilters(false)}
                    maxNumWatchlist={6}
                    minYear={defaultYearFilter[0]}
                    maxYear={defaultYearFilter[1]}
                    ratingSteps={10}
                    selectedSortBy={sortBy}
                    setSelectedSortBy={(newSortBy) => setSortBy(newSortBy)}
                    selectedWatchlists={watchlistFilter}
                    setSelectedWatchlists={(newNumWatchlist) => setwatchlistFilter(newNumWatchlist)}
                    selectedSpecificWatchlists={specificWatchlistFilter}
                    setSelectedSpecificWatchlists={(newSpecificWatchlist) => setSpecificWatchlistFilter(newSpecificWatchlist)}
                    selectedGenres={genreFilter}
                    setGenre={(newGenre) => setGenreFilter(newGenre)}
                    selectedYear={yearFilter}
                    setYear={(newYear) => setYearFilter(newYear)}
                    selectedRating={ratingFilter}
                    setRating={(newRating) => setRatingFilter(newRating)}
                /> : */}

                <div className="flex flex-col">
                    {/* Description */}
                    <div className="text-m-l">
                        <p className="text-m-m"> or many films and decide later on.</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex gap-x-4 pt-6">
                        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={cn("flex items-center text-[30px] mr-2 mt-2 text-primary-foreground/60", { "text-accent/70": isFilterApplied })}>
                            <CiFilter />
                        </button>
                    </div>

                    {/* Applied Filter Displays */}
                    {/* <DisplayAppliedFilters /> */}

                    {/* Result */}
                    {loading ?
                        <div className="flex-center h-[400px] md:h-[800px]">
                            <Loader height="h-[60px]" weight="h-[60px]" />
                        </div> :
                        <SearchDisplay
                            filteredItems={filteredItems} // Pass the filtered items to the display
                            selectedFilms={formData.selectedFilms} // Pass the selected items to the display
                            setSelectedFilms={updateSelection} // Pass the update function
                        />
                    }

                    {/* Display error message if no film is selected */}
                    {showNoSelectionError && (
                        <div className="text-destructive-foreground text-m-m pt-10">
                            Please select at least one film.
                        </div>
                    )}

                    {/* Next Step */}
                    <Button onClick={handleNextStep} type="submit" className="mt-10">
                        Next
                    </Button>
                </div>
            {/* } */}
        </div>

    );
};



export default FilmSearch;
