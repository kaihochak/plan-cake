import React, { useState, useEffect, useCallback } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "@/styles/utility.css"
import Filters from "@/components/utility/Filters";
import { cn } from "@/lib/utils"
import dummyUser from "@/data/dummyUserData";
import SearchBar from "@/components/utility/SearchBar";
import Loader from "@/components/utility/Loader";
import debounce from "lodash.debounce";
import { fetchUpcoming, searchFilms } from "../../lib/tmdb/api";
import { defaultSortBy, defaultWatchlistFilter, defaultSpecificWatchlistFilter, defaultGenreFilter, defaultYearFilter, defaultRating } from "@/constants";

const FilmSearch = ({ formData: parentFormData, nextStep }) => {
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [watchlistFilter, setwatchlistFilter] = useState(defaultWatchlistFilter);
    const [specificWatchlistFilter, setSpecificWatchlistFilter] = useState(defaultSpecificWatchlistFilter);
    const [genreFilter, setGenreFilter] = useState(defaultGenreFilter);
    const [yearFilter, setYearFilter] = useState(defaultYearFilter);
    const [ratingFilter, setRatingFilter] = useState(defaultRating);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(parentFormData);
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);
    
    const [filmData, setFilmData] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Update selected films
    const updateSelection = (newSelectedFilms) => {
        setFormData(formData => ({
            ...formData,
            selectedFilms: newSelectedFilms
        }));
    };

    // Handle next step
    const handleNextStep = () => {
        if (formData.selectedFilms.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else {
            setShowNoSelectionError(false); // Hide error message if films are selected
        }
        nextStep(formData);
    };


    /**
     * FILM DATA
     */

    // Fetch initial film data
    useEffect(() => {
        setLoading(true);
        getInitialFilms();
    }, []);

    const getInitialFilms = async () => {
        const data = await fetchUpcoming();
        if (data && data.results) {
            setFilmData(data.results);
            setFilteredItems(data.results);
            setUpcomingFilms(data.results);
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
                page: 10
            })
            if (data && data.results) {
                setFilmData(data.results);
                // apply filters and sort
                // setFilteredItems(filmData.filter(item =>
                //     item.original_title.toLowerCase().includes(value.toLowerCase())
                // ));
            }
            else setFilmData(upcomingFilms);
        }
        setLoading(false);
    }, 500);


    /**
     * FILTERS & SORTING
     */

    // when filters/sort settings change, reapply filters and sort
    useEffect(() => {
        // show the filter button in a different color if any filter has been applied
        const hasChanged = sortBy !== defaultSortBy ||
            watchlistFilter !== defaultWatchlistFilter ||
            (specificWatchlistFilter && specificWatchlistFilter.length > 0) ||
            (genreFilter && genreFilter.length > 0) ||
            yearFilter[0] !== defaultYearFilter[0] ||
            yearFilter[1] !== defaultYearFilter[1] ||
            ratingFilter !== defaultRating;
        setIsFilterApplied(hasChanged);
        
        const results = applyFiltersAndSort();
        setFilteredItems(results);
    }, [searchTerm, sortBy, watchlistFilter, specificWatchlistFilter, genreFilter, yearFilter, ratingFilter]);

    const applyFiltersAndSort = () => {
        let results = applyFilters(); // Apply filters based on the current state
        return applySort(results); // Then, sort those results before returning them
    };

    // Filter the film data based on the search term & filters
    const applyFilters = () => {
        // if empty string, return all items
        if (!searchTerm) {
            return upcomingFilms;
        } else {
            return filmData.filter(item => {
                item.original_title.toLowerCase().includes(searchTerm.toLowerCase())
                    && (watchlistFilter === 0 || item.watchlists.length >= watchlistFilter)
                    && (specificWatchlistFilter.length === 0 || (Array.isArray(item.watchlists) && item.watchlists.some(user => specificWatchlistFilter.includes(user))))
                    && (genreFilter.length === 0 || (Array.isArray(item.genres) && item.genres.some(genre => genreFilter.includes(genre))))
                    && (yearFilter[0] <= item.year && item.year <= yearFilter[1])
                    && (ratingFilter === 0 || item.rating >= ratingFilter)
            });
        }
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

    const AppliedFilters = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-start mt-1 mb-4">
                {sortBy !== defaultSortBy && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{sortBy}</p>
                    </button>
                )}
                {watchlistFilter > 0 && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">Watchlists: ≥ {watchlistFilter}</p>
                    </button>
                )}
                {specificWatchlistFilter.length > 0 && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{specificWatchlistFilter.join(" & ")}</p>
                    </button>
                )}
                {genreFilter.length > 0 && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{genreFilter.join(", ")}</p>
                    </button>
                )}
                {(yearFilter[0] !== defaultYearFilter[0] || yearFilter[1] !== defaultYearFilter[1]) && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">{yearFilter[0]} - {yearFilter[1]}</p>
                    </button>
                )}
                {ratingFilter > 0 && (
                    <button onClick={() => setShowFilters(true)}>
                        <p className="py-2 px-4 h-auto border-2 border-accent/30 rounded-full text-m-s text-accent/60">≥ {ratingFilter}</p>
                    </button>
                )}
                {isFilterApplied && (
                    <button onClick={() => {
                        setSortBy(defaultSortBy);
                        setwatchlistFilter(defaultWatchlistFilter);
                        setSpecificWatchlistFilter(defaultSpecificWatchlistFilter);
                        setGenreFilter(defaultGenreFilter);
                        setYearFilter(defaultYearFilter);
                        setRatingFilter(defaultRating);
                    }}>
                        <IoMdCloseCircleOutline className="text-accent/50 text-xl" />
                    </button>
                )}
            </div>
        )
    }


    return (
        <div className="w-full">
            <h2 className="text-m-2xl mb-3">Pick A Film</h2>
            {showFilters ?
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
                /> :

                /**
                 * Main content
                 */
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
                    <AppliedFilters />

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
            }
        </div>

    );
};



export default FilmSearch;
