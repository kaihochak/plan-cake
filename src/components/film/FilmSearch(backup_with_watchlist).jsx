import React, { useState, useEffect, useCallback } from "react";
import SearchDisplay from "./SearchDisplay";
import { Button } from "@/components/ui/button";
import "@/styles/utility.css"
import SearchBar from "@/components/utility/SearchBar";
import Loader from "@/components/utility/Loader";
import debounce from "lodash.debounce";
import { fetchFilmDetails, fetchUpcoming, searchFilms } from "@/lib/tmdb/api";
import FilmFilters from "@/components/film/FilmFilters";
import FilmFiltersDisplay from "@/components/film/FilmFiltersDisplay";
import { BiFilterAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { defaultFilters, defaultSortBy } from "@/constants";
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { useGetUpcoming } from "@/lib/react-query/queries";

const FilmSearch = ({ selectedFilms, nextStep, title, protectedFilms, setModalOpen }) => {
    const [loading, setLoading] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({ selectedFilms });  // Adjusted to only use selectedFilms
    const [users, setUsers] = useState([]);  
    const [showNoSelectionError, setShowNoSelectionError] = useState(false);

    // Film Data
    const [filmData, setFilmData] = useState([]);
    const [watchlistObject, setWatchlistObject] = useState({}); // key: film ID, value: array of user IDs
    const [sortedWatchlist, setSortedWatchlist] = useState([]); // sorted watchlisted films in TMDB format
    const [upcomingFilms, setUpcomingFilms] = useState([]); // upcoming films in TMDB format
    const [filteredResults, setFilteredResults] = useState([]); // filtered results to be displayed

    // Filter and Search
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState({
        watchlistFilter: defaultFilters.watchlistFilter,
        specificWatchlistFilter: defaultFilters.specificWatchlistFilter,
        isSpecificAnd: defaultFilters.isSpecificAnd,
        genreFilter: defaultFilters.genreFilter,
        yearFilter: defaultFilters.yearFilter,
        ratingFilter: defaultFilters.ratingFilter,
    });

    // Query upcoming films
    const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcoming();

    /************************************************************************
     * INITIAL FILM DATA
     ************************************************************************/

    // Start from storing user watchlist
    useEffect(() => {
        setLoading(true);
        // storeUserWatchlist();
        getAndSetUpcomingFilms();
    }, []);

    // Store user watchlist in a map, where key is the film ID and value is an array of user IDs
    const storeUserWatchlist = () => {
        let tempWatchlistedFilms = {};
        users.forEach(user => {
            user.films.watchlist.forEach(film => {
                if (tempWatchlistedFilms[film._id]) {
                    if (!tempWatchlistedFilms[film._id].includes(user._id)) {
                        tempWatchlistedFilms[film._id].push(user._id);
                    }
                } else {
                    tempWatchlistedFilms[film._id] = [user._id];
                }
            });
        });

        // If there is watchlist, fetch user watchlist first, then fetch upcoming films
        if (Object.keys(tempWatchlistedFilms).length > 0) setWatchlistObject(tempWatchlistedFilms)
        // If there is no watchlist, simply fetch upcoming films 
        else getAndSetUpcomingFilms();
    };

    // Fetch user watchlist and initial films
    useEffect(() => {
        if (Object.keys(watchlistObject).length > 0) getAndSetUserWatchlist();
    }, [watchlistObject]);

    // Fetch user watchlist from TMDB API
    const getAndSetUserWatchlist = async () => {
        try {
            // Fetch watchlist for each user, and store only the non-null values
            const watchlistPromises = Object.keys(watchlistObject).map(async filmID => {
                try {
                    const film = await fetchFilmDetails(filmID);
                    return film;
                } catch (error) {
                    console.error("Error fetching watchlisted film id:", filmID, error);
                    return null;
                }
            });

            // Wait for all promises to resolve, and filter out the null values
            let userWatchlists = await Promise.all(watchlistPromises);
            userWatchlists = userWatchlists.filter(film => film.id !== undefined);

            // Sort the watchlisted films by the number of watchlists, and set the state
            userWatchlists = sortFilmsByWatchlist(userWatchlists);

            setSortedWatchlist(userWatchlists);
        } catch (error) {
            console.error("Error fetching watchlisted films:", error);
            throw error; // Propagate the error to the caller
        }

        // Fetch upcoming films after fetching watchlist
        getAndSetUpcomingFilms();
    };

    // Fetch upcoming films
    const getAndSetUpcomingFilms = async () => {
        try {
            const upcoming = await fetchUpcoming(); // fetch upcoming films as part of the initial data
            if (upcoming && upcoming.results) setUpcomingFilms(filterWatchlistedFilms(upcoming.results));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching initial films:", error);
            setLoading(false);
            throw error; // Propagate the error to the caller
        }
    };

    // When both watchlist and upcoming films are stored, set the film data
    useEffect(() => {
        if (sortedWatchlist.length > 0 && upcomingFilms.length > 0) setFilmData([...sortedWatchlist, ...upcomingFilms]);
    }, [sortedWatchlist, upcomingFilms]);

    /************************************************************************
     * SEARCH
     ************************************************************************/

    // handle search should be debounced to avoid multiple API calls
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };
    // debounce the search function
    const debouncedSearch = useCallback(
        debounce(async (searchTerm) => {
            console.log("searching for", searchTerm);
            // if search term is not empty, fetch search results
            if (searchTerm && searchTerm.length > 0) {
                setLoading(true);
                const data = await searchFilms({
                    query: searchTerm,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                });
                if (data && data.results) setFilmData(data.results);
            } else {
                if (sortedWatchlist.length > 0 && upcomingFilms.length > 0) {
                    console.log("setting film data");
                    setFilmData([...sortedWatchlist, ...upcomingFilms]);
                } else setFilmData(upcomingFilms);
            }
            setLoading(false);
        }, 400),
        [sortedWatchlist, upcomingFilms]
        // make sure when search term is empty, sortedWatchlist and upcomingFilms are not going to be remounted, leading to empty filmData
    );

    /************************************************************************
     * FILTERS & SORTING
     ************************************************************************/

    // keep track of whether any filter or sort has been applied
    useEffect(() => {
        setFilteredResults(sortResults(filterResults(filmData)));
    }, [filmData, sortBy, filters]);

    // Filter the film data based on the search term & filters
    const filterResults = (filmData) => {
        /**
         *  FOR SPECIFIC WATCHLISTS
         */
        // Filtering: Filter users based on selected users
        const specificUserIDs = filters.specificWatchlistFilter.map(filter => filter.id);
        const specificUsers = users.filter(user => specificUserIDs.includes(user._id));
        // Preprocessing: store the list of films in specific user's watchlist
        //      OR operation
        const watchlistedFilms_OR = specificUsers.flatMap(user => user.films.watchlist);
        //      AND operation
        const watchlistedFilms_AND = specificUsers.reduce((acc, user) => {
            // Filter the accumulated films to only include films that exist in the current user's watchlist
            return acc.filter(film => user.films.watchlist.some(watchlistedFilm => watchlistedFilm._id === film._id));
        }, specificUsers.length > 0 ? specificUsers[0].films.watchlist : []); // Initialize with the first user's watchlist

        /**
         *  FOR OTHER FILTERS
         */
        const watchlistFilterActive = filters.watchlistFilter > 0;
        const specificWatchlistFilterActive = filters.specificWatchlistFilter.length > 0;
        const genreFilterActive = filters.genreFilter.length > 0;
        const yearFilterActive = filters.yearFilter[0] !== defaultFilters.yearFilter[0] || filters.yearFilter[1] !== defaultFilters.yearFilter[1];
        const ratingFilterActive = filters.ratingFilter > 0;

        return filmData.filter(film => {
            return (specificWatchlistFilterActive ? filterBySpecificWatchlist(film) : true) &&
                (watchlistFilterActive ? filterByWatchlist(film) : true) &&
                (genreFilterActive ? filterByGenre(film) : true) &&
                (yearFilterActive ? filterByYears(film) : true) &&
                (ratingFilterActive ? filterByRating(film) : true);
        });

        function filterBySpecificWatchlist(film) {
            // Check if the film is in the watchlist of all the selected users
            if (filters.isSpecificAnd) {
                if (watchlistedFilms_AND.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
                // Check if the film is in the watchlist of any of the selected users
            } else {
                if (watchlistedFilms_OR.some(watchlistedFilm => watchlistedFilm._id === film.id.toString())) return true;
            }
        }

        function filterByWatchlist(film) {
            let counter = 0;
            users.forEach(user => {
                user.films.watchlist.forEach(watchlistedFilm => {
                    if (watchlistedFilm._id === film.id.toString()) counter++;
                });
            });
            return counter >= filters.watchlistFilter;
        }

        function filterByGenre(film) {
            // different API calls have different structure
            if (film.genres) return filters.genreFilter?.some(selectedGenre => film.genres.some(genre => genre.id === selectedGenre.id));
            if (film.genre_ids) return filters.genreFilter?.some(selectedGenre => film.genre_ids.some(genre => genre === selectedGenre.id));
        }

        function filterByYears(film) {
            let year = film.release_date.split("-")[0];
            return filters.yearFilter[0] <= year && year <= filters.yearFilter[1];
        }

        function filterByRating(film) {
            return film.vote_average >= filters.ratingFilter;
        }
    };

    // Only keep the films that are not in user watchlists
    const filterWatchlistedFilms = (films) => {
        return films.filter(film => !watchlistObject[film.id]);
    };

    // Sort the film data based on the selected sort option
    const sortResults = (results) => {
        let sortedItems = results;
        // console.log("sortedItems", sortedItems);
        switch (sortBy) {
            case "Rating: High to Low":
                sortedItems = sortedItems.sort((a, b) => b.vote_average - a.vote_average); // if b > a, b comes first
                break;
            case "Rating: Low to High":
                sortedItems = sortedItems.sort((a, b) => a.vote_average - b.vote_average); // if a > b, b comes first
                break;
            case "Year: New to Old":
                sortedItems = sortedItems.sort((a, b) => parseInt(b.release_date.split("-")[0]) - parseInt(a.release_date.split("-")[0]));
                break;
            case "Year: Old to New":
                sortedItems = sortedItems.sort((a, b) => parseInt(a.release_date.split("-")[0]) - parseInt(b.release_date.split("-")[0]));
                break;
            case "Watchlists: Most to Least" || "Watchlists: Least to Most":
                break;
            default:
                break;
        }
        return sortedItems;
    };

    // Sort the watchlisted films by the number of watchlists
    const sortFilmsByWatchlist = (films) => {
        return films.sort((a, b) => {
            return watchlistObject[b.id].length - watchlistObject[a.id].length;
        });
    };

    /************************************************************************
     *  Update selected films
     ************************************************************************/

    const updateSelection = (newSelectedFilms) => {
        setFormData(formData => ({ ...formData, selectedFilms: newSelectedFilms }));
    };

    /************************************************************************
     *  Handle next step
     ************************************************************************/

    const handleNextStep = () => {
        if (formData.selectedFilms.length === 0) {
            setShowNoSelectionError(true); // Show error message if no film is selected
            return;
        } else setShowNoSelectionError(false); // Hide error message if films are selected
        nextStep(formData);
    };

    const FilmFiltersDialog = () => {
        return (
            <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
                <DialogContent hasClose={false} className="max-w-[1024px] w-full h-full lg:w-[75%] lg:h-[80%] overflow-y-auto bg-primary custom-scrollbar text-secondary">
                    <FilmFilters
                        filmData={filmData}
                        users={users}
                        setIsFilterApplied={setIsFilterApplied}
                        setModalOpen={setFilterModalOpen}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        filters={filters}
                        setFilters={setFilters}
                        setFilteredResults={setFilteredResults}
                    />
                </DialogContent>
            </Dialog>
        );
    };

    /************************************************************************
     *  RENDER
     ************************************************************************/

    return (
        <div className="flex flex-col w-full h-full px-2 mb-10 gap-y-2 bg-primary text-primary-foreground lg:mx-auto">
            <div className='my-4 flex-between'>
                <h3 className='h3'>Pick A Film!</h3>
                <div onClick={() => setModalOpen(false)} className='cursor-pointer text-m-xl'>
                    <IoClose />
                </div>
            </div>

            <div className="flex flex-col">
                {/* Search & Filters */}
                <div className="flex gap-x-4">
                    <SearchBar
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                    />
                    {/* Filters Modal defined at the bottom */}
                    <button onClick={() => setFilterModalOpen(true)}
                        className={cn("flex items-center text-[30px] mr-2 mb-2 text-primary-foreground/60",
                            { "text-accent/70": isFilterApplied })}>
                        <BiFilterAlt />
                    </button>
                </div>
                <FilmFiltersDisplay
                    openFilterModal={setFilterModalOpen}
                    isFilterApplied={isFilterApplied}
                    setIsFilterApplied={setIsFilterApplied}
                    filters={filters}
                    setFilters={setFilters}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Result */}
                {loading ?
                    <div className="flex-center h-[400px] md:h-[800px]">
                        <Loader height="h-[60px]" weight="h-[60px]" />
                    </div> :
                    <SearchDisplay
                        filteredResults={filteredResults}
                        selectedFilms={formData.selectedFilms}
                        setSelectedFilms={updateSelection}
                        watchlistObject={watchlistObject}
                        guests={users}
                        protectedFilms={protectedFilms}
                    />
                }

                {/* Display error message if no film is selected */}
                {showNoSelectionError && (
                    <div className="pt-10 text-destructive-foreground text-m-m">
                        Please select at least one film.
                    </div>
                )}

                {/* Next Step */}
                <div className="sticky bottom-0 z-50 flex items-center justify-center w-full">
                    <Button onClick={handleNextStep} type="submit" className="w-[95%] border-none bg-accent  text-primary shadow-xl">
                        {title}
                    </Button>
                </div>

            </div>

            {/* Filters Modal */}
            <FilmFiltersDialog />

        </div>
    );
};

export default FilmSearch;
